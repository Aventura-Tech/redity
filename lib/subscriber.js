"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=Subscriber;var _defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty")),_typeof2=_interopRequireDefault(require("@babel/runtime/helpers/typeof")),_symbols=require("./utils/symbols"),_exceptions=require("./utils/exceptions");function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(b,!0).forEach(function(c){(0,_defineProperty2["default"])(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(b).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}var index=0;// ====================================== //
// [Class] Subscriber                     //
// ====================================== //
/**
 * Model Subscriber for subscribe
 * @param {string} key Key optional
 * @param {funtion} mapStateToProps function
 */function Subscriber(){var a=!!(0<arguments.length&&arguments[0]!==void 0)&&arguments[0],b=!!(1<arguments.length&&arguments[1]!==void 0)&&arguments[1];if(!1!==a&&"string"!=typeof a)throw new Error("Subscriber: To be a string");// ====================================== //
// Generate key                           //
// ====================================== //
this[_symbols.symSubscriberMapStateToProps]="function"==typeof b?b:function(){return{}},this.key=a||parseInt(Date.now()/9e6)+index,this[_symbols.symSubscriberListener]=function(){},this.statesDefined={},this.props={},index++}// ====================================== //
// Recibirá todos los estados por Model   //
// ====================================== //
/** Initial subscrirber
 * @param {object} allStates object of states
 */ /**
 * Set props
 * @param {object} props props of component
 */ // ====================================== //
// Generate a event                       //
// ====================================== //
// ====================================== //
// Set callback for onListen event        //
// ====================================== //
// eslint-disable-next-line accessor-pairs
Subscriber.prototype[_symbols.symSubscriberInit]=function(a){var b=this[_symbols.symSubscriberMapStateToProps](a);if("object"!==(0,_typeof2["default"])(b)||Array.isArray(b))throw(0,_exceptions.IsNotObject)("mapStateToProps");this.statesDefined=b},Subscriber.prototype.getStatesDefined=function(){return this.statesDefined},Subscriber.prototype.setProps=function(a){this.props=a},Subscriber.prototype[_symbols.symSubscriberGenerate]=function(a,b,c){var d=this[_symbols.symSubscriberMapStateToProps](_objectSpread({},c,(0,_defineProperty2["default"])({},a,b)));return JSON.stringify(d)!==JSON.stringify(this.statesDefined)&&(this.statesDefined=d,this[_symbols.symSubscriberListener](this.statesDefined),!0)},Object.defineProperty(Subscriber.prototype,"onListen",{set:function set(a){if("function"!=typeof a)throw(0,_exceptions.IsNotFunction)("onListen");this[_symbols.symSubscriberListener]=a},configurable:!1,enumerable:!0});