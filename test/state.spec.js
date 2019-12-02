import State from '../src/_state'

describe('State', () => {
  it('Constructor', () => {
    expect(new State({
      val: 'Test',
      key: 'data'
    }))
  })

  it('Values', () => {
    const state = new State({
      val: 'Erick',
      key: 'User'
    })
    expect(state.change('Pablo')).toBe('Pablo')
    expect(state.val).toBe('Pablo')
  })

  it('History', () => {
    const state = new State({
      val: 'Erick',
      key: 'User',
      history: true
    })

    state.change('Juan')
    state.change('Ana')

    expect(state.history).toEqual(expect.arrayContaining(['Erick', 'Juan']))
    expect(state.change.past()).toBe(true)
    expect(state.val).toBe('Juan')
    state.change.past()
    expect(state.val).toBe('Erick')
  })

  it('Type', () => {
    const state = new State({
      val: 'Erick',
      key: 'User',
      typeValue: [String, Boolean],
      warn: false
    })

    expect(state.change(15)).toBe('Erick')
    expect(state.val).toBe('Erick')
  })

  it('Unseen', () => {
    const state = new State({
      val: 15,
      key: 'suma'
    })

    expect(state.change.unseen(95)).toBeTruthy()
  })
})
