"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = toolsCapsule;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _capsuleElement = _interopRequireDefault(require("./capsuleElement"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * get tools for capsule
 * @param {RegistersOfConnections} registersOfConnections
 * @param {HideChildrens} hideChildrens
 * @param {TemplateChildrens} templateChildrens
 */
function toolsCapsule(registersOfConnections, hideChildrens, templateChildrens) {
  /**
   * @param {string} keyName
   * @returns {CapsuleElement | null}
   */
  function getCapsuleByKeyName(keyName) {
    if (!registersOfConnections.has(keyName)) {
      return null;
    }

    return new _capsuleElement["default"](registersOfConnections.get(keyName), hideChildrens, templateChildrens);
  }
  /**
   * get current props of connection
   * @param {string} keyName
   */


  function getProps(keyName) {
    if (!registersOfConnections.has(keyName)) return {};
    var connection = registersOfConnections.get(keyName);
    var _connection$props = connection.props,
        _hash = _connection$props._hash,
        props = (0, _objectWithoutProperties2["default"])(_connection$props, ["_hash"]);
    return Object.freeze(props);
  }
  /**
   * @param {string|number} keyName
   * @param {object} props
   */


  function setProps(keyName, props) {
    if (!registersOfConnections.has(keyName)) return false;
    var connection = registersOfConnections.get(keyName);
    connection.props = _objectSpread({}, connection.props, {}, props);
    return true;
  }
  /**
   * get current props of connection
   * @param {string} keyName
   */


  function getPayload(keyName) {
    if (!registersOfConnections.has(keyName)) return {};
    var connection = registersOfConnections.get(keyName);
    return Object.freeze(_objectSpread({}, connection.payload));
  }
  /**
   * @param {string|number} keyName
   */


  function executeRender(keyName) {
    if (registersOfConnections.has(keyName)) {
      var connection = registersOfConnections.get(keyName);
      connection.render(connection.props);
    }
  }
  /**
   * Reemplaza el children de Capsule o connect
   * @param {string|number} keyName
   * @param {function(object):import('react').ReactElement} TemplateComponent React Component
   * @param {boolean=} render
   */


  function setTemplate(keyName, TemplateComponent) {
    var render = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    templateChildrens.set(keyName, TemplateComponent);
    if (render) executeRender(keyName);
  }
  /**
   * Remueve el template que tenga asignada
   * @param {string|number} keyName
   * @param {boolean=} render
   * @returns {boolean}
   */


  function removeTemplate(keyName, render) {
    var result = templateChildrens["delete"](keyName);
    if (render) executeRender(keyName);
    return result;
  }

  return {
    getCapsuleByKeyName: getCapsuleByKeyName,
    getProps: getProps,
    getPayload: getPayload,
    setTemplate: setTemplate,
    removeTemplate: removeTemplate,
    setProps: setProps
  };
}