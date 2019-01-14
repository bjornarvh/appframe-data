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

class SimpleDataObject<T> {
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

	async getData(params : DataObjectParameters) : Promise<Array<any> | null> {
		const raw = await this._dataHandler.retrieve(params);

		if (typeof raw === 'object' && raw instanceof Array) {
			const records = [];

			for (let item of raw) {
				const record : any = {};
				item.forEach((value : any, idx : number) => {
					record[this._options.fields[idx].name] = value;
				});

				records.push(record);
			}
	
			return records;
		}
		
		return null;
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

export {
	DataHandler,
	SimpleDataObject
};