"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateCreateTemplate;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

/**
 * Generate createTemplate
 * @param {import('../index').default} redity
 */
function generateCreateTemplate(redity) {
  /**
   * Create un componente Template
   * @template T
   * @param {string|number} keyName keyName connect
   * @param {T} props props for Component Template
   * @param {function(T):React.ReactElement} Component  Component Template
   * @returns {function(object):React.ReactElement}
   * @example
   * this.createTemplate('keyName', { name: 'Juan' }, props => (
   *  <h1>{props.name}</h1>
   * ))
   */
  function createTemplate(keyName, props, Component) {
    /**
     * @param {T} nextProps
     */
    function Wrapper(nextProps) {
      return _react["default"].createElement(Component, (0, _extends2["default"])({}, props, nextProps));
    }

    return redity.connect(keyName)(Wrapper);
  }

  return createTemplate;
}