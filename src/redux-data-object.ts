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
			type: 'deleteRecordFailure',	
		}
	}

	deleteRecordRequest(primKey : string) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'deleteRecordRequest',	
		}
	}

	deleteRecordSuccess(primKey : string) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'deleteRecordSuccess',	
		}
	}

	fetchDataFailure(error : string) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'fetchDataFailure',	
		}
	}

	fetchDataRequest() : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'fetchDataRequest',	
		}
	}

	fetchDataSuccess(data : any) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'fetchDataSuccess',	
		}
	}

	saveRecordFailure(primKey : string, error : string) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'saveRecordFailure',	
		}
	}

	saveRecordRequest(primKey : string) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'saveRecordRequest',	
		}
	}

	saveRecordSuccess(primKey : string, record : any) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'saveRecordSuccess',	
		}
	}

	setField(field : string | object, value? : any) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'setField',	
		}
	}

	setAllowDelete(allow : boolean) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'setAllowDelete',	
		}
	}

	setAllowInsert(allow : boolean) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'setAllowInsert',	
		}
	}

	setAllowUpdate(allow : boolean) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'setAllowUpdate',	
		}
	}

	setFilterObject(filterObject : object | null) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'setFilterObject',	
		}
	}

	setFilterString(filterString : string) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'setFilterString',	
		}
	}

	setMaxRecords(maxRecords : number) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'setMaxRecords',	
		}
	}

	setSortOrder(sortOrder : Array<object> | null) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'setSortOrder',	
		}
	}

	setWhereClause(whereClause : string) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'setWhereClause',	
		}
	}

	setWhereObject(whereObject : object | null) : IReduxAction {
		return {
			payload: {
				dataSourceId: this.options.dataSourceId,
			},
			type: 'setWhereObject',	
		}
	}

}
