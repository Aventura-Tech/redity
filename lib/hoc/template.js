"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _react = _interopRequireDefault(require("react"));

/**
 *
 * @param {string} message
 * @param {string} type
 */
function _default(message, type) {
  function Template() {
    var style = {
      padding: '1em',
      borderRadius: '7px'
    };

    switch (type) {
      case 'success':
        style.backgroundColor = '#13CE66';
        style.color = 'black';
        break;

      case 'warn':
        style.backgroundColor = '#FFC82C';
        style.color = 'black';
        break;

      case 'error':
        style.backgroundColor = '#FF4949';
        style.color = 'white';
        break;

      default:
    }

    return _react["default"].createElement("p", {
      style: style
    }, message);
  }

  return Template;
}