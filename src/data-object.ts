/* eslint-disable no-console */
import EventEmitter, { ListenerFn } from 'eventemitter3';
import merge from 'deepmerge';
import { DataHandler } from './data-handler';
import { defaults } from './data-object-options';
import { MemoryStorage } from './memory-storage';
import { fireCallback } from './common';
import {
	Appframe,
	DataObjectOptions,
	IDataHandler,
	IDataObject,
	FieldDefinition,
	PrivateDataObjectOptions,
	IRecordSource,
	DataObjectParameters,
	IStorageEngine,
	IConfirmHandler,
} from '../types';

declare const af : Appframe;

class DataObject extends EventEmitter implements IDataObject {
	private _dataHandler : IDataHandler;
	private _storageEngine : IStorageEngine = new MemoryStorage();
	private _options : PrivateDataObjectOptions;
	private _fields : Array<FieldDefinition> = [];
	private _parametersChanged = false;
	private _currentIndex : number | null = null;
	private _currentLoadingPromise : Promise<boolean> | null = null;
	private _dataLoaded = null;
	private _dataSaving = false;
	private _dataLoading = false;
	private _disableDelete = false;
	private _disableUpdate = false;
	private _disableInsert = false;
	private _recordStatus = new Map<number, Map<string, any>>();

	recordSource : IRecordSource = {
		getFilterObject: () => this.getParameter('filterObject'),
		getFilterString: () => this.getParameter('filterString'),
		getMaxRecords: () => this.getParameter('maxRecords'),
		getSortOrder: () => this.getParameter('sortOrder'),
		getWhereClause: () => this.getParameter('whereClause'),
		getWhereObject: () => this.getParameter('whereObject'),
		setFilterObject: (value : object | null) => this.setParameter('filterObject', value),
		setFilterString: (value : string) => this.setParameter('filterString', value),
		setMaxRecords: (value : number) => this.setParameter('maxRecords', value),
		setSortOrder: (value : Array<object>) => this.setParameter('sortOrder', value),
		setWhereClause: (value : string) => this.setParameter('whereClause', value),
		setWhereObject: (value : object | null) => this.setParameter('whereObject', value),
	};

	constructor(options : DataObjectOptions) {
		super();

		this._options = merge(defaults, options);
		this._dataHandler = options.dataHandler || new DataHandler({
			articleId: options.articleId,
			dataSourceId: options.dataSourceId,
			timeout: options.timeout
		});

		this.initialize();
	}

	areParametersChanged() : boolean {
		return this._parametersChanged;
	}

	areRecordsSaving() : boolean {
		return false;
	}

	attachEvent(event : string, eventHandler : ListenerFn) {
		super.on.call(this, event, eventHandler);
	}

	detachEvent(event : string, eventHandler : ListenerFn) {
		super.removeListener.call(this, event, eventHandler);
	}

	cancelEdit() {
		if (typeof this._currentIndex === 'number') {
			if (this.isDirty(this._currentIndex)) {
				this.cleanRecord(this._currentIndex);
			}

			this.emit('onCancelEdit', this._currentIndex);

			return true;
		}

		return false;
	}

	cancelField(field : string) : boolean {
		if (this._currentIndex !== null) {
			return this.cleanRecord(this._currentIndex, field);
		}
	
		return false;
	}

	cleanRecord(index : number, field : string | null = null) : boolean {
		if (field === null) {
			const wasDirty = this._recordStatus.delete(index);

			if (wasDirty) {
				this.emit('onDirtyChanged', false);
				this.emit('onRecordRefreshed', index);
			}

			return wasDirty;
		} else {
			const status = this._recordStatus.get(index);

			if (status) {
				return status.delete(field);
			}
		}

		return false;
	}

	clearFilter() : void {

	}

	currentRow() {

	}

	dataLastLoaded() : Date {
		return new Date();
	}

	endEdit(callback? : Function) : Promise<boolean> {
		return new Promise((resolve, reject) => {

		});
	}

	deleteCurrentRow(callback? : Function) : Promise<boolean> {
		return new Promise((resolve, reject) => {
	
		});
	}
	
	deleteRow(index : number, callback? : Function) : Promise<boolean> {
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

	isDataLoaded() : boolean {
		return false;
	}

	isDataLoading() : boolean {
		return false;
	}

	isDeleteAllowed() : boolean {
		return this._options.allowDelete && !this._disableDelete;
	}
	
	isDeleteNeverAllowed() : boolean {
		return this._options.allowDelete;
	}

	isDirty(indexOrField : number | string | null = null) : boolean {
		if (typeof indexOrField === 'number') {
			return this.isRecordDirty(indexOrField);
		} else if (indexOrField === null && this._currentIndex !== null) {
			return this.isRecordDirty(this._currentIndex);
		} else if (typeof indexOrField === 'string' && this._currentIndex !== null) {
			return this.isFieldDirty(this._currentIndex, indexOrField);
		}

		return false;
	}

	isFieldDirty(index : number, field : string) : boolean {
		const status = this._recordStatus.get(index);
		if (status && status.has(field)) {
			return true;
		}

		return false;
	}

	isRecordDirty(index : number) : boolean {
		const status = this._recordStatus.get(index);

		if (status) {
			return status.size > 0;
		}

		return false;
	}
	
	isInsertAllowed() : boolean {
		return this._options.allowInsert && ! this._disableInsert;
	}

	isInsertNeverAllowed() : boolean {
		return this._options.allowInsert;
	}

	isUpdateAllowed() : boolean {
		return this._options.allowUpdate && ! this._disableUpdate;
	}

	isUpdateNeverAllowed() : boolean {
		return this._options.allowUpdate;
	}

	getCurrentIndex() : number | null {
		return this._currentIndex;
	}

	getData(index : number | undefined, field : string | undefined) : object | Array<object> {
		return {};
	}

	getDataLength() : number {
		return this._storageEngine.length();
	}

	getDataSourceId() : string | null {
		return this._options.dataSourceId;
	}

	getDirtyData(index? : number, field? : string) : any {
		return null;
	}

	getFields() : Array<FieldDefinition> {
		throw new Error('Not implemented');
	}

	getFieldsAsync() : Promise<Array<FieldDefinition>> {
		return Promise.resolve([]);
	}

	getGroupBy() : string {
		return '';
	}

	getLinkFields() : object {
		return {};
	}

	getMasterDataObject() : IDataObject | null {
		return this._options.masterDataObject;
	}

	getMaxRecords() : number {
		return -1;
	}

	getParameter(parameter : string) : any {
		if (parameter in this._options.parameters) {
			return this._options.parameters[parameter];
		}

		return null;
	}

	getUniqueIdField() : string {
		return '';
	}

	refreshCurrentRow(callback?: Function) : Promise<boolean> {
		return Promise.resolve(false);
	}
	
	refreshDataSource(callback? : Function) : Promise<boolean> {
		if (this.isDirty()) {
			const answer = this._options.confirmHandler(
				'Reloading data',
				'There are unsaved changes. Would you like to save before reloading data?',
				'Save and reload',
				'Reload without saving',
				'Cancel reloading'
			);

			return answer
				.then(saveFirst => {
					if (saveFirst) {
						return this.endEdit()
							.then(() => this.refreshDataSource(callback))
					} else {
						this.cancelEdit();
						return this.refreshDataSource(callback);
					}
				})
				.catch(() => false);
		} else if (this._currentLoadingPromise !== null && !this.areParametersChanged()) {
			if (typeof callback === 'function' && this._currentLoadingPromise !== null) {
				this._currentLoadingPromise
					.then(result => fireCallback(callback, result));
			}

			return this._currentLoadingPromise;
		}

		this._currentLoadingPromise =  new Promise((resolve, reject) => {
			// TODO: Retrieve data
		});

		return this._currentLoadingPromise;
	}
	
	refreshRow(index : number, callback? : Function) : Promise<boolean> {
		return new Promise((resolve, reject) => {
	
		});
	}
	
	save(data : object, callback? : Function) : Promise<boolean> {
		return Promise.resolve(false);
	}

	setAllowDelete(allow : boolean) : void {
		if (this._options.allowDelete && this._disableDelete !== !allow) {
			this._disableDelete = !allow;
			this.emit('onAllowDeleteChanged', allow);
		}
	}

	setAllowUpdate(allow : boolean) {
		if (this._options.allowUpdate && this._disableUpdate !== !allow) {
			this._disableUpdate = !allow;
			this.emit('onAllowUpdateChanged', allow);
		}
	}

	setAllowInsert(allow : boolean) {
		if (this._options.allowInsert && this._disableInsert !== !allow) {
			this._disableInsert = !allow;
			this.emit('onAllowInsertChanged', allow);
		}
	}

	setConfirmHandler(handler: IConfirmHandler) : void {

	}

	setCurrentIndex(index : number | null) : boolean {
		return false;
	}

	setGroupBy(groupBy : string) : void {

	}

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
