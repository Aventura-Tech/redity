/**
 * Constructor Enum
 * @param  {...any} params Values
 */
export default function (...params) {
  this.type = 'enum'
  this.id = Date.now()

  const types = params.map((val, index) => ({
    index,
    num: index + 1,
    val
  }))
  return function () {
    return types
  }
}
