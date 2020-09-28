"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createHash;

function createHash() {
  return Math.random().toString(36).substr(2, 9);
}