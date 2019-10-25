import Log from './utils/log'
import { symBCSetBlock, symBCLogBlock } from './utils/symbols'

/**
 * BlockCode Class
 * @param {boolean} dev Mode Development
 */
export default function (dev = true) {
  // ====================================== //
  // PRIVATE PROPERTIES                     //
  // ====================================== //
  Object.defineProperty(this, '_dev', {
    value: dev,
    enumerable: false,
    configurable: false,
    writable: true
  })

  const logStart = false
  const logEnd = false

  let started = false
  let finished = false
  let blockCurrent = null
  let index = -1
  let timeStart = 0
  let catchAgain = true
  let hide = !dev
  const Exception = {
    IsStarted: () => new Error('Blockcode is already started'),
    NotStarted: () => new Error('Blockcode has not been started'),
    IsFinished: () => new Error('Blockcode has already been finalized'),
    BlockNotFound: () => new Error('Start at least one block'),
    CatchAgain: () => new Error('You cannot make more than one capture followed'),
    BlockDescription: () => new Error('The block require a description')
  }

  const blocks = new Map()

  // ====================================== //
  // PUBLIC PROPERTY                        //
  // ====================================== //
  // BlockCode Status
  Object.defineProperty(this, 'Status', {
    value: Object.freeze({
      SUCCESS: 'Success',
      RESOLVED: 'Resolved',
      FAIL: 'Fail',
      RUNNING: 'Running'
    }),
    writable: false,
    configurable: false
  })

  Object.defineProperty(this, 'id', {
    value: Date.now(),
    writable: false,
    enumerable: true,
    configurable: false
  })

  Object.defineProperty(this, 'num', {
    get: () => index + 1,
    configurable: false,
    enumerable: true
  })

  Object.defineProperty(this, 'sizeDone', {
    get: () => blocks.size,
    configurable: false,
    enumerable: true
  })

  // ====================================== //
  // PRIVATE METHODS                        //
  // ====================================== //
  /**
   * Set current block
   * @param {string} status Block Status
   * @param {any} catchData Data additional of Catch
   */
  this[symBCSetBlock] = (status, catchData = null) => {
    blockCurrent.time = (Date.now() - timeStart) + 'ms'
    blockCurrent.status = status
    blockCurrent.catchData = catchData
    blocks.set(blockCurrent.id, { ...blockCurrent })

    if (!blockCurrent[symBCLogBlock]) return
    if (!this._dev) return
    let log
    switch (status) {
      case this.Status.SUCCESS:
        log = Log.info
        break
      case this.Status.RESOLVED:
        log = Log.warn
        break
      default:
        log = Log.error
    }
    log({
      label: `Block - ${status}`,
      message: blockCurrent.description,
      data: blockCurrent
    })
  }

  // ====================================== //
  // PUBLIC METHODS                         //
  // ====================================== //
  /**
   * Start blockcode
   * @param {string} name You can assign a name to identify this BlockCode
   * @param {any} referenceData Reference data
   */
  this.start = (name = '', referenceData = null) => {
    if (finished) throw Exception.IsFinished()
    if (started) throw Exception.IsStarted()
    started = true
    if (this._dev && !hide) {
      if (logStart) {
        Log.norm({
          label: 'Blockcode - Start',
          message: 'Running...',
          data: {
            id: this.id,
            name,
            referenceData
          }
        })
      }
    }
  }

  /**
   * Generate un code block
   * @param {string} description A description for this block
   * @param {any} ref A reference
   */
  this.block = (description, ref = null) => {
    if (!description) throw Exception.BlockDescription()
    if (finished) throw Exception.IsFinished()
    if (!started) throw Exception.NotStarted()
    if (blockCurrent !== null && blockCurrent.status === this.Status.RUNNING) {
      this[symBCSetBlock](this.Status.SUCCESS)
    }

    index++
    blockCurrent = {
      id: parseInt(Date.now() / 9000000) + index,
      blockcode_id: this.id,
      index,
      num: index + 1,
      description,
      ref,
      time: 0,
      status: this.Status.RUNNING,
      catch: null,
      [symBCLogBlock]: !hide
    }

    timeStart = Date.now()
    catchAgain = true
  }

  /**
   * Get the current block
   */
  this.getCurrent = () => {
    if (finished) throw Exception.IsFinished()
    if (!started) throw Exception.NotStarted()
    return { ...blockCurrent }
  }

  /**
   * Catch code block
   * @param info Information Additional at catch
   */
  this.catch = (info = null) => {
    if (finished) throw Exception.IsFinished()
    if (!started) throw Exception.NotStarted()
    if (!blockCurrent) return false
    if (!catchAgain) throw Exception.CatchAgain()
    this[symBCSetBlock](this.Status.FAIL, info)
    catchAgain = false
    return true
  }

  /**
   * Resolve code block catched
   * @returns {boolean}
   */
  this.resolve = () => {
    if (finished) throw Exception.IsFinished()
    if (!started) throw Exception.NotStarted()
    if (!blockCurrent) throw Exception.BlockNotFound()
    if (blockCurrent.status !== this.Status.FAIL) return false

    blockCurrent.time = (Date.now() - timeStart) + 'ms'
    blockCurrent.status = this.Status.RESOLVED
    blocks.set(blockCurrent.id, { ...blockCurrent })
    if (this._dev && !hide) {
      Log.warn({
        label: `Block - ${this.Status.RESOLVED}`,
        message: 'has been resolved',
        data: blockCurrent
      })
    }
    return true
  }

  /**
   * Finish blockcode
   */
  this.end = () => {
    if (finished) throw Exception.IsFinished()
    if (!started) throw Exception.NotStarted()

    // set last block
    if (blockCurrent && blockCurrent.status === this.Status.RUNNING) this[symBCSetBlock](this.Status.SUCCESS)

    started = false
    finished = true

    const listBlocks = {}
    for (const [key, value] of blocks.entries()) {
      listBlocks[key] = value
    }

    if (this._dev && !hide) {
      if (logEnd) {
        Log.norm({
          label: 'BlockCode - Finished',
          message: `${blocks.size} blocks`,
          data: listBlocks
        })
      }
    }
    return listBlocks
  }

  /**
   * Hide console
   */
  this.hide = () => {
    if (!this._dev) return
    hide = true
  }

  /**
   * Unhide console
   */
  this.unhide = () => {
    if (!this._dev) return
    hide = false
  }
}
