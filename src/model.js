/* eslint-disable accessor-pairs */
import { symModelCreate, symSubscriberGenerate, symSubscriberInit } from './utils/symbols'
import Exceptions from './utils/exceptions'

import { PRIVATE } from './utils/access'
import States from './states'
import Dispatcher from './dispatcher'
import BlockCode from './blockcode'
import Subscriber from './subscriber'
import Redity from './index'

const { IsNotObject } = Exceptions

/**
 * Model Class
 * @param {string} key Key Primary
 */
export default function (key = null) {
  const config = {
    access: PRIVATE,
    dev: true
  }
  let listener = async () => {}
  let fail = async () => {}
  let initial = () => {}
  const states = new States()
  const dispatcher = new Dispatcher()
  const subcribes = new Map()

  Object.defineProperty(this, 'access', {
    get: () => config.access,
    set: value => {
      config.access = value
    },
    configurable: false,
    enumerable: true
  })

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

  /** Return all values states
   * @returns {object}
   */
  this.statesValues = () => states.values()

  // ====================================== //
  // Return list methods of dispatcher         //
  // ====================================== //
  Object.defineProperty(this, 'dispatchers', {
    get: () => dispatcher.toMethod(),
    enumerable: true,
    configurable: false
  })

  // ====================================== //
  // Initial data for the model             //
  // ====================================== //
  Object.defineProperty(this, 'init', {
    /**
     * Initicial states, dispatcher and configuration
     * @param {function} cb Callback
     */
    set: cb => {
      initial = cb
    },
    enumerable: true,
    configurable: false
  })

  // ====================================== //
  // Captura el dispatcher                  //
  // ejecutadas                             //
  // ====================================== //
  Object.defineProperty(this, 'onListen', {
    /**
     * For the events of dispatcher
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
     * For the fails of the dispatcher
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
  this.capsule = []

  const init = {
    states: {},
    dispatchers: {}
  }

  const settings = {
    states: {},
    dispatchers: {},
    dev: true,
    access: PRIVATE
  }

  const prepare = () => {
    if (typeof init.states !== 'object' || Array.isArray(init.states)) throw IsNotObject('initial')
    if (typeof settings.states !== 'object' || Array.isArray(settings.states)) throw IsNotObject('initial')
    if (typeof init.dispatchers !== 'object' || Array.isArray(init.dispatchers)) throw IsNotObject('initial')
    if (typeof settings.dispatchers !== 'object' || Array.isArray(settings.dispatchers)) throw IsNotObject('initial')
    states.init(init.states, settings.states)
    dispatcher.init(init.dispatchers, settings.dispatchers)
    config.dev = settings.dev
    config.access = settings.access
  }

  // ====================================== //
  // METHODS PRIVATE                        //
  // ====================================== //
  this[symModelCreate] = (development = true) => {
    initial(init, settings)
    prepare()
    const dev = development ? config.dev : false
    // ====================================== //
    // Listen changes values of States        //
    // ====================================== //
    states.onListen = (key, payload) => {
      for (const subscribed of subcribes.entries()) {
        subscribed[1][symSubscriberGenerate](key, payload, states.values())
      }
    }

    // ====================================== //
    // Listen events by dispatcher               //
    // ====================================== //
    dispatcher.onListen = async (payload, headerDispatcher, actions) => {
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
      // Structuring header for onListen and    //
      // onFail                                 //
      // ====================================== //
      const header = {
        key: this.key,
        dispatchers: dispatcher.toMethod(),
        payload,
        action: headerDispatcher.key,
        actions,
        models: {
          ...Redity.model.public(this.key),
          ...Redity.model.protected(this.key)
        },
        history: {},
        components: Object.freeze(components),
        // ====================================== //
        // Creating new blockcode for debug and   //
        // for help in case errors of dispatch    //
        // ====================================== //
        blockcode: new BlockCode(dev)
      }

      header.resolve = async (err) => {
        header.blockcode.catch(err)
        const res = await fail(err, states.toMethod(), header)
        return res
      }
      Object.freeze(header)
      // ====================================== //
      // Stating blockcode for create blocks in //
      // the onListen of Model                  //
      // ====================================== //
      header.blockcode.start(`Dispatch: ${headerDispatcher.key}`, payload)
      return new Promise(resolve => {
        // ====================================== //
        // Execute event for onListen             //
        // ====================================== //
        listener(payload, states.toMethod(), header).then(async res => {
        // ====================================== //
        // If success then finished blockcode and //
        // also current action                    //
        // ====================================== //
          header.blockcode.end()
          headerDispatcher.done()
          resolve(res)
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
          await fail(err, states.toMethod(), header)
          // ====================================== //
          // If success then finished blockcode and //
          // also current action                    //
          // ====================================== //
          header.blockcode.end()
          headerDispatcher.done()
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
    subscriber[symSubscriberInit](states.values())
    subcribes.set(subscriber.key, subscriber)
    return subscriber.key
  }

  this.deleteSubscribe = key => {
    subcribes.delete(key)
  }
}
