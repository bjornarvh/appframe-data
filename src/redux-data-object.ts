import merge from 'deepmerge';

import { DataHandler } from './data-handler';
import { defaults } from './data-object-options';
import {
	Appframe,
	IDataObjectOptions,
	IPrivateDataObjectOptions,
	IReduxAction,
	IReduxDataObject,
	IDataHandler
} from '../types';

declare const af : Appframe;

export class ReduxDataObject implements IReduxDataObject {
	private dataHandler : IDataHandler
	private options : IPrivateDataObjectOptions;

	constructor(options : IDataObjectOptions) {
		this.options = merge(defaults, options);
		this.dataHandler = options.dataHandler || new DataHandler({
			articleId: this.options.articleId,
			dataSourceId: this.options.dataSourceId,
			timeout: this.options.timeout
		});
	}

	deleteRecordFailure(primKey : string, error : string) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'DELETE_RECORD_FAILURE',	
		}
	}

	deleteRecordRequest(primKey : string) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'DELETE_RECORD_REQUEST',	
		}
	}

	deleteRecordSuccess(primKey : string) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'DELETE_RECORD_SUCCESS',	
		}
	}

	fetchDataFailure(error : string) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'FETCH_DATA_FAILURE',	
		}
	}

	fetchDataRequest() : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'FETCH_DATA_REQUEST',	
		}
	}

	fetchDataSuccess(data : any) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'FETCH_DATA_SUCCESS',	
		}
	}

	saveRecordFailure(primKey : string, error : string) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'SAVE_RECORD_FAILURE',	
		}
	}

	saveRecordRequest(primKey : string) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'SAVE_RECORD_REQUEST',	
		}
	}

	saveRecordSuccess(primKey : string, record : any) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'SAVE_RECORD_SUCCESS',	
		}
	}

	setField(field : string | object, value? : any) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'SET_FIELD',	
		}
	}

	setAllowDelete(allow : boolean) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'SET_ALLOW_DELETE',	
		}
	}

	setAllowInsert(allow : boolean) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'SET_ALLOW_INSERT',	
		}
	}

	setAllowUpdate(allow : boolean) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'SET_ALLOW_UPDATE',	
		}
	}

	setFilterObject(filterObject : object | null) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'SET_FILTER_OBJECT',	
		}
	}

	setFilterString(filterString : string) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'SET_FILTER_STRING',	
		}
	}

	setMaxRecords(maxRecords : number) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'SET_MAX_RECORDS',	
		}
	}

	setSortOrder(sortOrder : Array<object> | null) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'SET_SORT_ORDER',	
		}
	}

	setWhereClause(whereClause : string) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'SET_WHERE_CLAUSE',	
		}
	}

	setWhereObject(whereObject : object | null) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'SET_WHERE_OBJECT',	
		}
	}

}
