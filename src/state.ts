import StateOption from './types/StateOption'

class State {
  readonly id: string = 'Hola'
  readonly initValue: any
  private value: any
  private option: StateOption
  private on: Function = () => {}
  private count: number = 0
  private isUnseen: boolean = false

  private histories: Array<any> = []

  constructor(id: string, value: any, option: StateOption){
    this.id = id
    this.value = value
    this.initValue = value
    this.option = option
  }

  public changeValue(payload: any = undefined): void{
    // Si el val es igual al valor de payload
    // pues no será necesario generar el evento.
    // Esto tambien no almacenará en el historial
    if(JSON.stringify(this.value) === JSON.stringify(payload)) return this.value
    // Los nuevos valores pasados por payload
    // se setearán como nuevo valor de State
    // y almacenará en el historial si este
    // está activado en las opciones
    if(this.option.history){
      this.histories.push(payload)
      // El almancen de la historia tiene un limite
      // si es mayor al limite(deep) pues retirará
      // el primer item del historial
      if(this.histories.length > this.option.deep) {
        this.histories.splice(0, 1)
      }
    }

    this.value = payload
    if(!this.isUnseen) this.on(this.value)
    // Contando los cambios
    this.count++
    return payload
  }

  public set onChange(callback: (payload: any) => void) {
    this.on = callback
  }

  public get val(): any{
    return this.value
  }

  public get countChanges(): number{
    return this.count
  }  

  private change(payload: any): any {        
    return this.changeValue(payload)
  }

  private unseen(payload: any): any{
    this.isUnseen = true
    this.changeValue(payload)
    this.isUnseen = false
    return this.value
  }

  private init(unseen: boolean = false): any{
    if(unseen){
      return this.unseen(this.initValue)
    }
    return this.change(this.initValue)
  }

  private past(unseen: boolean = false): any {
    if(this.histories.length > 0){
      const lastValue = this.histories[this.histories.length - 1]
      if(unseen){
        return this.unseen(lastValue)
      }
      return this.change(lastValue)
    }
    else{
      return this.value
    }
  }
}

export default State
