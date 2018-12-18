import { ListenerFn } from "eventemitter3";

export interface Appframe {
	article : AfArticle
}

export interface AfDataObjects {
	[index : string] : IDataObject | IReduxDataObject
}

export interface AfArticle {
	id : string,
	dataObjects: AfDataObjects;
}

export interface IDataHandler {
	create(data : object, callback : Function) : Promise<object | boolean>;
	destroy(data : object, callback : Function) : Promise<object | boolean>;
	retrieve(data : object, callback : Function) : Promise<object | boolean>;
	update(data : object, callback : Function) : Promise<object | boolean>;
}

export type DataHandlerOptions = {
	articleId? : string,
	dataSourceId? : string,
	fields? : Array<string> | string,
	groupBy? : Array<string>,
	timeout? : number
}

export interface IDataObject {
	areParametersChanged() : boolean;
	areRecordsSaving() : boolean;
	attachEvent(event : string, handler : ListenerFn) : any;
	cancelEdit() : boolean;
	cancelField(field : string) : boolean;
	clearFilter() : void;
	currentRow(field? : string, value? : any) : any;
	dataLastLoaded() : Date;
	deleteRow(index : number, callback? : Function) : Promise<boolean>;
	deleteCurrentRow(callback? : Function) : Promise<boolean>;
	detachEvent(event : string, handler : ListenerFn) : any;
	endEdit(callback? : Function) : Promise<boolean>;
	getCurrentIndex() : number | null;
	getData(index? : number, field? : string) : any;
	getDataLength() : number;
	getDataSourceId() : string | null;
	getDirtyData(index? : number, field? : string) : any;
	getFields(field? : string) : Array<IDataObjectField> | IDataObjectField;
	getGroupBy() : string;
	getLinkFields() : object;
	getMasterDataObject() : IDataObject | null;
	getMaxRecords() : number;
	getParameter(parameter : string) : any;
	getUniqueIdField() : string;
	isDataLoaded() : boolean;
	isDataLoading() : boolean;
	isDeleteAllowed() : boolean;
	isDeleteNeverAllowed() : boolean;
	isDirty(indexOrField? : string | number) : boolean;
	isInsertAllowed() : boolean;
	isInsertNeverAllowed() : boolean;
	isUpdateAllowed() : boolean;
	isUpdateNeverAllowed() : boolean;
	recordSource : IRecordSource;
	refreshCurrentRow(callback? : Function) : Promise<boolean>;
	refreshDataSource(callback? : Function) : Promise<boolean>;
	refreshRow(index: number, callback? : Function) : Promise<boolean>;
	save(data : object, callback? : Function) : Promise<boolean>;
	setAllowDelete(allow : boolean) : void
	setAllowInsert(allow : boolean) : void
	setAllowUpdate(allow : boolean) : void
	setConfirmHandler(handler : IConfirmHandler) : void;
	setCurrentIndex(index : number | null) : boolean;
	setGroupBy(field : string) : void;
	setParameter(parameter : string, value : any) : any;
}

export interface IDataObjectField {

}

export type DataObjectOptions = {
	allowDelete ? : boolean;
	allowUpdate? : boolean;
	allowInsert? : boolean;
	articleId? : string;
	fields? : Array<IDataObjectField>;
	dataHandler? : IDataHandler;
	dataSourceId : string;
	disableAutoload? : boolean;
	dynamicLoading? : boolean;
	groupBy? : object;
	linkFields? : object;
	masterDataObject? : IDataObject;
	optimisticLocking? : boolean;
	parameters? : DataObjectParameters;
	selectFirstRow? : boolean;
	strict? : boolean;
	systemFieldNames? : object;
	timeout? : number;
	uniqueIdField? : string;
}

export type FieldDefinition = {
	aliasName : string | null
	caption : string;
	computed : boolean;
	description : string | null;
	excludeFromFilter : boolean;
	hasDefault : boolean;
	maxLength: number;
	identity : boolean;
	ignored : boolean;
	joined : boolean;
	name: string;
	nullable : boolean;
	type: string;
}

export interface IRecordDataOptions {
	PrimKey: string
}

export type DataObjectParameters = {
	[index : string] : any;
	distinctRows? : boolean;
	filterObject? : object | null;
	filterString? : string | null;
	masterChildCriteria? : object | null;
	maxRecords? : number;
	sortOrder? : Array<any>;
	whereObject? : object | null;
	whereClause? : string | null;
}

/**
 * A confirm handler should return a promise that resolves to true
 * if the user selects the "yes" answer, false if the user selects the
 * "no" answer and rejects it otherwise.
 */
export interface IConfirmHandler {
	(title : string, question : string, yes : string, no : string, cancel : string) : Promise<boolean>
}

export type PrivateDataObjectOptions = {
	allowDelete : boolean;
	allowUpdate : boolean;
	allowInsert : boolean;
	articleId : string;
	confirmHandler : IConfirmHandler;
	dataSourceId : string;
	disableAutoload : boolean;
	dynamicLoading : boolean;
	fields : Array<IDataObjectField>;
	groupBy : object | null;
	linkFields : object | null;
	masterDataObject : IDataObject | null;
	optimisticLocking : boolean;
	parameters : DataObjectParameters;
	selectFirstRow : boolean;
	strict : boolean;
	systemFieldNames : object;
	timeout : number;
	uniqueIdField : string;
}

export interface IRecordSource {
	[index : string] : Function;
	getFilterObject() : object | null;
	setFilterObject(filter : object | null) : void;
	getFilterString() : string;
	setFilterString(filter : string) : void;
	getMaxRecords() : number;
	setMaxRecords(maxRecords : number) : void;
	getSortOrder() : Array<object> | null;
	setSortOrder(sortOrder : Array<object> | null) : void;
	getWhereObject() : object | null;
	setWhereObject(filter : object | null) : void;
	getWhereClause() : string;
	setWhereClause(filter : string) : void;
}
export interface IReducer {
	(store : IReduxState, action : IReduxAction) : IReduxState
}

export interface IReduxAction {
	type: string;
	payload: IReduxActionPayload;
}

export interface IReduxActionPayload {
	[index : string] : any;
	dataSourceId : string;
}

export interface IReduxState {
	[index : string] : any;
}

export interface IReduxDataObject {
	deleteRecordFailure(primKey : string, error : string) : IReduxAction;
	deleteRecordRequest(primKey : string) : IReduxAction;
	deleteRecordSuccess(primKey : string) : IReduxAction;
	fetchDataFailure(error : string) : IReduxAction;
	fetchDataRequest() : IReduxAction;
	fetchDataSuccess(data : any) : IReduxAction;
	saveRecordFailure(primKey : string, error : string) : IReduxAction;
	saveRecordRequest(primKey : string) : IReduxAction;
	saveRecordSuccess(primKey : string, record : any) : IReduxAction;
	setField(field : string | object, value? : any) : IReduxAction;
	setAllowDelete(allow : boolean) : IReduxAction;
	setAllowInsert(allow : boolean) : IReduxAction;
	setAllowUpdate(allow : boolean) : IReduxAction;
	setFilterObject(filterObject : object | null) : IReduxAction;
	setFilterString(filterString : string) : IReduxAction;
	setMaxRecords(maxRecords : number) : IReduxAction;
	setSortOrder(sortOrder : Array<object> | null) : IReduxAction;
	setWhereClause(whereClause : string) : IReduxAction;
	setWhereObject(whereObject : object | null) : IReduxAction;
}

export interface IStorageEngine {
	create(record : object) : number;
	destroy(index : number) : void;
	length() : number;
	retrieve(index? : number) : Array<object> | object | null;
	update(index : number, data : Array<any> | object) : void;
}