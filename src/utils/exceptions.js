export const IsNotObject = label => new Error(`${label}: Requiere a object`)
export const IsNotFunction = label => new Error(`${label}: Requiere a function for callback`)
export const IsNotComponent = label => new Error(`${label}: Requiere a component`)
export const RequireKeyModel = label => new Error(`${label}: Requiere a model key`)
export const ModelNotFound = label => new Error(`${label}: Model not found, remember register your model`)

export default {
  IsNotObject,
  IsNotFunction,
  IsNotComponent,
  RequireKeyModel,
  ModelNotFound
}
