"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * @template T
 * @param {T} value
 */
function State(value) {
  var initValue = JSON.stringify(value);
  var valueState = value;
  /**
   * @callback Listener
   * @param {T} nextValue
  */

  /** @type {Listener} */

  var callback = function callback(nextValue) {};
  /**
   * @param {Listener} listener
   */


  this.on = function (listener) {
    callback = listener;
  };
  /** @returns {T} */


  this.get = function () {
    return valueState;
  };
  /**
   * @param {any} val
   * @returns {T}
   */


  this.set = function (val) {
    callback(val);
    valueState = val;
    return valueState;
  };
  /**
   * @returns {boolean}
   */


  this.hasChange = function () {
    return initValue !== JSON.stringify(valueState);
  };
  /**
   * @param {object} data
   * @returns {T}
   */


  this.init = function () {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (data !== null) {
      initValue = JSON.stringify(data);
      valueState = data;
      return valueState;
    }

    var initValueParse = JSON.parse(initValue);
    valueState = initValueParse;
    return valueState;
  };
}
/**
 * @template K
 */


var States =
/*#__PURE__*/
function () {
  /**
   * @private
   * @type {Map<string, State>}
   */

  /**
   * Conserva el dato initial del constructor
   * @readonly
   * @type {K}
   */

  /**
   *
   * @param {K} data_object
   */
  function States(data_object) {
    var _this = this;

    (0, _classCallCheck2["default"])(this, States);
    (0, _defineProperty2["default"])(this, "states", new Map());
    (0, _defineProperty2["default"])(this, "data_initial", null);
    (0, _defineProperty2["default"])(this, "hasChange", function () {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (key !== null) {
        if (!_this.states.has(key)) return false;
        return _this.states.get(key).hasChange();
      }

      var changed = false;

      _this.states.forEach(function (_state, key) {
        if (!changed) {
          changed = _state.hasChange();
        }
      });

      return changed;
    });
    (0, _defineProperty2["default"])(this, "whoDataChanges", function () {
      var data = {};

      _this.states.forEach(function (_state, key) {
        if (_state.hasChange()) {
          data[key] = _state.get();
        }
      });

      return data;
    });
    this.data_initial = Object.freeze(_objectSpread({}, data_object));

    for (var key in data_object) {
      /**
       * Data state
       */
      var state = new State(data_object[key]);
      this.states.set(key, state);
    }
  }
  /**
   * @returns {K}
   */


  (0, _createClass2["default"])(States, [{
    key: "update",

    /**
     * Actualiza valores
     * @param {object} data
     * @returns {K}
     */
    value: function update(data) {
      for (var key in data) {
        if (this.states.has(key)) {
          var state = this.states.get(key);
          state.set(data[key]);
        }
      }

      return this.val;
    }
    /**
     * Inicializa el dato o reemplaza el dato inicial
     * @param {object} data Dato inicial
     */

  }, {
    key: "init",
    value: function init() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.states.forEach(function (state) {
        state.init();
      });
      if (data === null) return;

      for (var key in data) {
        if (this.states.has(key)) {
          this.states.get(key).init(data[key]);
        }
      }
    }
  }, {
    key: "val",
    get: function get() {
      /** @type {K} */
      // @ts-ignore
      var data_state = {};
      this.states.forEach(function (_state, key) {
        data_state[key] = _state.get();
      });
      return data_state;
    }
    /**
     * @param {K} values
     */
    ,
    set: function set(values) {
      for (var key in values) {
        if (this.states.has(key)) {
          var state = this.states.get(key);
          state.set(values[key]);
        }
      }
    }
    /**
     * @returns {Object.<string, function(any):any>}
     */

  }, {
    key: "method",
    get: function get() {
      /**
       * @type {any}
       */
      var data_state = {};
      this.states.forEach(function (state, key) {
        /**
         * @param {any=} val
         * @returns {any}
         */
        data_state[key] = function () {
          var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

          if (val !== undefined) {
            state.set(val);
          }

          return state.get();
        };
      });
      return data_state;
    }
    /**
     * Verifica si hubo cambios, tambien se puede verificar por key
     * @param {string=} key
     * @returns {boolean}
     */

  }]);
  return States;
}();

exports["default"] = States;