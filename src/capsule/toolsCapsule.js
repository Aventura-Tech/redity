import CapsuleElement from './capsuleElement'

/**
 * get tools for capsule
 * @param {RegistersOfConnections} registersOfConnections
 * @param {HideChildrens} hideChildrens
 * @param {TemplateChildrens} templateChildrens
 */
export default function toolsCapsule (registersOfConnections, hideChildrens, templateChildrens) {
  /**
   * @param {string} keyName
   * @returns {CapsuleElement | null}
   */
  function getCapsuleByKeyName (keyName) {
    if (!registersOfConnections.has(keyName)) {
      return null
    }
    return new CapsuleElement(registersOfConnections.get(keyName), hideChildrens, templateChildrens)
  }

  /**
   * get current props of connection
   * @param {string} keyName
   */
  function getProps (keyName) {
    if (!registersOfConnections.has(keyName)) return {}
    const connection = registersOfConnections.get(keyName)
    const { _hash, ...props } = connection.props
    return Object.freeze(props)
  }

  /**
   * @param {string|number} keyName
   * @param {object} props
   */
  function setProps (keyName, props) {
    if (!registersOfConnections.has(keyName)) return false
    const connection = registersOfConnections.get(keyName)
    connection.props = { ...connection.props, ...props }
    return true
  }

  /**
   * get current props of connection
   * @param {string} keyName
   */
  function getPayload (keyName) {
    if (!registersOfConnections.has(keyName)) return {}
    const connection = registersOfConnections.get(keyName)
    return Object.freeze({ ...connection.payload })
  }

  /**
   * @param {string|number} keyName
   */
  function executeRender (keyName) {
    if (registersOfConnections.has(keyName)) {
      const connection = registersOfConnections.get(keyName)
      connection.render(connection.props)
    }
  }

  /**
   * Reemplaza el children de Capsule o connect
   * @param {string|number} keyName
   * @param {function(object):import('react').ReactElement} TemplateComponent React Component
   * @param {boolean=} render
   */
  function setTemplate (keyName, TemplateComponent, render = false) {
    templateChildrens.set(keyName, TemplateComponent)
    if (render) executeRender(keyName)
  }

  /**
   * Remueve el template que tenga asignada
   * @param {string|number} keyName
   * @param {boolean=} render
   * @returns {boolean}
   */
  function removeTemplate (keyName, render) {
    const result = templateChildrens.delete(keyName)
    if (render) executeRender(keyName)
    return result
  }

  return {
    getCapsuleByKeyName,
    getProps,
    getPayload,
    setTemplate,
    removeTemplate,
    setProps
  }
}
