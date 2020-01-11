"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = State;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _symbols = require("./utils/symbols");

var _iftypeof = _interopRequireDefault(require("./utils/iftypeof"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function State(info) {
  var _this = this;

  this.key = info.key;
  this.warn = info.warn ? true : info.warn; // ====================================== //
  // Value of this State                    //
  // ====================================== //

  var reserveValue = JSON.stringify(info.val);
  this[_symbols.symStateVal] = info.val; // ====================================== //
  // Saving history of this           state //
  // ====================================== //

  this[_symbols.symStateHistory] = info.history ? info.history : false; // ====================================== //
  // Quantity max history                   //
  // ====================================== //

  this[_symbols.symStateDeep] = info.deep ? info.deep : 2; // ====================================== //
  // Type Value                             //
  // ====================================== //

  this[_symbols.symStateType] = info.typeValue ? info.typeValue : 'any'; // ====================================== //
  // Execute when exist a change in value   //
  // ====================================== //

  this[_symbols.symStateOnChange] = function () {}; // ====================================== //
  // Cuenta la cantidad de cambios que tuvo //
  // el valor del estado.                   //
  // ====================================== //


  this[_symbols.symStateCountChanges] = 0; // ====================================== //
  // Guarda un historial del estado         //
  // ====================================== //

  this[_symbols.symStateHistories] = []; // ====================================== //
  // Guarda el valor anterior               //
  // ====================================== //

  var valueBefore;
  (0, _iftypeof["default"])(this[_symbols.symStateVal], this[_symbols.symStateType], this.warn, "State - ".concat(this.key, ": "));
  Object.defineProperty(this, 'val', {
    get: function get() {
      return _this[_symbols.symStateVal];
    },
    enumerable: true,
    configurable: false
  }); // ====================================== //
  // Return the type state                  //
  // ====================================== //

  Object.defineProperty(this, 'type', {
    get: function get() {
      return _this[_symbols.symStateType];
    },
    enumerable: true,
    configurable: false
  }); // ====================================== //
  // Return history of state                //
  // ====================================== //

  Object.defineProperty(this, 'history', {
    get: function get() {
      return _this[_symbols.symStateHistories];
    },
    enumerable: true,
    configurable: false
  }); // ====================================== //
  // Count changes of this state            //
  // ====================================== //

  Object.defineProperty(this, 'changes', {
    get: function get() {
      return _this[_symbols.symStateCountChanges];
    },
    enumerable: true,
    configurable: false
  }); // eslint-disable-next-line accessor-pairs

  Object.defineProperty(this, 'onChange', {
    set: function set(callback) {
      _this[_symbols.symStateOnChange] = callback;
    },
    enumerable: true,
    configurable: false
  });
  /**
   * Cambia el valor del estado actual [es] y genera un evento onChange
   * @param {any} payload New data for this state
   */

  this.change = function () {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
    if (payload === undefined) return _this[_symbols.symStateVal];
    if (!(0, _iftypeof["default"])(payload, _this[_symbols.symStateType], _this.warn, "State - ".concat(_this.key, ": "))) return _this[_symbols.symStateVal];
    if (JSON.stringify(_this[_symbols.symStateVal]) === JSON.stringify(payload)) return _this[_symbols.symStateVal];
    valueBefore = _this[_symbols.symStateVal]; // ====================================== //
    // Saving values in the history           //
    // ====================================== //

    if (_this[_symbols.symStateHistory]) {
      _this[_symbols.symStateHistories].push(_this[_symbols.symStateVal]);

      if (_this[_symbols.symStateHistories].length > _this[_symbols.symStateDeep]) {
        _this[_symbols.symStateHistories].splice(0, 1);
      }
    } // ====================================== //
    // Generate Event onChange                //
    // ====================================== //


    _this[_symbols.symStateOnChange](payload); // ====================================== //
    // Set new value, count and return        //
    // current value                          //
    // ====================================== //


    _this[_symbols.symStateVal] = payload;
    _this[_symbols.symStateCountChanges] += 1;
    return _this[_symbols.symStateVal];
  };
  /**
   * Return to init value
   */


  this.change.init = function () {
    var initValue = JSON.parse(reserveValue);

    _this.change(initValue);
  };

  this.change.value = function () {
    var payload = _this[_symbols.symStateVal];

    if ((0, _typeof2["default"])(payload) === 'object' && !Array.isArray(payload)) {
      return _objectSpread({}, payload);
    }

    if (Array.isArray(payload)) {
      return (0, _toConsumableArray2["default"])(payload);
    }

    return _this[_symbols.symStateVal];
  };

  this.change.past = function () {
    var length = _this[_symbols.symStateHistories].length;

    if (length > 0) {
      var lastPayload = _this[_symbols.symStateHistories][length - 1]; // ====================================== //
      // Generate Event onChange                //
      // ====================================== //

      _this[_symbols.symStateOnChange](lastPayload); // ====================================== //
      // Set new value, count and return        //
      // current value                          //
      // ====================================== //


      _this[_symbols.symStateVal] = lastPayload;
      _this[_symbols.symStateCountChanges] += 1;

      _this[_symbols.symStateHistories].pop();

      return true;
    }

    return false;
  };
  /**
   * Change value unseen
   */


  this.change.unseen = function (payload) {
    if (payload === undefined) return _this[_symbols.symStateVal];
    if (!(0, _iftypeof["default"])(payload, _this[_symbols.symStateType], _this.warn, "State - ".concat(_this.key, ": "))) return false;
    if (JSON.stringify(_this[_symbols.symStateVal]) === JSON.stringify(payload)) return false; // ====================================== //
    // Saving values in the history           //
    // ====================================== //

    if (_this[_symbols.symStateHistory]) {
      _this[_symbols.symStateHistories].push(_this[_symbols.symStateVal]);
    } // ====================================== //
    // Set new value, count and return        //
    // current value                          //
    // ====================================== //


    _this[_symbols.symStateVal] = payload;
    _this[_symbols.symStateCountChanges] += 1;
    return true;
  };

  this.change.initUnseen = function () {
    var initValue = JSON.parse(reserveValue);

    _this.change.unseen(initValue);
  };

  this.change.initValue = function () {
    return JSON.parse(reserveValue);
  };

  this.change.before = function () {
    return valueBefore;
  }; // ====================================== //
  // Change the type of this state          //
  // ====================================== //


  this.changeType = function (type) {
    _this._type = type;
  };
}