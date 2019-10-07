export default function (states = {}) {
  // ====================================== //
  // PRIVATE PROPERTIES                      //
  // ====================================== //
  this._registers = new Map()
  let _listener = false
  // const _changeType = Symbol('Private')

  // ====================================== //
  // PUBLIC PROPERTIES                      //
  // ====================================== //
  Object.defineProperty(this, 'size', {
    get: () => this._registers.size,
    enumerable: true
  })

  // eslint-disable-next-line accessor-pairs
  Object.defineProperty(this, 'onListen', {
    set: callback => {
      if (typeof callback !== 'function') throw new Error('onListen receive a Function')
      _listener = callback
    },
    enumerable: true,
    configurable: false
  })

  // =========================================================================== //
  // CONSTRUCTOR                                                                 //
  // =========================================================================== //
  // - Initial States
  // ====================================== //
  if (typeof states !== 'object' || Array.isArray(states)) throw new Error('States require a object')

  const State = function (info) {
    this._value = info.val
    this._type = info.type
    // Count Changes of this state
    this._countChanges = 0

    Object.defineProperties(this, {
      // value of this state
      val: {
        get: () => this._value,
        enumerable: true
      },
      // Type Property
      type: {
        get: () => this._type,
        enumerable: true
      },
      // Count changes of this state
      changes: {
        get: () => this._countChanges,
        enumerable: true
      }
    })

    /** Cambia el Dato del estado actual [es]
    * @param {any} payload New data for this state
    */
    this.change = (payload = undefined) => {
      if (payload === undefined) return this._value
      if (JSON.stringify(this._value) === JSON.stringify(payload)) return this._value

      if (_listener) _listener(info.key, payload)
      this._value = payload
      this._countChanges += 1
      return this._value
    }

    // [Private] Change the type of this state
    Object.defineProperty(this, '_changeType', {
      value: type => {
        this._type = type
      },
      enumerable: false
    })
  }

  for (const key in states) {
    const state = new State({
      key,
      val: states[key],
      type: null
    })
    this._registers.set(key, state)
  }

  // =========================================================================== //
  // PUBLIC METHODS                                                              //
  // =========================================================================== //
  /**
   * Get States
   * @returns {Object} All States Registered
   */
  this.get = () => {
    const statesRegistered = {}
    for (const [key, value] of this._registers.entries()) {
      statesRegistered[key] = value
    }
    return statesRegistered
  }

  /**
   * Return states in mode function
   * @return {Object} Methods
   */
  this.toMethod = () => {
    const methods = {}
    for (const [key, value] of this._registers.entries()) {
      methods[key] = value.change
    }
    return methods
  }
}
