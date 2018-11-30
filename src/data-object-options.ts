import { Appframe, IPrivateDataObjectOptions } from '../types';

declare const af : Appframe;

export const defaults = {
	allowDelete: false,
	allowUpdate: false,
	allowInsert: false,
	articleId: af && af.article && af.article.id,
	confirmHandler: function(title : string, question : string, yes : string, no : string, cancel : string) : Promise<boolean> {
		return new Promise((resolve, reject) => {
			if (confirm(question)) {
				resolve(true);
			} else {
				reject(cancel);
			}
		});
	},
	dataSourceId: null,
	disableAutoload: false,
	dynamicLoading: false,
	fields: [],
	groupBy: null,
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
