import React from 'react'
import connect from '../../src/hoc/class'

describe('Connect: contructor', () => {
  it('Params', () => {
    expect(() => connect()).toThrow(Error)
    const Wrapper = connect('keyExample')
    expect(Wrapper).toEqual(expect.any(Function))
    expect(() => Wrapper()).toThrow(Error)
    expect(Wrapper(<div />))
  })
})
