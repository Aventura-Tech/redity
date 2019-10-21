import { symActionKey, symActionLoading, symActionDescription, symActionListener, symActionResendEvent, symActionOnDone } from './utils/symbols'
import { IsNotFunction, IsNotObject } from './utils/exceptions'
import iftypeof from './utils/iftypeof'

/**
 * Action Class
 * @param {string} key Key Action
 * @param {string} description Description for the action
 * @param {object} options Options for Actions
 */
function Action (key, description, options = {
  payload: 'any',
  type: 'wait',
  passError: false,
  warn: true
}) {
  // ====================================== //
  // Types of Action                        //
  // ====================================== //
  this.types = Object.freeze({
    WAIT: 'wait',
    PASS: 'pass',
    THEN: 'then'
  })

  // ====================================== //
  // Key of Action                          //
  // ====================================== //
  this[symActionKey] = key

  this[symActionDescription] = description

  if (typeof options !== 'object') throw IsNotObject('Action')
  this.options = {
    payload: 'any',
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
  this[symActionOnDone] = () => {}
  Object.freeze(this.options)

  /**
 * Dispatch the data for onListen of Model
 * @param {any} payload Data
 * @param {function} onDone Avisa cuando la acción haya terminado
 */
  this.dispatch = (payload, onDone = false) => {
    if (typeof onDone === 'function') this[symActionOnDone] = onDone
    if (!iftypeof(payload, this.options.payload, this.options.warn)) {
      return false
    }

    if (this.options.type !== this.types.PASS) {
      if (this[symActionLoading]) {
        if (this.options.type === this.types.THEN) {
          this.memoryThen.push(payload)
        }

        return false
      }
    }

    const header = Object.freeze({
      key: this[symActionKey],
      description: this[symActionDescription],
      done: this.done.bind(this)
    })

    if (this.options.type !== this.types.PASS) this[symActionLoading] = true
    this[symActionListener](payload, header)

    return true
  }
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

Action.prototype[symActionResendEvent] = function () {
  const header = Object.freeze({
    key: this[symActionKey],
    description: this[symActionDescription],
    done: this.done.bind(this)
  })

  this[symActionListener](this.memoryThen[this.memoryThen.length - 1], header)
  this.memoryThen.length = 0
}

/**
 * Informa a la acción que ya se dió por terminado
 */
Action.prototype.done = function () {
  this[symActionOnDone](true)
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
