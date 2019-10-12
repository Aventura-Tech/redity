// ====================================== //
// Symbols of Log Object                  //
// ====================================== //
export const symLogBody = Symbol('Log: body[Object]')
export const symLogType = Symbol('Log: type[String]')
export const symLogManufacture = Symbol('Log: manufacture[Function]')
export const symLogVerify = Symbol('Log: verify[Function]')

// ====================================== //
// Symbols of BlockCode                   //
// ====================================== //
export const symBCSetBlock = Symbol('BlockCode: setBlock[Function]')
export const symBCLogBlock = Symbol('BlockCode: log[Boolean]')

// ====================================== //
// Symbol of Model                        //
// ====================================== //
export const symModelCreate = Symbol('Model: create[Function]')

// ====================================== //
// Symbol of Index                        //
// ====================================== //
export const symRedityModels = Symbol('Redity: models[Function]')
export const symRedityGetModel = Symbol('Redity: getModel[Function]')

// ====================================== //
// Symbol of Subcriber                    //
// ====================================== //
export const symSubscriberMapStateToProps = Symbol('Subscriber: mapStateToProps[Function]')
export const symSubscriberGenerate = Symbol('Subscriber: generate[Function]')
export const symSubscriberInit = Symbol('Subscriber: init[Function]')
export const symSubscriberListener = Symbol('Subscriber: Listener[Function]')

// ====================================== //
// Symbol of State                        //
// ====================================== //
export const symStateType = Symbol('State: type[String]')
export const symStateVal = Symbol('State: val[Any]')
export const symStateOnChange = Symbol('State: onChange[Function]')
export const symStateCountChanges = Symbol('State: countChanges[Number]')
export const symStateHistory = Symbol('State: history[Array]')

// ====================================== //
// Symbol of States                       //
// ====================================== //
export const symStatesRegisters = Symbol('States: registers[Map]')
export const symStatesListener = Symbol('States: listener[Function]')
