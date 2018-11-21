/* eslint-disable no-console */
import EventEmitter from 'eventemitter3';
import DataHandler from './data-handler';
import MemoryStorage from './memory-storage';
import { fireCallback } from './common';

const defaultOptions = {
	dataHandler: null,
	articleId: global.af && global.af.article && global.af.article.id,
	dataSourceId: null,
	timeout: 30000,
	errorHandler: function(error, callback) {
		alert(error);
		fireCallback(callback, error, null);
	},
	linkFields: null,
	disableAutoload: false,
	dynamicLoading: false,
	allowDelete: false,
	allowUpdate: false,
	allowInsert: false,
	strict: false,
	selectFirstRow: true,
	optimisticLocking: false,
	hasIITrig: false,
	hasIUTrig: false,
	hasIDTrig: false,
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
	systemFieldNames: {},
	masterDataObject: null,
	groupBy:null,
	uniqueIdField: 'PrimKey',
	fields: []
};

class DataObject extends EventEmitter {
	_dataHandler;
	_storageEngine = new MemoryStorage();
	_options;
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

	constructor(options) {
		super();

		this._options = Object.assign({}, defaultOptions, options);

		if (options.parameters) {
			this._options.parameters = Object.assign(
				{},
				defaultOptions.parameters,
				options.parameters
			);
		}

		this._dataHandler = options.dataHandler || new DataHandler({
			articleId: options.articleId,
			dataSourceId: options.dataSourceId,
			timeout: options.timeout
		});

		delete this._options.dataHandler;
		delete this._options.storageEngine;

		this.initialize();
	}
	
	attachEvent(event, callback) {
		super.on.call(this, event, callback);
	}

	detachEvent(event, callback) {
		super.removeListener.call(this, event, callback);
	}

	cancelEdit() {}

	cancelField(field) {}

	currentRow() {}

	endEdit() {}

	deleteCurrentRow(callback) {
		return new Promise((resolve, reject) => {
	
		});
	}
	
	deleteRow(callback) {
		return new Promise((resolve, reject) => {
	
		});
	}
	
	initialize() {
		if (!this.fields) {
			this.getFieldsAsync()
				.then(fields => {
					this.fields = fields;
					this.initialize = null;
				});
		}
	
		this.initialize = function() {
			console.warn(`Data object ${this.dataSourceId} has already been initialized.`);
		};

		// Create a recordsource field. Not really needed, but commonly used in afDataObject,
		// so good to have for compatability
		this.recordSource = {};
		const rsFields = Object
			.keys(this._options.parameters)
			.filter(key => !['distinctRows', 'masterChildCriteria'].includes(key));
		
		for (let field of rsFields) {
			let name = field.substring(0, 1).toUpperCase() + field.substring(3);
			this.recordSource[`get${name}`] = () => this.getParameter(field);
			this.recordSource[`set${name}`] = (value) => this.setParameter(field, value);
		}
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

	getData(index, field) {}

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

	getParameter(parameter) {
		return this._options.parameters[parameter] || null;
	}

	refreshCurrentRow(callback) {
		return new Promise((resolve, reject) => {
	
		});
	}
	
	refreshDataSource(callback) {
		return new Promise((resolve, reject) => {
	
		});
	}
	
	refreshRow(index, callback) {
		return new Promise((resolve, reject) => {
	
		});
	}

	setAllowDelete(allow) {}

	setAllowUpdate(allow) {}

	setAllowInsert(allow) {}

	setParameter(parameter, value) {
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

		const current = this._options.parameters[parameter];
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
