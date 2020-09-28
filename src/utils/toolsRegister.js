/**
 * creat connect for Component
 * @param {RegistersOfConnections} registersOfConnections
 * @param {HideChildrens} hideChildrens
 * @param {TemplateChildrens} templateChildrens
 */
export default function toolRegister (registersOfConnections, hideChildrens, templateChildrens) {
  let currentKey = null
  /** @type {function} */
  let CurrentComponent = null

  function HideComponent () {
    return null
  }

  /**
   * @param {function(object):void} forceRender
   * @param {object} props
   * @param {OptionConnect} optionConnect
   */
  function saveRegister (forceRender, props, optionConnect) {
    const hasTemplate = templateChildrens.has(currentKey)
    const hide = hideChildrens.has(currentKey)

    function getChildren () {
      let Component = CurrentComponent
      if (hasTemplate) {
        Component = templateChildrens.get(currentKey)
      }

      return hide ? HideComponent : Component
    }

    /** @type {DataToolsConnect} */
    const dataToolsRegister = {
      keyName: currentKey,
      render: forceRender,
      children: getChildren(),
      props,
      memory: false,
      waiting: false,
      payload: optionConnect.payload
    }

    registersOfConnections.set(currentKey, dataToolsRegister)

    return {
      Component: getChildren(),
      nextProps: props
    }
  }

  function deleteRegister () {
    registersOfConnections.delete(currentKey)
  }

  /**
   * @param {function} Component
   */
  function setComponent (Component) {
    CurrentComponent = Component
  }

  /**
   * Connect Component
   * @param {string|number} keyName Key for connect
   */
  function setKeyName (keyName) {
    currentKey = keyName
  }

  return {
    setKeyName,
    setComponent,
    saveRegister,
    deleteRegister
  }
}
