/* eslint-disable accessor-pairs */
import { symModelCreate, symSubscriberGenerate, symSubscriberInit } from './utils/symbols'
import Exceptions from './utils/exceptions'

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
export default function (key) {
  this.key = key
  this.config = {
    dev: true,
    publicStates: false,
    publicDispatchers: false
  }

  let listener = async () => {}
  let fail = async () => {}
  let initial = () => {}
  const states = new States()
  const dispatcher = new Dispatcher()
  const subscribes = new Map()

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
    publicStates: false,
    publicDispatchers: false
  }

  const prepare = () => {
    if (typeof init.states !== 'object' || Array.isArray(init.states)) throw IsNotObject('initial')
    if (typeof settings.states !== 'object' || Array.isArray(settings.states)) throw IsNotObject('initial')
    if (typeof init.dispatchers !== 'object' || Array.isArray(init.dispatchers)) throw IsNotObject('initial')
    if (typeof settings.dispatchers !== 'object' || Array.isArray(settings.dispatchers)) throw IsNotObject('initial')
    states.init(init.states, settings.states)
    dispatcher.init(init.dispatchers, settings.dispatchers)
    this.config = { ...settings }
  }

  this[symModelCreate] = (development = true) => {
    initial(init, settings)
    prepare()
    const dev = development ? this.config.dev : false
    // ====================================== //
    // Listen changes values of States        //
    // ====================================== //
    states.onListen = (key, payload) => {
      for (const subscribed of subscribes.entries()) {
        subscribed[1][symSubscriberGenerate](key, payload, states.values(), states.toMethod())
      }
    }

    // ====================================== //
    // Listen events by dispatcher            //
    // ====================================== //
    dispatcher.onListen = async (payload, headerDispatcher, actions) => {
      const components = {}
      for (const [key, subscribed] of subscribes.entries()) {
        components[key] = {
          props: subscribed.props,
          hide: () => {},
          unhide: () => {},
          replace: () => {}
        }
      }

      const allModels = Redity.model.all(this.key)
      const models = {}
      for (const key in allModels) {
        models[key] = {}
        if (allModels[key].config.publicStates) {
          models[key].states = allModels[key].states
        }
        if (allModels[key].config.publicDispatchers) {
          models[key].dispatchers = allModels[key].dispatchers
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
        models,
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
          const resErr = await fail(err, states.toMethod(), header)
          // ====================================== //
          // If success then finished blockcode and //
          // also current action                    //
          // ====================================== //
          header.blockcode.end()
          headerDispatcher.done()
          resolve(resErr)
        })
      })
    }

    for (const keyDispatch in settings.dispatchers) {
      if (settings.dispatchers[keyDispatch].now) {
        const action = dispatcher.get(keyDispatch)
        action.dispatch(action.defaultValue)
      }
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
    subscriber[symSubscriberInit](states.values(), states.toMethod())
    subscribes.set(subscriber.key, subscriber)
    return subscriber.key
  }

  this.deleteSubscribe = key => {
    subscribes.delete(key)
  }

  this.disableDispatch = dispatcher.disable
  this.enableDispatch = dispatcher.enable
}
