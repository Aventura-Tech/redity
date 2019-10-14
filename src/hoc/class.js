import React from 'react'

import { RequireKeyModel, IsNotComponent, ModelNotFound } from '../utils/exceptions'
import { symRedityGetModel } from '../utils/symbols'
import Redity from '../index'
import Subscriber from '../subscriber'
import Template from './template'

/**
 * Connect a component with the model
 * @param {string} modelKey Key of Model
 * @param {function} mapStateToProps options
 * @param {function} mapActionToProps options
 * @returns {funtion}
 */
export default function connect (modelKey, mapStateToProps = false, mapActionToProps = () => {}) {
  // ====================================== //
  // If not string is fatal error           //
  // ====================================== //
  if (typeof modelKey !== 'string') throw RequireKeyModel('connect')

  // ====================================== //
  // Getting model by key                   //
  // ====================================== //
  const Model = Redity[symRedityGetModel](modelKey)
  // ====================================== //
  // If not found model is error            //
  // ====================================== //
  if (!Model) {
    // eslint-disable-next-line no-console
    console.error(ModelNotFound('connect'))
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

    // ====================================== //
    // Seting all actions defined in init to  //
    // mapStateToProps and getting the        //
    // actions defined                        //
    // ====================================== //
    const actionsDefined = mapActionToProps(Model.actions)

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
        subscriber = new Subscriber(customizeKeyComponent, mapStateToProps)
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
        return (<Component {...actionsDefined} {...statesDefinedToProps} {...this.props} />)
      }
    }
  }
}
