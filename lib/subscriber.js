"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Subscriber;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _symbols = require("./utils/symbols");

var _exceptions = require("./utils/exceptions");

var _index = _interopRequireDefault(require("./index"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var globalStates = function globalStates() {
  var modelsPublic = _index["default"].model["public"]();

  var modelsProtected = _index["default"].model["protected"]();

  var globalStates = {};

  for (var key in modelsPublic) {
    globalStates = _objectSpread({}, globalStates, (0, _defineProperty2["default"])({}, key, modelsPublic[key].statesValues()));
  }

  for (var _key in modelsProtected) {
    globalStates = _objectSpread({}, globalStates, (0, _defineProperty2["default"])({}, _key, modelsProtected[_key].statesValues()));
  }

  return globalStates;
};

var index = 0; // ====================================== //
// [Class] Subscriber                     //
// ====================================== //

/**
 * Model Subscriber for subscribe
 * @param {string} key Key optional
 * @param {funtion} mapStateToProps function
 */

function Subscriber() {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var mapStateToProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (key !== false && typeof key !== 'string') {
    throw new Error('Subscriber: To be a string');
  }

  if (typeof mapStateToProps !== 'function') {
    this[_symbols.symSubscriberMapStateToProps] = function () {
      return {};
    };
  } else {
    this[_symbols.symSubscriberMapStateToProps] = mapStateToProps;
  } // ====================================== //
  // Generate key                           //
  // ====================================== //


  this.key = key || parseInt(Date.now() / 9000000) + index;

  this[_symbols.symSubscriberListener] = function () {};

  this.statesDefined = {};
  this.props = {};
  index++;
} // ====================================== //
// Recibirá todos los estados por Model   //
// ====================================== //

/** Initial subscrirber
 * @param {object} allStates object of states
 */


Subscriber.prototype[_symbols.symSubscriberInit] = function (allStates) {
  var statesDefined = this[_symbols.symSubscriberMapStateToProps](allStates, globalStates());

  if ((0, _typeof2["default"])(statesDefined) !== 'object' || Array.isArray(statesDefined)) throw (0, _exceptions.IsNotObject)('mapStateToProps');
  this.statesDefined = statesDefined;
};

Subscriber.prototype.getStatesDefined = function () {
  return this.statesDefined;
};
/**
 * Set props
 * @param {object} props props of component
 */


Subscriber.prototype.setProps = function (props) {
  this.props = props;
}; // ====================================== //
// Generate a event                       //
// ====================================== //


Subscriber.prototype[_symbols.symSubscriberGenerate] = function (keyState, nextPayloadState, allStates) {
  var statesDefined = this[_symbols.symSubscriberMapStateToProps](_objectSpread({}, allStates, (0, _defineProperty2["default"])({}, keyState, nextPayloadState)), globalStates());

  if (JSON.stringify(statesDefined) === JSON.stringify(this.statesDefined)) return false;
  this.statesDefined = statesDefined; // ====================================== //
  // Execute onListen of Subcriber          //
  // ====================================== //

  this[_symbols.symSubscriberListener](this.statesDefined);

  return true;
}; // ====================================== //
// Set callback for onListen event        //
// ====================================== //
// eslint-disable-next-line accessor-pairs


Object.defineProperty(Subscriber.prototype, 'onListen', {
  set: function set(callback) {
    if (typeof callback !== 'function') throw (0, _exceptions.IsNotFunction)('onListen');
    this[_symbols.symSubscriberListener] = callback;
  },
  configurable: false,
  enumerable: true
});