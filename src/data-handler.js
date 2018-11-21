import { fireCallback } from './common';

class DataHandler {
	constructor(options) {
		const {
			articleId,
			dataSourceId,
			fields,
			groupBy,
			timeout,
		} = options;

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
		
			fetch(url, options)
				.then(result => {
					clearTimeout(timeout);
					if (isTimedOut || (controller && this.previousRequestController !== controller)) {
						return false;
					}
		
					return result.json();
				})
				.then(json => {
					if (json === false) {
						resolve(false);
					} else if (json.hasOwnProperty('success')) {
						fireCallback(callback, null, json.success);
						resolve(json.success);
					} else if (json.hasOwnProperty('error')) {
						fireCallback(callback, null, json.error);
						reject(json.error);
					}
				})
				.catch(error => {
					if (error.message === 'Aborted' || (window.AbortError && error instanceof window.AbortError)) {
						resolve(false);
					} else {
						reject(error);
					}
				});
		});
	}
}



export default DataHandler;