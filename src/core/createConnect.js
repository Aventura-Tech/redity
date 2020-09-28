import React from 'react'
import useRender from '../hooks/useRender'
import toolRegister from '../utils/toolsRegister'
import optionControlConnectManagement from './optionControlConnectManagement'

/**
 * creat connect for Component
 * @param {RegistersOfConnections} registersOfConnections
 * @param {HideChildrens} hideChildrens
 * @param {TemplateChildrens} templateChildrens
 */
export default function createConnect (registersOfConnections, hideChildrens, templateChildrens) {
  const { saveRegister, deleteRegister, setComponent, setKeyName } = toolRegister(registersOfConnections, hideChildrens, templateChildrens)
  const { defaultOptionConnect, setOptionConnect, processOptionControlConnect } = optionControlConnectManagement()
  function WrappedComponent (props) {
    const optionControlConnect = processOptionControlConnect(props)
    const { propsHashed, forceRender } = useRender(optionControlConnect.props)
    let Component = null
    let nextProps = {}

    React.useEffect(() => {
      const dataRegister = saveRegister(forceRender, propsHashed, optionControlConnect)
      Component = dataRegister.Component
      nextProps = dataRegister.nextProps
      return deleteRegister
    }, [])

    const dataRegister = saveRegister(forceRender, propsHashed, optionControlConnect)
    Component = dataRegister.Component
    nextProps = dataRegister.nextProps
    return <Component {...nextProps} render={forceRender} />
  }

  /**
   * @param {function} Componet
   */
  function Wrapper (Componet) {
    setComponent(Componet)
    return WrappedComponent
  }

  /**
   * Connect Component
   * @param {string|number} keyName Key for connect
   * @param {OptionConnect|function(object):OptionConnect} optionControl
   */
  function connect (keyName, optionControl = defaultOptionConnect) {
    setOptionConnect(optionControl)
    setKeyName(keyName)
    return Wrapper
  }

  return connect
}
