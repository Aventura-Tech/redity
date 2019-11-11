"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "States", {
  enumerable: true,
  get: function get() {
    return _states["default"];
  }
});
Object.defineProperty(exports, "Log", {
  enumerable: true,
  get: function get() {
    return _log["default"];
  }
});
Object.defineProperty(exports, "Blockcode", {
  enumerable: true,
  get: function get() {
    return _blockcode["default"];
  }
});
Object.defineProperty(exports, "Model", {
  enumerable: true,
  get: function get() {
    return _model["default"];
  }
});
Object.defineProperty(exports, "connect", {
  enumerable: true,
  get: function get() {
    return _hoc["default"];
  }
});
Object.defineProperty(exports, "connectFaker", {
  enumerable: true,
  get: function get() {
    return _hoc.connectFaker;
  }
});
Object.defineProperty(exports, "Subscriber", {
  enumerable: true,
  get: function get() {
    return _subscriber["default"];
  }
});
Object.defineProperty(exports, "Access", {
  enumerable: true,
  get: function get() {
    return _access["default"];
  }
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _states = _interopRequireDefault(require("./states"));

var _log = _interopRequireDefault(require("./utils/log"));

var _blockcode = _interopRequireDefault(require("./blockcode"));

var _model = _interopRequireDefault(require("./model"));

var _hoc = _interopRequireWildcard(require("./hoc"));

var _subscriber = _interopRequireDefault(require("./subscriber"));

var _symbols = require("./utils/symbols");

var _exceptions = require("./utils/exceptions");

var _access = _interopRequireDefault(require("./utils/access"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Redity class
 */
function Redity() {}

Redity.config = {
  dev: true,
  blockcodeLog: true
};
/**
 * Version Redity
 */

Redity.version = '1.0.0';
Redity[_symbols.symRedityModels] = new Map();
/**
* Register model
* @param {string} key Key for model
* @param {function} modelContructor model
* @returns {funtion}
*/

Redity.register = function (key, modelContructor) {
  if (typeof key !== 'string') throw new Error('Require a key for register model');
  if (typeof modelContructor !== 'function') throw (0, _exceptions.IsNotFunction)('register');
  var model = new _model["default"](key);
  modelContructor(model);

  model[_symbols.symModelCreate](Redity.config.dev);

  Redity[_symbols.symRedityModels].set(key, model);

  return {
    register: Redity.register,
    get: function get() {
      return model;
    }
  };
};

Redity.model = {};

Redity.model.all = function () {
  var models = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Redity[_symbols.symRedityModels].entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
          key = _step$value[0],
          model = _step$value[1];

      models[key] = model;
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

  return models;
};
/** Return one model
 * @param {string} key
 */


Redity.model.get = function (key) {
  var has = Redity[_symbols.symRedityModels].has(key);

  if (!has) return has;
  return Redity[_symbols.symRedityModels].get(key);
};
/** Return all models private
 * @param {string} ignore key model for ignore
 * @return {object}
 */


Redity.model["private"] = function () {
  var ignore = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var modelsPrivate = {};
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = Redity[_symbols.symRedityModels].entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = (0, _slicedToArray2["default"])(_step2.value, 2),
          key = _step2$value[0],
          model = _step2$value[1];

      if (key === ignore) continue;

      if (model.access === _access["default"].PRIVATE) {
        modelsPrivate[key] = _objectSpread({}, model, {
          states: false,
          dispatchers: false,
          statesValues: function statesValues() {}
        });
      }
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

  return modelsPrivate;
};
/** Return all models protected
 * @param {string} ignore key model for ignore
 * @return {object}
 */


Redity.model["protected"] = function () {
  var ignore = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var modelsPrivate = {};
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = Redity[_symbols.symRedityModels].entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _step3$value = (0, _slicedToArray2["default"])(_step3.value, 2),
          key = _step3$value[0],
          model = _step3$value[1];

      if (key === ignore) continue;

      if (model.access === _access["default"].PROTECTED) {
        (function () {
          var statesOnlyRead = {};
          var statesValues = model.states;

          var _loop = function _loop(_key) {
            statesOnlyRead[_key] = function () {
              return statesValues[_key]();
            };
          };

          for (var _key in statesValues) {
            _loop(_key);
          }

          modelsPrivate[key] = _objectSpread({}, model, {
            dispatchers: false,
            states: statesOnlyRead
          });
        })();
      }
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

  return modelsPrivate;
};
/** Return all models public
 * @param {string} ignore key model for ignore
 * @return {object}
 */


Redity.model["public"] = function () {
  var ignore = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var modelsPrivate = {};
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = Redity[_symbols.symRedityModels].entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var _step4$value = (0, _slicedToArray2["default"])(_step4.value, 2),
          key = _step4$value[0],
          model = _step4$value[1];

      if (key === ignore) continue;

      if (model.access === _access["default"].PUBLIC) {
        modelsPrivate[key] = model;
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return modelsPrivate;
};

var _default = Redity;
exports["default"] = _default;