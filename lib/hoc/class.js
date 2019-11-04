"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=connect;var _extends2=_interopRequireDefault(require("@babel/runtime/helpers/extends")),_classCallCheck2=_interopRequireDefault(require("@babel/runtime/helpers/classCallCheck")),_createClass2=_interopRequireDefault(require("@babel/runtime/helpers/createClass")),_possibleConstructorReturn2=_interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn")),_getPrototypeOf2=_interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf")),_inherits2=_interopRequireDefault(require("@babel/runtime/helpers/inherits")),_react=_interopRequireDefault(require("react")),_index=_interopRequireDefault(require("../index")),_exceptions=require("../utils/exceptions"),_subscriber=_interopRequireDefault(require("../subscriber")),_template=_interopRequireDefault(require("./template")),_connectFaker=_interopRequireDefault(require("./connectFaker"));/**
 * Connect a component with the model
 * @param {string} keyModel Key of Model
 * @param {function} mapStateToProps options
 * @param {function} mapDispatchToProps options
 * @returns {funtion}
 */function connect(a){var b=!!(1<arguments.length&&arguments[1]!==void 0)&&arguments[1],c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:function(){};// ====================================== //
// If not string is fatal error           //
// ====================================== //
if("string"!=typeof a&&!1!==a)throw(0,_exceptions.RequireKeyModel)("connect");if(!1===a)return(0,_connectFaker["default"])(a,b,c);// ====================================== //
// Getting model by key                   //
// ====================================== //
var d=_index["default"].model.get(a);// ====================================== //
// If not found model is error            //
// ====================================== //
return d?function(e){var f=!!(1<arguments.length&&arguments[1]!==void 0)&&arguments[1];// ====================================== //
// If not component or null               //
// ====================================== //
if(!e)throw(0,_exceptions.IsNotComponent)("connect");if(!e)throw(0,_exceptions.IsNotComponent)("connect");var g={},h=_index["default"].model["public"]();for(var m in h)m!==a&&(g[m]=h[m].dispatchers);// ====================================== //
// Seting all dispatcher defined in init  //
// to mapStateToProps and getting the     //
// dispatchers defined                    //
// ====================================== //
var i,j,k,l=c(d.dispatchers,g);// ====================================== //
// declared Subcriber, and his key        //
// ====================================== //
// ====================================== //
// Wrapper component connected            //
// ====================================== //
return(/*#__PURE__*/function(a){function c(a){var e;return(0,_classCallCheck2["default"])(this,c),e=(0,_possibleConstructorReturn2["default"])(this,(0,_getPrototypeOf2["default"])(c).call(this,a)),i=new _subscriber["default"](f,b),i.setProps(e.props),j=d.subscribe(i),k=i.getStatesDefined(),e}return(0,_inherits2["default"])(c,a),(0,_createClass2["default"])(c,[{key:"componentWillMount",value:function componentWillMount(){var a=this;i.onListen=function(b){k=b,a.forceUpdate()}}},{key:"componentWillUnmount",value:function componentWillUnmount(){d.deleteSubscribe(j)}},{key:"render",value:function render(){// ====================================== //
// Render                                 //
// ====================================== //
return i.setProps(this.props),_react["default"].createElement(e,(0,_extends2["default"])({},k,l,this.props))}}]),c}(_react["default"].Component))}:(console.error((0,_exceptions.ModelNotFound)("connect")),function(){return(0,_template["default"])("error connect: Model not found in the register","error")});// ====================================== //
// Next function for component and his    //
// key (optional)                         //
// ====================================== //
}