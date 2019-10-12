import connect from '../../src/hoc/functional'
import { ModelNotFound } from '../../src/utils/exceptions'

describe('Connect: contructor', () => {
  it('Is function', () => {
    expect(typeof connect).toBe('function')
  })

  it('Initial', () => {
    expect(() => { connect('keyModelNoExist') }).toThrow(ModelNotFound('connect'))
  })
})
