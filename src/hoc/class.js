import React from 'react'

import Redity from '../index'
import { RequireKeyModel, IsNotComponent, ModelNotFound } from '../utils/exceptions'
import Subscriber from '../subscriber'
import Template from './template'
import connectFaker from './connectFaker'

/**
 * Connect a component with the model
 * @param {string} keyModel Key of Model
 * @param {function} mapStateToProps options
 * @param {function} mapDispatchToProps options
 * @returns {funtion}
 */
export default function connect (keyModel, mapStateToProps = false, mapDispatchToProps = () => {}) {
  // ====================================== //
  // If not string is fatal error           //
  // ====================================== //
  if (typeof keyModel !== 'string') {
    if (keyModel !== false) {
      throw RequireKeyModel('connect')
    }
  }

  if (keyModel === false) return connectFaker(keyModel, mapStateToProps, mapDispatchToProps)

  // ====================================== //
  // Getting model by key                   //
  // ====================================== //
  const Model = Redity.model.get(keyModel)
  // ====================================== //
  // If not found model is error            //
  // ====================================== //
  if (!Model) {
    // eslint-disable-next-line no-console
    console.error(ModelNotFound(`connect "${keyModel}"`))
    return () => Template('error connect: Model not found in the register', 'error')
  }

  // ====================================== //
  // Next function for component and his    //
  // key (optional)                         //
  // ====================================== //
  return (Component, customizeKeyComponent = false) => {
    // ====================================== //
    // If not component or null               //
    // ====================================== //
    if (!Component) throw IsNotComponent('connect')

    if (!Component) throw IsNotComponent('connect')
    const globalDispatch = {}
    const allModels = Redity.model.all()
    for (const key in allModels) {
      if (key === keyModel) continue
      if (allModels[key].config.publicDispatchers) {
        globalDispatch[key] = allModels[key].dispatchers
      }
    }
    // ====================================== //
    // Seting all dispatcher defined in init  //
    // to mapStateToProps and getting the     //
    // dispatchers defined                    //
    // ====================================== //
    const dispatchersDefined = mapDispatchToProps(Model.dispatchers, globalDispatch)

    // ====================================== //
    // declared Subcriber, and his key        //
    // ====================================== //
    let subscriber, keyConnect
    // ====================================== //
    // States customized                      //
    // ====================================== //
    let statesDefinedToProps
    // ====================================== //
    // Wrapper component connected            //
    // ====================================== //
    return class Wrapper extends React.Component {
      constructor (props) {
        super(props)
        // ====================================== //
        // Creating subscriber for manage states  //
        // ====================================== //
        subscriber = new Subscriber(customizeKeyComponent, mapStateToProps, keyModel)
        // ====================================== //
        // Seting props for render                //
        // ====================================== //
        subscriber.setProps(this.props)
        // ====================================== //
        // Sending subscriber to Model            //
        // ====================================== //
        keyConnect = Model.subscribe(subscriber)
        // ====================================== //
        // Getting states customize for user      //
        // ====================================== //
        statesDefinedToProps = subscriber.getStatesDefined()
      }

      componentWillMount () {
        // ====================================== //
        // Listen changes of states               //
        // ====================================== //
        subscriber.onListen = states => {
          statesDefinedToProps = states
          // ====================================== //
          // Force Render                           //
          // ====================================== //
          this.forceUpdate()
        }
      }

      componentWillUnmount () {
        // ====================================== //
        // If component destroy, deleting         //
        // subscriber                             //
        // ====================================== //
        Model.deleteSubscribe(keyConnect)
      }

      render () {
        // ====================================== //
        // Seting props for render                //
        // ====================================== //
        subscriber.setProps(this.props)
        // ====================================== //
        // Render                                 //
        // ====================================== //
        return (<Component {...statesDefinedToProps} {...dispatchersDefined} {...this.props} />)
      }
    }
  }
}
