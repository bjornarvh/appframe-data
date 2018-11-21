/* eslint-env node */
/* eslint-disable no-undef */
import { DataObject } from '../src/data-object';

global.af = {
	article: {
		id: 'test'
	}
};

test('Data object gets correct ID', () => {
	const dataObject = new DataObject({
		dataSourceId: 'dsTestObject'
	});

	expect(dataObject.getDataSourceId()).toBe('dsTestObject');
});

test('Data object gets recordSource helper', () => {
	const dataObject = new DataObject({});
	const params = ['FilterString', 'FilterObject', 'WhereClause', 'WhereObject', 'MaxRecords', 'SortOrder'];

	for (let param of params) {
		const actualParam = param.substring(0, 1).toLowerCase() + param.substring(1);
		const value = Math.random();
		expect(`set${param}` in dataObject.recordSource).toBe(true);
		expect(`get${param}` in dataObject.recordSource).toBe(true);

		dataObject.setParameter(actualParam, value);
		expect(dataObject.recordSource[`get${param}`]()).toBe(value);

		const value2 = Math.random();
		dataObject.recordSource[`set${param}`](value2);
		expect(dataObject.getParameter(actualParam)).toBe(value2);
	}
});