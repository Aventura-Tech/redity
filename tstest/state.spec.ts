import State from '../src/state'
import StateOption from '../src/types/StateOption'

describe('State: Basic', () => {
  const option: StateOption = new StateOption()
  const state = new State('user', 'Pablo', option)
  
  it('init', () => {
    expect(state.id).toBe('user')
    expect(state.val).toBe('Pablo')
  })

  it('Change value', done => {
    state.onChange = payload => {
      expect(payload).toMatchObject({
        name: 'Erick'
      })
      done()
    }

    state.changeValue({ name: 'Erick' })
  })

  it('Equal Value', () => {
    state.changeValue({ name: 'Erick' })
    state.changeValue({ name: 'Erick' })
    expect(state.countChanges).toEqual(1)
  })

})
