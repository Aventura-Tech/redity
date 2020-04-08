import { symActionLoading, symActionListener, symActionResendEvent } from './utils/symbols'
import { IsNotFunction, IsNotObject } from './utils/exceptions'
import iftypeof from './utils/iftypeof'

/**
 * Action Class
 * @param {string} key Key Action
 * @param {string} defaultValue Value default
 * @param {object} options Options for Actions
 */
function Action (key, defaultValue, options = {}) {
  // ====================================== //
  // Types of Action                        //
  // ====================================== //
  this.types = Object.freeze({
    WAIT: 'wait',
    PASS: 'pass',
    THEN: 'then'
  })

  let disabled = false

  /**
   * Disabled action of dispatch
   */
  this.disable = () => {
    disabled = true
  }

  /**
   * Enabled action of dispatch
   */
  this.enable = () => {
    disabled = false
  }

  // ====================================== //
  // Key of Action                          //
  // ====================================== //
  this.key = key

  this.defaultValue = defaultValue

  if (typeof options !== 'object') throw IsNotObject('Action')
  this.options = {
    typeValue: 'any',
    type: this.types.WAIT,
    passError: false,
    warn: true,
    ...options
  }

  switch (this.options.type) {
    case this.types.WAIT:
    case this.types.PASS:
    case this.types.THEN:
      break

    default:

      // eslint-disable-next-line no-console
      console.warn(`this type action(${this.options.type}) is not recognized. There are only these types[${this.types.WAIT}, ${this.types.PASS}, ${this.types.THEN}]. Will be assigned by default "wait"`)
      this.options.type = this.types.WAIT
      break
  }

  this[symActionLoading] = false
  this[symActionListener] = () => {}
  Object.freeze(this.options)

  /**
 * Dispatch the data for onListen of Model
 * @param {any} payload Data
 * @param {function} onDone Avisa cuando la acción haya terminado
 */
  this.dispatch = async (payload = null) => {
    if (disabled) return false
    const _payload = payload !== null ? payload : this.defaultValue
    if (!iftypeof(
      _payload,
      this.options.typeValue,
      this.options.warn,
      `Action - ${this.key}:`
    )) {
      return false
    }

    if (this.options.type !== this.types.PASS) {
      if (this[symActionLoading]) {
        if (this.options.type === this.types.THEN) {
          this.memoryThen.push(_payload)
        }

        return false
      }
    }

    const header = Object.freeze({
      key: this.key,
      defaultValue: this.defaultValue,
      done: this.done.bind(this)
    })

    if (this.options.type !== this.types.PASS) this[symActionLoading] = true

    const data = await this[symActionListener](_payload, header)
    return data
  }
  this.dispatch.disable = this.disable
  this.dispatch.enable = this.enable

  this.disable = this.disable.bind(this)
  this.enable = this.enable.bind(this)
  this.dispatch.bind(this)
}

// ====================================== //
// Saving action                          //
// ====================================== //
Object.defineProperty(Action.prototype, 'memoryThen', {
  value: [],
  writable: false,
  configurable: false,
  enumerable: true
})

Action.prototype[symActionResendEvent] = async function () {
  const header = Object.freeze({
    key: this.key,
    defaultValue: this.defaultValue,
    done: this.done.bind(this)
  })
  const dataSaved = this.memoryThen[this.memoryThen.length - 1]
  this.memoryThen.length = 0
  const data = await this[symActionListener](dataSaved, header)
  this.done(data)
  return data
}

/**
 * Informa a la acción que ya se dió por terminado
 */
Action.prototype.done = function () {
  if (this.options.type === this.types.THEN && this.memoryThen.length > 0) {
    this[symActionResendEvent]()
    return
  }
  this[symActionLoading] = false
  this.memoryThen.length = 0
}

// eslint-disable-next-line accessor-pairs
Object.defineProperty(Action.prototype, 'onListen', {
  set: function (callback) {
    if (typeof callback !== 'function') throw IsNotFunction('onListen')
    // if (!Object.prototype.hasOwnProperty.call(callback, 'then')) {
    //   throw new Error('Requiere an async function')
    // }
    this[symActionListener] = callback
  },
  configurable: false,
  enumerable: true
})

export default Action
