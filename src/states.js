import State from './_state'
import { symStatesRegisters, symStatesListener } from './utils/symbols'

function States () {
  // ====================================== //
  // [PRIVATE] List of states               //
  // ====================================== //
  this[symStatesRegisters] = new Map()
  // ====================================== //
  // [Private] Listener of Changes values   //
  // states                                 //
  // ====================================== //
  this[symStatesListener] = () => {}
}

// ====================================== //
// - Initial States                       //
// ====================================== //
States.prototype.init = function (states, options = {}) {
  if (typeof states !== 'object' || Array.isArray(states)) throw new Error('States require a object')

  for (const key in states) {
    const state = new State({
      typeValue: 'any',
      history: false,
      deep: 2,
      warn: true,
      ...options[key],
      key,
      val: states[key]
    })
    // ====================================== //
    // Listen any change og current state     //
    // ====================================== //
    state.onChange = payload => {
      // ====================================== //
      // Execute event onListen                 //
      // ====================================== //
      this[symStatesListener](key, payload)
    }
    // ====================================== //
    // Register state in the list Map         //
    // ====================================== //
    this[symStatesRegisters].set(key, state)
  }
}

// ====================================== //
// Returna la cantidad de estados creados //
// ====================================== //
Object.defineProperty(States.prototype, 'size', {
  get: function () {
    return this[symStatesRegisters].size
  },
  enumerable: true,
  configurable: false
})

// ====================================== //
// Setea un callback para el evento       //
// ====================================== //
// eslint-disable-next-line accessor-pairs
Object.defineProperty(States.prototype, 'onListen', {
  set: function (callback) {
    if (typeof callback !== 'function') throw new Error('onListen receive a Function')
    this[symStatesListener] = callback
  },
  enumerable: true,
  configurable: false
})

// ===================================== //
// PUBLIC METHODS                        //
// ===================================== //
/** Get Values States
* @returns {Object} All States Registered, only values
*/
States.prototype.values = function () {
  const statesValues = {}
  for (const [key, state] of this[symStatesRegisters].entries()) {
    statesValues[key] = state.val
  }
  return statesValues
}

/** Get States
* @returns {Object} All States Registered
*/
States.prototype.get = function () {
  const statesRegistered = {}
  for (const [key, state] of this[symStatesRegisters].entries()) {
    statesRegistered[key] = state
  }
  return statesRegistered
}

/**
* Return states in mode function
* @return {Object} Methods
*/
States.prototype.toMethod = function () {
  const methods = {}
  for (const [key, state] of this[symStatesRegisters].entries()) {
    methods[key] = state.change
  }
  return methods
}

export default States
