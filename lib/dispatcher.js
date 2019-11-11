"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Dispatcher;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _exceptions = require("./utils/exceptions");

var _action = _interopRequireDefault(require("./action"));

var _symbols = require("./utils/symbols");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Dispatcher() {
  // ====================================== //
  // PRIVATE PROPERTY                       //
  // ====================================== //
  // List of Dispatcher
  var lists = new Map();

  var listener =
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function listener() {
      return _ref.apply(this, arguments);
    };
  }(); // ====================================== //
  // PUBLIC PROPERTY                        //
  // ====================================== //


  var Public = {
    onListen: {
      set: function set(cb) {
        if (typeof cb !== 'function') throw (0, _exceptions.IsNotFunction)('On property');
        listener = cb;
      },
      enumerable: true,
      configurable: false
    },
    size: {
      get: function get() {
        return lists.size;
      },
      enumerable: true,
      configurable: false
    }
  }; // ====================================== //
  // CONSTRUCTOR                            //
  // ====================================== //

  Object.defineProperties(this, Public); // ====================================== //
  // METHODS PUBLICS                        //
  // ====================================== //

  /**
   * create actions
   * @param {object} actions A list object for create actions
   */

  this.init = function (actions) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if ((0, _typeof2["default"])(actions) !== 'object' || Array.isArray(actions)) throw (0, _exceptions.IsNotObject)('Dispatcher parameter');
    var stateActions = {};

    for (var key in actions) {
      var action = void 0;

      if (options[key] === undefined) {
        action = new _action["default"](key, actions[key]);
      } else {
        action = new _action["default"](key, actions[key], options[key]);
      } // const stateActions = {}


      stateActions[key] = action[_symbols.symActionLoading];
      lists.set(key, action);
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
            key = _step$value[0],
            action = _step$value[1];

        action.onListen =
        /*#__PURE__*/
        function () {
          var _ref2 = (0, _asyncToGenerator2["default"])(
          /*#__PURE__*/
          _regenerator["default"].mark(function _callee2(payload, header) {
            return _regenerator["default"].wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return listener(payload, header, _objectSpread({}, stateActions, (0, _defineProperty2["default"])({}, key, function () {})));

                  case 2:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          return function (_x, _x2) {
            return _ref2.apply(this, arguments);
          };
        }();
      };

      for (var _iterator = lists.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
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
  };
  /**
   * Return a action
   * @param {string} key action key
   */


  this.get = function (key) {
    var action = lists.get(key);
    return action || false;
  };
  /**
   * Return all the actions functional lists
   * @returns {object} Object of methods
   */


  this.toMethod = function () {
    var actionsToMethod = {};
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = lists.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step2$value = (0, _slicedToArray2["default"])(_step2.value, 2),
            key = _step2$value[0],
            action = _step2$value[1];

        actionsToMethod[key] = action.dispatch;
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

    return actionsToMethod;
  };
}