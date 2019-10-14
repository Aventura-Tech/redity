import connect from '../../src/hoc/class'

describe('Connect: contructor', () => {
  it('Initial', () => {
    expect(() => { connect('keyModelNoExist') }).toEqual(expect.any(Function))
  })
})
