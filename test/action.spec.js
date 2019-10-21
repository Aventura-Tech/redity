import Action from './../src/action'
import { symActionKey, symActionDescription, symActionListener, symActionResendEvent, symActionLoading } from './../src/utils/symbols'

describe('Action: contructor', () => {
  it('Properties and Method', () => {
    const action = new Action('testAction', 'This is a testing')
    expect(action).toMatchObject({
      types: expect.any(Object),
      options: expect.any(Object),
      [symActionKey]: expect.any(String),
      [symActionDescription]: expect.any(String),
      [symActionLoading]: expect.any(Boolean),
      [symActionListener]: expect.any(Function),
      [symActionResendEvent]: expect.any(Function)
    })

    expect(action).toHaveProperty('done')
    expect(action).toHaveProperty('dispatch')
    expect(action).toHaveProperty('onListen')
    expect(action).toHaveProperty('memoryThen')
  })
})

describe('Action: Logic', () => {
  it('Basic', async () => {
    const action = new Action('key1', 'This is a description')
    await new Promise(resolve => {
      action.onListen = (payload, header) => {
        expect(header).toMatchObject({
          key: 'key1',
          description: 'This is a description',
          done: expect.any(Function)
        })
        expect(payload).toBe('Data')
        expect(action[symActionLoading]).toBeTruthy()
        header.done()
        expect(action[symActionLoading]).toBeFalsy()
        resolve()
      }

      action.dispatch('Data')
    })
    expect(action[symActionLoading]).toBeFalsy()
  })

  it('Action type wait(default)', () => {
    let count = 0
    const action = new Action('key1', 'description')

    action.onListen = () => count++

    expect(action.dispatch({})).toBeTruthy()
    expect(action.dispatch([])).toBeFalsy()
    expect(action.dispatch('')).toBeFalsy()
    action.done()
    expect(action.dispatch('dasd')).toBeTruthy()
    expect(count).toBe(2)
  })

  it('Action type pass', () => {
    let count = 0
    const action = new Action('key1', 'description', {
      type: 'pass'
    })

    action.onListen = () => count++

    expect(action.dispatch({})).toBeTruthy()
    expect(action[symActionLoading]).toBeFalsy()
    expect(action.dispatch([])).toBeTruthy()
    expect(action.dispatch('asd')).toBeTruthy()
    expect(action[symActionLoading]).toBeFalsy()
    action.done()
    expect(action[symActionLoading]).toBeFalsy()
    expect(action.dispatch({ name: 'Seba' })).toBeTruthy()
    expect(count).toBe(4)
  })

  it('Action type then', async () => {
    let count = 0
    const action = new Action('key1', 'description', {
      type: 'then'
    })

    action.onListen = () => count++

    expect(action.dispatch({})).toBeTruthy()
    expect(action.dispatch([])).toBeFalsy()
    expect(action.dispatch({ name: 'user' })).toBeFalsy()
    expect(action.memoryThen.length).toBe(2)
    expect(action[symActionLoading]).toBeTruthy()
    action.done() // resolve first action
    action.done() // resolve last action
    expect(action[symActionLoading]).toBeFalsy()
    expect(action.dispatch('other data')).toBeTruthy()
    expect(action.memoryThen.length).toBe(0)
    expect(count).toBe(3)
  })

  it('Data Payload', () => {
    let count = 0
    const action = new Action('key1', 'description', {
      payload: [Object, Boolean]
    })

    action.onListen = () => count++

    expect(action.dispatch('String')).toBeFalsy()
    expect(action.dispatch({ name: 'Hola Mundo :D' })).toBeTruthy()
    expect(count).toBe(1)
  })
})

describe('Action: Concept', () => {
  it('Test', () => {
    const action = new Action('testAction', 'This is a testing')
    action.onListen = () => {

    }
    expect(action.memoryThen).toEqual(expect.any(Array))
  })
})
