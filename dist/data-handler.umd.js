(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.getLocalizedString = factory());
}(this, (function () { 'use strict';

	function fireCallback(callback) {
	  if (typeof callback === 'function') {
	    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    callback.apply(void 0, args);
	  }
	}

	function DataHandler(options) {
	  var articleId = options.articleId,
	      dataSourceId = options.dataSourceId,
	      fields = options.fields,
	      groupBy = options.groupBy;

	  if (articleId) {
	    this.articleId = articleId;
	  } else if (window.af && window.af.article) {
	    this.articleId = window.af.article.id;
	  }

	  this.dataSourceId = dataSourceId || null;
	  this.fields = fields || null;
	  this.groupBy = groupBy || null;
	}

	DataHandler.prototype.create = function create(data, callback) {
	  return this.request('create', data, callback);
	};

	DataHandler.prototype.destroy = function destroy(data, callback) {
	  return this.request('destroy', data, callback);
	};

	DataHandler.prototype.retrieve = function retrieve(data, callback) {
	  return this.request('retrieve', data, callback);
	};

	DataHandler.prototype.update = function update(data, callback) {
	  return this.request('update', data, callback);
	};

	DataHandler.prototype.request = function request(type, data, callback) {
	  var _this = this;

	  var options = {
	    body: JSON.stringify(data),
	    method: 'POST',
	    headers: {
	      'Content-Type': 'application/json; charset=utf-8'
	    }
	  };
	  var url = "/".concat(type, "/").concat(this.articleId, "/").concat(this.dataSourceId);

	  if (this.fields) {
	    url += "/".concat(this.fields instanceof Array ? this.fields.join('-') : this.fields);
	  }

	  if (this.groupBy) {
	    url += '/' + this.groupBy;
	  }

	  if (window.AbortController) {
	    if (this.previousRequestController) {
	      this.previousRequestController.abort();
	    }

	    this.previousRequestController = new window.AbortController();
	    options.signal = this.previousRequestController.signal;
	  }

	  return fetch(url, options).then(function (result) {
	    return result.json;
	  }).then(function (json) {
	    if (_this.previousRequestController && _this.previousRequestController.signal === options.signal) {
	      _this.previousRequestController = null;
	    }

	    if (json.hasOwnProperty('success')) {
	      fireCallback(callback, null, json.success);
	      return json;
	    } else if (json.hasOwnProperty('error')) {
	      fireCallback(callback, null, json.error);
	      throw new Error(json.error);
	    }
	  }).catch(function (error) {
	    if (!window.AbortError && error instanceof window.AbortError) {
	      return;
	    }

	    throw new Error(error);
	  });
	};

	return DataHandler;

})));
