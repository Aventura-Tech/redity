"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createConnect;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _useRender2 = _interopRequireDefault(require("../hooks/useRender"));

var _toolsRegister = _interopRequireDefault(require("../utils/toolsRegister"));

var _optionControlConnectManagement = _interopRequireDefault(require("./optionControlConnectManagement"));

/**
 * creat connect for Component
 * @param {RegistersOfConnections} registersOfConnections
 * @param {HideChildrens} hideChildrens
 * @param {TemplateChildrens} templateChildrens
 */
function createConnect(registersOfConnections, hideChildrens, templateChildrens) {
  var _toolRegister = (0, _toolsRegister["default"])(registersOfConnections, hideChildrens, templateChildrens),
      saveRegister = _toolRegister.saveRegister,
      deleteRegister = _toolRegister.deleteRegister,
      setComponent = _toolRegister.setComponent,
      setKeyName = _toolRegister.setKeyName;

  var _optionControlConnect = (0, _optionControlConnectManagement["default"])(),
      defaultOptionConnect = _optionControlConnect.defaultOptionConnect,
      setOptionConnect = _optionControlConnect.setOptionConnect,
      processOptionControlConnect = _optionControlConnect.processOptionControlConnect;

  function WrappedComponent(props) {
    var optionControlConnect = processOptionControlConnect(props);

    var _useRender = (0, _useRender2["default"])(optionControlConnect.props),
        propsHashed = _useRender.propsHashed,
        forceRender = _useRender.forceRender;

    var Component = null;
    var nextProps = {};

    _react["default"].useEffect(function () {
      var dataRegister = saveRegister(forceRender, propsHashed, optionControlConnect);
      Component = dataRegister.Component;
      nextProps = dataRegister.nextProps;
      return deleteRegister;
    }, []);

    var dataRegister = saveRegister(forceRender, propsHashed, optionControlConnect);
    Component = dataRegister.Component;
    nextProps = dataRegister.nextProps;
    return _react["default"].createElement(Component, (0, _extends2["default"])({}, nextProps, {
      render: forceRender
    }));
  }
  /**
   * @param {function} Componet
   */


  function Wrapper(Componet) {
    setComponent(Componet);
    return WrappedComponent;
  }
  /**
   * Connect Component
   * @param {string|number} keyName Key for connect
   * @param {OptionConnect|function(object):OptionConnect} optionControl
   */


  function connect(keyName) {
    var optionControl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptionConnect;
    setOptionConnect(optionControl);
    setKeyName(keyName);
    return Wrapper;
  }

  return connect;
}