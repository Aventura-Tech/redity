"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

/**
 * Constructor Enum
 * @param  {...any} params Values
 */
function Enum() {
  var name = 'Enum';

  for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
    params[_key] = arguments[_key];
  }

  params.map(function (value) {
    if ((0, _typeof2["default"])(value) === 'object' || typeof value === 'function') throw new Error('Enum: only values');
  });
  return {
    values: params,
    name: name
  };
}

Object.defineProperty(Enum, 'name', {
  value: 'Enum',
  configurable: false,
  writable: true,
  enumerable: true
});
var _default = Enum;
exports["default"] = _default;