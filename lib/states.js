"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _state = _interopRequireDefault(require("./state"));

var _symbols = require("./utils/symbols");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function States() {
  // ====================================== //
  // [PRIVATE] List of states               //
  // ====================================== //
  this[_symbols.symStatesRegisters] = new Map(); // ====================================== //
  // [Private] Listener of Changes values   //
  // states                                 //
  // ====================================== //

  this[_symbols.symStatesListener] = function () {};
} // ====================================== //
// - Initial States                       //
// ====================================== //


States.prototype.init = function (states) {
  var _this = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if ((0, _typeof2["default"])(states) !== 'object' || Array.isArray(states)) throw new Error('States require a object');

  var _loop = function _loop(key) {
    var state = new _state["default"](_objectSpread({
      type: 'any',
      history: false,
      deep: 2,
      warn: true
    }, options[key], {
      key: key,
      val: states[key]
    })); // ====================================== //
    // Listen any change og current state     //
    // ====================================== //

    state.onChange = function (payload) {
      // ====================================== //
      // Execute event onListen                 //
      // ====================================== //
      _this[_symbols.symStatesListener](key, payload);
    }; // ====================================== //
    // Register state in the list Map         //
    // ====================================== //


    _this[_symbols.symStatesRegisters].set(key, state);
  };

  for (var key in states) {
    _loop(key);
  }
}; // ====================================== //
// Returna la cantidad de estados creados //
// ====================================== //


Object.defineProperty(States.prototype, 'size', {
  get: function get() {
    return this[_symbols.symStatesRegisters].size;
  },
  enumerable: true,
  configurable: false
}); // ====================================== //
// Setea un callback para el evento       //
// ====================================== //
// eslint-disable-next-line accessor-pairs

Object.defineProperty(States.prototype, 'onListen', {
  set: function set(callback) {
    if (typeof callback !== 'function') throw new Error('onListen receive a Function');
    this[_symbols.symStatesListener] = callback;
  },
  enumerable: true,
  configurable: false
}); // ===================================== //
// PUBLIC METHODS                        //
// ===================================== //

/** Get Values States
* @returns {Object} All States Registered, only values
*/

States.prototype.values = function () {
  var statesValues = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = this[_symbols.symStatesRegisters].entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
          key = _step$value[0],
          state = _step$value[1];

      statesValues[key] = state.val;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return statesValues;
};
/** Get States
* @returns {Object} All States Registered
*/


States.prototype.get = function () {
  var statesRegistered = {};
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = this[_symbols.symStatesRegisters].entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = (0, _slicedToArray2["default"])(_step2.value, 2),
          key = _step2$value[0],
          state = _step2$value[1];

      statesRegistered[key] = state;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return statesRegistered;
};
/**
* Return states in mode function
* @return {Object} Methods
*/


States.prototype.toMethod = function () {
  var methods = {};
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = this[_symbols.symStatesRegisters].entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _step3$value = (0, _slicedToArray2["default"])(_step3.value, 2),
          key = _step3$value[0],
          state = _step3$value[1];

      methods[key] = state.change;
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return methods;
};

var _default = States;
exports["default"] = _default;