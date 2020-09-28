"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = optionControlConnectManagement;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// ====================================== //
// Funcionalidad en discusión             //
// ====================================== //
function optionControlConnectManagement() {
  /** @type {function(object):OptionConnect} */
  var currentOptionConnect = null;
  /** @type {OptionConnect} */

  var option = {
    id: null,
    props: {},
    payload: {}
  };

  function defaultOptionConnect() {
    return option;
  }
  /**
   * @param {OptionConnect|function(object):OptionConnect} optionConnect
   */


  function setOptionConnect(optionConnect) {
    if (typeof optionConnect === 'function') {
      currentOptionConnect = optionConnect;
    } else if ((0, _typeof2["default"])(optionConnect) === 'object' && !Array.isArray(optionConnect)) {
      currentOptionConnect = function currentOptionConnect() {
        return _objectSpread({}, option, {}, optionConnect);
      };
    } else {
      throw new Error('optionConnect is not a function or object');
    }
  }
  /**
   * ProcessProps
   * @param {object} props
   * @returns {OptionConnect}
   */


  function processOptionControlConnect(props) {
    var currentOption = currentOptionConnect(props);

    var optionConnect = _objectSpread({}, option, {}, currentOption, {
      props: _objectSpread({}, props, {}, currentOption.props)
    });

    return optionConnect;
  }

  return {
    defaultOptionConnect: defaultOptionConnect,
    setOptionConnect: setOptionConnect,
    processOptionControlConnect: processOptionControlConnect
  };
}