import merge from 'deepmerge';
import { DataHandler } from './data-handler';
import { defaults } from './data-object-options';
import {
	DataObjectOptions,
	DataObjectParameters,
	IDataHandler,
	IRecordDataOptions,
	PrivateDataObjectOptions,
} from '../types';

class SimpleDataObject {
	private _options : PrivateDataObjectOptions;
	private _dataHandler : IDataHandler;

	constructor(options : DataObjectOptions) {
		this._options = merge(defaults, options);
		this._dataHandler = options.dataHandler || new DataHandler({
			articleId: options.articleId,
			dataSourceId: options.dataSourceId,
			timeout: options.timeout
		});
	}

	async getData(params : DataObjectParameters) {
		const raw = await this._dataHandler.retrieve(params);
		/*
		dataHandler.retrieve({ filterString: '', whereClause: filter }, function(error, data) {
			if (error !== null) {
					reject(error);
			} else {
					var records = [];

					for (let item of data) {
							var record = {};
							item.forEach((value, idx) => {
									record[fields[idx].name] = value;
							});
							records.push(record);
					}
					
					resolve(records);
			}
	});
});*/
	}

	async create(record : object) : Promise<object | boolean> {
		return await this._dataHandler.create(record);
	}

	async delete(record : IRecordDataOptions) : Promise<object | boolean> {
		return await this._dataHandler.destroy(record);
	}

	async update(data : IRecordDataOptions) : Promise<object | boolean> {
		return await this._dataHandler.update(data);
	}
}

export { SimpleDataObject };