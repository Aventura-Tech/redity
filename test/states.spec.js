import States from '../src/states'

const data = {
  aState: 'Example',
  otherState: [],
  moreStates: {}
}

describe('States: initial', () => {
  it('Set data for states', () => {
    const states = new States()
    expect(() => states.init('Example')).toThrow(Error)
    expect(() => states.init([])).toThrow(Error)
    states.init({})
    expect(states.size).toBe(0)
  })
})

describe('Creating States', () => {
  const states = new States()
  states.init(data)

  it('Expect registers property', () => {
    expect(states.size).toBe(3)
  })

  it('Get all States', () => {
    const statesRegistered = states.get()
    expect(typeof statesRegistered).toBe('object')
    expect(Array.isArray(statesRegistered)).toBeFalsy()
    expect(statesRegistered).toHaveProperty('aState')
    expect(statesRegistered).toHaveProperty('otherState')
    expect(statesRegistered).toHaveProperty('moreStates')

    const object = {
      val: expect.anything(),
      changes: 0,
      change: expect.any(Function),
      type: null
    }
    expect(statesRegistered.aState).toMatchObject(object)
    expect(statesRegistered.otherState).toMatchObject(object)
    expect(statesRegistered.moreStates).toMatchObject(object)
  })

  it('Get States Methods', () => {
    const objectMethods = states.toMethod()
    expect(typeof objectMethods).toBe('object')
    expect(Array.isArray(objectMethods)).toBeFalsy()
    const object = {
      aState: expect.any(Function),
      otherState: expect.any(Function),
      moreStates: expect.any(Function)
    }
    expect(objectMethods).toMatchObject(object)
  })
})

describe('Expecting values states creating', () => {
  const newDateObj = {
    name: 'Erick',
    email: 'erick@test.com'
  }
  const newDataArr = ['Apple', 'Banana']

  const states = new States()
  states.init(data)
  const { aState, otherState, moreStates } = states.get()
  const statesFun = states.toMethod()

  it('Current Values', () => {
    expect(aState.val).toBe('Example')
    expect(Array.isArray(otherState.val)).toBeTruthy()
    expect(typeof moreStates.val).toBe('object')
    expect(Array.isArray(moreStates.val)).toBeFalsy()
  })

  it('Changing Values', () => {
    expect(aState.change(2)).toBe(2)
    expect(typeof otherState.change(newDateObj)).toBe('object')
    expect(Array.isArray(moreStates.change(newDataArr))).toBeTruthy()

    expect(aState.val).toBe(2)
    expect(typeof otherState.val).toBe('object')
    expect(Array.isArray(otherState.val)).toBeFalsy()
    expect(Array.isArray(moreStates.val)).toBeTruthy()

    expect(statesFun.aState(true)).toBeTruthy()
    expect(typeof statesFun.otherState('Example String')).toBe('string')
    expect(statesFun.moreStates(879)).toBe(879)

    expect(aState.val).toBeTruthy()
    expect(otherState.val).toBe('Example String')
    expect(moreStates.val).toBe(879)
  })

  it('Count Changes', () => {
    expect(aState.changes).toBe(2)
    expect(otherState.changes).toBe(2)
    expect(moreStates.changes).toBe(2)

    aState.change(newDateObj)
    expect(aState.changes).toBe(3)
  })
})

describe('Expecting Events of the events', () => {
  const states = new States()
  states.init(data)
  const toBe = [
    ['aState', 15],
    ['otherState', true],
    ['moreStates', 'Example String 2'],
    ['otherState', 'Other Data'],
    ['otherState', 97]
  ]
  let toBeIndex = 0

  it('onListener catch Error', () => {
    expect(() => { states.onListen = 'String' }).toThrow(Error)
    expect(() => { states.onListen = 159 }).toThrow(Error)
  })

  it('onListener', done => {
    states.onListen = (key, payload) => {
      expect(key).toBe(toBe[toBeIndex][0])
      expect(payload).toBe(toBe[toBeIndex][1])
      toBeIndex += 1
    }

    const { aState, otherState, moreStates } = states.get()
    const statesFun = states.toMethod()

    aState.change(15)
    otherState.change(true)
    moreStates.change('Example String 2')
    aState.change(15)
    statesFun.aState(15)
    otherState.change('Other Data')
    moreStates.change('Example String 2')
    statesFun.otherState(97)
    done()
  })

  it('Counting Execute onListen', () => {
    expect(toBeIndex).toBe(5)
  })
})
