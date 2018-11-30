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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/redux-data-object.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/deepmerge/dist/es.js":
/*!*******************************************!*\
  !*** ./node_modules/deepmerge/dist/es.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar isMergeableObject = function isMergeableObject(value) {\n\treturn isNonNullObject(value)\n\t\t&& !isSpecial(value)\n};\n\nfunction isNonNullObject(value) {\n\treturn !!value && typeof value === 'object'\n}\n\nfunction isSpecial(value) {\n\tvar stringValue = Object.prototype.toString.call(value);\n\n\treturn stringValue === '[object RegExp]'\n\t\t|| stringValue === '[object Date]'\n\t\t|| isReactElement(value)\n}\n\n// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25\nvar canUseSymbol = typeof Symbol === 'function' && Symbol.for;\nvar REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;\n\nfunction isReactElement(value) {\n\treturn value.$$typeof === REACT_ELEMENT_TYPE\n}\n\nfunction emptyTarget(val) {\n\treturn Array.isArray(val) ? [] : {}\n}\n\nfunction cloneUnlessOtherwiseSpecified(value, options) {\n\treturn (options.clone !== false && options.isMergeableObject(value))\n\t\t? deepmerge(emptyTarget(value), value, options)\n\t\t: value\n}\n\nfunction defaultArrayMerge(target, source, options) {\n\treturn target.concat(source).map(function(element) {\n\t\treturn cloneUnlessOtherwiseSpecified(element, options)\n\t})\n}\n\nfunction mergeObject(target, source, options) {\n\tvar destination = {};\n\tif (options.isMergeableObject(target)) {\n\t\tObject.keys(target).forEach(function(key) {\n\t\t\tdestination[key] = cloneUnlessOtherwiseSpecified(target[key], options);\n\t\t});\n\t}\n\tObject.keys(source).forEach(function(key) {\n\t\tif (!options.isMergeableObject(source[key]) || !target[key]) {\n\t\t\tdestination[key] = cloneUnlessOtherwiseSpecified(source[key], options);\n\t\t} else {\n\t\t\tdestination[key] = deepmerge(target[key], source[key], options);\n\t\t}\n\t});\n\treturn destination\n}\n\nfunction deepmerge(target, source, options) {\n\toptions = options || {};\n\toptions.arrayMerge = options.arrayMerge || defaultArrayMerge;\n\toptions.isMergeableObject = options.isMergeableObject || isMergeableObject;\n\n\tvar sourceIsArray = Array.isArray(source);\n\tvar targetIsArray = Array.isArray(target);\n\tvar sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;\n\n\tif (!sourceAndTargetTypesMatch) {\n\t\treturn cloneUnlessOtherwiseSpecified(source, options)\n\t} else if (sourceIsArray) {\n\t\treturn options.arrayMerge(target, source, options)\n\t} else {\n\t\treturn mergeObject(target, source, options)\n\t}\n}\n\ndeepmerge.all = function deepmergeAll(array, options) {\n\tif (!Array.isArray(array)) {\n\t\tthrow new Error('first argument should be an array')\n\t}\n\n\treturn array.reduce(function(prev, next) {\n\t\treturn deepmerge(prev, next, options)\n\t}, {})\n};\n\nvar deepmerge_1 = deepmerge;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (deepmerge_1);\n\n\n//# sourceURL=webpack://DataObject/./node_modules/deepmerge/dist/es.js?");

/***/ }),

/***/ "./src/data-object-options.ts":
/*!************************************!*\
  !*** ./src/data-object-options.ts ***!
  \************************************/
/*! exports provided: defaults */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defaults\", function() { return defaults; });\nvar defaults = {\n  allowDelete: false,\n  allowUpdate: false,\n  allowInsert: false,\n  articleId: af && af.article && af.article.id,\n  confirmHandler: function confirmHandler(title, question, yes, no, cancel) {\n    return new Promise(function (resolve, reject) {\n      if (confirm(question)) {\n        resolve(true);\n      } else {\n        reject(cancel);\n      }\n    });\n  },\n  dataSourceId: null,\n  disableAutoload: false,\n  dynamicLoading: false,\n  fields: [],\n  groupBy: null,\n  linkFields: null,\n  masterDataObject: null,\n  optimisticLocking: false,\n  parameters: {\n    distinctRows: false,\n    filterObject: null,\n    filterString: '',\n    masterChildCriteria: {},\n    maxRecords: -1,\n    sortOrder: [],\n    whereObject: null,\n    whereClause: ''\n  },\n  selectFirstRow: true,\n  strict: false,\n  systemFieldNames: {},\n  timeout: 30000,\n  uniqueIdField: 'PrimKey'\n};\n\n//# sourceURL=webpack://DataObject/./src/data-object-options.ts?");

/***/ }),

/***/ "./src/redux-data-object.ts":
/*!**********************************!*\
  !*** ./src/redux-data-object.ts ***!
  \**********************************/
/*! exports provided: ReduxDataObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ReduxDataObject\", function() { return ReduxDataObject; });\n/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! deepmerge */ \"./node_modules/deepmerge/dist/es.js\");\n/* harmony import */ var _data_object_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data-object-options */ \"./src/data-object-options.ts\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\nvar ReduxDataObject =\n/*#__PURE__*/\nfunction () {\n  function ReduxDataObject(options) {\n    _classCallCheck(this, ReduxDataObject);\n\n    _defineProperty(this, \"options\", void 0);\n\n    this.options = Object(deepmerge__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_data_object_options__WEBPACK_IMPORTED_MODULE_1__[\"defaults\"], options);\n  }\n\n  _createClass(ReduxDataObject, [{\n    key: \"deleteRecordFailure\",\n    value: function deleteRecordFailure(primKey, error) {\n      return {\n        payload: {\n          dataSourceId: this.options.dataSourceId\n        },\n        type: 'deleteRecordFailure'\n      };\n    }\n  }, {\n    key: \"deleteRecordRequest\",\n    value: function deleteRecordRequest(primKey) {\n      return {\n        payload: {\n          dataSourceId: this.options.dataSourceId\n        },\n        type: 'deleteRecordRequest'\n      };\n    }\n  }, {\n    key: \"deleteRecordSuccess\",\n    value: function deleteRecordSuccess(primKey) {\n      return {\n        payload: {\n          dataSourceId: this.options.dataSourceId\n        },\n        type: 'deleteRecordSuccess'\n      };\n    }\n  }, {\n    key: \"fetchDataFailure\",\n    value: function fetchDataFailure(error) {\n      return {\n        payload: {\n          dataSourceId: this.options.dataSourceId\n        },\n        type: 'fetchDataFailure'\n      };\n    }\n  }, {\n    key: \"fetchDataRequest\",\n    value: function fetchDataRequest() {\n      return {\n        payload: {\n          dataSourceId: this.options.dataSourceId\n        },\n        type: 'fetchDataRequest'\n      };\n    }\n  }, {\n    key: \"fetchDataSuccess\",\n    value: function fetchDataSuccess(data) {\n      return {\n        payload: {\n          dataSourceId: this.options.dataSourceId\n        },\n        type: 'fetchDataSuccess'\n      };\n    }\n  }, {\n    key: \"saveRecordFailure\",\n    value: function saveRecordFailure(primKey, error) {\n      return {\n        payload: {\n          dataSourceId: this.options.dataSourceId\n        },\n        type: 'saveRecordFailure'\n      };\n    }\n  }, {\n    key: \"saveRecordRequest\",\n    value: function saveRecordRequest(primKey) {\n      return {\n        payload: {\n          dataSourceId: this.options.dataSourceId\n        },\n        type: 'saveRecordRequest'\n      };\n    }\n  }, {\n    key: \"saveRecordSuccess\",\n    value: function saveRecordSuccess(primKey, record) {\n      return {\n        payload: {\n          dataSourceId: this.options.dataSourceId\n        },\n        type: 'saveRecordSuccess'\n      };\n    }\n  }, {\n    key: \"setField\",\n    value: function setField(field, value) {\n      return {\n        payload: {\n          dataSourceId: this.options.dataSourceId\n        },\n        type: 'setField'\n      };\n    }\n  }, {\n    key: \"setAllowDelete\",\n    value: function setAllowDelete(allow) {\n      return {\n        payload: {\n          dataSourceId: this.options.dataSourceId\n        },\n        type: 'setAllowDelete'\n      };\n    }\n  }, {\n    key: \"setAllowInsert\",\n    value: function setAllowInsert(allow) {\n      return {\n        payload: {\n          dataSourceId: this.options.dataSourceId\n        },\n        type: 'setAllowInsert'\n      };\n    }\n  }, {\n    key: \"setAllowUpdate\",\n    value: function setAllowUpdate(allow) {\n      return {\n        payload: {\n          dataSourceId: this.options.dataSourceId\n        },\n        type: 'setAllowUpdate'\n      };\n    }\n  }, {\n    key: \"setFilterObject\",\n    value: function setFilterObject(filterObject) {\n      return {\n        payload: {\n          dataSourceId: this.options.dataSourceId\n        },\n        type: 'setFilterObject'\n      };\n    }\n  }, {\n    key: \"setFilterString\",\n    value: function setFilterString(filterString) {\n      return {\n        payload: {\n          dataSourceId: this.options.dataSourceId\n        },\n        type: 'setFilterString'\n      };\n    }\n  }, {\n    key: \"setMaxRecords\",\n    value: function setMaxRecords(maxRecords) {\n      return {\n        payload: {\n          dataSourceId: this.options.dataSourceId\n        },\n        type: 'setMaxRecords'\n      };\n    }\n  }, {\n    key: \"setSortOrder\",\n    value: function setSortOrder(sortOrder) {\n      return {\n        payload: {\n          dataSourceId: this.options.dataSourceId\n        },\n        type: 'setSortOrder'\n      };\n    }\n  }, {\n    key: \"setWhereClause\",\n    value: function setWhereClause(whereClause) {\n      return {\n        payload: {\n          dataSourceId: this.options.dataSourceId\n        },\n        type: 'setWhereClause'\n      };\n    }\n  }, {\n    key: \"setWhereObject\",\n    value: function setWhereObject(whereObject) {\n      return {\n        payload: {\n          dataSourceId: this.options.dataSourceId\n        },\n        type: 'setWhereObject'\n      };\n    }\n  }]);\n\n  return ReduxDataObject;\n}();\n\n//# sourceURL=webpack://DataObject/./src/redux-data-object.ts?");

/***/ })

/******/ });