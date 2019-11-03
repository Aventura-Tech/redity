import Action from './../src/action'
import { symActionKey, symActionDefaultValue, symActionListener, symActionResendEvent, symActionLoading } from './../src/utils/symbols'

describe('Action: contructor', () => {
  it('Properties and Method', () => {
    const action = new Action('testAction', 'This is a testing')
    expect(action).toMatchObject({
      types: expect.any(Object),
      options: expect.any(Object),
      [symActionKey]: expect.any(String),
      [symActionDefaultValue]: expect.any(String),
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
    const action = new Action('key1', 'This is a defaultValue')
    await new Promise(resolve => {
      action.onListen = async (payload, header) => {
        expect(header).toMatchObject({
          key: 'key1',
          defaultValue: 'This is a defaultValue',
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

  it('Action type wait(default)', async () => {
    let count = 0
    const action = new Action('key1', 'defaultValue')

    action.onListen = () => count++

    expect(await action.dispatch({})).toBeTruthy()
    expect(await action.dispatch([])).toBeFalsy()
    expect(await action.dispatch('')).toBeFalsy()
    action.done()
    expect(action.dispatch('dasd')).toBeTruthy()
    expect(count).toBe(2)
  })

  it('Action type pass', () => {
    let count = 0
    const action = new Action('key1', 'defaultValue', {
      type: 'pass'
    })

    action.onListen = async () => count++

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
    const action = new Action('key1', 'defaultValue', {
      type: 'then'
    })

    action.onListen = async () => {
      count++
      await new Promise(resolve => {
        setTimeout(() => {
          resolve(true)
        }, 2000)
      })
    }

    action.dispatch({})
    expect(await action.dispatch([])).toBeFalsy()
    expect(await action.dispatch('Working :D')).toBeFalsy()
    expect(count).toBe(1)
    action.done()
    await new Promise(resolve => {
      setTimeout(() => {
        expect(count).toBe(2)
        resolve(true)
      }, 2500)
    })
  })

  it('Data Payload', async () => {
    let count = 0
    const action = new Action('key1', 'defaultValue', {
      payload: [Object, Boolean]
    })

    action.onListen = async () => count++

    expect(await action.dispatch('String')).toBeFalsy()
    expect(await action.dispatch({ name: 'Hola Mundo :D' })).toBeTruthy()
    expect(count).toBe(1)
  })
})

describe('Action: Concept', () => {
  it('Test', () => {
    const action = new Action('testAction', 'This is a testing')
    action.onListen = async () => {

    }
    expect(action.memoryThen).toEqual(expect.any(Array))
  })
})
