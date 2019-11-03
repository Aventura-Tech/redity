"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=connect;var _extends2=_interopRequireDefault(require("@babel/runtime/helpers/extends")),_classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck")),_createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass")),_possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn")),_getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf")),_inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits")),_react=_interopRequireDefault(require("react")),_index=_interopRequireDefault(require("../index")),_exceptions=require("../utils/exceptions"),_subscriber=_interopRequireDefault(require("../subscriber")),_template=_interopRequireDefault(require("./template")),_connectFaker=_interopRequireDefault(require("./connectFaker"));/**
 * Connect a component with the model
 * @param {string} modelKey Key of Model
 * @param {function} mapStateToProps options
 * @param {function} mapDispatchToProps options
 * @returns {funtion}
 */function connect(a){var b=!!(1<arguments.length&&arguments[1]!==void 0)&&arguments[1],c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:function(){};// ====================================== //
// If not string is fatal error           //
// ====================================== //
if("string"!=typeof a&&!1!==a)throw(0,_exceptions.RequireKeyModel)("connect");if(!1===a)return(0,_connectFaker["default"])(a,b,c);// ====================================== //
// Getting model by key                   //
// ====================================== //
var d=_index["default"].get(a);// ====================================== //
// If not found model is error            //
// ====================================== //
return d?function(a){var e=!!(1<arguments.length&&arguments[1]!==void 0)&&arguments[1];// ====================================== //
// If not component or null               //
// ====================================== //
if(!a)throw(0,_exceptions.IsNotComponent)("connect");// ====================================== //
// Seting all dispatcher defined in init  //
// to mapStateToProps and getting the     //
// dispatchers defined                    //
// ====================================== //
var f,g,h,i=c(d.dispatchers);// ====================================== //
// declared Subcriber, and his key        //
// ====================================== //
// ====================================== //
// Wrapper component connected            //
// ====================================== //
return(/*#__PURE__*/function(c){function j(a){var c;return(0,_classCallCheck2["default"])(this,j),c=(0,_possibleConstructorReturn2["default"])(this,(0,_getPrototypeOf2["default"])(j).call(this,a)),f=new _subscriber["default"](e,b),f.setProps(c.props),g=d.subscribe(f),h=f.getStatesDefined(),c}return(0,_inherits2["default"])(j,c),(0,_createClass2["default"])(j,[{key:"componentWillMount",value:function componentWillMount(){var a=this;f.onListen=function(b){h=b,a.forceUpdate()}}},{key:"componentWillUnmount",value:function componentWillUnmount(){d.deleteSubscribe(g)}},{key:"render",value:function render(){// ====================================== //
// Render                                 //
// ====================================== //
return f.setProps(this.props),_react["default"].createElement(a,(0,_extends2["default"])({},h,i,this.props))}}]),j}(_react["default"].Component))}:(console.error((0,_exceptions.ModelNotFound)("connect")),function(){return(0,_template["default"])("error connect: Model not found in the register","error")});// ====================================== //
// Next function for component and his    //
// key (optional)                         //
// ====================================== //
}