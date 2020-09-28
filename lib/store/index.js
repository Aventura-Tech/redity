"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = localStores;

function localStores() {
  /** @type {RegistersOfConnections} */
  var registersOfConnections = new Map();
  /** @type {HideChildrens} */

  var hideChildrens = new Map();
  /** @type {TemplateChildrens} */

  var templateChildrens = new Map();
  return {
    registersOfConnections: registersOfConnections,
    hideChildrens: hideChildrens,
    templateChildrens: templateChildrens
  };
}