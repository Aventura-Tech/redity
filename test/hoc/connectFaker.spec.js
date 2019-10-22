import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import connectFaker from '../../src/hoc/connectFaker'

describe('Connect Faker: toProps', () => {
  it('connect', () => {
    expect(connectFaker('ModelKey')).toEqual(expect.any(Function))
  })

  it('connect with mapStateToProps', () => {
    const mapStateToProps = () => ({
      user: 'userTest'
    })
    expect(connectFaker('ModelKey', mapStateToProps)).toEqual(expect.any(Function))
  })

  it('connect with mapDispatchToProps', () => {
    const mapDispatchToProps = () => ({
      action: 'This is action dispatch'
    })

    expect(connectFaker('ModelKey', false, mapDispatchToProps)).toEqual(expect.any(Function))
  })
})

function Component () {
  return <div>Data</div>
}
describe('ConnectFaker: Wrapper', () => {
  beforeAll(() => {
    Component.propTypes = {
      name: PropTypes.string.isRequired,
      changeName: PropTypes.func.isRequired,
      example: PropTypes.string.isRequired
    }
  })

  it('connect', () => {
    const fun = connectFaker('MdelKeyOther')
    expect(fun(Component)).toEqual(expect.any(Function))
  })

  it('expect propTypes Component', () => {
    const mapStateToProps = () => ({
      name: 'Erick'
    })

    const mapDispatchToProps = () => ({
      changeName: 'This is an action'
    })

    const Wrapper = connectFaker('MdelKeyOther', mapStateToProps, mapDispatchToProps)(Component)

    const wrapperComponent = mount(<Wrapper example='This is an string for Component connected' />)
    expect(wrapperComponent.prop('example')).toBe('This is an string for Component connected')
  })
})
