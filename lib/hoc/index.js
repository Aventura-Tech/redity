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

var _functional = _interopRequireDefault(require("./functional"));

var _connectFaker = _interopRequireDefault(require("./connectFaker"));

var _default = _functional["default"];
exports["default"] = _default;