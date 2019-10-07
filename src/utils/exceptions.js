export default Object.freeze({
  IsNotObject: label => new Error(`${label}: Requiere a object`),
  IsNotFunction: label => new Error(`${label}: Requiere a function for callback`)
})
