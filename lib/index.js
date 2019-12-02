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
Object.defineProperty(exports, "Enum", {
  enumerable: true,
  get: function get() {
    return _enum["default"];
  }
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _states = _interopRequireDefault(require("./states"));

var _log = _interopRequireDefault(require("./utils/log"));

var _blockcode = _interopRequireDefault(require("./blockcode"));

var _model = _interopRequireDefault(require("./model"));

var _hoc = _interopRequireWildcard(require("./hoc"));

var _subscriber = _interopRequireDefault(require("./subscriber"));

var _symbols = require("./utils/symbols");

var _exceptions = require("./utils/exceptions");

var _enum = _interopRequireDefault(require("./utils/enum"));

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
/**
 * @param {string} ignore key model for ignore
 * @returns {Object}
 */

Redity.model.all = function () {
  var ignore = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var models = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Redity[_symbols.symRedityModels].entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
          key = _step$value[0],
          model = _step$value[1];

      if (key === ignore) continue;
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

var _default = Redity;
exports["default"] = _default;