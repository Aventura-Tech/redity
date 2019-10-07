/* eslint-disable accessor-pairs */
import { symModelCreate } from './utils/symbols'
import Exceptions from './utils/exceptions'

import { PRIVATE } from './utils/mode'
import States from './states'
import Actions from './actions'

const { IsNotObject } = Exceptions

export default function () {
  // ====================================== //
  // PRIVATE PROPERTY                       //
  // ====================================== //

  let config = {
    mode: PRIVATE
  }
  let listener = false
  let fail = false
  let initial = false
  let states = false
  let actions = false
  const subcribes = new Map()
  // ====================================== //
  // PUBLIC PROPERTY                        //
  // ====================================== //

  Object.defineProperty(this, 'states', {
    get: () => {
      if (!states) return false
      return states.toMethod()
    },
    enumerable: true,
    configurable: false
  })

  Object.defineProperty(this, 'actions', {
    get: () => {
      if (!actions) return false
      return actions.get()
    },
    enumerable: true,
    configurable: false
  })

  Object.defineProperty(this, 'init', {
    /**
     * Initicial states, actions and configuration
     * @param {function} cb Callback
     */
    set: cb => {
      initial = cb
    },
    enumerable: true,
    configurable: false
  })

  Object.defineProperty(this, 'onListen', {
    /**
     * For the events of actions
     * @param {function} cb Callback
     */
    set: cb => {
      listener = cb
    },
    enumerable: true,
    configurable: false
  })

  Object.defineProperty(this, 'onFail', {
    /**
     * For the fails of the actions
     * @param {function} cb Callback
     */
    set: cb => {
      fail = cb
    },
    enumerable: true,
    configurable: false
  })

  // ====================================== //
  // CONSTRUCTOR                            //
  // ====================================== //
  const initialProperties = {}
  Object.defineProperties(initialProperties, {
    states: {
      set: data => {
        states = new States(data)
      },
      enumerable: true,
      configurable: false
    },
    actions: {
      set: data => {
        actions = new Actions(data)
      },
      enumerable: true,
      configurable: false
    },
    configurable: {
      set: data => {
        if (typeof data !== 'object' || Array.isArray(data)) throw IsNotObject('Init - Configurable')
        config = { ...config, ...data }
      },
      enumerable: true,
      configurable: false
    }
  })

  // ====================================== //
  // METHODS PUBLICS                        //
  // ====================================== //
  this[symModelCreate] = () => {
    if (!initial) throw new Error('Require a init')
    initial(
      initialProperties.states,
      initialProperties.actions,
      initialProperties.configurable
    )

    if (states) {
      states.onListen = () => {
        for (const subscribed of subcribes.entries()) {
          subscribed[1].callback()
        }
      }
    }

    if (actions && listener) {
      actions.onListen = () => {
        listener().catch(err => {
          fail(err)
        })
      }
    }
  }

  /**
   * Subcribes
   * @param {Array} listenStates
   * @param {function} callback
   * @returns {number}
   */
  this.subscribe = (listenStates, callback) => {
    const key = parseInt(Date.now() / 9000000) + subcribes.size
    subcribes.set(key, {
      key,
      listenStates,
      callback
    })
    return key
  }

  this.deleteSubscribe = key => {
    subcribes.delete(key)
  }
}
