import Actions from '../src/actions'
import Exceptions from '../src/utils/exceptions'
const { IsNotObject, IsNotFunction } = Exceptions
const data = {
  action1: 'This is a Action',
  action2: 'This is other Action',
  action3: 'This is last Action'
}

describe('Actions: contructor', () => {
  it('Instance', () => {
    expect(() => new Actions()).toThrow(IsNotObject('Actions parameter'))
    expect(() => new Actions('Example')).toThrow(IsNotObject('Actions parameter'))
    expect(() => new Actions([])).toThrow(IsNotObject('Actions parameter'))
  })

  it('has', () => {
    const actions = new Actions(data)
    expect(actions).toHaveProperty('onListen')
    expect(actions).toHaveProperty('size')
    expect(actions).toHaveProperty('get')
  })

  it('Property', () => {
    const actions = new Actions(data)
    const propAndMethods = {
      onListen: undefined,
      size: expect.any(Number),
      get: expect.any(Function)
    }
    expect(actions).toMatchObject(propAndMethods)
  })
})

describe('Actions: Errors', () => {
  const actions = new Actions(data)
  it('Listener on', () => {
    expect(() => {
      actions.onListen = 'String'
    }).toThrow(IsNotFunction('On property'))
    expect(() => {
      actions.onListen = {}
    }).toThrow(IsNotFunction('On property'))
    expect(() => {
      actions.onListen = []
    }).toThrow(IsNotFunction('On property'))
    expect(() => {
      actions.onListen = function () {}
    })
  })
})

describe('Actions: Concept', () => {
  it('on', done => {
    const actions = new Actions(data)
    expect(actions.size).toBe(3)
    let countListen = 0
    actions.onListen = function (payload, action) {
      expect(payload).toEqual(expect.anything())
      expect(action).toMatchObject({
        key: expect.any(String),
        description: expect.any(String)
      })
      countListen++
    }

    const listActions = actions.get()
    expect(listActions).toMatchObject({
      action1: expect.any(Function),
      action2: expect.any(Function),
      action3: expect.any(Function)
    })
    const countList = Object.keys(listActions)
    expect(countList.length).toBe(3)
    listActions.action1('Anything')
    listActions.action2({})
    expect(countListen).toBe(2)
    done()
  })
})
