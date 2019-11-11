"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _symbols = require("./symbols");

var _Log;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Log = (_Log = {}, (0, _defineProperty2["default"])(_Log, _symbols.symLogBody, {
  label: null,
  message: '',
  data: undefined
}), (0, _defineProperty2["default"])(_Log, _symbols.symLogType, 'log'), (0, _defineProperty2["default"])(_Log, _symbols.symLogManufacture, function (style) {
  var _Log$symLogBody = Log[_symbols.symLogBody],
      label = _Log$symLogBody.label,
      message = _Log$symLogBody.message,
      data = _Log$symLogBody.data;
  var log = console.log;
  console.groupCollapsed("%c".concat(label), style, message);

  if (Array.isArray(data)) {
    data.map(function (d, i) {
      log("".concat(i, ":"), d);
    });
  } else if ((0, _typeof2["default"])(data) === 'object') {
    for (var key in data) {
      log("".concat(key, ":"), data[key]);
    }
  } else {
    log(data);
  }

  console.groupEnd();
}), (0, _defineProperty2["default"])(_Log, _symbols.symLogVerify, function (body) {
  if (body === null) return false;
  if (Array.isArray(body)) return false;
  if ((0, _typeof2["default"])(body) !== 'object') return false;
  return true;
}), (0, _defineProperty2["default"])(_Log, "norm", function norm(body) {
  if (!Log[_symbols.symLogVerify](body)) throw new Error('Require a Object');
  Log[_symbols.symLogBody] = _objectSpread({}, Log[_symbols.symLogBody], {}, body);

  Log[_symbols.symLogManufacture]('background-color: steelblue; color: white;  padding: 2px 5px');
}), (0, _defineProperty2["default"])(_Log, "info", function info(body) {
  if (!Log[_symbols.symLogVerify](body)) throw new Error('Require a Object');
  Log[_symbols.symLogType] = 'info';
  Log[_symbols.symLogBody] = _objectSpread({}, Log[_symbols.symLogBody], {}, body);

  Log[_symbols.symLogManufacture]('padding: 2px 5px; border: 2px solid black');
}), (0, _defineProperty2["default"])(_Log, "warn", function warn(body) {
  if (!Log[_symbols.symLogVerify](body)) throw new Error('Require a Object');
  Log[_symbols.symLogType] = 'warn';
  Log[_symbols.symLogBody] = _objectSpread({}, Log[_symbols.symLogBody], {}, body);

  Log[_symbols.symLogManufacture]('background-color: orange; color: black;  padding: 2px 5px');
}), (0, _defineProperty2["default"])(_Log, "error", function error(body) {
  if (!Log[_symbols.symLogVerify](body)) throw new Error('Require a Object');
  Log[_symbols.symLogType] = 'error';
  Log[_symbols.symLogBody] = _objectSpread({}, Log[_symbols.symLogBody], {}, body);

  Log[_symbols.symLogManufacture]('background-color: red; color: white; padding: 2px 5px');
}), _Log);
var _default = Log;
exports["default"] = _default;