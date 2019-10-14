import React from 'react'
import Redity from '../index'
import { symRedityGetModel } from '../utils/symbols'
import Template from './template'

import { RequireKeyModel, IsNotComponent, ModelNotFound } from '../utils/exceptions'
import Subscriber from '../subscriber'

/**
 * Connect a component with the model
 * @param {string} modelKey Key of Model
 * @param {function} mapStateToProps options
 * @param {function} mapActionToProps actions
 * @returns {funtion}
 */
export default function (modelKey, mapStateToProps = false, mapActionToProps = () => {}) {
  // ====================================== //
  // If not string is fatal error           //
  // ====================================== //
  if (typeof modelKey !== 'string') throw RequireKeyModel('connect')

  // ====================================== //
  // Getting model by key                   //
  // ====================================== //
  const Model = Redity[symRedityGetModel](modelKey)
  // ====================================== //
  // If not found model fatal error         //
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
    // For subcriber                          //
    // ====================================== //
    let subscriber = false
    // ====================================== //
    // States defined for user in MapState... //
    // ====================================== //
    let statesDefinedToProps = {}
    // ====================================== //
    // Cuando se crea un subscribe se crea    //
    // una key para mas luego usar para       //
    // eliminar la subscripción despues de    //
    // destruir el componente.                //
    // ====================================== //
    let keyConnect = false
    // ====================================== //
    // For componentWillMount                 //
    // ====================================== //
    let started = false
    // ====================================== //
    // Wrapper component connected            //
    // ====================================== //
    return function Wrapper (props) {
      // ====================================== //
      // Simulate componentWillMout of Class    //
      // Component                              //
      // ====================================== //
      function componentWillMount () {
        // ====================================== //
        // Creating subscriber for manage states  //
        // ====================================== //
        subscriber = new Subscriber(customizeKeyComponent, mapStateToProps)
        // ====================================== //
        // Seting props for render                //
        // ====================================== //
        subscriber.setProps(props)
        // ====================================== //
        // Sending subscriber to Model            //
        // ====================================== //
        keyConnect = Model.subscribe(subscriber)
        // ====================================== //
        // Getting states customize for user      //
        // ====================================== //
        statesDefinedToProps = subscriber.getStatesDefined()
      }

      if (!started) {
        componentWillMount()
        started = true
      }

      // ====================================== //
      // Seting props for render                //
      // ====================================== //
      subscriber.setProps(props)
      // ====================================== //
      // Creting force render                   //
      // ====================================== //
      const nextDefinedToProps = React.useState(Date.now())[1]

      // ====================================== //
      // Use effect for subscriber              //
      // ====================================== //
      React.useEffect(() => {
        // ====================================== //
        // Listen changes of states               //
        // ====================================== //
        subscriber.onListen = states => {
          statesDefinedToProps = states
          // ====================================== //
          // Force Render                           //
          // ====================================== //
          nextDefinedToProps({ ...states })
        }
        return () => {
          Model.deleteSubscribe(keyConnect)
          started = false
        }
      }, [])

      // ====================================== //
      // Render                                 //
      // ====================================== //
      return (<Component {...actionsDefined} {...props} {...statesDefinedToProps} />)
    }
  }
}
