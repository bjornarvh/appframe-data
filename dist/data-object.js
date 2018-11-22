var DataObject =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/data-object.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar has = Object.prototype.hasOwnProperty\n  , prefix = '~';\n\n/**\n * Constructor to create a storage for our `EE` objects.\n * An `Events` instance is a plain object whose properties are event names.\n *\n * @constructor\n * @private\n */\nfunction Events() {}\n\n//\n// We try to not inherit from `Object.prototype`. In some engines creating an\n// instance in this way is faster than calling `Object.create(null)` directly.\n// If `Object.create(null)` is not supported we prefix the event names with a\n// character to make sure that the built-in object properties are not\n// overridden or used as an attack vector.\n//\nif (Object.create) {\n  Events.prototype = Object.create(null);\n\n  //\n  // This hack is needed because the `__proto__` property is still inherited in\n  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.\n  //\n  if (!new Events().__proto__) prefix = false;\n}\n\n/**\n * Representation of a single event listener.\n *\n * @param {Function} fn The listener function.\n * @param {*} context The context to invoke the listener with.\n * @param {Boolean} [once=false] Specify if the listener is a one-time listener.\n * @constructor\n * @private\n */\nfunction EE(fn, context, once) {\n  this.fn = fn;\n  this.context = context;\n  this.once = once || false;\n}\n\n/**\n * Add a listener for a given event.\n *\n * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} context The context to invoke the listener with.\n * @param {Boolean} once Specify if the listener is a one-time listener.\n * @returns {EventEmitter}\n * @private\n */\nfunction addListener(emitter, event, fn, context, once) {\n  if (typeof fn !== 'function') {\n    throw new TypeError('The listener must be a function');\n  }\n\n  var listener = new EE(fn, context || emitter, once)\n    , evt = prefix ? prefix + event : event;\n\n  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;\n  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);\n  else emitter._events[evt] = [emitter._events[evt], listener];\n\n  return emitter;\n}\n\n/**\n * Clear event by name.\n *\n * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.\n * @param {(String|Symbol)} evt The Event name.\n * @private\n */\nfunction clearEvent(emitter, evt) {\n  if (--emitter._eventsCount === 0) emitter._events = new Events();\n  else delete emitter._events[evt];\n}\n\n/**\n * Minimal `EventEmitter` interface that is molded against the Node.js\n * `EventEmitter` interface.\n *\n * @constructor\n * @public\n */\nfunction EventEmitter() {\n  this._events = new Events();\n  this._eventsCount = 0;\n}\n\n/**\n * Return an array listing the events for which the emitter has registered\n * listeners.\n *\n * @returns {Array}\n * @public\n */\nEventEmitter.prototype.eventNames = function eventNames() {\n  var names = []\n    , events\n    , name;\n\n  if (this._eventsCount === 0) return names;\n\n  for (name in (events = this._events)) {\n    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);\n  }\n\n  if (Object.getOwnPropertySymbols) {\n    return names.concat(Object.getOwnPropertySymbols(events));\n  }\n\n  return names;\n};\n\n/**\n * Return the listeners registered for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Array} The registered listeners.\n * @public\n */\nEventEmitter.prototype.listeners = function listeners(event) {\n  var evt = prefix ? prefix + event : event\n    , handlers = this._events[evt];\n\n  if (!handlers) return [];\n  if (handlers.fn) return [handlers.fn];\n\n  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {\n    ee[i] = handlers[i].fn;\n  }\n\n  return ee;\n};\n\n/**\n * Return the number of listeners listening to a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Number} The number of listeners.\n * @public\n */\nEventEmitter.prototype.listenerCount = function listenerCount(event) {\n  var evt = prefix ? prefix + event : event\n    , listeners = this._events[evt];\n\n  if (!listeners) return 0;\n  if (listeners.fn) return 1;\n  return listeners.length;\n};\n\n/**\n * Calls each of the listeners registered for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @returns {Boolean} `true` if the event had listeners, else `false`.\n * @public\n */\nEventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {\n  var evt = prefix ? prefix + event : event;\n\n  if (!this._events[evt]) return false;\n\n  var listeners = this._events[evt]\n    , len = arguments.length\n    , args\n    , i;\n\n  if (listeners.fn) {\n    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);\n\n    switch (len) {\n      case 1: return listeners.fn.call(listeners.context), true;\n      case 2: return listeners.fn.call(listeners.context, a1), true;\n      case 3: return listeners.fn.call(listeners.context, a1, a2), true;\n      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;\n      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;\n      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;\n    }\n\n    for (i = 1, args = new Array(len -1); i < len; i++) {\n      args[i - 1] = arguments[i];\n    }\n\n    listeners.fn.apply(listeners.context, args);\n  } else {\n    var length = listeners.length\n      , j;\n\n    for (i = 0; i < length; i++) {\n      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);\n\n      switch (len) {\n        case 1: listeners[i].fn.call(listeners[i].context); break;\n        case 2: listeners[i].fn.call(listeners[i].context, a1); break;\n        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;\n        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;\n        default:\n          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {\n            args[j - 1] = arguments[j];\n          }\n\n          listeners[i].fn.apply(listeners[i].context, args);\n      }\n    }\n  }\n\n  return true;\n};\n\n/**\n * Add a listener for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} [context=this] The context to invoke the listener with.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.on = function on(event, fn, context) {\n  return addListener(this, event, fn, context, false);\n};\n\n/**\n * Add a one-time listener for a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn The listener function.\n * @param {*} [context=this] The context to invoke the listener with.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.once = function once(event, fn, context) {\n  return addListener(this, event, fn, context, true);\n};\n\n/**\n * Remove the listeners of a given event.\n *\n * @param {(String|Symbol)} event The event name.\n * @param {Function} fn Only remove the listeners that match this function.\n * @param {*} context Only remove the listeners that have this context.\n * @param {Boolean} once Only remove one-time listeners.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {\n  var evt = prefix ? prefix + event : event;\n\n  if (!this._events[evt]) return this;\n  if (!fn) {\n    clearEvent(this, evt);\n    return this;\n  }\n\n  var listeners = this._events[evt];\n\n  if (listeners.fn) {\n    if (\n      listeners.fn === fn &&\n      (!once || listeners.once) &&\n      (!context || listeners.context === context)\n    ) {\n      clearEvent(this, evt);\n    }\n  } else {\n    for (var i = 0, events = [], length = listeners.length; i < length; i++) {\n      if (\n        listeners[i].fn !== fn ||\n        (once && !listeners[i].once) ||\n        (context && listeners[i].context !== context)\n      ) {\n        events.push(listeners[i]);\n      }\n    }\n\n    //\n    // Reset the array, or remove it completely if we have no more listeners.\n    //\n    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;\n    else clearEvent(this, evt);\n  }\n\n  return this;\n};\n\n/**\n * Remove all listeners, or those of the specified event.\n *\n * @param {(String|Symbol)} [event] The event name.\n * @returns {EventEmitter} `this`.\n * @public\n */\nEventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {\n  var evt;\n\n  if (event) {\n    evt = prefix ? prefix + event : event;\n    if (this._events[evt]) clearEvent(this, evt);\n  } else {\n    this._events = new Events();\n    this._eventsCount = 0;\n  }\n\n  return this;\n};\n\n//\n// Alias methods names because people roll like that.\n//\nEventEmitter.prototype.off = EventEmitter.prototype.removeListener;\nEventEmitter.prototype.addListener = EventEmitter.prototype.on;\n\n//\n// Expose the prefix.\n//\nEventEmitter.prefixed = prefix;\n\n//\n// Allow `EventEmitter` to be imported as module namespace.\n//\nEventEmitter.EventEmitter = EventEmitter;\n\n//\n// Expose the module.\n//\nif (true) {\n  module.exports = EventEmitter;\n}\n\n\n//# sourceURL=webpack://DataObject/./node_modules/eventemitter3/index.js?");

/***/ }),

/***/ "./src/common.js":
/*!***********************!*\
  !*** ./src/common.js ***!
  \***********************/
/*! exports provided: fireCallback */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fireCallback\", function() { return fireCallback; });\nfunction fireCallback(callback) {\n  if (typeof callback === 'function') {\n    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n      args[_key - 1] = arguments[_key];\n    }\n\n    callback.apply(void 0, args);\n  }\n}\n\n//# sourceURL=webpack://DataObject/./src/common.js?");

/***/ }),

/***/ "./src/data-handler.js":
/*!*****************************!*\
  !*** ./src/data-handler.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ \"./src/common.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar DataHandler =\n/*#__PURE__*/\nfunction () {\n  function DataHandler(options) {\n    _classCallCheck(this, DataHandler);\n\n    var articleId = options.articleId,\n        dataSourceId = options.dataSourceId,\n        fields = options.fields,\n        groupBy = options.groupBy,\n        timeout = options.timeout;\n\n    if (articleId) {\n      this.articleId = articleId;\n    } else if (window.af && window.af.article) {\n      this.articleId = window.af.article.id;\n    }\n\n    this.dataSourceId = dataSourceId || null;\n    this.fields = fields || null;\n    this.groupBy = groupBy || null;\n    this.timeout = timeout || 30000;\n  }\n\n  _createClass(DataHandler, [{\n    key: \"create\",\n    value: function create(data, callback) {\n      return this.request('create', data, callback);\n    }\n  }, {\n    key: \"destroy\",\n    value: function destroy(data, callback) {\n      return this.request('destroy', data, callback);\n    }\n  }, {\n    key: \"retrieve\",\n    value: function retrieve(data, callback) {\n      return this.request('retrieve', data, callback);\n    }\n  }, {\n    key: \"update\",\n    value: function update(data, callback) {\n      return this.request('update', data, callback);\n    }\n  }, {\n    key: \"request\",\n    value: function request(type, data, callback) {\n      var _this = this;\n\n      return new Promise(function (resolve, reject) {\n        var options = {\n          body: JSON.stringify(data),\n          method: 'POST',\n          headers: {\n            'Content-Type': 'application/json; charset=utf-8'\n          }\n        };\n        var controller = null;\n        var url = \"/\".concat(type, \"/\").concat(_this.articleId, \"/\").concat(_this.dataSourceId);\n        var isTimedOut = false;\n\n        if (_this.fields) {\n          url += \"/\".concat(_this.fields instanceof Array ? _this.fields.join('-') : _this.fields);\n        }\n\n        if (_this.groupBy) {\n          url += '/' + _this.groupBy;\n        }\n\n        if (window.AbortController) {\n          if (_this.previousRequestController) {\n            _this.previousRequestController.abort();\n          }\n\n          controller = new window.AbortController();\n          _this.previousRequestController = controller;\n          options.signal = _this.previousRequestController.signal;\n        }\n\n        var timeout = setTimeout(function () {\n          if (controller) {\n            controller.abort();\n          }\n\n          isTimedOut = true;\n          resolve(false);\n        }, _this.timeout);\n        fetch(url, options).then(function (result) {\n          clearTimeout(timeout);\n\n          if (isTimedOut || controller && _this.previousRequestController !== controller) {\n            return false;\n          }\n\n          return result.json();\n        }).then(function (json) {\n          if (json === false) {\n            resolve(false);\n          } else if (json.hasOwnProperty('success')) {\n            Object(_common__WEBPACK_IMPORTED_MODULE_0__[\"fireCallback\"])(callback, null, json.success);\n            resolve(json.success);\n          } else if (json.hasOwnProperty('error')) {\n            Object(_common__WEBPACK_IMPORTED_MODULE_0__[\"fireCallback\"])(callback, null, json.error);\n            reject(json.error);\n          }\n        }).catch(function (error) {\n          if (error.message === 'Aborted' || window.AbortError && error instanceof window.AbortError) {\n            resolve(false);\n          } else {\n            reject(error);\n          }\n        });\n      });\n    }\n  }]);\n\n  return DataHandler;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (DataHandler);\n\n//# sourceURL=webpack://DataObject/./src/data-handler.js?");

/***/ }),

/***/ "./src/data-object.js":
/*!****************************!*\
  !*** ./src/data-object.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! eventemitter3 */ \"./node_modules/eventemitter3/index.js\");\n/* harmony import */ var eventemitter3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(eventemitter3__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _data_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data-handler */ \"./src/data-handler.js\");\n/* harmony import */ var _memory_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./memory-storage */ \"./src/memory-storage.js\");\n/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common */ \"./src/common.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _get(target, property, receiver) { if (typeof Reflect !== \"undefined\" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }\n\nfunction _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/* eslint-disable no-console */\n\n\n\n\nvar defaultOptions = {\n  dataHandler: null,\n  articleId: window.af && window.af.article && window.af.article.id,\n  dataSourceId: null,\n  timeout: 30000,\n  errorHandler: function errorHandler(error, callback) {\n    window.alert(error);\n    Object(_common__WEBPACK_IMPORTED_MODULE_3__[\"fireCallback\"])(callback, error, null);\n  },\n  linkFields: null,\n  disableAutoload: false,\n  dynamicLoading: false,\n  allowDelete: false,\n  allowUpdate: false,\n  allowInsert: false,\n  strict: false,\n  selectFirstRow: true,\n  optimisticLocking: false,\n  hasIITrig: false,\n  hasIUTrig: false,\n  hasIDTrig: false,\n  parameters: {\n    distinctRows: false,\n    filterObject: null,\n    filterString: '',\n    masterChildCriteria: {},\n    maxRecords: -1,\n    sortOrder: [],\n    whereObject: null,\n    whereClause: ''\n  },\n  systemFieldNames: {},\n  masterDataObject: null,\n  groupBy: null,\n  uniqueIdField: 'PrimKey',\n  fields: []\n};\n\nvar DataObject =\n/*#__PURE__*/\nfunction (_EventEmitter) {\n  _inherits(DataObject, _EventEmitter);\n\n  function DataObject(options) {\n    var _this;\n\n    _classCallCheck(this, DataObject);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(DataObject).call(this));\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"_dataHandler\", void 0);\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"_storageEngine\", new _memory_storage__WEBPACK_IMPORTED_MODULE_2__[\"default\"]());\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"_options\", void 0);\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"_fieldNames\", []);\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"_parametersChanged\", false);\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"_currentIndex\", null);\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"_errorRecords\", {});\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"_dirtyRecords\", {});\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"_savingRecords\", {});\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"_newRecord\", {});\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"_dataLoaded\", null);\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"_dataSaving\", false);\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"_dataLoading\", false);\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"_temporarilyDisallowDelete\", false);\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"_temporarilyDisallowUpdate\", false);\n\n    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), \"_temporarilyDisallowInsert\", false);\n\n    _this._options = Object.assign({}, defaultOptions, options);\n\n    if (options.parameters) {\n      _this._options.parameters = Object.assign({}, defaultOptions.parameters, options.parameters);\n    }\n\n    _this._dataHandler = options.dataHandler || new _data_handler__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      articleId: options.articleId,\n      dataSourceId: options.dataSourceId,\n      timeout: options.timeout\n    });\n    delete _this._options.dataHandler;\n    delete _this._options.storageEngine;\n\n    _this.initialize();\n\n    return _this;\n  }\n\n  _createClass(DataObject, [{\n    key: \"attachEvent\",\n    value: function attachEvent(event, callback) {\n      _get(_getPrototypeOf(DataObject.prototype), \"on\", this).call(this, event, callback);\n    }\n  }, {\n    key: \"detachEvent\",\n    value: function detachEvent(event, callback) {\n      _get(_getPrototypeOf(DataObject.prototype), \"removeListener\", this).call(this, event, callback);\n    }\n  }, {\n    key: \"cancelEdit\",\n    value: function cancelEdit() {}\n  }, {\n    key: \"cancelField\",\n    value: function cancelField(field) {}\n  }, {\n    key: \"currentRow\",\n    value: function currentRow() {}\n  }, {\n    key: \"endEdit\",\n    value: function endEdit() {}\n  }, {\n    key: \"deleteCurrentRow\",\n    value: function deleteCurrentRow(callback) {\n      return new Promise(function (resolve, reject) {});\n    }\n  }, {\n    key: \"deleteRow\",\n    value: function deleteRow(callback) {\n      return new Promise(function (resolve, reject) {});\n    }\n  }, {\n    key: \"initialize\",\n    value: function initialize() {\n      var _this2 = this;\n\n      if (!this.fields) {\n        this.getFieldsAsync().then(function (fields) {\n          _this2.fields = fields;\n          _this2.initialize = null;\n        });\n      }\n\n      this.initialize = function () {\n        console.warn(\"Data object \".concat(this.dataSourceId, \" has already been initialized.\"));\n      }; // Create a recordsource field. Not really needed, but commonly used in afDataObject,\n      // so good to have for compatability\n\n\n      this.recordSource = {};\n      var rsFields = Object.keys(this._options.parameters).filter(function (key) {\n        return !['distinctRows', 'masterChildCriteria'].includes(key);\n      });\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        var _loop = function _loop() {\n          var field = _step.value;\n          var name = field.substring(0, 1).toUpperCase() + field.substring(3);\n\n          _this2.recordSource[\"get\".concat(name)] = function () {\n            return _this2.getParameter(field);\n          };\n\n          _this2.recordSource[\"set\".concat(name)] = function (value) {\n            return _this2.setParameter(field, value);\n          };\n        };\n\n        for (var _iterator = rsFields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          _loop();\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator.return != null) {\n            _iterator.return();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"isDataLoaded\",\n    value: function isDataLoaded() {}\n  }, {\n    key: \"isDataLoading\",\n    value: function isDataLoading() {}\n  }, {\n    key: \"isDeleteAllowed\",\n    value: function isDeleteAllowed() {}\n  }, {\n    key: \"isUpdateAllowed\",\n    value: function isUpdateAllowed() {}\n  }, {\n    key: \"isInsertAllowed\",\n    value: function isInsertAllowed() {}\n  }, {\n    key: \"isDeleteNeverAllowed\",\n    value: function isDeleteNeverAllowed() {}\n  }, {\n    key: \"isUpdateNeverAllowed\",\n    value: function isUpdateNeverAllowed() {}\n  }, {\n    key: \"isInsertNeverAllowed\",\n    value: function isInsertNeverAllowed() {}\n  }, {\n    key: \"getCurrentIndex\",\n    value: function getCurrentIndex() {}\n  }, {\n    key: \"getData\",\n    value: function getData(index, field) {}\n  }, {\n    key: \"getDataLength\",\n    value: function getDataLength() {}\n  }, {\n    key: \"getDataSourceId\",\n    value: function getDataSourceId() {}\n  }, {\n    key: \"getFields\",\n    value: function getFields() {}\n  }, {\n    key: \"getFieldsAsync\",\n    value: function getFieldsAsync() {}\n  }, {\n    key: \"getMasterDataObject\",\n    value: function getMasterDataObject() {\n      return this._options.masterDataObject;\n    }\n  }, {\n    key: \"getParameter\",\n    value: function getParameter(parameter) {\n      return this._options.parameters[parameter] || null;\n    }\n  }, {\n    key: \"refreshCurrentRow\",\n    value: function refreshCurrentRow(callback) {\n      return new Promise(function (resolve, reject) {});\n    }\n  }, {\n    key: \"refreshDataSource\",\n    value: function refreshDataSource(callback) {\n      return new Promise(function (resolve, reject) {});\n    }\n  }, {\n    key: \"refreshRow\",\n    value: function refreshRow(index, callback) {\n      return new Promise(function (resolve, reject) {});\n    }\n  }, {\n    key: \"setAllowDelete\",\n    value: function setAllowDelete(allow) {}\n  }, {\n    key: \"setAllowUpdate\",\n    value: function setAllowUpdate(allow) {}\n  }, {\n    key: \"setAllowInsert\",\n    value: function setAllowInsert(allow) {}\n  }, {\n    key: \"setParameter\",\n    value: function setParameter(parameter, value) {\n      var isFilterStringParam = ['filterString', 'whereClause'].includes(parameter);\n\n      if (this._options.strict && isFilterStringParam) {\n        throw new Error(\"Setting \".concat(parameter, \" is not allowed when dataObject is in strict mode\"));\n      }\n\n      if (isFilterStringParam) {\n        if (!value) {\n          value = '';\n        }\n\n        this.setParameter(parameter === 'filterString' ? 'filterObject' : 'whereObject', null);\n      }\n\n      var current = this._options.parameters[parameter];\n\n      if (current !== value) {\n        this._options.parameters[parameter] = value;\n        this.emit('onParameterUpdated', parameter);\n      }\n    }\n  }]);\n\n  return DataObject;\n}(eventemitter3__WEBPACK_IMPORTED_MODULE_0___default.a);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (DataObject);\n\n//# sourceURL=webpack://DataObject/./src/data-object.js?");

/***/ }),

/***/ "./src/memory-storage.js":
/*!*******************************!*\
  !*** ./src/memory-storage.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MemoryStorage; });\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar MemoryStorage =\n/*#__PURE__*/\nfunction () {\n  function MemoryStorage() {\n    _classCallCheck(this, MemoryStorage);\n\n    _defineProperty(this, \"data\", []);\n  }\n\n  _createClass(MemoryStorage, [{\n    key: \"create\",\n    value: function create(record) {\n      if (_typeof(record) !== 'object') {\n        throw new TypeError('Record must be an object');\n      }\n\n      return this.data.push(record) - 1;\n    }\n  }, {\n    key: \"destroy\",\n    value: function destroy() {\n      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;\n\n      if (this.getRecord() !== null) {\n        this.data.splice(index, 1);\n        return true;\n      }\n\n      throw new Error(\"No record found for index \".concat(index));\n    }\n  }, {\n    key: \"getRecord\",\n    value: function getRecord() {\n      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;\n      return this.data[index] || null;\n    }\n  }, {\n    key: \"length\",\n    value: function length() {\n      return this.data.length;\n    }\n  }, {\n    key: \"retrieve\",\n    value: function retrieve() {\n      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;\n\n      if (typeof index === 'number' && !isNaN(index)) {\n        return this.getRecorddata[index] || null;\n      }\n\n      return this.data;\n    }\n  }, {\n    key: \"update\",\n    value: function update(index, data) {\n      var record = this.getRecord(index);\n\n      if (record) {\n        if (data instanceof Array) {\n          this.data[index] = data;\n        } else {\n          this.data[index] = Object.assign({}, this.data[index], data);\n        }\n      } else {\n        throw new Error(\"No record found for index \".concat(index));\n      }\n\n      return true;\n    }\n  }]);\n\n  return MemoryStorage;\n}();\n\n\n\n//# sourceURL=webpack://DataObject/./src/memory-storage.js?");

/***/ })

/******/ });