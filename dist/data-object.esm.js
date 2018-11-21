import EventEmitter from 'eventemitter3';

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

    callback(...args);
  }
}

class DataHandler {
  constructor(options) {
    const articleId = options.articleId,
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

  create(data, callback) {
    return this.request('create', data, callback);
  }

  destroy(data, callback) {
    return this.request('destroy', data, callback);
  }

  retrieve(data, callback) {
    return this.request('retrieve', data, callback);
  }

  update(data, callback) {
    return this.request('update', data, callback);
  }

  request(type, data, callback) {
    return new Promise((resolve, reject) => {
      const options = {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      };
      let controller = null;
      let url = `/${type}/${this.articleId}/${this.dataSourceId}`;
      let isTimedOut = false;

      if (this.fields) {
        url += `/${this.fields instanceof Array ? this.fields.join('-') : this.fields}`;
      }

      if (this.groupBy) {
        url += '/' + this.groupBy;
      }

      if (window.AbortController) {
        if (this.previousRequestController) {
          this.previousRequestController.abort();
        }

        controller = new window.AbortController();
        this.previousRequestController = controller;
        options.signal = this.previousRequestController.signal;
      }

      const timeout = setTimeout(() => {
        if (controller) {
          controller.abort();
        }

        isTimedOut = true;
        resolve(false);
      }, this.timeout);
      fetch(url, options).then(result => {
        clearTimeout(timeout);

        if (isTimedOut || controller && this.previousRequestController !== controller) {
          return false;
        }

        return result.json();
      }).then(json => {
        if (json === false) {
          resolve(false);
        } else if (json.hasOwnProperty('success')) {
          fireCallback(callback, null, json.success);
          resolve(json.success);
        } else if (json.hasOwnProperty('error')) {
          fireCallback(callback, null, json.error);
          reject(json.error);
        }
      }).catch(error => {
        if (error.message === 'Aborted' || window.AbortError && error instanceof window.AbortError) {
          resolve(false);
        } else {
          reject(error);
        }
      });
    });
  }

}

class MemoryStorage {
  constructor() {
    _defineProperty(this, "data", []);
  }

  create(record) {
    if (typeof record !== 'object') {
      throw new TypeError('Record must be an object');
    }

    return this.data.push(record) - 1;
  }

  destroy() {
    let index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (this.getRecord() !== null) {
      this.data.splice(index, 1);
      return true;
    }

    throw new Error(`No record found for index ${index}`);
  }

  getRecord() {
    let index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return this.data[index] || null;
  }

  length() {
    return this.data.length;
  }

  retrieve() {
    let index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (typeof index === 'number' && !isNaN(index)) {
      return this.getRecorddata[index] || null;
    }

    return this.data;
  }

  update(index, data) {
    const record = this.getRecord(index);

    if (record) {
      if (data instanceof Array) {
        this.data[index] = data;
      } else {
        this.data[index] = Object.assign({}, this.data[index], data);
      }
    } else {
      throw new Error(`No record found for index ${index}`);
    }

    return true;
  }

}

const defaultOptions = {
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

class DataObject extends EventEmitter {
  constructor(_options2) {
    super();

    _dataHandler.set(this, {
      writable: true,
      value: void 0
    });

    _storageEngine.set(this, {
      writable: true,
      value: new MemoryStorage()
    });

    _options.set(this, {
      writable: true,
      value: void 0
    });

    _fieldNames.set(this, {
      writable: true,
      value: []
    });

    _parametersChanged.set(this, {
      writable: true,
      value: false
    });

    _currentIndex.set(this, {
      writable: true,
      value: null
    });

    _errorRecords.set(this, {
      writable: true,
      value: {}
    });

    _dirtyRecords.set(this, {
      writable: true,
      value: {}
    });

    _savingRecords.set(this, {
      writable: true,
      value: {}
    });

    _newRecord.set(this, {
      writable: true,
      value: {}
    });

    _dataLoaded.set(this, {
      writable: true,
      value: null
    });

    _dataSaving.set(this, {
      writable: true,
      value: false
    });

    _dataLoading.set(this, {
      writable: true,
      value: false
    });

    _temporarilyDisallowDelete.set(this, {
      writable: true,
      value: false
    });

    _temporarilyDisallowUpdate.set(this, {
      writable: true,
      value: false
    });

    _temporarilyDisallowInsert.set(this, {
      writable: true,
      value: false
    });

    _classPrivateFieldSet(this, _options, Object.assign({}, defaultOptions, _options2));

    if (_options2.parameters) {
      _classPrivateFieldGet(this, _options).parameters = Object.assign({}, defaultOptions.parameters, _options2.parameters);
    }

    _classPrivateFieldSet(this, _dataHandler, _options2.dataHandler || new DataHandler({
      articleId: _options2.articleId,
      dataSourceId: _options2.dataSourceId,
      timeout: _options2.timeout
    }));

    delete _classPrivateFieldGet(this, _options).dataHandler;
    delete _classPrivateFieldGet(this, _options).storageEngine;
    this.initialize();
  }

  attachEvent(event, callback) {
    super.on.call(this, event, callback);
  }

  detachEvent(event, callback) {
    super.removeListener.call(this, event, callback);
  }

  cancelEdit() {}

  cancelField(field) {}

  currentRow() {}

  endEdit() {}

  deleteCurrentRow(callback) {
    return new Promise((resolve, reject) => {});
  }

  deleteRow(callback) {
    return new Promise((resolve, reject) => {});
  }

  initialize() {
    if (!this.fields) {
      this.getFieldsAsync().then(fields => {
        this.fields = fields;
        this.initialize = null;
      });
    }

    this.initialize = function () {
      console.warn(`Data object ${this.dataSourceId} has already been initialized.`);
    };
  }

  isDataLoaded() {}

  isDataLoading() {}

  isDeleteAllowed() {}

  isUpdateAllowed() {}

  isInsertAllowed() {}

  isDeleteNeverAllowed() {}

  isUpdateNeverAllowed() {}

  isInsertNeverAllowed() {}

  getCurrentIndex() {}

  getData(index, field) {}

  getDataLength() {}

  getDataSourceId() {}

  getFields() {}

  getFieldsAsync() {}

  getMasterDataObject() {
    return _classPrivateFieldGet(this, _options).masterDataObject;
  }

  getParameter(parameter) {
    return _classPrivateFieldGet(this, _options).parameters[parameter] || null;
  }

  refreshCurrentRow(callback) {
    return new Promise((resolve, reject) => {});
  }

  refreshDataSource(callback) {
    return new Promise((resolve, reject) => {});
  }

  refreshRow(index, callback) {
    return new Promise((resolve, reject) => {});
  }

  setAllowDelete(allow) {}

  setAllowUpdate(allow) {}

  setAllowInsert(allow) {}

  setParameter(parameter, value) {
    const isFilterStringParam = ['filterString', 'whereClause'].includes(parameter);

    if (_classPrivateFieldGet(this, _options).strict && isFilterStringParam) {
      throw new Error(`Setting ${parameter} is not allowed when dataObject is in strict mode`);
    }

    if (isFilterStringParam) {
      if (!value) {
        value = '';
      }

      this.setParameter(parameter === 'filterString' ? 'filterObject' : 'whereObject', null);
    }

    const current = _classPrivateFieldGet(this, _options).parameters[parameter];

    if (current !== value) {
      _classPrivateFieldGet(this, _options).parameters[parameter] = value;
      this.emit('onParameterUpdated', parameter);
    }
  }

}

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

export default DataObject;
