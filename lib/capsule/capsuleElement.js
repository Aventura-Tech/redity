"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CapsuleElement;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * @param {DataToolsConnect} dataToolsConnect
 * @param {HideChildrens} hideChildrens
 * @param {TemplateChildrens} templateChildrens
 */
function CapsuleElement(dataToolsConnect, hideChildrens, templateChildrens) {
  this.hide = function () {
    if (hideChildrens.has(dataToolsConnect.keyName)) return false;
    hideChildrens.set(dataToolsConnect.keyName, true);
    dataToolsConnect.render(dataToolsConnect.props);
    return true;
  };

  this.show = function () {
    if (!hideChildrens.has(dataToolsConnect.keyName)) return false;
    hideChildrens["delete"](dataToolsConnect.keyName);
    dataToolsConnect.render(dataToolsConnect.props);
    return true;
  };
  /**
   * @param {function(object):React.ReactElement} TemplateComponent
   * @param {boolean} render
   */


  this.setTemplate = function (TemplateComponent) {
    var render = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    function TemplateChildren(props) {
      return _react["default"].createElement(TemplateComponent, props);
    }

    templateChildrens.set(dataToolsConnect.keyName, TemplateChildren);
    if (render) dataToolsConnect.render(dataToolsConnect.props);
  };
  /**
   * @param {boolean} render
   * @returns {boolean}
   */


  this.removeTemplate = function () {
    var render = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var result = templateChildrens["delete"](dataToolsConnect.keyName);
    if (render) dataToolsConnect.render(dataToolsConnect.props);
    return result;
  };

  this.restore = function () {
    if (!templateChildrens.has(dataToolsConnect.keyName)) return false;
    templateChildrens["delete"](dataToolsConnect.keyName);
    dataToolsConnect.render(dataToolsConnect.props);
    return true;
  };
  /**
   * Intercambia los chidlren
   * @param {CapsuleElement} otherCapsuleElement
   */


  this.trade = function (otherCapsuleElement) {};

  this.payload = function () {
    return Object.freeze(_objectSpread({}, dataToolsConnect.payload));
  };

  this.props = function () {
    var _dataToolsConnect$pro = dataToolsConnect.props,
        _hash = _dataToolsConnect$pro._hash,
        props = (0, _objectWithoutProperties2["default"])(_dataToolsConnect$pro, ["_hash"]);
    return Object.freeze(props);
  };

  this.render = function () {
    var nextProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    dataToolsConnect.render(_objectSpread({}, dataToolsConnect.props, {}, nextProps));
  };
}