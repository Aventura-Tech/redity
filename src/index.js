import localStores from './store'
import createConnect from './core/createConnect'
import renderManagement from './core/renderManagement'
import makeCapsule from './capsule/makeCapsule'
import toolsCapsule from './capsule/toolsCapsule'
import States from './store/states'

/**
 * @version 1.0.0-alpha.1
 * Redity library
 */
export default function Redity () {}

const { registersOfConnections, hideChildrens, templateChildrens } = localStores()
const { render } = renderManagement(registersOfConnections)
const { getCapsuleByKeyName, getProps, setProps, getPayload } = toolsCapsule(registersOfConnections, hideChildrens, templateChildrens)

/**
   * @param {string|number} keyName
   * @param {OptionConnect|function(object):OptionConnect=} optionControl
   */
function connect (keyName, optionControl) {
  const connection = createConnect(registersOfConnections, hideChildrens, templateChildrens)
  return connection(keyName, optionControl)
}

const { Capsule, createCapsule } = makeCapsule(registersOfConnections, connect)

Redity.connect = connect
Redity.render = render
Redity.getProps = getProps
Redity.Capsule = Capsule
Redity.createCapsule = createCapsule
Redity.getCapsuleByKeyName = getCapsuleByKeyName
Redity.getPayload = getPayload
Redity.setProps = setProps
Redity.States = States

export {
  connect,
  render,
  getProps,
  Capsule,
  createCapsule,
  getCapsuleByKeyName,
  getPayload,
  setProps,
  States
}
