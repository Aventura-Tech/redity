"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _symbols = require("./utils/symbols");

var _exceptions = require("./utils/exceptions");

var _iftypeof = _interopRequireDefault(require("./utils/iftypeof"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Action Class
 * @param {string} key Key Action
 * @param {string} defaultValue Value default
 * @param {object} options Options for Actions
 */
function Action(key, defaultValue) {
  var _this = this;

  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // ====================================== //
  // Types of Action                        //
  // ====================================== //
  this.types = Object.freeze({
    WAIT: 'wait',
    PASS: 'pass',
    THEN: 'then'
  });
  var disabled = false;
  /**
   * Disabled action of dispatch
   */

  this.disable = function () {
    disabled = true;
  };
  /**
   * Enabled action of dispatch
   */


  this.enable = function () {
    disabled = false;
  }; // ====================================== //
  // Key of Action                          //
  // ====================================== //


  this.key = key;
  this.defaultValue = defaultValue;
  if ((0, _typeof2["default"])(options) !== 'object') throw (0, _exceptions.IsNotObject)('Action');
  this.options = _objectSpread({
    payload: 'any',
    type: this.types.WAIT,
    passError: false,
    warn: true
  }, options);

  switch (this.options.type) {
    case this.types.WAIT:
    case this.types.PASS:
    case this.types.THEN:
      break;

    default:
      // eslint-disable-next-line no-console
      console.warn("this type action(".concat(this.options.type, ") is not recognized. There are only these types[").concat(this.types.WAIT, ", ").concat(this.types.PASS, ", ").concat(this.types.THEN, "]. Will be assigned by default \"wait\""));
      this.options.type = this.types.WAIT;
      break;
  }

  this[_symbols.symActionLoading] = false;

  this[_symbols.symActionListener] = function () {};

  Object.freeze(this.options);
  /**
  * Dispatch the data for onListen of Model
  * @param {any} payload Data
  * @param {function} onDone Avisa cuando la acción haya terminado
  */

  this.dispatch =
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var payload,
        _payload,
        header,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payload = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;

            if (!disabled) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", false);

          case 3:
            _payload = payload !== null ? payload : _this.defaultValue;

            if ((0, _iftypeof["default"])(_payload, _this.options.payload, _this.options.warn, "Action - ".concat(_this.key, ":"))) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", false);

          case 6:
            if (!(_this.options.type !== _this.types.PASS)) {
              _context.next = 10;
              break;
            }

            if (!_this[_symbols.symActionLoading]) {
              _context.next = 10;
              break;
            }

            if (_this.options.type === _this.types.THEN) {
              _this.memoryThen.push(_payload);
            }

            return _context.abrupt("return", false);

          case 10:
            header = Object.freeze({
              key: _this.key,
              defaultValue: _this.defaultValue,
              done: _this.done.bind(_this)
            });
            if (_this.options.type !== _this.types.PASS) _this[_symbols.symActionLoading] = true;
            _context.next = 14;
            return _this[_symbols.symActionListener](_payload, header);

          case 14:
            return _context.abrupt("return", true);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  this.dispatch.disable = this.disable;
  this.dispatch.enable = this.enable;
  this.disable = this.disable.bind(this);
  this.enable = this.enable.bind(this);
  this.dispatch.bind(this);
} // ====================================== //
// Saving action                          //
// ====================================== //


Object.defineProperty(Action.prototype, 'memoryThen', {
  value: [],
  writable: false,
  configurable: false,
  enumerable: true
});
Action.prototype[_symbols.symActionResendEvent] =
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee2() {
  var header, dataSaved;
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          header = Object.freeze({
            key: this.key,
            defaultValue: this.defaultValue,
            done: this.done.bind(this)
          });
          dataSaved = this.memoryThen[this.memoryThen.length - 1];
          this.memoryThen.length = 0;
          _context2.next = 5;
          return this[_symbols.symActionListener](dataSaved, header);

        case 5:
          this.done();

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
}));
/**
 * Informa a la acción que ya se dió por terminado
 */

Action.prototype.done = function () {
  if (this.options.type === this.types.THEN && this.memoryThen.length > 0) {
    this[_symbols.symActionResendEvent]();

    return;
  }

  this[_symbols.symActionLoading] = false;
  this.memoryThen.length = 0;
}; // eslint-disable-next-line accessor-pairs


Object.defineProperty(Action.prototype, 'onListen', {
  set: function set(callback) {
    if (typeof callback !== 'function') throw (0, _exceptions.IsNotFunction)('onListen'); // if (!Object.prototype.hasOwnProperty.call(callback, 'then')) {
    //   throw new Error('Requiere an async function')
    // }

    this[_symbols.symActionListener] = callback;
  },
  configurable: false,
  enumerable: true
});
var _default = Action;
exports["default"] = _default;