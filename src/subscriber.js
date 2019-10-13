import { symSubscriberMapStateToProps, symSubscriberGenerate, symSubscriberListener, symSubscriberInit } from './utils/symbols'
import { IsNotObject, IsNotFunction } from './utils/exceptions'

let index = 0
// ====================================== //
// [Class] Subscriber                     //
// ====================================== //
/**
 * Model Subscriber for subscribe
 * @param {string} key Key optional
 * @param {funtion} mapStateToProps function
 */
export default function Subscriber (key = false, mapStateToProps = false) {
  if (key !== false && typeof key !== 'string') {
    throw new Error('Subscriber: To be a string')
  }
  if (typeof mapStateToProps !== 'function') {
    this[symSubscriberMapStateToProps] = () => ({})
  } else {
    this[symSubscriberMapStateToProps] = mapStateToProps
  }
  // ====================================== //
  // Generate key                           //
  // ====================================== //
  this.key = key || parseInt(Date.now() / 9000000) + index
  this[symSubscriberListener] = () => {}
  this.statesDefined = {}
  this.allStates = {}
  this.props = {}
  index++
}

// ====================================== //
// Recibirá todos los estados por Model   //
// ====================================== //
/** Initial subscrirber
 * @param {object} allStates object of states
 */
Subscriber.prototype[symSubscriberInit] = function (allStates) {
  for (const key in allStates) {
    this.allStates[key] = allStates[key].val
  }
  const statesDefined = this[symSubscriberMapStateToProps](this.allStates)
  if (typeof statesDefined !== 'object' || Array.isArray(statesDefined)) throw IsNotObject('mapStateToProps')
  this.statesDefined = statesDefined
}

Subscriber.prototype.getStatesDefined = function () {
  return this.statesDefined
}

/**
 * Set props
 * @param {object} props props of component
 */
Subscriber.prototype.setProps = function (props) {
  this.props = props
}

// ====================================== //
// Generate a event                       //
// ====================================== //
Subscriber.prototype[symSubscriberGenerate] = function (keyState, nextPayloadState) {
  const statesDefined = this[symSubscriberMapStateToProps]({ ...this.allStates, [keyState]: nextPayloadState })
  if (JSON.stringify(statesDefined) === JSON.stringify(this.statesDefined)) return false
  this.statesDefined = statesDefined

  // ====================================== //
  // Execute onListen of Subcriber          //
  // ====================================== //
  this[symSubscriberListener](this.statesDefined)
  return true
}

// ====================================== //
// Set callback for onListen event        //
// ====================================== //
// eslint-disable-next-line accessor-pairs
Object.defineProperty(Subscriber.prototype, 'onListen', {
  set: function (callback) {
    if (typeof callback !== 'function') throw IsNotFunction('onListen')
    this[symSubscriberListener] = callback
  },
  configurable: false,
  enumerable: true
})