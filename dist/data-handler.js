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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/data-handler.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/common.ts":
/*!***********************!*\
  !*** ./src/common.ts ***!
  \***********************/
/*! exports provided: fireCallback */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fireCallback\", function() { return fireCallback; });\nfunction fireCallback(callback) {\n  if (typeof callback === 'function') {\n    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n      args[_key - 1] = arguments[_key];\n    }\n\n    callback.apply(void 0, args);\n    return true;\n  }\n\n  return false;\n}\n\n//# sourceURL=webpack://DataObject/./src/common.ts?");

/***/ }),

/***/ "./src/data-handler.ts":
/*!*****************************!*\
  !*** ./src/data-handler.ts ***!
  \*****************************/
/*! exports provided: DataHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DataHandler\", function() { return DataHandler; });\n/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ \"./src/common.ts\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\nvar DataHandler =\n/*#__PURE__*/\nfunction () {\n  function DataHandler() {\n    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n    _classCallCheck(this, DataHandler);\n\n    _defineProperty(this, \"articleId\", void 0);\n\n    _defineProperty(this, \"dataSourceId\", void 0);\n\n    _defineProperty(this, \"fields\", void 0);\n\n    _defineProperty(this, \"groupBy\", void 0);\n\n    _defineProperty(this, \"timeout\", void 0);\n\n    _defineProperty(this, \"previousController\", null);\n\n    var articleId = options.articleId,\n        dataSourceId = options.dataSourceId,\n        fields = options.fields,\n        groupBy = options.groupBy,\n        timeout = options.timeout;\n\n    if (articleId) {\n      this.articleId = articleId;\n    } else if (af && af.article) {\n      this.articleId = af.article.id;\n    } else {\n      throw new Error('No article ID given.');\n    }\n\n    this.dataSourceId = dataSourceId || null;\n    this.fields = fields || null;\n    this.groupBy = groupBy || null;\n    this.timeout = timeout || 30000;\n  }\n  /**\n   * Adds a record to the database\n   * \n   * @param data Record that should be added\n   * @param callback Callback when the record has been created\n   */\n\n\n  _createClass(DataHandler, [{\n    key: \"create\",\n    value: function create(data, callback) {\n      return this.request('create', data, callback);\n    }\n    /**\n     * Deletes a record in the database\n     * \n     * @param data Object containing primkey of the record to delete\n     * @param callback Callback when the record has been created/an error has occured\n     */\n\n  }, {\n    key: \"destroy\",\n    value: function destroy(data, callback) {\n      return this.request('destroy', data, callback);\n    }\n    /**\n     * Retrieves one or more records based on the request parameters\n     * \n     * @param data Request parameters\n     * @param callback Callback when the record has been created/an error has occured\n     */\n\n  }, {\n    key: \"retrieve\",\n    value: function retrieve(data, callback) {\n      return this.request('retrieve', data, callback);\n    }\n    /**\n     * Updates a single record\n     * \n     * @param data Object containing PrimKey and any updated fields.\n     * @param callback Callback when the record has been updated/an error has occured\n     */\n\n  }, {\n    key: \"update\",\n    value: function update(data, callback) {\n      return this.request('update', data, callback);\n    }\n  }, {\n    key: \"request\",\n    value: function request(type, data, callback) {\n      var _this = this;\n\n      return new Promise(function (resolve, reject) {\n        var options = {\n          body: JSON.stringify(data),\n          method: 'POST',\n          headers: {\n            'Content-Type': 'application/json; charset=utf-8'\n          }\n        };\n        var controller = null;\n        var url = \"/\".concat(type, \"/\").concat(_this.articleId, \"/\").concat(_this.dataSourceId);\n        var isTimedOut = false;\n\n        if (_this.fields) {\n          url += \"/\".concat(_this.fields instanceof Array ? _this.fields.join('-') : _this.fields);\n        }\n\n        if (_this.groupBy) {\n          url += '/' + _this.groupBy;\n        }\n\n        if (typeof AbortController !== 'undefined') {\n          if (_this.previousController) {\n            _this.previousController.abort();\n          }\n\n          controller = new AbortController();\n          _this.previousController = controller;\n          options.signal = _this.previousController.signal;\n        }\n\n        var timeoutFn = function timeoutFn() {\n          if (controller) {\n            controller.abort();\n          }\n\n          isTimedOut = true;\n          resolve(false);\n        };\n\n        var timeout = setTimeout(timeoutFn, _this.timeout);\n        fetch(url, options).then(function (result) {\n          clearTimeout(timeout);\n\n          if (isTimedOut) {\n            return Promise.resolve(false);\n          } else if (controller && _this.previousController !== controller) {\n            return Promise.resolve(false);\n          }\n\n          return result.json();\n        }).then(function (json) {\n          if (json === false) {\n            resolve(false);\n          } else if (json.hasOwnProperty('success')) {\n            Object(_common__WEBPACK_IMPORTED_MODULE_0__[\"fireCallback\"])(callback, null, json.success);\n            resolve(json.success);\n          } else if (json.hasOwnProperty('error')) {\n            Object(_common__WEBPACK_IMPORTED_MODULE_0__[\"fireCallback\"])(callback, json.error);\n            reject(json.error);\n          } else {\n            reject('Failed to interpret data returned from server');\n          }\n        }).catch(function (error) {\n          if (error.message === 'Aborted' || typeof AbortError !== 'undefined' && error instanceof AbortError) {\n            resolve(false);\n          } else {\n            reject(error);\n          }\n        });\n      });\n    }\n  }]);\n\n  return DataHandler;\n}();\n\n//# sourceURL=webpack://DataObject/./src/data-handler.ts?");

/***/ })

/******/ });