"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = toolRegister;

/**
 * creat connect for Component
 * @param {RegistersOfConnections} registersOfConnections
 * @param {HideChildrens} hideChildrens
 * @param {TemplateChildrens} templateChildrens
 */
function toolRegister(registersOfConnections, hideChildrens, templateChildrens) {
  var currentKey = null;
  /** @type {function} */

  var CurrentComponent = null;

  function HideComponent() {
    return null;
  }
  /**
   * @param {function(object):void} forceRender
   * @param {object} props
   * @param {OptionConnect} optionConnect
   */


  function saveRegister(forceRender, props, optionConnect) {
    var hasTemplate = templateChildrens.has(currentKey);
    var hide = hideChildrens.has(currentKey);

    function getChildren() {
      var Component = CurrentComponent;

      if (hasTemplate) {
        Component = templateChildrens.get(currentKey);
      }

      return hide ? HideComponent : Component;
    }
    /** @type {DataToolsConnect} */


    var dataToolsRegister = {
      keyName: currentKey,
      render: forceRender,
      children: getChildren(),
      props: props,
      memory: false,
      waiting: false,
      payload: optionConnect.payload
    };
    registersOfConnections.set(currentKey, dataToolsRegister);
    return {
      Component: getChildren(),
      nextProps: props
    };
  }

  function deleteRegister() {
    registersOfConnections["delete"](currentKey);
  }
  /**
   * @param {function} Component
   */


  function setComponent(Component) {
    CurrentComponent = Component;
  }
  /**
   * Connect Component
   * @param {string|number} keyName Key for connect
   */


  function setKeyName(keyName) {
    currentKey = keyName;
  }

  return {
    setKeyName: setKeyName,
    setComponent: setComponent,
    saveRegister: saveRegister,
    deleteRegister: deleteRegister
  };
}