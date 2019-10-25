import Subscriber from '../src/subscriber'
import States from '../src/states'
import { symSubscriberInit } from '../src/utils/symbols'

describe('Subscriber', () => {
  const states = new States()
  states.init({
    name: 'Erick',
    email: 'test@gmail.com'
  })

  const mapStateToProps = currentStates => ({
    name: currentStates.name
  })

  it('expect instance', () => {
    expect(new Subscriber('any', () => {}))
    expect(new Subscriber(false, () => {}))
    expect(() => new Subscriber(true, () => {})).toThrow()
  })

  it('expect: contructor', () => {
    const subcriber = new Subscriber(false, mapStateToProps)
    expect(subcriber[symSubscriberInit](states.get()))
  })
})
