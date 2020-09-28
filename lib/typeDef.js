/**
 * @typedef {object} DataToolsConnect
 * @property {string|number} keyName
 * @property {object} props
 * @property {boolean} memory
 * @property {function=} children
 * @property {boolean} waiting
 * @property {object} payload
 * @property {function(object):void} render
 */

/**
  * @typedef {Map<string|number, DataToolsConnect>} RegistersOfConnections
  */

/**
 * @typedef {object} PropsCapsule
 * @property {string|number} keyName
 * @property {object=} payload
 * @property {function(object):any} children
 */

/**
 * @typedef {Map<string|number, function>} TemplateChildrens
 */

/**
 * @typedef {Map<string|number, Boolean>} HideChildrens
 */

/**
  * @typedef {object} OptionConnect
  * @property {string|number=} id
  * @property {object=} props
  * @property {object=} payload
  */

/**
 * @typedef {function} CreateStore
 * @param {string} keyName
 * @param {object} store
 * @returns {import('./store/localStore').default}
 */
"use strict";