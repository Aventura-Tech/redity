"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _log = _interopRequireDefault(require("./utils/log"));

var _symbols = require("./utils/symbols");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _default() {
  var _this = this;

  var dev = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  // ====================================== //
  // PRIVATE PROPERTIES                     //
  // ====================================== //
  Object.defineProperty(this, '_dev', {
    value: dev,
    enumerable: false,
    configurable: false,
    writable: true
  });
  var logStart = false;
  var logEnd = false;
  var started = false;
  var finished = false;
  var blockCurrent = null;
  var index = -1;
  var timeStart = 0;
  var catchAgain = true;
  var hide = true;
  var Exception = {
    IsStarted: function IsStarted() {
      return new Error('Blockcode is already started');
    },
    NotStarted: function NotStarted() {
      return new Error('Blockcode has not been started');
    },
    IsFinished: function IsFinished() {
      return new Error('Blockcode has already been finalized');
    },
    BlockNotFound: function BlockNotFound() {
      return new Error('Start at least one block');
    },
    CatchAgain: function CatchAgain() {
      return new Error('You cannot make more than one capture followed');
    },
    BlockDescription: function BlockDescription() {
      return new Error('The block require a description');
    }
  };
  var blocks = new Map(); // ====================================== //
  // PUBLIC PROPERTY                        //
  // ====================================== //
  // BlockCode Status

  Object.defineProperty(this, 'Status', {
    value: Object.freeze({
      SUCCESS: 'Success',
      RESOLVED: 'Resolved',
      FAIL: 'Fail',
      RUNNING: 'Running'
    }),
    writable: false,
    configurable: false
  });
  Object.defineProperty(this, 'id', {
    value: Date.now(),
    writable: false,
    enumerable: true,
    configurable: false
  });
  Object.defineProperty(this, 'num', {
    get: function get() {
      return index + 1;
    },
    configurable: false,
    enumerable: true
  });
  Object.defineProperty(this, 'sizeDone', {
    get: function get() {
      return blocks.size;
    },
    configurable: false,
    enumerable: true
  }); // ====================================== //
  // PRIVATE METHODS                        //
  // ====================================== //

  /**
   * Set current block
   * @param {string} status Block Status
   * @param {any} catchData Data additional of Catch
   */

  this[_symbols.symBCSetBlock] = function (status) {
    var catchData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    blockCurrent.time = Date.now() - timeStart + 'ms';
    blockCurrent.status = status;
    blockCurrent.catchData = catchData;
    blocks.set(blockCurrent.id, _objectSpread({}, blockCurrent));
    if (!blockCurrent[_symbols.symBCLogBlock]) return;
    if (!_this._dev) return;
    var log;

    switch (status) {
      case _this.Status.SUCCESS:
        log = _log["default"].info;
        break;

      case _this.Status.RESOLVED:
        log = _log["default"].warn;
        break;

      default:
        log = _log["default"].error;
    }

    log({
      label: "Block - ".concat(status),
      message: blockCurrent.description,
      data: blockCurrent
    });
  }; // ====================================== //
  // PUBLIC METHODS                         //
  // ====================================== //

  /**
   * Start blockcode
   * @param {string} name You can assign a name to identify this BlockCode
   * @param {any} referenceData Reference data
   */


  this.start = function () {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var referenceData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (finished) throw Exception.IsFinished();
    if (started) throw Exception.IsStarted();
    started = true;

    if (_this._dev && !hide) {
      if (logStart) {
        _log["default"].norm({
          label: 'Blockcode - Start',
          message: 'Running...',
          data: {
            id: _this.id,
            name: name,
            referenceData: referenceData
          }
        });
      }
    }
  };
  /**
   * Generate un code block
   * @param {string} description A description for this block
   * @param {any} ref A reference
   */


  this.block = function (description) {
    var ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    if (!description) throw Exception.BlockDescription();
    if (finished) throw Exception.IsFinished();
    if (!started) throw Exception.NotStarted();

    if (blockCurrent !== null && blockCurrent.status === _this.Status.RUNNING) {
      _this[_symbols.symBCSetBlock](_this.Status.SUCCESS);
    }

    index++;
    blockCurrent = (0, _defineProperty2["default"])({
      id: parseInt(Date.now() / 9000000) + index,
      blockcode_id: _this.id,
      index: index,
      num: index + 1,
      description: description,
      ref: ref,
      time: 0,
      status: _this.Status.RUNNING,
      "catch": null
    }, _symbols.symBCLogBlock, !hide);
    timeStart = Date.now();
    catchAgain = true;
  };
  /**
   * Get the current block
   */


  this.getCurrent = function () {
    if (finished) throw Exception.IsFinished();
    if (!started) throw Exception.NotStarted();
    return _objectSpread({}, blockCurrent);
  };
  /**
   * Catch code block
   * @param info Information Additional at catch
   */


  this["catch"] = function () {
    var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    if (finished) throw Exception.IsFinished();
    if (!started) throw Exception.NotStarted();
    if (!blockCurrent) return false;
    if (!catchAgain) throw Exception.CatchAgain();

    _this[_symbols.symBCSetBlock](_this.Status.FAIL, info);

    catchAgain = false;
    return true;
  };
  /**
   * Resolve code block catched
   * @returns {boolean}
   */


  this.resolve = function () {
    if (finished) throw Exception.IsFinished();
    if (!started) throw Exception.NotStarted();
    if (!blockCurrent) throw Exception.BlockNotFound();
    if (blockCurrent.status !== _this.Status.FAIL) return false;
    blockCurrent.time = Date.now() - timeStart + 'ms';
    blockCurrent.status = _this.Status.RESOLVED;
    blocks.set(blockCurrent.id, _objectSpread({}, blockCurrent));

    if (_this._dev && !hide) {
      _log["default"].warn({
        label: "Block - ".concat(_this.Status.RESOLVED),
        message: 'has been resolved',
        data: blockCurrent
      });
    }

    return true;
  };
  /**
   * Finish blockcode
   */


  this.end = function () {
    if (finished) throw Exception.IsFinished();
    if (!started) throw Exception.NotStarted(); // set last block

    if (blockCurrent && blockCurrent.status === _this.Status.RUNNING) _this[_symbols.symBCSetBlock](_this.Status.SUCCESS);
    started = false;
    finished = true;
    var listBlocks = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = blocks.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
            key = _step$value[0],
            value = _step$value[1];

        listBlocks[key] = value;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (_this._dev && !hide) {
      if (logEnd) {
        _log["default"].norm({
          label: 'BlockCode - Finished',
          message: "".concat(blocks.size, " blocks"),
          data: listBlocks
        });
      }
    }

    return listBlocks;
  };
  /**
   * Hide console
   */


  this.hide = function () {
    if (!_this._dev) return;
    hide = true;
  };
  /**
   * Unhide console
   */


  this.show = function () {
    if (!_this._dev) return;
    hide = false;
  };
}