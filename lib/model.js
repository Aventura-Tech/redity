"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _symbols = require("./utils/symbols");

var _exceptions = _interopRequireDefault(require("./utils/exceptions"));

var _access = require("./utils/access");

var _states = _interopRequireDefault(require("./states"));

var _dispatcher = _interopRequireDefault(require("./dispatcher"));

var _blockcode = _interopRequireDefault(require("./blockcode"));

var _subscriber = _interopRequireDefault(require("./subscriber"));

var _index = _interopRequireDefault(require("./index"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var IsNotObject = _exceptions["default"].IsNotObject;
/**
 * Model Class
 * @param {string} key Key Primary
 */

function _default() {
  var _this = this;

  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var config = {
    access: _access.PRIVATE,
    dev: true
  };

  var listener =
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function listener() {
      return _ref.apply(this, arguments);
    };
  }();

  var fail =
  /*#__PURE__*/
  function () {
    var _ref2 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function fail() {
      return _ref2.apply(this, arguments);
    };
  }();

  var initial = function initial() {};

  var states = new _states["default"]();
  var dispatcher = new _dispatcher["default"]();
  var subcribes = new Map();
  Object.defineProperty(this, 'access', {
    get: function get() {
      return config.access;
    },
    set: function set(value) {
      config.access = value;
    },
    configurable: false,
    enumerable: true
  });
  Object.defineProperty(this, 'key', {
    value: key,
    enumerable: true,
    configurable: false,
    writable: false
  }); // ====================================== //
  // Return list methods of states          //
  // ====================================== //

  Object.defineProperty(this, 'states', {
    get: function get() {
      return states.toMethod();
    },
    enumerable: true,
    configurable: false
  });
  /** Return all values states
   * @returns {object}
   */

  this.statesValues = function () {
    return states.values();
  }; // ====================================== //
  // Return list methods of dispatcher         //
  // ====================================== //


  Object.defineProperty(this, 'dispatchers', {
    get: function get() {
      return dispatcher.toMethod();
    },
    enumerable: true,
    configurable: false
  }); // ====================================== //
  // Initial data for the model             //
  // ====================================== //

  Object.defineProperty(this, 'init', {
    /**
     * Initicial states, dispatcher and configuration
     * @param {function} cb Callback
     */
    set: function set(cb) {
      initial = cb;
    },
    enumerable: true,
    configurable: false
  }); // ====================================== //
  // Captura el dispatcher                  //
  // ejecutadas                             //
  // ====================================== //

  Object.defineProperty(this, 'onListen', {
    /**
     * For the events of dispatcher
     * @param {function} cb Callback
     */
    set: function set(cb) {
      listener = cb;
    },
    enumerable: true,
    configurable: false
  }); // ====================================== //
  // Captura los fails generadas en el      //
  // prop onListen                          //
  // ====================================== //

  Object.defineProperty(this, 'onFail', {
    /**
     * For the fails of the dispatcher
     * @param {function} cb Callback
     */
    set: function set(cb) {
      fail = cb;
    },
    enumerable: true,
    configurable: false
  }); // ====================================== //
  // CONSTRUCTOR                            //
  // ====================================== //

  this.capsule = [];
  var init = {
    states: {},
    dispatchers: {}
  };
  var settings = {
    states: {},
    dispatchers: {},
    dev: true,
    access: _access.PRIVATE
  };

  var prepare = function prepare() {
    if ((0, _typeof2["default"])(init.states) !== 'object' || Array.isArray(init.states)) throw IsNotObject('initial');
    if ((0, _typeof2["default"])(settings.states) !== 'object' || Array.isArray(settings.states)) throw IsNotObject('initial');
    if ((0, _typeof2["default"])(init.dispatchers) !== 'object' || Array.isArray(init.dispatchers)) throw IsNotObject('initial');
    if ((0, _typeof2["default"])(settings.dispatchers) !== 'object' || Array.isArray(settings.dispatchers)) throw IsNotObject('initial');
    states.init(init.states, settings.states);
    dispatcher.init(init.dispatchers, settings.dispatchers);
    config.dev = settings.dev;
    config.access = settings.access;
  }; // ====================================== //
  // METHOD PROTECTED                       //
  // ====================================== //


  this[_symbols.symModelCreate] = function () {
    var development = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    initial(init, settings);
    prepare();
    var dev = development ? config.dev : false; // ====================================== //
    // Listen changes values of States        //
    // ====================================== //

    states.onListen = function (key, payload) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = subcribes.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var subscribed = _step.value;

          subscribed[1][_symbols.symSubscriberGenerate](key, payload, states.values());
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
    }; // ====================================== //
    // Listen events by dispatcher            //
    // ====================================== //


    dispatcher.onListen =
    /*#__PURE__*/
    function () {
      var _ref3 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(payload, headerDispatcher, actions) {
        var components, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, _key, subscribed, header;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                components = {};
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context6.prev = 4;

                for (_iterator2 = subcribes.entries()[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  _step2$value = (0, _slicedToArray2["default"])(_step2.value, 2), _key = _step2$value[0], subscribed = _step2$value[1];
                  components[_key] = {
                    props: subscribed.props,
                    hide: function hide() {},
                    unhide: function unhide() {},
                    replace: function replace() {}
                  };
                } // ====================================== //
                // Structuring header for onListen and    //
                // onFail                                 //
                // ====================================== //


                _context6.next = 12;
                break;

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](4);
                _didIteratorError2 = true;
                _iteratorError2 = _context6.t0;

              case 12:
                _context6.prev = 12;
                _context6.prev = 13;

                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                  _iterator2["return"]();
                }

              case 15:
                _context6.prev = 15;

                if (!_didIteratorError2) {
                  _context6.next = 18;
                  break;
                }

                throw _iteratorError2;

              case 18:
                return _context6.finish(15);

              case 19:
                return _context6.finish(12);

              case 20:
                header = {
                  key: _this.key,
                  dispatchers: dispatcher.toMethod(),
                  payload: payload,
                  action: headerDispatcher.key,
                  actions: actions,
                  models: _objectSpread({}, _index["default"].model["public"](_this.key), {}, _index["default"].model["protected"](_this.key)),
                  history: {},
                  components: Object.freeze(components),
                  // ====================================== //
                  // Creating new blockcode for debug and   //
                  // for help in case errors of dispatch    //
                  // ====================================== //
                  blockcode: new _blockcode["default"](dev)
                };

                header.resolve =
                /*#__PURE__*/
                function () {
                  var _ref4 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee3(err) {
                    var res;
                    return _regenerator["default"].wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            header.blockcode["catch"](err);
                            _context3.next = 3;
                            return fail(err, states.toMethod(), header);

                          case 3:
                            res = _context3.sent;
                            return _context3.abrupt("return", res);

                          case 5:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x4) {
                    return _ref4.apply(this, arguments);
                  };
                }();

                Object.freeze(header); // ====================================== //
                // Stating blockcode for create blocks in //
                // the onListen of Model                  //
                // ====================================== //

                header.blockcode.start("Dispatch: ".concat(headerDispatcher.key), payload);
                return _context6.abrupt("return", new Promise(function (resolve) {
                  // ====================================== //
                  // Execute event for onListen             //
                  // ====================================== //
                  listener(payload, states.toMethod(), header).then(
                  /*#__PURE__*/
                  function () {
                    var _ref5 = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/
                    _regenerator["default"].mark(function _callee4(res) {
                      return _regenerator["default"].wrap(function _callee4$(_context4) {
                        while (1) {
                          switch (_context4.prev = _context4.next) {
                            case 0:
                              // ====================================== //
                              // If success then finished blockcode and //
                              // also current action                    //
                              // ====================================== //
                              header.blockcode.end();
                              headerDispatcher.done();
                              resolve(res); // ====================================== //
                              // If case the event if fail              //
                              // ====================================== //

                            case 3:
                            case "end":
                              return _context4.stop();
                          }
                        }
                      }, _callee4);
                    }));

                    return function (_x5) {
                      return _ref5.apply(this, arguments);
                    };
                  }())["catch"](
                  /*#__PURE__*/
                  function () {
                    var _ref6 = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/
                    _regenerator["default"].mark(function _callee5(err) {
                      return _regenerator["default"].wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              // ====================================== //
                              // Catch current block                    //
                              // ====================================== //
                              header.blockcode["catch"](err); // ====================================== //
                              // Execute event for onFail and sending   //
                              // information necesary                   //
                              // ====================================== //

                              _context5.next = 3;
                              return fail(err, states.toMethod(), header);

                            case 3:
                              // ====================================== //
                              // If success then finished blockcode and //
                              // also current action                    //
                              // ====================================== //
                              header.blockcode.end();
                              headerDispatcher.done();
                              resolve(true);

                            case 6:
                            case "end":
                              return _context5.stop();
                          }
                        }
                      }, _callee5);
                    }));

                    return function (_x6) {
                      return _ref6.apply(this, arguments);
                    };
                  }());
                }));

              case 25:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[4, 8, 12, 20], [13,, 15, 19]]);
      }));

      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }();

    for (var keyDispatch in settings.dispatchers) {
      if (settings.dispatchers[keyDispatch].now) {
        var action = dispatcher.get(keyDispatch);
        action.dispatch(action.defaultValue);
      }
    }
  }; // ====================================== //
  // METHODS PUBLICS                        //
  // ====================================== //

  /**
   * Subcribes
   * @param {object} subscriber
   * @returns {number}
   */


  this.subscribe = function (subscriber) {
    if (!(subscriber instanceof _subscriber["default"])) throw new Error('Require a instance of Subscriber');

    subscriber[_symbols.symSubscriberInit](states.values());

    subcribes.set(subscriber.key, subscriber);
    return subscriber.key;
  };

  this.deleteSubscribe = function (key) {
    subcribes["delete"](key);
  };
}