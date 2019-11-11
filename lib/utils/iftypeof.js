"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = iftypeof;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _enum = _interopRequireDefault(require("./enum"));

/**
 *
 * @param {any} data Data for varify
 * @param {any} typePayload Constructor or 'any'
 */
function iftypeof(data) {
  var typePayload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'any';
  var warn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var label = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

  var ExceptionNotTypeOf = function ExceptionNotTypeOf(name) {
    //   eslint-disable-next-line no-console
    if (warn) console.warn("".concat(label, " Payload is not type of ").concat(name, ". Data: "), data);
  };

  if (typePayload !== 'any') {
    if (Array.isArray(typePayload)) {
      var pass = false;

      for (var i = 0; i < typePayload.length; i++) {
        // eslint-disable-next-line valid-typeof
        if ((0, _typeof2["default"])(data) === typePayload[i].name.toLowerCase()) {
          if (typePayload[i].name === 'Object' && Array.isArray(data)) {
            break;
          }

          pass = true;
          break;
        }
      }

      if (!pass) {
        var names = '';

        for (var _i = 0; _i < typePayload.length; _i++) {
          names = names + typePayload[_i].name + ', ';
        }

        ExceptionNotTypeOf("[".concat(names.slice(0, -2), "]"));
        return false;
      }
    } else if (typePayload.name === _enum["default"].name) {
      var values = typePayload.values;
      var _pass = false;

      for (var _i2 = 0; _i2 < values.length; _i2++) {
        if (data === values[_i2]) {
          _pass = true;
          break;
        }
      }

      if (!_pass) {
        ExceptionNotTypeOf("".concat(typePayload.name, "(").concat(typePayload.values.toString(), ")"));
        return false;
      }
    } else if (typePayload.name === 'Array' && Array.isArray(data)) {
      // ExceptionNotTypeOf(typePayload.name)
      return true;
    } else if (typePayload.name === 'Object' && Array.isArray(data)) {
      ExceptionNotTypeOf(typePayload.name);
      return false; // eslint-disable-next-line valid-typeof
    } else if ((0, _typeof2["default"])(data) !== typePayload.name.toLowerCase()) {
      ExceptionNotTypeOf(typePayload.name);
      return false;
    }
  }

  return true;
}