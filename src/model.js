/* eslint-disable accessor-pairs */
import { symModelCreate, symSubscriberGenerate, symSubscriberInit } from './utils/symbols'
import Exceptions from './utils/exceptions'

import { PRIVATE } from './utils/mode'
import States from './states'
import Actions from './actions'
import BlockCode from './blockcode'
import Subscriber from './subscriber'

const { IsNotObject } = Exceptions

/**
 * Model Class
 * @param {string} key Key Primary
 */
export default function (key = null) {
  // ====================================== //
  // PRIVATE PROPERTY                       //
  // ====================================== //

  let config = {
    access: PRIVATE,
    dev: true
  }
  let listener = async () => {}
  let fail = async () => {}
  let initial = () => {}
  const states = new States()
  const actions = new Actions()
  const subcribes = new Map()

  // ====================================== //
  // PUBLIC PROPERTY                        //
  // ====================================== //
  Object.defineProperty(this, 'key', {
    value: key,
    enumerable: true,
    configurable: false,
    writable: false
  })
  // ====================================== //
  // Return list methods of states          //
  // ====================================== //
  Object.defineProperty(this, 'states', {
    get: () => states.toMethod(),
    enumerable: true,
    configurable: false
  })

  // ====================================== //
  // Return list methods of actions         //
  // ====================================== //
  Object.defineProperty(this, 'actions', {
    get: () => actions.toMethod(),
    enumerable: true,
    configurable: false
  })

  // ====================================== //
  // Initial data for the model             //
  // ====================================== //
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

  // ====================================== //
  // Captura el evento de las actiones      //
  // ejecutadas                             //
  // ====================================== //
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

  // ====================================== //
  // Captura los fails generadas en el      //
  // prop onListen                          //
  // ====================================== //
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
        states.init(data)
      },
      enumerable: true,
      configurable: false
    },
    actions: {
      set: data => {
        actions.init(data)
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
  // METHODS PRIVATE                        //
  // ====================================== //
  this[symModelCreate] = (development = true) => {
    const dev = development ? config.dev : false
    initial(initialProperties)

    // ====================================== //
    // Listen changes values of States        //
    // ====================================== //
    states.onListen = (key, payload) => {
      for (const subscribed of subcribes.entries()) {
        subscribed[1][symSubscriberGenerate](key, payload)
      }
    }

    // ====================================== //
    // Listen events by actions               //
    // ====================================== //
    actions.onListen = (payload, headerAction, actionsEvent) => {
      const components = {}
      for (const [key, subscribed] of subcribes.entries()) {
        components[key] = {
          props: subscribed.props,
          hide: () => {},
          unhide: () => {},
          replace: () => {}
        }
      }
      // ====================================== //
      // Struturing header for onListen and     //
      // onFail                                 //
      // ====================================== //
      const header = {
        key: this.key,
        actions: actions.toMethod(),
        payload,
        wait: () => {},
        proceed: () => {},
        event: headerAction.key,
        events: actionsEvent,
        models: {},
        history: [],
        components: Object.freeze(components),
        // ====================================== //
        // Creating new blockcode for debug and   //
        // for help in case errors of event       //
        // ====================================== //
        blockcode: new BlockCode(dev)
      }

      header.resolve = async (err) => {
        header.blockcode.catch(err)
        const res = await fail(err, header, states.toMethod())
        return res
      }
      Object.freeze(header)
      // ====================================== //
      // Stating blockcode for create blocks in //
      // the onListen of Model                  //
      // ====================================== //
      header.blockcode.start(`Action: ${headerAction.key}`, payload)
      return new Promise(resolve => {
        // ====================================== //
        // Execute event for onListen             //
        // ====================================== //
        listener(payload, header, states.toMethod()).then(async res => {
        // ====================================== //
        // If success then finished blockcode and //
        // also current action                    //
        // ====================================== //
          header.blockcode.end()
          resolve(true)
        // ====================================== //
        // If case the event if fail              //
        // ====================================== //
        }).catch(async err => {
          // ====================================== //
          // Catch current block                    //
          // ====================================== //
          header.blockcode.catch(err)
          // ====================================== //
          // Execute event for onFail and sending   //
          // information necesary                   //
          // ====================================== //
          await fail(err, header, states.toMethod())
          // ====================================== //
          // If success then finished blockcode and //
          // also current action                    //
          // ====================================== //
          header.blockcode.end()
          resolve(true)
        })
      })
    }
  }

  // ====================================== //
  // METHODS PUBLICS                        //
  // ====================================== //
  /**
   * Subcribes
   * @param {object} subscriber
   * @returns {number}
   */
  this.subscribe = subscriber => {
    if (!(subscriber instanceof Subscriber)) throw new Error('Require a instance of Subscriber')
    subscriber[symSubscriberInit](states.get())
    subcribes.set(subscriber.key, subscriber)
    return subscriber.key
  }

  this.deleteSubscribe = key => {
    subcribes.delete(key)
  }
}
