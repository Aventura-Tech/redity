import { StateTypes } from './Enum'
class DispatchOption{
  public defaultValue: any = null
  public type: StateTypes = StateTypes.WAIT
  public disable: boolean = false
  public typeValue: any = null
}

export default DispatchOption