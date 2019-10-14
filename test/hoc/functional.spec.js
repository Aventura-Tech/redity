import connect from '../../src/hoc/functional'

describe('Connect: contructor', () => {
  it('Is function', () => {
    expect(typeof connect).toBe('function')
  })

  it('Initial', () => {
    expect(() => { connect('keyModelNoExist') }).toEqual(expect.any(Function))
  })
})
