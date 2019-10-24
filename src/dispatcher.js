import { IsNotFunction, IsNotObject } from './utils/exceptions'
import Action from './action'
import { symActionLoading } from './utils/symbols'

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
  this.init = (actions, options) => {
    if (typeof actions !== 'object' || Array.isArray(actions)) throw IsNotObject('Dispatcher parameter')

    const stateActions = {}
    for (const key in actions) {
      const action = new Action(key, actions[key])
      // const stateActions = {}
      stateActions[key] = action[symActionLoading]

      lists.set(key, action)
    }

    for (const [key, action] of lists.entries()) {
      action.onListen = (payload, header) => {
        stateActions[key] = () => {}
        listener(payload, header, stateActions)
      }
    }
  }

  /**
   * Return a action
   * @param {string} key action key
   */
  this.get = key => {
    const action = lists.get(key)
    return action || false
  }

  /**
   * Return all the actions functional lists
   * @returns {object} Object of methods
   */
  this.toMethod = () => {
    const actionsToMethod = {}
    for (const [key, action] of lists.entries()) {
      actionsToMethod[key] = action.dispatch
    }
    return actionsToMethod
  }
}
