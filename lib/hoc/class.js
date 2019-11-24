"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = connect;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../index"));

var _exceptions = require("../utils/exceptions");

var _subscriber = _interopRequireDefault(require("../subscriber"));

var _template = _interopRequireDefault(require("./template"));

var _connectFaker = _interopRequireDefault(require("./connectFaker"));

/**
 * Connect a component with the model
 * @param {string} keyModel Key of Model
 * @param {function} mapStateToProps options
 * @param {function} mapDispatchToProps options
 * @returns {funtion}
 */
function connect(keyModel) {
  var mapStateToProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var mapDispatchToProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

  // ====================================== //
  // If not string is fatal error           //
  // ====================================== //
  if (typeof keyModel !== 'string') {
    if (keyModel !== false) {
      throw (0, _exceptions.RequireKeyModel)('connect');
    }
  }

  if (keyModel === false) return (0, _connectFaker["default"])(keyModel, mapStateToProps, mapDispatchToProps); // ====================================== //
  // Getting model by key                   //
  // ====================================== //

  var Model = _index["default"].model.get(keyModel); // ====================================== //
  // If not found model is error            //
  // ====================================== //


  if (!Model) {
    // eslint-disable-next-line no-console
    console.error((0, _exceptions.ModelNotFound)("connect \"".concat(keyModel, "\"")));
    return function () {
      return (0, _template["default"])('error connect: Model not found in the register', 'error');
    };
  } // ====================================== //
  // Next function for component and his    //
  // key (optional)                         //
  // ====================================== //


  return function (Component) {
    var customizeKeyComponent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    // ====================================== //
    // If not component or null               //
    // ====================================== //
    if (!Component) throw (0, _exceptions.IsNotComponent)('connect');
    if (!Component) throw (0, _exceptions.IsNotComponent)('connect');
    var globalDispatch = {};

    var allModels = _index["default"].model.all();

    for (var key in allModels) {
      if (key === keyModel) continue;

      if (allModels[key].config.publicDispatchers) {
        globalDispatch[key] = allModels[key].dispatchers;
      }
    } // ====================================== //
    // Seting all dispatcher defined in init  //
    // to mapStateToProps and getting the     //
    // dispatchers defined                    //
    // ====================================== //


    var dispatchersDefined = mapDispatchToProps(Model.dispatchers, globalDispatch); // ====================================== //
    // declared Subcriber, and his key        //
    // ====================================== //

    var subscriber, keyConnect; // ====================================== //
    // States customized                      //
    // ====================================== //

    var statesDefinedToProps; // ====================================== //
    // Wrapper component connected            //
    // ====================================== //

    return (
      /*#__PURE__*/
      function (_React$Component) {
        (0, _inherits2["default"])(Wrapper, _React$Component);

        function Wrapper(props) {
          var _this;

          (0, _classCallCheck2["default"])(this, Wrapper);
          _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Wrapper).call(this, props)); // ====================================== //
          // Creating subscriber for manage states  //
          // ====================================== //

          subscriber = new _subscriber["default"](customizeKeyComponent, mapStateToProps, keyModel); // ====================================== //
          // Seting props for render                //
          // ====================================== //

          subscriber.setProps(_this.props); // ====================================== //
          // Sending subscriber to Model            //
          // ====================================== //

          keyConnect = Model.subscribe(subscriber); // ====================================== //
          // Getting states customize for user      //
          // ====================================== //

          statesDefinedToProps = subscriber.getStatesDefined();
          return _this;
        }

        (0, _createClass2["default"])(Wrapper, [{
          key: "componentWillMount",
          value: function componentWillMount() {
            var _this2 = this;

            // ====================================== //
            // Listen changes of states               //
            // ====================================== //
            subscriber.onListen = function (states) {
              statesDefinedToProps = states; // ====================================== //
              // Force Render                           //
              // ====================================== //

              _this2.forceUpdate();
            };
          }
        }, {
          key: "componentWillUnmount",
          value: function componentWillUnmount() {
            // ====================================== //
            // If component destroy, deleting         //
            // subscriber                             //
            // ====================================== //
            Model.deleteSubscribe(keyConnect);
          }
        }, {
          key: "render",
          value: function render() {
            // ====================================== //
            // Seting props for render                //
            // ====================================== //
            subscriber.setProps(this.props); // ====================================== //
            // Render                                 //
            // ====================================== //

            return _react["default"].createElement(Component, (0, _extends2["default"])({}, statesDefinedToProps, dispatchersDefined, this.props));
          }
        }]);
        return Wrapper;
      }(_react["default"].Component)
    );
  };
}