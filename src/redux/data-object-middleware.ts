import { Store } from 'redux';
import { Appframe, IReduxAction, IReduxState } from '../../types';
import { ReduxDataObject } from './data-object';

declare const af : Appframe;

function getRequestOptionsFromState(state : IReduxState) {

}

export const dataObjectMiddleware = 
	(store : Store) => (next : Function) => (action : IReduxAction) => {
		next(action);

		const { payload, type } = action;

		if (payload) {
			const { dataSourceId } = payload;
			
			if (dataSourceId) {
				const dataObject = af.article.dataObjects[dataSourceId];

				if (dataObject instanceof ReduxDataObject) {
					if (type === 'DELETE_RECORD_REQUEST') {
						
					} else if (type === 'FETCH_DATA_REQUEST') {

					} else if (type == 'SAVE_RECORD_REQUEST') {

					}
				}
			}
		}
	};