export interface Af {
	article: AfArticle
}

export interface AfArticle {
	id: string
}

export interface ICallbackFunction {
	(error : any, data : any) : void;
}

export interface IDataHandler {
	create(data: object, callback: Function) : Promise<object | boolean>;
	destroy(data: object, callback: Function) : Promise<object | boolean>;
	retrieve(data: object, callback: Function) : Promise<object | boolean>;
	update(data: object, callback: Function) : Promise<object | boolean>;
}

export interface IDataObject {
	recordSource: IRecordSource;
}

export interface IErrorHandler {
	(error : string, callback : Function) : void;
}

export interface IDataObjectField {

}

export interface IDataObjectOptions {
	allowDelete?: boolean;
	allowUpdate?: boolean;
	allowInsert?: boolean;
	articleId?: string;
	fields?: Array<IDataObjectField>;
	dataHandler?: IDataHandler;
	dataSourceId?: string;
	disableAutoload?: boolean;
	dynamicLoading?: boolean;
	errorHandler?: IErrorHandler;
	groupBy?: object;
	hasIITrig?: boolean;
	hasIUTrig?: boolean;
	hasIDTrig?: boolean;
	linkFields?: object;
	masterDataObject?: object;
	optimisticLocking?: boolean;
	parameters?: IDataObjectParameters;
	selectFirstRow?: boolean;
	strict?: boolean;
	systemFieldNames?: object;
	timeout?: number;
	uniqueIdField?: string;
}

export interface IPrivateDataObjectOptions {
	allowDelete: boolean;
	allowUpdate: boolean;
	allowInsert: boolean;
	articleId: string;
	fields: Array<IDataObjectField>;
	dataSourceId: string | null;
	disableAutoload: boolean;
	dynamicLoading: boolean;
	errorHandler: IErrorHandler;
	groupBy: object | null;
	hasIITrig: boolean;
	hasIUTrig: boolean;
	hasIDTrig: boolean;
	linkFields: object | null;
	masterDataObject: object | null;
	optimisticLocking: boolean;
	parameters: IDataObjectParameters;
	selectFirstRow: boolean;
	strict: boolean;
	systemFieldNames: object;
	timeout: number;
	uniqueIdField: string;
}

export interface IDataObjectParameters {
	[index: string] : any;
	distinctRows?: boolean;
	filterObject?: object | null;
	filterString?: string | null;
	masterChildCriteria?: object | null;
	maxRecords?: number;
	sortOrder?: Array<any>;
	whereObject?: object | null;
	whereClause?: string | null;
}

export interface IRecordSource {
	getFilterObject: Function
	setFilterObject: Function
	getFilterString: Function
	setFilterString: Function
	getMasterChildCriteria: Function
	setMasterChildCriteria: Function
	getMaxRecords: Function
	setMaxRecords: Function
	getSortOrder: Function
	setSortOrder: Function
	getWhereObject: Function
	setWhereObject: Function
	getWhereClause: Function
	setWhereClause: Function
}