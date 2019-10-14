import States from './states'
import Log from './utils/log'
import Blockcode from './blockcode'
import Model from './model'
import connect from './hoc'
import Subscriber from './subscriber'
import { symRedityModels, symRedityGetModel, symModelCreate } from './utils/symbols'
import { IsNotFunction } from './utils/exceptions'
/**
 * Redity class
 */
function Redity () {

}

Redity.config = {
  dev: true,
  blockcodeLog: true
}
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
  return Redity.register
}

Redity[symRedityGetModel] = key => {
  const has = Redity[symRedityModels].has(key)
  if (!has) return has
  return Redity[symRedityModels].get(key)
}

export default Redity

export {
  States,
  Model,
  Log,
  Blockcode,
  connect,
  Subscriber
}
