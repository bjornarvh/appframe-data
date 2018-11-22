/* eslint-env node */
const { DataObject } = require('../src/data-object');

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
	const params = [
		['filterObject', 'getFilterObject', 'setFilterObject'],
		['filterString', 'getFilterString', 'setFilterString'],
		['maxRecords', 'getMaxRecords', 'setMaxRecords'],
		['sortOrder', 'getSortOrder', 'setSortOrder'],
		['whereClause', 'getWhereClause', 'setWhereClause'],
		['whereObject', 'getWhereObject', 'setWhereObject'],
	];

	for (let param of params) {
		const [name, getter, setter] = param;
		const value = Math.random();
		const value2 = Math.random();

		expect(getter in dataObject.recordSource).toBe(true);
		expect(setter in dataObject.recordSource).toBe(true);

		dataObject.setParameter(name, value);
		expect(dataObject.recordSource[getter]()).toBe(value);

		dataObject.recordSource[setter](value2);
		expect(dataObject.getParameter(name)).toBe(value2);
	}
});