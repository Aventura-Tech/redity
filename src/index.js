import States from './states'
import Log from './utils/log'
import Blockcode from './blockcode'
import Model from './model'
import connect, { connectFaker } from './hoc'
import Subscriber from './subscriber'
import { symRedityModels, symModelCreate } from './utils/symbols'
import { IsNotFunction } from './utils/exceptions'
import * as Access from './utils/access'
/**
 * Redity class
 */
function Redity () {}

Redity.config = {
  dev: true,
  blockcodeLog: true
}
/**
 * Version Redity
 */
Redity.version = '1.0.0'

Redity[symRedityModels] = new Map()
/**
* Register model
* @param {string} key Key for model
* @param {function} modelContructor model
* @returns {funtion}
*/
Redity.register = (key, modelContructor) => {
  if (typeof key !== 'string') throw new Error('Require a key for register model')
  if (typeof modelContructor !== 'function') throw IsNotFunction('register')
  const model = new Model(key)
  modelContructor(model)
  model[symModelCreate](Redity.config.dev)
  Redity[symRedityModels].set(key, model)
  return {
    register: Redity.register,
    get: () => model
  }
}

Redity.model = {}

Redity.model.all = () => {
  const models = {}
  for (const [key, model] of Redity[symRedityModels].entries()) {
    models[key] = model
  }
  return models
}

/** Return one model
 * @param {string} key
 */
Redity.model.get = key => {
  const has = Redity[symRedityModels].has(key)
  if (!has) return has
  return Redity[symRedityModels].get(key)
}

Redity.model.private = () => {
  const modelsPrivate = {}
  for (const [key, model] of Redity[symRedityModels].entries()) {
    if (model.access === Access.PRIVATE) {
      modelsPrivate[key] = model
    }
  }
  return modelsPrivate
}

Redity.model.protected = () => {
  const modelsPrivate = {}
  for (const [key, model] of Redity[symRedityModels].entries()) {
    if (model.access === Access.PROTECTED) {
      modelsPrivate[key] = model
    }
  }
  return modelsPrivate
}

Redity.model.public = () => {
  const modelsPrivate = {}
  for (const [key, model] of Redity[symRedityModels].entries()) {
    if (model.access === Access.PUBLIC) {
      modelsPrivate[key] = model
    }
  }
  return modelsPrivate
}

export default Object.freeze(Redity)

export {
  States,
  Model,
  Log,
  Blockcode,
  connect,
  Subscriber,
  connectFaker,
  Access
}
