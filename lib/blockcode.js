"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=_default;var _slicedToArray2=_interopRequireDefault(require("@babel/runtime/helpers/slicedToArray")),_defineProperty2=_interopRequireDefault(require("@babel/runtime/helpers/defineProperty")),_log=_interopRequireDefault(require("./utils/log")),_symbols=require("./utils/symbols");function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(b,!0).forEach(function(c){(0,_defineProperty2["default"])(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(b).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _default(){var a=this,b=!!(0<arguments.length&&arguments[0]!==void 0)&&arguments[0];Object.defineProperty(this,"_dev",{value:b,enumerable:!1,configurable:!1,writable:!0});var c=!1,d=!1,e=null,f=-1,g=0,h=!0,i=!0,j={IsStarted:function IsStarted(){return new Error("Blockcode is already started")},NotStarted:function NotStarted(){return new Error("Blockcode has not been started")},IsFinished:function IsFinished(){return new Error("Blockcode has already been finalized")},BlockNotFound:function BlockNotFound(){return new Error("Start at least one block")},CatchAgain:function CatchAgain(){return new Error("You cannot make more than one capture followed")},BlockDescription:function BlockDescription(){return new Error("The block require a description")}},k=new Map;// ====================================== //
// PUBLIC PROPERTY                        //
// ====================================== //
// BlockCode Status
// ====================================== //
// PRIVATE METHODS                        //
// ====================================== //
/**
   * Set current block
   * @param {string} status Block Status
   * @param {any} catchData Data additional of Catch
   */ // ====================================== //
// PUBLIC METHODS                         //
// ====================================== //
/**
   * Start blockcode
   * @param {string} name You can assign a name to identify this BlockCode
   * @param {any} referenceData Reference data
   */ /**
   * Generate un code block
   * @param {string} description A description for this block
   * @param {any} ref A reference
   */ /**
   * Get the current block
   */ /**
   * Catch code block
   * @param info Information Additional at catch
   */ /**
   * Resolve code block catched
   * @returns {boolean}
   */ /**
   * Finish blockcode
   */ /**
   * Hide console
   */ /**
   * Unhide console
   */Object.defineProperty(this,"Status",{value:Object.freeze({SUCCESS:"Success",RESOLVED:"Resolved",FAIL:"Fail",RUNNING:"Running"}),writable:!1,configurable:!1}),Object.defineProperty(this,"id",{value:Date.now(),writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this,"num",{get:function get(){return f+1},configurable:!1,enumerable:!0}),Object.defineProperty(this,"sizeDone",{get:function get(){return k.size},configurable:!1,enumerable:!0}),this[_symbols.symBCSetBlock]=function(b){var c=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;if((e.time=Date.now()-g+"ms",e.status=b,e.catchData=c,k.set(e.id,_objectSpread({},e)),!!e[_symbols.symBCLogBlock])&&a._dev){var d;d=b===a.Status.SUCCESS?_log["default"].info:b===a.Status.RESOLVED?_log["default"].warn:_log["default"].error,d({label:"Block - ".concat(b),message:e.description,data:e})}},this.start=function(){var b=0<arguments.length&&arguments[0]!==void 0?arguments[0]:"",e=1<arguments.length&&arguments[1]!==void 0?arguments[1]:null;if(d)throw j.IsFinished();if(c)throw j.IsStarted();c=!0,a._dev&&!i&&!1},this.block=function(b){var k=1<arguments.length&&arguments[1]!==void 0?arguments[1]:null;if(!b)throw j.BlockDescription();if(d)throw j.IsFinished();if(!c)throw j.NotStarted();null!==e&&e.status===a.Status.RUNNING&&a[_symbols.symBCSetBlock](a.Status.SUCCESS),f++,e=(0,_defineProperty2["default"])({id:parseInt(Date.now()/9e6)+f,blockcode_id:a.id,index:f,num:f+1,description:b,ref:k,time:0,status:a.Status.RUNNING,catch:null},_symbols.symBCLogBlock,!i),g=Date.now(),h=!0},this.getCurrent=function(){if(d)throw j.IsFinished();if(!c)throw j.NotStarted();return _objectSpread({},e)},this["catch"]=function(){var b=0<arguments.length&&void 0!==arguments[0]?arguments[0]:null;if(d)throw j.IsFinished();if(!c)throw j.NotStarted();if(!e)return!1;if(!h)throw j.CatchAgain();return a[_symbols.symBCSetBlock](a.Status.FAIL,b),h=!1,!0},this.resolve=function(){if(d)throw j.IsFinished();if(!c)throw j.NotStarted();if(!e)throw j.BlockNotFound();return e.status===a.Status.FAIL&&(e.time=Date.now()-g+"ms",e.status=a.Status.RESOLVED,k.set(e.id,_objectSpread({},e)),a._dev&&!i&&_log["default"].warn({label:"Block - ".concat(a.Status.RESOLVED),message:"has been resolved",data:e}),!0)},this.end=function(){if(d)throw j.IsFinished();if(!c)throw j.NotStarted();// set last block
e&&e.status===a.Status.RUNNING&&a[_symbols.symBCSetBlock](a.Status.SUCCESS),c=!1,d=!0;var b={},f=!0,g=!1,h=void 0;try{for(var l,m=k.entries()[Symbol.iterator]();!(f=(l=m.next()).done);f=!0){var n=(0,_slicedToArray2["default"])(l.value,2),o=n[0],p=n[1];b[o]=p}}catch(a){g=!0,h=a}finally{try{f||null==m["return"]||m["return"]()}finally{if(g)throw h}}return a._dev&&!i&&!1&&_log["default"].norm({label:"BlockCode - Finished",message:"".concat(k.size," blocks"),data:b}),b},this.hide=function(){a._dev&&(i=!0)},this.show=function(){a._dev&&(i=!1)}}