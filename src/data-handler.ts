import { fireCallback } from './common';
import {
	Af,
	IDataHandler,
	IRecordDataOptions,
	IDataObjectParameters
} from '../types';

interface DataHandlerOptions {
	articleId? : string,
	dataSourceId? : string,
	fields? : Array<string> | string,
	groupBy? : Array<string>,
	timeout? : number
}

declare const af : Af;
declare const AbortError : Function;

class DataHandler implements IDataHandler {
	articleId : string;
	dataSourceId : string | null;
	fields : Array<string> | string | null;
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

	/**
	 * Adds a record to the database
	 * 
	 * @param data Record that should be added
	 * @param callback Callback when the record has been created
	 */
	create(data : object, callback : Function) : Promise<object | boolean> {
		return this.request('create', data, callback);
	}
	
	/**
	 * Deletes a record in the database
	 * 
	 * @param data Object containing primkey of the record to delete
	 * @param callback Callback when the record has been created/an error has occured
	 */
	destroy(data : IRecordDataOptions, callback : Function) : Promise<object | boolean> {
		return this.request('destroy', data, callback);
	}
	
	/**
	 * Retrieves one or more records based on the request parameters
	 * 
	 * @param data Request parameters
	 * @param callback Callback when the record has been created/an error has occured
	 */
	retrieve(data : IDataObjectParameters, callback : Function) : Promise<object | boolean> {
		return this.request('retrieve', data, callback);
	}
	
	/**
	 * Updates a single record
	 * 
	 * @param data Object containing PrimKey and any updated fields.
	 * @param callback Callback when the record has been updated/an error has occured
	 */
	update(data : IRecordDataOptions, callback : Function) : Promise<object | boolean> {
		return this.request('update', data, callback);
	}
	
	request(type : string, data : object, callback : Function) : Promise<object | false> {
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
