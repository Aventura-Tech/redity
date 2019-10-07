/* eslint-disable no-console */
import { symLogBody, symLogType, symLogManufacture, symLogVerify } from './symbols'

const Log = {
  [symLogBody]: {
    label: null,
    message: '',
    data: undefined
  },

  [symLogType]: 'log',
  // =========================================================================== //
  // Prepare and show in console styled                                          //
  // =========================================================================== //
  [symLogManufacture]: function (style) {
    const { label, message, data } = Log[symLogBody]
    let log = console.log

    switch (Log[symLogType]) {
      case 'warn':
        log = console.warn
        break
      case 'error':
        log = console.error
        break
    }

    console.groupCollapsed(`%c${label}`, style, message)
    if (Array.isArray(data)) {
      data.map((d, i) => {
        log(`${i}:`, d)
      })
    } else if (typeof data === 'object') {
      for (const key in data) {
        log(`${key}:`, data[key])
      }
    } else {
      log(data)
    }
    console.groupEnd()
  },

  [symLogVerify]: function (body) {
    if (body === null) return false
    if (Array.isArray(body)) return false
    if (typeof body !== 'object') return false
    return true
  },

  /**
   * Show a log
   * @param {object} body Data for log
   */
  norm: function (body) {
    if (!Log[symLogVerify](body)) throw new Error('Require a Object')
    Log[symLogBody] = { ...Log[symLogBody], ...body }
    Log[symLogManufacture]('background-color: steelblue; color: white;  padding: 2px 5px')
  },
  /**
   * Show a log styled in color steelblue
   * @param {object} body Data for log
   */
  info: function (body) {
    if (!Log[symLogVerify](body)) throw new Error('Require a Object')
    Log[symLogType] = 'info'
    Log[symLogBody] = { ...Log[symLogBody], ...body }
    Log[symLogManufacture]('padding: 2px 5px')
  },

  /**
   * Show a warn styled in color orange
   * @param {object} body Data for log
   */
  warn: function (body) {
    if (!Log[symLogVerify](body)) throw new Error('Require a Object')
    Log[symLogType] = 'warn'
    Log[symLogBody] = { ...Log[symLogBody], ...body }
    Log[symLogManufacture]('background-color: orange; color: black;  padding: 2px 5px')
  },

  /**
   * Show a error styled in color red
   * @param {object} body Data for log
   */
  error: function (body) {
    if (!Log[symLogVerify](body)) throw new Error('Require a Object')
    Log[symLogType] = 'error'
    Log[symLogBody] = { ...Log[symLogBody], ...body }
    Log[symLogManufacture]('background-color: red; color: black; padding: 2px 5px')
  }
}

export default Log
