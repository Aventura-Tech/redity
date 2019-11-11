"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = _interopRequireDefault(require("react"));

var _exceptions = require("../utils/exceptions");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _default(modelKey) {
  var mapStateToProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var mapDispatchToProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var statesToProps = {};
  var actionsToProps = {}; // ====================================== //
  // If not string is fatal error           //
  // ====================================== //

  if (typeof modelKey !== 'string') {
    if (modelKey !== false) {
      throw (0, _exceptions.RequireKeyModel)('connect');
    }
  }

  return function (Component) {
    if (typeof mapStateToProps === 'function') {
      // ====================================== //
      // Generate states fakers                 //
      // ====================================== //
      var res = mapStateToProps({}, {});

      if ((0, _typeof2["default"])(res) === 'object' && !Array.isArray(res)) {
        statesToProps = res;
      }
    }

    if (typeof mapDispatchToProps === 'function') {
      // ====================================== //
      // Generate methods dispatchers fakers    //
      // ====================================== //
      var _res = mapDispatchToProps({}, {});

      if ((0, _typeof2["default"])(_res) === 'object' && !Array.isArray(_res)) {
        for (var key in _res) {
          actionsToProps = _objectSpread({}, actionsToProps, (0, _defineProperty2["default"])({}, key, function () {
            return true;
          }));
        }
      }
    } // ====================================== //
    // If not component or null               //
    // ====================================== //


    if (!Component) throw (0, _exceptions.IsNotComponent)('connect'); // ====================================== //
    // Wrapper for father Component           //
    // ====================================== //

    return function Wrapper(props) {
      // ====================================== //
      // Render                                 //
      // ====================================== //
      return _react["default"].createElement(Component, (0, _extends2["default"])({}, statesToProps, actionsToProps, props));
    };
  };
}