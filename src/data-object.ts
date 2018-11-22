/* eslint-disable no-console */
import EventEmitter from 'eventemitter3';
import DataHandler from './data-handler';
import MemoryStorage from './memory-storage';
import { fireCallback } from './common';
import {
	Af,
	IDataObjectOptions,
	ICallbackFunction,
	IDataHandler,
	IDataObject,
	IPrivateDataObjectOptions,
	IRecordSource,
	IDataObjectParameters
} from '../types';

declare const af : Af;

class DataObject extends EventEmitter implements IDataObject {
	_dataHandler : IDataHandler;
	_storageEngine = new MemoryStorage();
	_options : IPrivateDataObjectOptions = {
		allowDelete: false,
		allowUpdate: false,
		allowInsert: false,
		articleId: af && af.article && af.article.id,
		errorHandler: function(error, callback) {
			alert(error);
			fireCallback(callback, error, null);
		},
		dataSourceId: null,
		disableAutoload: false,
		dynamicLoading: false,
		fields: [],
		groupBy: null,
		hasIITrig: false,
		hasIUTrig: false,
		hasIDTrig: false,
		linkFields: null,
		masterDataObject: null,
		optimisticLocking: false,
		parameters: {
			distinctRows: false,
			filterObject: null,
			filterString: '',
			masterChildCriteria: {},
			maxRecords: -1,
			sortOrder: [],
			whereObject: null,
			whereClause: '',
		},
		selectFirstRow: true,
		strict: false,
		systemFieldNames: {},
		timeout: 30000,
		uniqueIdField: 'PrimKey',
	};

	_fieldNames = [];
	_parametersChanged = false;
	_currentIndex = null;
	_errorRecords ={};
	_dirtyRecords = {};
	_savingRecords = {};
	_newRecord = {};
	_dataLoaded = null;
	_dataSaving = false;
	_dataLoading = false;
	_temporarilyDisallowDelete = false;
	_temporarilyDisallowUpdate = false;
	_temporarilyDisallowInsert = false;

	recordSource : IRecordSource = {
		getFilterObject: () => this.getParameter('filterObject'),
		getFilterString: () => this.getParameter('filterString'),
		getMaxRecords: () => this.getParameter('maxRecords'),
		getMasterChildCriteria: () => this.getParameter('masterChildCriteria'),
		getSortOrder: () => this.getParameter('sortOrder'),
		getWhereClause: () => this.getParameter('whereClause'),
		getWhereObject: () => this.getParameter('whereObject'),
		setFilterObject: (value : object | null) => this.setParameter('filterObject', value),
		setFilterString: (value : string) => this.setParameter('filterString', value),
		setMaxRecords: (value : number) => this.setParameter('maxRecords', value),
		setMasterChildCriteria: (value : number) => this.setParameter('masterChildCriteria', value),
		setSortOrder: (value : Array<object>) => this.setParameter('sortOrder', value),
		setWhereClause: (value : string) => this.setParameter('whereClause', value),
		setWhereObject: (value : object | null) => this.setParameter('whereObject', value),
	};

	constructor(options : IDataObjectOptions) {
		super();

		const _options : IPrivateDataObjectOptions = Object.assign({}, this._options);
		const parameters : IDataObjectParameters = Object.assign(
			this._options.parameters,
			options.parameters
		);

		this._options = Object.assign(_options, options, { parameters: parameters });
		this._dataHandler = options.dataHandler || new DataHandler({
			articleId: options.articleId,
			dataSourceId: options.dataSourceId,
			timeout: options.timeout
		});

		this.initialize();
	}

	attachEvent(event : string, callback : ICallbackFunction) {
		super.on.call(this, event, callback);
	}

	detachEvent(event : string, callback : ICallbackFunction) {
		super.removeListener.call(this, event, callback);
	}

	cancelEdit() {}

	cancelField(field : string) {}

	currentRow() {}

	endEdit() {}

	deleteCurrentRow(callback : Function) {
		return new Promise((resolve, reject) => {
	
		});
	}
	
	deleteRow(callback : Function) {
		return new Promise((resolve, reject) => {
	
		});
	}
	
	initialize() {
		if (!this._options.fields) {
			this.getFieldsAsync()
				.then(fields => {
					this._options.fields = fields;
				});
		}
	
		this.initialize = function() {
			console.warn(`Data object ${this._options.dataSourceId} has already been initialized.`);
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

	getData(index : number | undefined, field : string | undefined) : object | Array<object> {
		return {};
	}

	getDataLength() {}

	getDataSourceId() {
		return this._options.dataSourceId;
	}

	getFields() {}

	getFieldsAsync() {
		return Promise.resolve([]);
	}

	getMasterDataObject() {
		return this._options.masterDataObject;
	}

	getParameter(parameter : string) : any {
		if (parameter in this._options.parameters) {
			return this._options.parameters[parameter];
		}

		return null;
	}

	refreshCurrentRow(callback: Function | undefined) {
		return new Promise((resolve, reject) => {
	
		});
	}
	
	refreshDataSource(callback : Function | undefined) {
		return new Promise((resolve, reject) => {
	
		});
	}
	
	refreshRow(index : number, callback : Function | undefined) {
		return new Promise((resolve, reject) => {
	
		});
	}

	setAllowDelete(allow : boolean) {}

	setAllowUpdate(allow : boolean) {}

	setAllowInsert(allow : boolean) {}

	setParameter(parameter : string, value : any) {
		const isFilterStringParam = ['filterString', 'whereClause'].includes(parameter);

		if (this._options.strict && isFilterStringParam) {
			throw new Error(`Setting ${parameter} is not allowed when dataObject is in strict mode`);
		}

		if (isFilterStringParam) {
			if (!value) {
				value = '';
			}
			
			this.setParameter(parameter === 'filterString' ? 'filterObject' : 'whereObject', null);
		}

		const current : any = this._options.parameters[parameter];
		if (current !== value) {
			this._options.parameters[parameter] = value;
			this.emit('onParameterUpdated', parameter);
		}
	}
}

export {
	DataObject,
	DataHandler,
	MemoryStorage
};
