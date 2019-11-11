"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.symActionResendEvent = exports.symActionListener = exports.symActionLoading = exports.symStatesListener = exports.symStatesRegisters = exports.symStateDeep = exports.symStateHistories = exports.symStateHistory = exports.symStateCountChanges = exports.symStateOnChange = exports.symStateVal = exports.symStateType = exports.symSubscriberListener = exports.symSubscriberInit = exports.symSubscriberGenerate = exports.symSubscriberMapStateToProps = exports.symRedityGetModel = exports.symRedityModels = exports.symModelCreate = exports.symBCLogBlock = exports.symBCSetBlock = exports.symLogVerify = exports.symLogManufacture = exports.symLogType = exports.symLogBody = void 0;
// ====================================== //
// Symbols of Log Object                  //
// ====================================== //
var symLogBody = Symbol('Log: body[Object]');
exports.symLogBody = symLogBody;
var symLogType = Symbol('Log: type[String]');
exports.symLogType = symLogType;
var symLogManufacture = Symbol('Log: manufacture[Function]');
exports.symLogManufacture = symLogManufacture;
var symLogVerify = Symbol('Log: verify[Function]'); // ====================================== //
// Symbols of BlockCode                   //
// ====================================== //

exports.symLogVerify = symLogVerify;
var symBCSetBlock = Symbol('BlockCode: setBlock[Function]');
exports.symBCSetBlock = symBCSetBlock;
var symBCLogBlock = Symbol('BlockCode: log[Boolean]'); // ====================================== //
// Symbol of Model                        //
// ====================================== //

exports.symBCLogBlock = symBCLogBlock;
var symModelCreate = Symbol('Model: create[Function]'); // ====================================== //
// Symbol of Index                        //
// ====================================== //

exports.symModelCreate = symModelCreate;
var symRedityModels = Symbol('Redity: models[Function]');
exports.symRedityModels = symRedityModels;
var symRedityGetModel = Symbol('Redity: getModel[Function]'); // ====================================== //
// Symbol of Subcriber                    //
// ====================================== //

exports.symRedityGetModel = symRedityGetModel;
var symSubscriberMapStateToProps = Symbol('Subscriber: mapStateToProps[Function]');
exports.symSubscriberMapStateToProps = symSubscriberMapStateToProps;
var symSubscriberGenerate = Symbol('Subscriber: generate[Function]');
exports.symSubscriberGenerate = symSubscriberGenerate;
var symSubscriberInit = Symbol('Subscriber: init[Function]');
exports.symSubscriberInit = symSubscriberInit;
var symSubscriberListener = Symbol('Subscriber: Listener[Function]'); // ====================================== //
// Symbol of State                        //
// ====================================== //

exports.symSubscriberListener = symSubscriberListener;
var symStateType = Symbol('State: type[String]');
exports.symStateType = symStateType;
var symStateVal = Symbol('State: val[Any]');
exports.symStateVal = symStateVal;
var symStateOnChange = Symbol('State: onChange[Function]');
exports.symStateOnChange = symStateOnChange;
var symStateCountChanges = Symbol('State: countChanges[Number]');
exports.symStateCountChanges = symStateCountChanges;
var symStateHistory = Symbol('State: history[Bool]');
exports.symStateHistory = symStateHistory;
var symStateHistories = Symbol('State histories[Array]');
exports.symStateHistories = symStateHistories;
var symStateDeep = Symbol('State deep[Number]'); // ====================================== //
// Symbol of States                       //
// ====================================== //

exports.symStateDeep = symStateDeep;
var symStatesRegisters = Symbol('States: registers[Map]');
exports.symStatesRegisters = symStatesRegisters;
var symStatesListener = Symbol('States: listener[Function]'); // ====================================== //
// Symbol of Action                       //
// ====================================== //

exports.symStatesListener = symStatesListener;
var symActionLoading = Symbol('Action: loading[Boolean]');
exports.symActionLoading = symActionLoading;
var symActionListener = Symbol('Action Listener[function]');
exports.symActionListener = symActionListener;
var symActionResendEvent = Symbol('Action resendEvent[function]');
exports.symActionResendEvent = symActionResendEvent;