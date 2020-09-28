"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Redity;
exports.connect = connect;
Object.defineProperty(exports, "States", {
  enumerable: true,
  get: function get() {
    return _states["default"];
  }
});
exports.setProps = exports.getPayload = exports.getCapsuleByKeyName = exports.createCapsule = exports.Capsule = exports.getProps = exports.render = void 0;

var _store = _interopRequireDefault(require("./store"));

var _createConnect = _interopRequireDefault(require("./core/createConnect"));

var _renderManagement2 = _interopRequireDefault(require("./core/renderManagement"));

var _makeCapsule2 = _interopRequireDefault(require("./capsule/makeCapsule"));

var _toolsCapsule2 = _interopRequireDefault(require("./capsule/toolsCapsule"));

var _states = _interopRequireDefault(require("./store/states"));

/**
 * @version 1.0.0-alpha.1
 * Redity library
 */
function Redity() {}

var _localStores = (0, _store["default"])(),
    registersOfConnections = _localStores.registersOfConnections,
    hideChildrens = _localStores.hideChildrens,
    templateChildrens = _localStores.templateChildrens;

var _renderManagement = (0, _renderManagement2["default"])(registersOfConnections),
    render = _renderManagement.render;

exports.render = render;

var _toolsCapsule = (0, _toolsCapsule2["default"])(registersOfConnections, hideChildrens, templateChildrens),
    getCapsuleByKeyName = _toolsCapsule.getCapsuleByKeyName,
    getProps = _toolsCapsule.getProps,
    setProps = _toolsCapsule.setProps,
    getPayload = _toolsCapsule.getPayload;
/**
   * @param {string|number} keyName
   * @param {OptionConnect|function(object):OptionConnect=} optionControl
   */


exports.getPayload = getPayload;
exports.setProps = setProps;
exports.getProps = getProps;
exports.getCapsuleByKeyName = getCapsuleByKeyName;

function connect(keyName, optionControl) {
  var connection = (0, _createConnect["default"])(registersOfConnections, hideChildrens, templateChildrens);
  return connection(keyName, optionControl);
}

var _makeCapsule = (0, _makeCapsule2["default"])(registersOfConnections, connect),
    Capsule = _makeCapsule.Capsule,
    createCapsule = _makeCapsule.createCapsule;

exports.createCapsule = createCapsule;
exports.Capsule = Capsule;
Redity.connect = connect;
Redity.render = render;
Redity.getProps = getProps;
Redity.Capsule = Capsule;
Redity.createCapsule = createCapsule;
Redity.getCapsuleByKeyName = getCapsuleByKeyName;
Redity.getPayload = getPayload;
Redity.setProps = setProps;
Redity.States = _states["default"];