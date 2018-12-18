import { fireCallback } from './common';
import {
	Appframe,
	DataHandlerOptions,
	IDataHandler,
	IRecordDataOptions,
	DataObjectParameters
} from '../types';

declare const af : Appframe;
declare const AbortError : Function;

export class DataHandler implements IDataHandler {
	articleId : string;
	dataSourceId : string | null;
	fields : Array<string> | string | null;
	groupBy : Array<string> | null;
	timeout : number;

	private retrieveCounter : number = 0;
	private previousController : AbortController | null = null;

	constructor(options : DataHandlerOptions = {}) {
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

	/**
	 * Adds a record to the database
	 * 
	 * @param data Record that should be added
	 * @param callback Callback when the record has been created
	 */
	create(data : object, callback? : Function) : Promise<object | boolean> {
		return this.request('create', data, callback);
	}
	
	/**
	 * Deletes a record in the database
	 * 
	 * @param data Object containing primkey of the record to delete
	 * @param callback Callback when the record has been created/an error has occured
	 */
	destroy(data : IRecordDataOptions, callback? : Function) : Promise<object | boolean> {
		return this.request('destroy', data, callback);
	}
	
	/**
	 * Retrieves one or more records based on the request parameters
	 * 
	 * @param data Request parameters
	 * @param callback Callback when the record has been created/an error has occured
	 */
	retrieve(data : DataObjectParameters, callback : Function) : Promise<object | boolean> {
		return this.request('retrieve', data, callback);
	}
	
	/**
	 * Updates a single record
	 * 
	 * @param data Object containing PrimKey and any updated fields.
	 * @param callback Callback when the record has been updated/an error has occured
	 */
	update(data : IRecordDataOptions, callback? : Function) : Promise<object | boolean> {
		return this.request('update', data, callback);
	}
	
	request(type : string, data : object, callback? : Function) : Promise<object | false> {
		return new Promise((resolve, reject) => {
			const options : RequestInit = {
				body: JSON.stringify(data),
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'X-Requested-With': 'XMLHttpRequest'
				}
			};

			let controller : AbortController | null = null;
			let requestId = 0;
		
			let url = `/${type}/${this.articleId}/${this.dataSourceId}`;
			let isTimedOut = false;
		
			if (this.fields) {
				url += `/${this.fields instanceof Array ? this.fields.join('-') : this.fields}`;
			}
		
			if (this.groupBy) {
				url += '/' + this.groupBy;
			}

			if (type === 'retrieve') {
				requestId = ++this.retrieveCounter;
			}
		
			if (type === 'retrieve' && typeof AbortController !== 'undefined') {
				if (this.previousController) {
					this.previousController.abort();
				}
		
				controller = new AbortController();
				this.previousController = controller;
				options.signal = this.previousController.signal;
			}
		
			const timeoutFn = () => {
				if (controller) {
					controller.abort();
				}

				isTimedOut = true;
				resolve(false);
			}

			const timeout = setTimeout(timeoutFn, this.timeout);
	
			fetch(url, options)
				.then(result => {
					clearTimeout(timeout);
					if (isTimedOut) {
						console.log('was timed out', options.body);
						return Promise.resolve(false);
					} else if (type === 'retrieve' && controller && this.previousController !== controller) {
						return Promise.resolve(false);
					} else if (type === 'retrieve' && requestId !== this.retrieveCounter) {
						return Promise.resolve(false);
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
						fireCallback(callback, json.error);
						reject(json.error);
					} else {
						reject('Failed to interpret data returned from server');
					}
				})
				.catch((error : Error) => {
					if (error.message === 'Aborted' || (typeof AbortError !== 'undefined' && error instanceof AbortError)) {
						resolve(false);
					} else {
						reject(error);
					}
				});
		});
	}
}
