function fireCallback(callback) {
  if (typeof callback === 'function') {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    callback(...args);
  }
}

function DataHandler(options) {
  const articleId = options.articleId,
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
  const options = {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };
  let url = `/${type}/${this.articleId}/${this.dataSourceId}`;

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

    this.previousRequestController = new window.AbortController();
    options.signal = this.previousRequestController.signal;
  }

  return fetch(url, options).then(result => result.json).then(json => {
    if (this.previousRequestController && this.previousRequestController.signal === options.signal) {
      this.previousRequestController = null;
    }

    if (json.hasOwnProperty('success')) {
      fireCallback(callback, null, json.success);
      return json;
    } else if (json.hasOwnProperty('error')) {
      fireCallback(callback, null, json.error);
      throw new Error(json.error);
    }
  }).catch(error => {
    if (!window.AbortError && error instanceof window.AbortError) {
      return;
    }

    throw new Error(error);
  });
};

export default DataHandler;
