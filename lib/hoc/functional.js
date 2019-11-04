"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=_default;var _extends2=_interopRequireDefault(require("@babel/runtime/helpers/extends")),_defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty")),_react=_interopRequireDefault(require("react")),_index=_interopRequireDefault(require("../index")),_exceptions=require("../utils/exceptions"),_subscriber=_interopRequireDefault(require("../subscriber")),_template=_interopRequireDefault(require("./template")),_connectFaker=_interopRequireDefault(require("./connectFaker"));function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(b,!0).forEach(function(c){(0,_defineProperty2["default"])(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(b).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}/**
 * Connect a component with the model
 * @param {string} keyModel Key of Model
 * @param {function} mapStateToProps options
 * @param {function} mapDispatchToProps actions
 * @returns {funtion}
 */function _default(a){var b=!!(1<arguments.length&&arguments[1]!==void 0)&&arguments[1],c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:function(){};// ====================================== //
// If not string is fatal error           //
// ====================================== //
if("string"!=typeof a&&!1!==a)throw(0,_exceptions.RequireKeyModel)("connect");if(!1===a)return(0,_connectFaker["default"])(a,c,c);// ====================================== //
// Getting model by key                   //
// ====================================== //
var d=_index["default"].model.get(a);// ====================================== //
// If not found model fatal error         //
// ====================================== //
return d?function(e){var f=!!(1<arguments.length&&arguments[1]!==void 0)&&arguments[1];// ====================================== //
// If not component or null               //
// ====================================== //
if(!e)throw(0,_exceptions.IsNotComponent)("connect");var g={},h=_index["default"].model["public"]();for(var n in h)n!==a&&(g[n]=h[n].dispatchers);// ====================================== //
// Seting all dispatcher defined in init  //
// to mapStateToProps and getting the     //
// dispatcher defined                     //
// ====================================== //
var i=c(d.dispatchers,g),j=!1,k={},l=!1,m=!1;// ====================================== //
// For subcriber                          //
// ====================================== //
// ====================================== //
// Wrapper component connected            //
// ====================================== //
return function(a){// ====================================== //
// Simulate componentWillMount of Class   //
// Component                              //
// ====================================== //
function c(){j=new _subscriber["default"](f,b),j.setProps(a),l=d.subscribe(j),k=j.getStatesDefined()}m||(c(),m=!0),j.setProps(a);// ====================================== //
// Creting force render                   //
// ====================================== //
var g=_react["default"].useState(Date.now())[1];// ====================================== //
// Use effect for subscriber              //
// ====================================== //
// ====================================== //
// Render                                 //
// ====================================== //
return _react["default"].useEffect(function(){return j.onListen=function(a){k=_objectSpread({},a),g(_objectSpread({},a))},function(){d.deleteSubscribe(l),m=!1}},[]),_react["default"].createElement(e,(0,_extends2["default"])({},i,k,a))}}:(console.error((0,_exceptions.ModelNotFound)("connect")),function(){return(0,_template["default"])("error connect: Model not found in the register","error")});// ====================================== //
// Next function for component and his    //
// key (optional)                         //
// ====================================== //
}