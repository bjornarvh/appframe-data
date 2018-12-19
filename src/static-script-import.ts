import {
	Appframe,
	DataObjectOptions,
	ProcedureOptions
} from '../types';

declare const af : Appframe;

class DummyCollection {
	private _dataObjects = new Map<string, DataObjectOptions>();
	private _procedures = new Map<string, ProcedureOptions>();

	addDataObject(id : string, dataObject : DataObjectOptions) {
		this._dataObjects.set(id, dataObject);
	}

	addProcedure(id : string, procedure : ProcedureOptions) {
		this._procedures.set(id, procedure);
	}

	getDataObject(id : string) : DataObjectOptions | null {
		return this._dataObjects.get(id) || null;
	}

	getProcedure(id : string) : ProcedureOptions | null {
		return this._procedures.get(id) || null;
	}
}

function fakeAppframeFactory(collection : DummyCollection) {
	return {
		DataObject: function(options : DataObjectOptions) {
			collection.addDataObject(options.dataSourceId, options);
		},
		Procedure: function(options : ProcedureOptions) {
			collection.addProcedure(options.procedureId, options);
		}
	}
}

let currentImporter : Promise<DummyCollection> | null = null;

function importStaticScript(articleId : string) : Promise<DummyCollection> {
	if (currentImporter && typeof currentImporter.then === 'function') {
		return currentImporter.then(() => importStaticScript(articleId));
	}

	currentImporter = new Promise((resolve, reject) => {
		const script = document.createElement('script');

		const destructor = () => {
			script.onload = null;
			script.remove();
			URL.revokeObjectURL(script.src);
			script.src = '';
			window.af = af;
		};

		script.src = `/file/article/static-script/${articleId}.js`;
		script.type = 'text/javascript';

		script.onerror = () => {
			reject(new Error(`Failed to import static script for article '${articleId}'.`));
			destructor();
		};

		script.onload = function() {
			destructor();
		}

		document.body.appendChild(script);
	});

	return currentImporter.then(result => {
		currentImporter = null
		return result;
	});
}

export { importStaticScript };
	