(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.DataObject = factory());
}(this, (function () { 'use strict';

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

  return DataHandler;

})));
