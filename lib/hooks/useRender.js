"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useRender;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _getHashForRender = _interopRequireDefault(require("../utils/getHashForRender"));

/**
 * @param {object} props
 */
function useRender(props) {
  var _React$useState = _react["default"].useState((0, _getHashForRender["default"])(props)),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      propsHashed = _React$useState2[0],
      setHashRender = _React$useState2[1];
  /**
   * Genera un render al component actual
   * @param {object=} props
   */


  function forceRender() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    setHashRender((0, _getHashForRender["default"])(props));
  }

  return {
    propsHashed: propsHashed,
    forceRender: forceRender
  };
}