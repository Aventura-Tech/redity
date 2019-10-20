import { IsNotFunction, IsNotObject } from './utils/exceptions'

/**
 * Dispatcher Class
 */
export default function Dispatcher () {
  // ====================================== //
  // PRIVATE PROPERTY                       //
  // ====================================== //
  // List of Dispatcher
  const lists = new Map()
  let listener = async () => {}
  // ====================================== //
  // PUBLIC PROPERTY                        //
  // ====================================== //
  const Public = {
    onListen: {
      set: cb => {
        if (typeof cb !== 'function') throw IsNotFunction('On property')
        listener = cb
      },
      enumerable: true,
      configurable: false
    },
    size: {
      get: () => lists.size,
      enumerable: true,
      configurable: false
    }
  }

  // ====================================== //
  // CONSTRUCTOR                            //
  // ====================================== //
  Object.defineProperties(this, Public)

  // ====================================== //
  // METHODS PUBLICS                        //
  // ====================================== //
  /**
   * create actions
   * @param {object} actions A list object for create actions
   */
  this.init = actions => {
    if (typeof actions !== 'object' || Array.isArray(actions)) throw IsNotObject('Dispatcher parameter')

    for (const key in actions) {
      const stateActions = {}

      for (const _key in actions) {
        stateActions[_key] = false
      }
      /**
       * Generate a event for this action
       * @param {any} payload Data for change to event
       */
      const event = async payload => {
        // ====================================== //
        // If action is active, dont generate the //
        // event. Only if is inactive             //
        // ====================================== //
        if (stateActions[key]) return false
        // ====================================== //
        // Active event of current action         //
        // ====================================== //
        stateActions[key] = () => {}
        // ====================================== //
        // Header: Information of this actions    //
        // and method                             //
        // ====================================== //
        const header = Object.freeze({
          // key action
          key,
          // information the action defined in init
          description: actions[key],
          /**
           * Informate the event is finished
           */
          done: () => {
            stateActions[key] = false
          }
        })
        // ====================================== //
        // Generate Event onListen and waiting    //
        // ====================================== //
        await listener(payload, header, { ...stateActions })
        // ====================================== //
        // befere finished event                  //
        // ====================================== //
        stateActions[key] = false
        // ====================================== //
        // Informando que el evento se dió        //
        // ====================================== //
        return true
      }
      lists.set(key, event)
    }
  }
  /**
   * Return all the lists actions functional
   * @returns {object} Object of methods
   */
  this.toMethod = () => {
    const actionsToMethod = {}
    for (const [key, value] of lists.entries()) {
      actionsToMethod[key] = value
    }
    return actionsToMethod
  }
}
