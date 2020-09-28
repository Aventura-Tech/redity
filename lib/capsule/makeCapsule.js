"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeCapsule;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * creat connect for Component
 * @param {RegistersOfConnections} registersOfConnections
 * @param {function(string|number, OptionConnect|function(object):OptionConnect=):function(function):function(object):JSX.Element} connect
 */
function makeCapsule(registersOfConnections, connect) {
  /**
   * Encapsula secciones de un componente
   * @param {PropsCapsule} capsuleProps
   */
  function Capsule(capsuleProps) {
    function WrapperCapsule(props) {
      return _react["default"].createElement(_react["default"].Fragment, null, capsuleProps.children(props));
    }

    var Component = connect(capsuleProps.keyName, {
      payload: _objectSpread({}, capsuleProps.payload)
    })(WrapperCapsule);
    return _react["default"].createElement(Component, null);
  }
  /**
   * Crea una nueva Capsula
   * @param {string} keyName Key name de la  nueva capsula
   * @param {object=} defaultProps Props por defecto
   * @returns {function}
   */


  function createCapsule(keyName) {
    var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    /**
     * Capsule, only requiere only function
     * @param {{ children: function }} param0 Requiere Children function
     */
    var CustomCapsule = function CustomCapsule(_ref) {
      var children = _ref.children;
      return _react["default"].createElement(Capsule, {
        keyName: keyName
      },
      /** @param {{}} props */
      function (props) {
        return children(_objectSpread({}, defaultProps, {}, props));
      });
    };

    return CustomCapsule;
  }

  return {
    Capsule: Capsule,
    createCapsule: createCapsule
  };
}