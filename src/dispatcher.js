import { IsNotFunction, IsNotObject } from './utils/exceptions'
import Action from './action'
import { symActionLoading } from './utils/symbols'

/**
 * Dispatcher Class
 */
export default function Dispatcher () {
  // List of Dispatcher
  const lists = new Map()
  let listener = async () => {}

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

  Object.defineProperties(this, Public)

  /**
   * create actions
   * @param {object} actions A list object for create actions
   */
  this.init = (actions, options = {}) => {
    if (typeof actions !== 'object' || Array.isArray(actions)) throw IsNotObject('Dispatcher parameter')

    const stateActions = {}
    for (const key in actions) {
      let action
      if (options[key] === undefined) {
        action = new Action(key, actions[key])
      } else {
        action = new Action(key, actions[key], options[key])
      }
      // const stateActions = {}
      stateActions[key] = action[symActionLoading]

      lists.set(key, action)
    }

    for (const [key, action] of lists.entries()) {
      action.onListen = async (payload, header) => {
        await listener(payload, header, {
          ...stateActions,
          [key]: () => {}
        })
      }
    }
  }

  /**
   * Disable dispatch
   */
  this.disable = (...keys) => {
    for (const key of keys) {
      const dispatch = lists.get(key)
      if (dispatch === undefined) throw new Error(`Dispatch "${key}" not found`)
      dispatch.disable()
    }
  }

  /**
   * Enable dispatch
   */
  this.enable = (...keys) => {
    for (const key of keys) {
      const dispatch = lists.get(key)
      if (dispatch === undefined) throw new Error(`Dispatch "${key}" not found`)
      dispatch.disable()
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
