import { ListenerFn } from "eventemitter3";

export interface Af {
	article : AfArticle
}

export interface AfArticle {
	id : string
}

export interface IDataHandler {
	create(data : object, callback : Function) : Promise<object | boolean>;
	destroy(data : object, callback : Function) : Promise<object | boolean>;
	retrieve(data : object, callback : Function) : Promise<object | boolean>;
	update(data : object, callback : Function) : Promise<object | boolean>;
}

export interface IDataHandlerOptions {
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
	canModifyCurrentRow() : boolean
	canModifyRow(index : number) : boolean;
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
	hasDirtyRecords() : boolean;
	hasError(index : number) : boolean;
	hasField(field : string) : boolean;
	hasIDTrig() : boolean;
	hasIITrig() : boolean;
	hasIUTrig() : boolean;
	isDataLoaded() : boolean;
	isDataLoading() : boolean;
	isDeleteAllowed() : boolean;
	isDeleteNeverAllowed() : boolean;
	isDirty(indexOrField? : string | number) : boolean;
	isInsertAllowed() : boolean;
	isInsertNeverAllowed() : boolean;
	isNewRecord() : boolean;
	isNullable(field : string) : boolean;
	isSaving(index? : number) : boolean;
	isStrict() : boolean;
	isUpdateAllowed() : boolean;
	isUpdateNeverAllowed() : boolean;
	originalRow(field? : string) : any;
	recordSource : IRecordSource;
	refreshCurrentRow(callback? : Function) : Promise<object>;
	refreshDataSource(callback? : Function) : Promise<boolean>;
	refreshRow(index: number, callback? : Function) : Promise<boolean>;
	retrievePartial(skip : number, count : number, callback? : Function) : Promise<boolean>;
	save(data : object, callback? : Function) : Promise<boolean>;
	setAllowDelete(allow : boolean) : void
	setAllowInsert(allow : boolean) : void
	setAllowUpdate(allow : boolean) : void
	setConfirmHandler(handler : IConfirmHandler) : void;
	setCurrentIndex(index : number | null) : boolean;
	setErrorHandler(handler : IErrorHandler) : void;
	setGroupBy(field : string) : void;
	setParameter(parameter : string, value : any) : any;
}

export interface IDataObjectField {

}

export interface IDataObjectOptions {
	allowDelete ? : boolean;
	allowUpdate? : boolean;
	allowInsert? : boolean;
	articleId? : string;
	fields? : Array<IDataObjectField>;
	dataHandler? : IDataHandler;
	dataSourceId? : string;
	disableAutoload? : boolean;
	dynamicLoading? : boolean;
	errorHandler? : IErrorHandler;
	groupBy? : object;
	hasIITrig? : boolean;
	hasIUTrig? : boolean;
	hasIDTrig? : boolean;
	linkFields? : object;
	masterDataObject? : IDataObject;
	optimisticLocking? : boolean;
	parameters? : IDataObjectParameters;
	selectFirstRow? : boolean;
	strict? : boolean;
	systemFieldNames? : object;
	timeout? : number;
	uniqueIdField? : string;
}

export interface IFieldDefinition {
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

export interface IDataObjectParameters {
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

export interface IErrorHandler {
	(error : string, callback : Function) : void;
}

/**
 * A confirm handler should return a promise that resolves to true
 * if the user selects the "yes" answer, false if the user selects the
 * "no" answer and rejects it otherwise.
 */
export interface IConfirmHandler {
	(title : string, question : string, yes : string, no : string, cancel : string) : Promise<boolean>
}

export interface IPrivateDataObjectOptions {
	allowDelete : boolean;
	allowUpdate : boolean;
	allowInsert : boolean;
	articleId : string;
	confirmHandler : IConfirmHandler;
	dataSourceId : string | null;
	disableAutoload : boolean;
	dynamicLoading : boolean;
	errorHandler : IErrorHandler;
	fields : Array<IDataObjectField>;
	groupBy : object | null;
	hasIITrig : boolean;
	hasIUTrig : boolean;
	hasIDTrig : boolean;
	linkFields : object | null;
	masterDataObject : IDataObject | null;
	optimisticLocking : boolean;
	parameters : IDataObjectParameters;
	selectFirstRow : boolean;
	strict : boolean;
	systemFieldNames : object;
	timeout : number;
	uniqueIdField : string;
}

export interface IRecordSource {
	getFilterObject : Function
	setFilterObject : Function
	getFilterString : Function
	setFilterString : Function
	getMasterChildCriteria : Function
	setMasterChildCriteria : Function
	getMaxRecords : Function
	setMaxRecords : Function
	getSortOrder : Function
	setSortOrder : Function
	getWhereObject : Function
	setWhereObject : Function
	getWhereClause : Function
	setWhereClause : Function
}