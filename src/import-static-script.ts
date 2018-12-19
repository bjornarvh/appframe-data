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
		article: window.af.article,
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

function importStaticScript(articleId : string) : Promise<OptionsCollection> {
	return new Promise((resolve, reject) => {
		fetch(`/file/article/static-script/${articleId}`)
			.then(res => res.text())
			.then(text => {
				const script = document.createElement('script');
				const collection = new OptionsCollection();
				const oldAf = window.af;
				window.af = createDataConstructors(collection);

				const destructor = () => {
					script.onload = null;
					script.remove();
					URL.revokeObjectURL(script.src);
					script.src = '';
					window.af = oldAf;
				};

				script.onerror = () => {
					reject(new Error(`Failed to import static script for article '${articleId}.`));
					destructor();
				};
	
				script.onload = () => {
					resolve(collection);
					destructor();
				};

				const blob = new Blob([text], { type: 'text/javascript' });
				script.src = URL.createObjectURL(blob);

				document.head.appendChild(script);
			});
	});
}

export { importStaticScript };