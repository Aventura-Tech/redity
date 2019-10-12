import React from 'react'
import Redity from '../index'
import { symRedityGetModel } from '../utils/symbols'

import { RequireKeyModel, IsNotComponent, ModelNotFound } from '../utils/exceptions'
import Subscriber from '../subscriber'

/**
 * Connect a component with the model
 * @param {string} modelKey Key of Model
 * @param {object} mapStateToProps options
 * @param {function} mapActionToProps actions
 * @returns {funtion}
 */
export default function (modelKey, mapStateToProps = () => {}, mapActionToProps = () => {}) {
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
  if (!Model) throw ModelNotFound('connect')

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
    let subscriber
    // ====================================== //
    // States defined for user in MapState... //
    // ====================================== //
    let statesDefinedToProps = {}
    let keyConnect = false
    // ====================================== //
    // Wrapper component connected            //
    // ====================================== //
    return function (props) {
      // ====================================== //
      // Creting force render                   //
      // ====================================== //
      const [nextDefinedToProps] = React.useState(1)[1]

      // ====================================== //
      // Seting props for render                //
      // ====================================== //
      subscriber.setProps(props)

      // ====================================== //
      // Use effect for init subscriber         //
      // ====================================== //
      React.useEffect(() => {
        // ====================================== //
        // Creating subscriber for manage states  //
        // ====================================== //
        subscriber = new Subscriber(customizeKeyComponent, mapStateToProps)
        // ====================================== //
        // Sending subscriber to Model            //
        // ====================================== //
        keyConnect = Model.subscribe(subscriber)
        // ====================================== //
        // Getting states customize for user      //
        // ====================================== //
        statesDefinedToProps = subscriber.getStatesDefined()

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
        }
      }, [])

      // ====================================== //
      // Render                                 //
      // ====================================== //
      return (<Component {...actionsDefined} {...props} {...statesDefinedToProps} />)
    }
  }
}
