import { IReducer, IReduxAction, IReduxState } from "../../types";

function mergeState(state : IReduxState, dataSourceId : string, changes : object) : IReduxState {
	const current = state[dataSourceId];
	const updated = {};
	// @ts-ignore
	updated[dataSourceId] = {
		...current,
		...changes
	};

	return Object.assign({}, state, updated);
}

export function reducer(state : IReduxState, action : IReduxAction) : IReduxState {
	const { payload, type } = action;
	const { dataSourceId } = payload;
	const currentState = state[dataSourceId];

	switch (type) {
		case 'DELETE_RECORD_FAILURE':
			break;
		case 'DELETE_RECORD_REQUEST':
			break;
		case 'DELETE_RECORD_SUCCESS':
			break;
		case 'FETCH_DATA_FAILURE':
			break;
		case 'FETCH_DATA_REQUEST':
			break;
		case 'FETCH_DATA_SUCCESS':
			break;
		case 'SAVE_RECORD_FAILURE':
			break;
		case 'SAVE_RECORD_REQUEST':
			break;
		case 'SAVE_RECORD_SUCCESS':
			break;
		case 'SET_FIELD':
			break;
		case 'SET_ALLOW_DELETE':
			return mergeState(
				state,
				dataSourceId,
				{ allowDelete: payload.allowDelete }
			);
		case 'SET_ALLOW_INSERT':
			break;
		case 'SET_ALLOW_UPDATE':
			break;
		case 'SET_FILTER_OBJECT':
			break;
		case 'SET_FILTER_STRING':
			break;
		case 'SET_MAX_RECORDS':
			break;
		case 'SET_SORT_ORDER':
			break;
		case 'SET_WHERE_CLAUSE':
			break;
		case 'SET_WHERE_OBJECT':
			break;
	}

	return state;
}