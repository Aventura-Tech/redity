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
    const actions = new Actions()
    expect(() => actions.init()).toThrow(IsNotObject('Actions parameter'))
    expect(() => actions.init('Example')).toThrow(IsNotObject('Actions parameter'))
    expect(() => actions.init([])).toThrow(IsNotObject('Actions parameter'))
  })

  it('has', () => {
    const actions = new Actions()
    expect(actions).toHaveProperty('init')
    expect(actions).toHaveProperty('onListen')
    expect(actions).toHaveProperty('size')
    expect(actions).toHaveProperty('toMethod')
  })

  it('Property', () => {
    const actions = new Actions()
    actions.init(data)
    const propAndMethods = {
      init: expect.any(Function),
      onListen: undefined,
      size: expect.any(Number),
      toMethod: expect.any(Function)
    }
    expect(actions).toMatchObject(propAndMethods)
  })
})

describe('Actions: Logic', () => {
  const actions = new Actions()
  actions.init(data)
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
  it('Creating and success', done => {
    const actions = new Actions()
    actions.init(data)
    expect(actions.size).toBe(3)
    let countListen = 0
    actions.onListen = function (payload, action, header) {
      expect(payload).toEqual(expect.anything())
      expect(action).toMatchObject({
        key: expect.any(String),
        description: expect.any(String)
      })
      expect(header).toEqual(expect.any(Object))
      countListen++
    }

    const listActions = actions.toMethod()
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

  it('Checking events', done => {
    const actions = new Actions()
    actions.init(data)
    actions.onListen = function (payload, action, header) {
      expect(payload).toEqual(expect.any(Object))
      expect(header).toMatchObject({
        action1: false,
        action2: expect.any(Function),
        action3: false
      })
    }

    const { action2 } = actions.toMethod()
    action2({ name: 'Example' })
    done()
  })
})
