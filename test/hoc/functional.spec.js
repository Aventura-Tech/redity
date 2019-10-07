import React from 'react'
import connect from '../../src/hoc/functional'

describe('Connect: contructor', () => {
  it('Is function', () => {
    expect(typeof connect).toBe('function')
  })

  it('Params', () => {
    expect(() => connect()).toThrow(Error)
    const wrapper = connect('keyExample')
    expect(wrapper).toEqual(expect.any(Function))
    expect(() => wrapper()).toThrow(Error)
    expect(wrapper(<div />)).toEqual(expect.any(Function))
  })
})
