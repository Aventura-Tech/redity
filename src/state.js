import { symStateVal, symStateType, symStateOnChange, symStateCountChanges, symStateHistories, symStateHistory, symStateDeep } from './utils/symbols'
import iftypeof from './utils/iftypeof'

export default function State (info) {
  this.key = info.key
  this.warn = info.warn ? true : info.warn
  // ====================================== //
  // Value of this State                    //
  // ====================================== //
  const reserveValue = JSON.stringify(info.val)
  this[symStateVal] = info.val
  // ====================================== //
  // Saving history of this           state //
  // ====================================== //
  this[symStateHistory] = info.history ? info.history : false
  // ====================================== //
  // Quantity max history                   //
  // ====================================== //
  this[symStateDeep] = info.deep ? info.deep : 2
  // ====================================== //
  // Type Value                             //
  // ====================================== //
  this[symStateType] = info.typeValue ? info.typeValue : 'any'
  // ====================================== //
  // Execute when exist a change in value   //
  // ====================================== //
  this[symStateOnChange] = () => {}
  // ====================================== //
  // Cuenta la cantidad de cambios que tuvo //
  // el valor del estado.                   //
  // ====================================== //
  this[symStateCountChanges] = 0
  // ====================================== //
  // Guarda un historial del estado         //
  // ====================================== //
  this[symStateHistories] = []
  // ====================================== //
  // Guarda el valor anterior               //
  // ====================================== //
  let valueBefore

  iftypeof(this[symStateVal], this[symStateType], this.warn, `State - ${this.key}: `)

  Object.defineProperty(this, 'val', {
    get: () => this[symStateVal],
    enumerable: true,
    configurable: false
  })

  // ====================================== //
  // Return the type state                  //
  // ====================================== //
  Object.defineProperty(this, 'type', {
    get: () => this[symStateType],
    enumerable: true,
    configurable: false
  })

  // ====================================== //
  // Return history of state                //
  // ====================================== //
  Object.defineProperty(this, 'history', {
    get: () => this[symStateHistories],
    enumerable: true,
    configurable: false
  })

  // ====================================== //
  // Count changes of this state            //
  // ====================================== //
  Object.defineProperty(this, 'changes', {
    get: () => this[symStateCountChanges],
    enumerable: true,
    configurable: false
  })

  // eslint-disable-next-line accessor-pairs
  Object.defineProperty(this, 'onChange', {
    set: callback => {
      this[symStateOnChange] = callback
    },
    enumerable: true,
    configurable: false
  })

  /**
   * Cambia el valor del estado actual [es] y genera un evento onChange
   * @param {any} payload New data for this state
   */
  this.change = (payload = undefined) => {
    if (payload === undefined) return this[symStateVal]
    if (!iftypeof(
      payload,
      this[symStateType],
      this.warn,
      `State - ${this.key}: `
    )) return this[symStateVal]

    if (JSON.stringify(this[symStateVal]) === JSON.stringify(payload)) return this[symStateVal]

    valueBefore = this[symStateVal]
    // ====================================== //
    // Saving values in the history           //
    // ====================================== //
    if (this[symStateHistory]) {
      this[symStateHistories].push(this[symStateVal])
      if (this[symStateHistories].length > this[symStateDeep]) {
        this[symStateHistories].splice(0, 1)
      }
    }
    // ====================================== //
    // Generate Event onChange                //
    // ====================================== //
    this[symStateOnChange](payload)
    // ====================================== //
    // Set new value, count and return        //
    // current value                          //
    // ====================================== //
    this[symStateVal] = payload
    this[symStateCountChanges] += 1
    return this[symStateVal]
  }

  /**
   * Return to init value
   */
  this.change.init = () => {
    const initValue = JSON.parse(reserveValue)
    this.change(initValue)
  }

  this.change.value = () => {
    const payload = this[symStateVal]
    if (typeof payload === 'object' && !Array.isArray(payload)) {
      return { ...payload }
    }
    if (Array.isArray(payload)) {
      return [...payload]
    }
    return this[symStateVal]
  }

  this.change.past = () => {
    const length = this[symStateHistories].length
    if (length > 0) {
      const lastPayload = this[symStateHistories][length - 1]
      // ====================================== //
      // Generate Event onChange                //
      // ====================================== //
      this[symStateOnChange](lastPayload)
      // ====================================== //
      // Set new value, count and return        //
      // current value                          //
      // ====================================== //
      this[symStateVal] = lastPayload
      this[symStateCountChanges] += 1
      this[symStateHistories].pop()
      return true
    }
    return false
  }

  /**
   * Change value unseen
   */
  this.change.unseen = payload => {
    if (payload === undefined) return this[symStateVal]

    if (!iftypeof(
      payload,
      this[symStateType],
      this.warn,
      `State - ${this.key}: `)
    ) return false

    if (JSON.stringify(this[symStateVal]) === JSON.stringify(payload)) return false

    // ====================================== //
    // Saving values in the history           //
    // ====================================== //
    if (this[symStateHistory]) {
      this[symStateHistories].push(this[symStateVal])
    }
    // ====================================== //
    // Set new value, count and return        //
    // current value                          //
    // ====================================== //
    this[symStateVal] = payload
    this[symStateCountChanges] += 1
    return true
  }

  this.change.initUnseen = () => {
    const initValue = JSON.parse(reserveValue)
    this.change.unseen(initValue)
  }

  this.change.before = () => {
    return valueBefore
  }

  // ====================================== //
  // Change the type of this state          //
  // ====================================== //
  this.changeType = type => {
    this._type = type
  }
}
