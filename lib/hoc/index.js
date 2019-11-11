"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "connectFaker", {
  enumerable: true,
  get: function get() {
    return _connectFaker["default"];
  }
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _class = _interopRequireDefault(require("./class"));

var _functional = _interopRequireDefault(require("./functional"));

var _connectFaker = _interopRequireDefault(require("./connectFaker"));

var currentReact = false;

var _React$version$split = _react["default"].version.split('.'),
    _React$version$split2 = (0, _slicedToArray2["default"])(_React$version$split, 3),
    x = _React$version$split2[0],
    y = _React$version$split2[1],
    z = _React$version$split2[2];

if (x > 16 || x >= 16 && y >= 8 & z >= 0) {
  currentReact = true;
}

var _default = currentReact ? _functional["default"] : _class["default"];

exports["default"] = _default;