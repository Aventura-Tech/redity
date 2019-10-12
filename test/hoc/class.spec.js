import connect from '../../src/hoc/class'
import { ModelNotFound } from '../../src/utils/exceptions'

describe('Connect: contructor', () => {
  it('Initial', () => {
    expect(() => { connect('keyModelNoExist') }).toThrow(ModelNotFound('connect'))
  })
})
