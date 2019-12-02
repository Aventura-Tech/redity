class StateOption{
  public history: boolean = false
  public typeValue: any = null
  public warn: boolean = false

  private _deep: number = 2

  public set deep(limit: number){
    if(limit > 100) {
      console.error('Option: "deep" can only receive a maximum value of 100')
      return
    }
    this._deep = limit
  }

  public get deep(): number{
    return this._deep
  }
}

export default StateOption
