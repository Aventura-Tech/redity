import Exception from './utils/exceptions'

/**
 * Actions Class
 * @param {object} actions A list object for create actions
 */
export default function (actions) {
  // ====================================== //
  // PRIVATE PROPERTY                       //
  // ====================================== //
  // List of Actions
  const lists = new Map()
  let listener = false
  // ====================================== //
  // PUBLIC PROPERTY                        //
  // ====================================== //
  const Public = {
    onListen: {
      set: cb => {
        if (typeof cb !== 'function') throw Exception.IsNotFunction('On property')
        listener = cb
      },
      enumerable: true,
      configurable: false
    },
    size: {
      get: () => lists.size,
      enumerable: true,
      configurable: false
    }
  }

  // ====================================== //
  // CONSTRUCTOR                            //
  // ====================================== //
  Object.defineProperties(this, Public)

  if (typeof actions !== 'object' || Array.isArray(actions)) throw Exception.IsNotObject('Actions parameter')

  for (const key in actions) {
    lists.set(key, payload => {
      if (listener) {
        const data = Object.freeze({
          key,
          description: actions[key]
        })
        listener(payload, data)
      }
    })
  }

  // ====================================== //
  // METHODS PUBLICS                        //
  // ====================================== //
  /**
   * Return all the lists actions functional
   * @returns {object}
   */
  this.get = () => {
    const actionsToMethod = {}
    for (const [key, value] of lists.entries()) {
      actionsToMethod[key] = value
    }
    return actionsToMethod
  }
}
