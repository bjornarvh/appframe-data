import {
	Appframe,
	DataObjectOptions,
	ProcedureOptions,
} from '../types';

declare global {
	interface Window {
		af : Appframe
	}
}

class OptionsCollection {
	private _dataObjects = new Map<string, DataObjectOptions>();
	private _procedures = new Map<string, ProcedureOptions>();

	addDataObject(id : string, options : DataObjectOptions) {
		this._dataObjects.set(id, options);
	}

	addProcedure(id : string, options : ProcedureOptions) {
		this._procedures.set(id, options);
	}

	getDataObject(id : string) : DataObjectOptions | null {
		return this._dataObjects.get(id) || null;
	}

	getProcedure(id : string) : ProcedureOptions | null {
		return this._procedures.get(id) || null;
	}
}

function createDataConstructors(collection : OptionsCollection) {
	return {
		...window.af,
		article: {
			dataObjects: {},
			procedures: {}
		},
		common: {
			expose: () => null
		},
		DataObject: function(options : DataObjectOptions) {
			collection.addDataObject(options.dataSourceId, options);
		},
		Procedure: function(options : ProcedureOptions) {
			collection.addProcedure(options.procedureId, options)
		},
	}
}

export function importStaticScript(articleId : string) : Promise<OptionsCollection> {
	return new Promise((resolve, reject) => {
		fetch(`/file/article/static-script/${articleId}`)
			.then(res => res.text())
			.then(text => {
				try {
					const collection = new OptionsCollection();
					const af = createDataConstructors(collection);
					eval(text);
					resolve(collection);
				} catch(err) {
					reject(new Error(`Failed to import static script for article '${articleId}': ${err.message}`));
				}
			});
	});
}
