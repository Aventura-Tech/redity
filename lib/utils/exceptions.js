"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ModelNotFound = exports.RequireKeyModel = exports.IsNotComponent = exports.IsNotFunction = exports.IsNotObject = void 0;

var IsNotObject = function IsNotObject(label) {
  return new Error("".concat(label, ": Requiere a object"));
};

exports.IsNotObject = IsNotObject;

var IsNotFunction = function IsNotFunction(label) {
  return new Error("".concat(label, ": Requiere a function for callback"));
};

exports.IsNotFunction = IsNotFunction;

var IsNotComponent = function IsNotComponent(label) {
  return new Error("".concat(label, ": Requiere a component"));
};

exports.IsNotComponent = IsNotComponent;

var RequireKeyModel = function RequireKeyModel(label) {
  return new Error("".concat(label, ": Requiere a model key"));
};

exports.RequireKeyModel = RequireKeyModel;

var ModelNotFound = function ModelNotFound(label) {
  return new Error("".concat(label, ": Model not found, remember register your model"));
};

exports.ModelNotFound = ModelNotFound;
var _default = {
  IsNotObject: IsNotObject,
  IsNotFunction: IsNotFunction,
  IsNotComponent: IsNotComponent,
  RequireKeyModel: RequireKeyModel,
  ModelNotFound: ModelNotFound
};
exports["default"] = _default;