/**
 * @template T
 * @param {T} value
 */
function State (value) {
  let initValue = JSON.stringify(value)
  let valueState = value
  /**
   * @callback Listener
   * @param {T} nextValue
  */

  /** @type {Listener} */
  let callback = (nextValue) => {

  }
  /**
   * @param {Listener} listener
   */
  this.on = (listener) => {
    callback = listener
  }

  /** @returns {T} */
  this.get = () => {
    return valueState
  }

  /**
   * @param {any} val
   * @returns {T}
   */
  this.set = (val) => {
    callback(val)
    valueState = val
    return valueState
  }

  /**
   * @returns {boolean}
   */
  this.hasChange = () => {
    return initValue !== JSON.stringify(valueState)
  }

  /**
   * @param {object} data
   * @returns {T}
   */
  this.init = (data = null) => {
    if (data !== null) {
      initValue = JSON.stringify(data)
      valueState = data
      return valueState
    }
    const initValueParse = JSON.parse(initValue)
    valueState = initValueParse
    return valueState
  }
}

/**
 * @template K
 */
export default class States {
  /**
   * @private
   * @type {Map<string, State>}
   */
  states = new Map()

  /**
   * Conserva el dato initial del constructor
   * @readonly
   * @type {K}
   */
  data_initial = null

  /**
   *
   * @param {K} data_object
   */
  constructor (data_object) {
    this.data_initial = Object.freeze({ ...data_object })
    for (const key in data_object) {
      /**
       * Data state
       */
      const state = new State(data_object[key])
      this.states.set(key, state)
    }
  }

  /**
   * @returns {K}
   */
  get val () {
    /** @type {K} */
    // @ts-ignore
    const data_state = {}
    this.states.forEach((_state, key) => {
      data_state[key] = _state.get()
    })
    return data_state
  }

  /**
   * @param {K} values
   */
  set val (values) {
    for (const key in values) {
      if (this.states.has(key)) {
        const state = this.states.get(key)
        state.set(values[key])
      }
    }
  }

  /**
   * @returns {Object.<string, function(any):any>}
   */
  get method () {
    /**
     * @type {any}
     */
    const data_state = {}
    this.states.forEach((state, key) => {
      /**
       * @param {any=} val
       * @returns {any}
       */
      data_state[key] = function (val = undefined) {
        if (val !== undefined) {
          state.set(val)
        }
        return state.get()
      }
    })
    return data_state
  }

  /**
   * Verifica si hubo cambios, tambien se puede verificar por key
   * @param {string=} key
   * @returns {boolean}
   */
  hasChange = (key = null) => {
    if (key !== null) {
      if (!this.states.has(key)) return false
      return this.states.get(key).hasChange()
    }
    let changed = false
    this.states.forEach((_state, key) => {
      if (!changed) {
        changed = _state.hasChange()
      }
    })
    return changed
  }

  /**
   * Retorna solo los valores que tuvieron cambios
   * @returns {object}
   */
  whoDataChanges = () => {
    const data = {}
    this.states.forEach((_state, key) => {
      if (_state.hasChange()) {
        data[key] = _state.get()
      }
    })
    return data
  }

  /**
   * Actualiza valores
   * @param {object} data
   * @returns {K}
   */
  update (data) {
    for (const key in data) {
      if (this.states.has(key)) {
        const state = this.states.get(key)
        state.set(data[key])
      }
    }
    return this.val
  }

  /**
   * Inicializa el dato o reemplaza el dato inicial
   * @param {object} data Dato inicial
   */
  init (data = null) {
    this.states.forEach(state => {
      state.init()
    })

    if (data === null) return

    for (const key in data) {
      if (this.states.has(key)) {
        this.states.get(key).init(data[key])
      }
    }
  }
}
