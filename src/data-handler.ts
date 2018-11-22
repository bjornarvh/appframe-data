import { fireCallback } from './common';

interface DataHandlerOptions {
	articleId? : string,
	dataSourceId? : string,
	fields? : Array<string>,
	groupBy? : Array<string>,
	timeout? : number
}

interface Af {
	article: AfArticle
}

interface AfArticle {
	id: string
}

declare const af : Af;
declare const AbortError : Function;

class DataHandler {
	articleId : string;
	dataSourceId : string | null;
	fields : Array<string> | null;
	groupBy : Array<string> | null;
	previousRequestController : AbortController | null = null;
	timeout : number;

	constructor(options : DataHandlerOptions) {
		const {
			articleId,
			dataSourceId,
			fields,
			groupBy,
			timeout,
		} = options;

		if (articleId) {
			this.articleId = articleId;
		} else if (af && af.article) {
			this.articleId = af.article.id;
		} else {
			throw new Error('No article ID given.');
		}

		this.dataSourceId = dataSourceId || null;
		this.fields = fields || null;
		this.groupBy = groupBy || null;
		this.timeout = timeout || 30000;
	}

	create(data : object, callback : Function) : Promise<object | boolean> {
		return this.request('create', data, callback);
	}
	
	destroy(data : object, callback : Function) : Promise<object | boolean> {
		return this.request('destroy', data, callback);
	}
	
	retrieve(data : object, callback : Function) : Promise<object | boolean> {
		return this.request('retrieve', data, callback);
	}
	
	update(data : object, callback : Function) : Promise<object | boolean> {
		return this.request('update', data, callback);
	}
	
	request(type : string, data : object, callback : Function) : Promise<object | boolean> {
		return new Promise((resolve, reject) => {
			const options : RequestInit = {
				body: JSON.stringify(data),
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				}
			};

			let controller : AbortController | null = null;
		
			let url = `/${type}/${this.articleId}/${this.dataSourceId}`;
			let isTimedOut = false;
		
			if (this.fields) {
				url += `/${this.fields instanceof Array ? this.fields.join('-') : this.fields}`;
			}
		
			if (this.groupBy) {
				url += '/' + this.groupBy;
			}
		
			if (AbortController) {
				if (this.previousRequestController) {
					this.previousRequestController.abort();
				}
		
				controller = new AbortController();
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
				.catch((error : Error) => {
					if (error.message === 'Aborted' || (AbortError && error instanceof AbortError)) {
						resolve(false);
					} else {
						reject(error);
					}
				});
		});
	}
}



export default DataHandler;