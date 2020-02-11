"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../index"));

var _exceptions = require("../utils/exceptions");

var _subscriber = _interopRequireDefault(require("../subscriber"));

var _template = _interopRequireDefault(require("./template"));

var _connectFaker = _interopRequireDefault(require("./connectFaker"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Connect a component with the model
 * @param {string} keyModel Key of Model
 * @param {function} mapStateToProps options
 * @param {function} mapDispatchToProps actions
 * @returns {funtion}
 */
function _default(keyModel) {
  var mapStateToProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var mapDispatchToProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

  // ====================================== //
  // If not string is fatal error           //
  // ====================================== //
  if (typeof keyModel !== 'string') {
    if (keyModel !== false) {
      throw (0, _exceptions.RequireKeyModel)('connect');
    }
  } // ====================================== //
  // Next function for component and his    //
  // key (optional)                         //
  // ====================================== //


  return function (Component) {
    var customizeKeyComponent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (keyModel === false) return (0, _connectFaker["default"])(keyModel, mapDispatchToProps, mapDispatchToProps); // ====================================== //
    // Getting model by key                   //
    // ====================================== //

    var Model = _index["default"].model.get(keyModel); // ====================================== //
    // If not found model fatal error         //
    // ====================================== //


    if (!Model) {
      // eslint-disable-next-line no-console
      console.error((0, _exceptions.ModelNotFound)("connect \"".concat(keyModel, "\"")));
      return function () {
        return (0, _template["default"])('error connect: Model not found in the register', 'error');
      };
    } // ====================================== //
    // If not component or null               //
    // ====================================== //


    if (!Component) throw (0, _exceptions.IsNotComponent)('connect');
    var globalDispatch = {};

    var allModels = _index["default"].model.all();

    for (var key in allModels) {
      if (key === keyModel) continue;

      if (allModels[key].config.publicDispatchers) {
        globalDispatch[key] = allModels[key].dispatchers;
      }
    }

    var dispatchersDefined = {}; // ====================================== //
    // For subcriber                          //
    // ====================================== //

    var subscriber = false; // ====================================== //
    // States defined for user in MapState... //
    // ====================================== //

    var statesDefinedToProps = {}; // ====================================== //
    // Cuando se crea un subscribe se crea    //
    // una key para mas luego usar para       //
    // eliminar la subscripción despues de    //
    // destruir el componente.                //
    // ====================================== //

    var keysConnect = []; // ====================================== //
    // For componentWillMount                 //
    // ====================================== //

    var started = false; // ====================================== //
    // Wrapper component connected            //
    // ====================================== //

    return function Wrapper(props) {
      var isDone = false; // ====================================== //
      // Creting force render                   //
      // ====================================== //

      var nextDefinedToProps = _react["default"].useState(Date.now())[1]; // ====================================== //
      // Simulate componentWillMount of Class   //
      // Component                              //
      // ====================================== //


      function componentWillMount() {
        // ====================================== //
        // Seting all dispatcher defined in init  //
        // to mapStateToProps and getting the     //
        // dispatcher defined                     //
        // ====================================== //
        dispatchersDefined = mapDispatchToProps(Model.dispatchers, globalDispatch); // ====================================== //
        // Creating subscriber for manage states  //
        // ====================================== //

        if (!isDone) subscriber = new _subscriber["default"](customizeKeyComponent, mapStateToProps, keyModel); // ====================================== //
        // Seting props for render                //
        // ====================================== //

        subscriber.setProps(props); // ====================================== //
        // Sending subscriber to Model            //
        // ====================================== //

        keysConnect.push(Model.subscribe(subscriber)); // ====================================== //
        // Getting states customize for user      //
        // ====================================== //

        statesDefinedToProps = subscriber.getStatesDefined(); // ====================================== //
        // Listen changes of states               //
        // ====================================== //

        subscriber.onListen = function (states) {
          statesDefinedToProps = _objectSpread({}, states); // ====================================== //
          // Force Render                           //
          // ====================================== //

          nextDefinedToProps(_objectSpread({}, states));
        };
      }

      if (!started) {
        componentWillMount();
        started = true;
        isDone = true;
      } // ====================================== //
      // Seting props for render                //
      // ====================================== //


      subscriber.setProps(props); // ====================================== //
      // Use effect for subscriber              //
      // ====================================== //

      _react["default"].useEffect(function () {
        componentWillMount();
        return function () {
          keysConnect.map(function (key) {
            Model.deleteSubscribe(key);
          });
          started = false;
        };
      }, []);

      return _react["default"].createElement(Component, (0, _extends2["default"])({}, dispatchersDefined, statesDefinedToProps, props));
    };
  };
}