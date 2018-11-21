/* eslint-disable no-console */
import EventEmitter from 'eventemitter3';
import DataHandler from './data-handler';
import MemoryStorage from './memory-storage';
import { fireCallback } from './common';

const defaultOptions = {
	dataHandler: null,
	articleId: window.af && window.af.article && window.af.article.id,
	dataSourceId: null,
	timeout: 30000,
	errorHandler: function(error, callback) {
		window.alert(error);
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
		filterString: '',
		whereClause: '',
		filterObject: null,
		whereObject: null,
		sortOrder: [],
		maxRecords: -1,
		distinctRows: false,
		masterChildCriteria: {}
	},
	systemFieldNames: {},
	masterDataObject: null,
	groupBy:null,
	uniqueIdField: 'PrimKey',
	fields: []
};

class DataObject extends EventEmitter {
	#dataHandler;
	#storageEngine = new MemoryStorage();
	#options;
	#fieldNames = [];
	#parametersChanged = false;
	#currentIndex = null;
	#errorRecords ={};
	#dirtyRecords = {};
	#savingRecords = {};
	#newRecord = {};
	#dataLoaded = null;
	#dataSaving = false;
	#dataLoading = false;
	#temporarilyDisallowDelete = false;
	#temporarilyDisallowUpdate = false;
	#temporarilyDisallowInsert = false;

	constructor(options) {
		super();

		this.#options = Object.assign({}, defaultOptions, options);

		this.#dataHandler = options.dataHandler || new DataHandler({
			articleId: options.articleId,
			dataSourceId: options.dataSourceId,
			timeout: options.timeout
		})

		delete this.#options.dataHandler;
		delete this.#options.storageEngine;

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

	getDataSourceId() {}

	getFields() {}

	getFieldsAsync() {}

	getParameter(parameter) {}

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

	setParameter(parameter, value) {}
}




export default DataObject;
