/**
 * Constructor Enum
 * @param  {...any} params Values
 */
function Enum (...params) {
  const name = 'Enum'

  params.map(value => {
    if (typeof value === 'object' || typeof value === 'function') throw new Error('Enum: only values')
  })

  return {
    values: params,
    name
  }
}

Object.defineProperty(Enum, 'name', {
  value: 'Enum',
  configurable: false,
  writable: true,
  enumerable: true
})

export default Enum
