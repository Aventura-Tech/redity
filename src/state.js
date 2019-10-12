import { symStateVal, symStateType, symStateOnChange, symStateCountChanges, symStateHistory } from './utils/symbols'

export default function (info, history = false) {
  // ====================================== //
  // Value of this State                    //
  // ====================================== //
  this[symStateVal] = info.val
  // ====================================== //
  // Type Value                             //
  // ====================================== //
  this[symStateType] = info.type
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
  this[symStateHistory] = []

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
    get: () => history ? this[symStateHistory] : false,
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
    if (payload === undefined) return this._value
    if (JSON.stringify(this[symStateVal]) === JSON.stringify(payload)) return this[symStateVal]

    // ====================================== //
    // Saving values in the history           //
    // ====================================== //
    if (history) {
      this[symStateHistory].push(this[symStateVal])
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

  // ====================================== //
  // Change the type of this state          //
  // ====================================== //
  this.changeType = type => {
    this._type = type
  }
}
