import Enum from '../../src/utils/enum'
import iftypeof from '../../src/utils/iftypeof'

describe('ifTypeOf', () => {
  it('type any', () => {
    expect(iftypeof('string')).toBeTruthy()
    expect(iftypeof(true)).toBeTruthy()
    expect(iftypeof(Boolean)).toBeTruthy()
    expect(iftypeof(Array)).toBeTruthy()
    expect(iftypeof([String, Object])).toBeTruthy()
  })

  it('type Constructor', () => {
    expect(iftypeof('string Data', String)).toBeTruthy()
    expect(iftypeof('string Data 2', Object, false)).toBeFalsy()
    expect(iftypeof([], Object, false)).toBeFalsy()
    expect(iftypeof(true, Boolean)).toBeTruthy()
  })

  it('type Array Constructor', () => {
    expect(iftypeof('string Data', [Boolean, String])).toBeTruthy()
    expect(iftypeof(['data', 2], [String, Number], false)).toBeFalsy()
    expect(iftypeof({ name: 'Juan' }, [Array, Map], false)).toBeFalsy()
    expect(iftypeof([], [Number, String, Object], false)).toBeFalsy()
  })

  it('type Enum', () => {
    expect(iftypeof('value1', Enum('value2', 'value1'))).toBeTruthy()
    expect(iftypeof('value3', Enum('value2', 'value1'), false)).toBeFalsy()
    expect(iftypeof(15, Enum(10, true), false)).toBeFalsy()
    expect(iftypeof(true, Enum(10, false, 'false', 'true'), false)).toBeFalsy()
    expect(iftypeof(45.9, Enum(10, true, 45.9, 'other data'), false)).toBeTruthy()
  })
})
