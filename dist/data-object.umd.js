(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('eventemitter3')) :
  typeof define === 'function' && define.amd ? define(['eventemitter3'], factory) :
  (global.DataObject = factory(global.EventEmitter));
}(this, (function (EventEmitter) { 'use strict';

  EventEmitter = EventEmitter && EventEmitter.hasOwnProperty('default') ? EventEmitter['default'] : EventEmitter;

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }

    return privateMap.get(receiver).value;
  }

  function _classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to set private field on non-instance");
    }

    var descriptor = privateMap.get(receiver);

    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
    return value;
  }

  function fireCallback(callback) {
    if (typeof callback === 'function') {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      callback.apply(void 0, args);
    }
  }

  var DataHandler =
  /*#__PURE__*/
  function () {
    function DataHandler(options) {
      _classCallCheck(this, DataHandler);

      var articleId = options.articleId,
          dataSourceId = options.dataSourceId,
          fields = options.fields,
          groupBy = options.groupBy,
          timeout = options.timeout;

      if (articleId) {
        this.articleId = articleId;
      } else if (window.af && window.af.article) {
        this.articleId = window.af.article.id;
      }

      this.dataSourceId = dataSourceId || null;
      this.fields = fields || null;
      this.groupBy = groupBy || null;
      this.timeout = timeout || 30000;
    }

    _createClass(DataHandler, [{
      key: "create",
      value: function create(data, callback) {
        return this.request('create', data, callback);
      }
    }, {
      key: "destroy",
      value: function destroy(data, callback) {
        return this.request('destroy', data, callback);
      }
    }, {
      key: "retrieve",
      value: function retrieve(data, callback) {
        return this.request('retrieve', data, callback);
      }
    }, {
      key: "update",
      value: function update(data, callback) {
        return this.request('update', data, callback);
      }
    }, {
      key: "request",
      value: function request(type, data, callback) {
        var _this = this;

        return new Promise(function (resolve, reject) {
          var options = {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
          };
          var controller = null;
          var url = "/".concat(type, "/").concat(_this.articleId, "/").concat(_this.dataSourceId);
          var isTimedOut = false;

          if (_this.fields) {
            url += "/".concat(_this.fields instanceof Array ? _this.fields.join('-') : _this.fields);
          }

          if (_this.groupBy) {
            url += '/' + _this.groupBy;
          }

          if (window.AbortController) {
            if (_this.previousRequestController) {
              _this.previousRequestController.abort();
            }

            controller = new window.AbortController();
            _this.previousRequestController = controller;
            options.signal = _this.previousRequestController.signal;
          }

          var timeout = setTimeout(function () {
            if (controller) {
              controller.abort();
            }

            isTimedOut = true;
            resolve(false);
          }, _this.timeout);
          fetch(url, options).then(function (result) {
            clearTimeout(timeout);

            if (isTimedOut || controller && _this.previousRequestController !== controller) {
              return false;
            }

            return result.json();
          }).then(function (json) {
            if (json === false) {
              resolve(false);
            } else if (json.hasOwnProperty('success')) {
              fireCallback(callback, null, json.success);
              resolve(json.success);
            } else if (json.hasOwnProperty('error')) {
              fireCallback(callback, null, json.error);
              reject(json.error);
            }
          }).catch(function (error) {
            if (error.message === 'Aborted' || window.AbortError && error instanceof window.AbortError) {
              resolve(false);
            } else {
              reject(error);
            }
          });
        });
      }
    }]);

    return DataHandler;
  }();

  var MemoryStorage =
  /*#__PURE__*/
  function () {
    function MemoryStorage() {
      _classCallCheck(this, MemoryStorage);

      _defineProperty(this, "data", []);
    }

    _createClass(MemoryStorage, [{
      key: "create",
      value: function create(record) {
        if (_typeof(record) !== 'object') {
          throw new TypeError('Record must be an object');
        }

        return this.data.push(record) - 1;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (this.getRecord() !== null) {
          this.data.splice(index, 1);
          return true;
        }

        throw new Error("No record found for index ".concat(index));
      }
    }, {
      key: "getRecord",
      value: function getRecord() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        return this.data[index] || null;
      }
    }, {
      key: "length",
      value: function length() {
        return this.data.length;
      }
    }, {
      key: "retrieve",
      value: function retrieve() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (typeof index === 'number' && !isNaN(index)) {
          return this.getRecorddata[index] || null;
        }

        return this.data;
      }
    }, {
      key: "update",
      value: function update(index, data) {
        var record = this.getRecord(index);

        if (record) {
          if (data instanceof Array) {
            this.data[index] = data;
          } else {
            this.data[index] = Object.assign({}, this.data[index], data);
          }
        } else {
          throw new Error("No record found for index ".concat(index));
        }

        return true;
      }
    }]);

    return MemoryStorage;
  }();

  var defaultOptions = {
    dataHandler: null,
    articleId: window.af && window.af.article && window.af.article.id,
    dataSourceId: null,
    timeout: 30000,
    errorHandler: function errorHandler(error, callback) {
      window.alert(error);
      fireCallback(callback, error, null);
    },
    linkFields: null,
    disableAutoload: false,
    dynamicLoading: false,
    allowDelete: false,
    allowUpdate: false,
    allowInsert: false,
    strict: false,
    selectFirstRow: true,
    optimisticLocking: false,
    hasIITrig: false,
    hasIUTrig: false,
    hasIDTrig: false,
    parameters: {
      filterString: '',
      whereClause: '',
      filterObject: null,
      whereObject: null,
      sortOrder: [],
      maxRecords: -1,
      distinctRows: false,
      masterChildCriteria: {}
    },
    systemFieldNames: {},
    masterDataObject: null,
    groupBy: null,
    uniqueIdField: 'PrimKey',
    fields: []
  };

  var DataObject =
  /*#__PURE__*/
  function (_EventEmitter) {
    _inherits(DataObject, _EventEmitter);

    function DataObject(_options2) {
      var _this;

      _classCallCheck(this, DataObject);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(DataObject).call(this));

      _dataHandler.set(_assertThisInitialized(_assertThisInitialized(_this)), {
        writable: true,
        value: void 0
      });

      _storageEngine.set(_assertThisInitialized(_assertThisInitialized(_this)), {
        writable: true,
        value: new MemoryStorage()
      });

      _options.set(_assertThisInitialized(_assertThisInitialized(_this)), {
        writable: true,
        value: void 0
      });

      _fieldNames.set(_assertThisInitialized(_assertThisInitialized(_this)), {
        writable: true,
        value: []
      });

      _parametersChanged.set(_assertThisInitialized(_assertThisInitialized(_this)), {
        writable: true,
        value: false
      });

      _currentIndex.set(_assertThisInitialized(_assertThisInitialized(_this)), {
        writable: true,
        value: null
      });

      _errorRecords.set(_assertThisInitialized(_assertThisInitialized(_this)), {
        writable: true,
        value: {}
      });

      _dirtyRecords.set(_assertThisInitialized(_assertThisInitialized(_this)), {
        writable: true,
        value: {}
      });

      _savingRecords.set(_assertThisInitialized(_assertThisInitialized(_this)), {
        writable: true,
        value: {}
      });

      _newRecord.set(_assertThisInitialized(_assertThisInitialized(_this)), {
        writable: true,
        value: {}
      });

      _dataLoaded.set(_assertThisInitialized(_assertThisInitialized(_this)), {
        writable: true,
        value: null
      });

      _dataSaving.set(_assertThisInitialized(_assertThisInitialized(_this)), {
        writable: true,
        value: false
      });

      _dataLoading.set(_assertThisInitialized(_assertThisInitialized(_this)), {
        writable: true,
        value: false
      });

      _temporarilyDisallowDelete.set(_assertThisInitialized(_assertThisInitialized(_this)), {
        writable: true,
        value: false
      });

      _temporarilyDisallowUpdate.set(_assertThisInitialized(_assertThisInitialized(_this)), {
        writable: true,
        value: false
      });

      _temporarilyDisallowInsert.set(_assertThisInitialized(_assertThisInitialized(_this)), {
        writable: true,
        value: false
      });

      _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _options, Object.assign({}, defaultOptions, _options2));

      if (_options2.parameters) {
        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _options).parameters = Object.assign({}, defaultOptions.parameters, _options2.parameters);
      }

      _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _dataHandler, _options2.dataHandler || new DataHandler({
        articleId: _options2.articleId,
        dataSourceId: _options2.dataSourceId,
        timeout: _options2.timeout
      }));

      delete _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _options).dataHandler;
      delete _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _options).storageEngine;

      _this.initialize();

      return _this;
    }

    _createClass(DataObject, [{
      key: "attachEvent",
      value: function attachEvent(event, callback) {
        _get(_getPrototypeOf(DataObject.prototype), "on", this).call(this, event, callback);
      }
    }, {
      key: "detachEvent",
      value: function detachEvent(event, callback) {
        _get(_getPrototypeOf(DataObject.prototype), "removeListener", this).call(this, event, callback);
      }
    }, {
      key: "cancelEdit",
      value: function cancelEdit() {}
    }, {
      key: "cancelField",
      value: function cancelField(field) {}
    }, {
      key: "currentRow",
      value: function currentRow() {}
    }, {
      key: "endEdit",
      value: function endEdit() {}
    }, {
      key: "deleteCurrentRow",
      value: function deleteCurrentRow(callback) {
        return new Promise(function (resolve, reject) {});
      }
    }, {
      key: "deleteRow",
      value: function deleteRow(callback) {
        return new Promise(function (resolve, reject) {});
      }
    }, {
      key: "initialize",
      value: function initialize() {
        var _this2 = this;

        if (!this.fields) {
          this.getFieldsAsync().then(function (fields) {
            _this2.fields = fields;
            _this2.initialize = null;
          });
        }

        this.initialize = function () {
          console.warn("Data object ".concat(this.dataSourceId, " has already been initialized."));
        };
      }
    }, {
      key: "isDataLoaded",
      value: function isDataLoaded() {}
    }, {
      key: "isDataLoading",
      value: function isDataLoading() {}
    }, {
      key: "isDeleteAllowed",
      value: function isDeleteAllowed() {}
    }, {
      key: "isUpdateAllowed",
      value: function isUpdateAllowed() {}
    }, {
      key: "isInsertAllowed",
      value: function isInsertAllowed() {}
    }, {
      key: "isDeleteNeverAllowed",
      value: function isDeleteNeverAllowed() {}
    }, {
      key: "isUpdateNeverAllowed",
      value: function isUpdateNeverAllowed() {}
    }, {
      key: "isInsertNeverAllowed",
      value: function isInsertNeverAllowed() {}
    }, {
      key: "getCurrentIndex",
      value: function getCurrentIndex() {}
    }, {
      key: "getData",
      value: function getData(index, field) {}
    }, {
      key: "getDataLength",
      value: function getDataLength() {}
    }, {
      key: "getDataSourceId",
      value: function getDataSourceId() {}
    }, {
      key: "getFields",
      value: function getFields() {}
    }, {
      key: "getFieldsAsync",
      value: function getFieldsAsync() {}
    }, {
      key: "getMasterDataObject",
      value: function getMasterDataObject() {
        return _classPrivateFieldGet(this, _options).masterDataObject;
      }
    }, {
      key: "getParameter",
      value: function getParameter(parameter) {
        return _classPrivateFieldGet(this, _options).parameters[parameter] || null;
      }
    }, {
      key: "refreshCurrentRow",
      value: function refreshCurrentRow(callback) {
        return new Promise(function (resolve, reject) {});
      }
    }, {
      key: "refreshDataSource",
      value: function refreshDataSource(callback) {
        return new Promise(function (resolve, reject) {});
      }
    }, {
      key: "refreshRow",
      value: function refreshRow(index, callback) {
        return new Promise(function (resolve, reject) {});
      }
    }, {
      key: "setAllowDelete",
      value: function setAllowDelete(allow) {}
    }, {
      key: "setAllowUpdate",
      value: function setAllowUpdate(allow) {}
    }, {
      key: "setAllowInsert",
      value: function setAllowInsert(allow) {}
    }, {
      key: "setParameter",
      value: function setParameter(parameter, value) {
        var isFilterStringParam = ['filterString', 'whereClause'].includes(parameter);

        if (_classPrivateFieldGet(this, _options).strict && isFilterStringParam) {
          throw new Error("Setting ".concat(parameter, " is not allowed when dataObject is in strict mode"));
        }

        if (isFilterStringParam) {
          if (!value) {
            value = '';
          }

          this.setParameter(parameter === 'filterString' ? 'filterObject' : 'whereObject', null);
        }

        var current = _classPrivateFieldGet(this, _options).parameters[parameter];

        if (current !== value) {
          _classPrivateFieldGet(this, _options).parameters[parameter] = value;
          this.emit('onParameterUpdated', parameter);
        }
      }
    }]);

    return DataObject;
  }(EventEmitter);

  var _dataHandler = new WeakMap();

  var _storageEngine = new WeakMap();

  var _options = new WeakMap();

  var _fieldNames = new WeakMap();

  var _parametersChanged = new WeakMap();

  var _currentIndex = new WeakMap();

  var _errorRecords = new WeakMap();

  var _dirtyRecords = new WeakMap();

  var _savingRecords = new WeakMap();

  var _newRecord = new WeakMap();

  var _dataLoaded = new WeakMap();

  var _dataSaving = new WeakMap();

  var _dataLoading = new WeakMap();

  var _temporarilyDisallowDelete = new WeakMap();

  var _temporarilyDisallowUpdate = new WeakMap();

  var _temporarilyDisallowInsert = new WeakMap();

  return DataObject;

})));
