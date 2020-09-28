/**
 * create render
 * @param {RegistersOfConnections} registersOfConnections
 */
export default function renderManagement (registersOfConnections) {
  function defaultControlRender () {
    return true
  }

  /**
   * Realiza un render al componente connectado o encapsulado por su keyName. Si no encuentra la conexion o no está renderizado en la vista, retornará un false.
   * @param {string|number} keyName keyName for render
   * @param {object=} nextProps
   * @param {function(object):boolean=} controlRender Controla el render por una condición
   * @returns {boolean}
   */
  function render (keyName, nextProps = {}, controlRender = defaultControlRender) {
    if (!registersOfConnections.has(keyName)) return false
    const connection = registersOfConnections.get(keyName)

    const willRender = controlRender(Object.freeze({ ...connection.props }))
    if (!willRender) return false
    connection.render({ ...connection.props, ...nextProps })
    return true
  }

  /**
   * get current props of connection
   * @param {string|number} keyName
   */
  function getProps (keyName) {
    if (!registersOfConnections.has(keyName)) return {}
    const connection = registersOfConnections.get(keyName)
    return Object.freeze({ ...connection.props })
  }

  return {
    render,
    getProps
  }
}
