"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = renderManagement;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * create render
 * @param {RegistersOfConnections} registersOfConnections
 */
function renderManagement(registersOfConnections) {
  function defaultControlRender() {
    return true;
  }
  /**
   * Realiza un render al componente connectado o encapsulado por su keyName. Si no encuentra la conexion o no está renderizado en la vista, retornará un false.
   * @param {string|number} keyName keyName for render
   * @param {object=} nextProps
   * @param {function(object):boolean=} controlRender Controla el render por una condición
   * @returns {boolean}
   */


  function render(keyName) {
    var nextProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var controlRender = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultControlRender;
    if (!registersOfConnections.has(keyName)) return false;
    var connection = registersOfConnections.get(keyName);
    var willRender = controlRender(Object.freeze(_objectSpread({}, connection.props)));
    if (!willRender) return false;
    connection.render(_objectSpread({}, connection.props, {}, nextProps));
    return true;
  }
  /**
   * get current props of connection
   * @param {string|number} keyName
   */


  function getProps(keyName) {
    if (!registersOfConnections.has(keyName)) return {};
    var connection = registersOfConnections.get(keyName);
    return Object.freeze(_objectSpread({}, connection.props));
  }

  return {
    render: render,
    getProps: getProps
  };
}