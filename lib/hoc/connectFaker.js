"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=_default;var _extends2=_interopRequireDefault(require("@babel/runtime/helpers/extends")),_defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty")),_typeof2=_interopRequireDefault(require("@babel/runtime/helpers/typeof")),_react=_interopRequireDefault(require("react")),_exceptions=require("../utils/exceptions");function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(b,!0).forEach(function(c){(0,_defineProperty2["default"])(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(b).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _default(a){var b=!!(1<arguments.length&&arguments[1]!==void 0)&&arguments[1],c=!!(2<arguments.length&&arguments[2]!==void 0)&&arguments[2],d={},e={};// ====================================== //
// If not string is fatal error           //
// ====================================== //
if("string"!=typeof a&&!1!==a)throw(0,_exceptions.RequireKeyModel)("connect");return function(a){if("function"==typeof b){// ====================================== //
// Generate states fakers                 //
// ====================================== //
var f=b({},{});"object"!==(0,_typeof2["default"])(f)||Array.isArray(f)||(d=f)}if("function"==typeof c){// ====================================== //
// Generate methods dispatchers fakers    //
// ====================================== //
var g=c({},{});if("object"===(0,_typeof2["default"])(g)&&!Array.isArray(g))for(var h in g)e=_objectSpread({},e,(0,_defineProperty2["default"])({},h,function(){return!0}))}// ====================================== //
// If not component or null               //
// ====================================== //
if(!a)throw(0,_exceptions.IsNotComponent)("connect");// ====================================== //
// Wrapper for father Component           //
// ====================================== //
return function(b){// ====================================== //
// Render                                 //
// ====================================== //
return _react["default"].createElement(a,(0,_extends2["default"])({},d,e,b))}}}