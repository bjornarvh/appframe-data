import { DataObject } from '../src/data-object';
import fetchMock from 'jest-fetch-mock';

describe('DataObject', () => {
	it('has a functioning recordSource helper', () => {
		const dataObject = new DataObject({
			dataSourceId: 'hei'
		});
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
});

describe('DataObject editing', () => {
	let dataObject = new DataObject({
		dataSourceId: 'hei'
	});

	beforeEach(() => {
		dataObject = new DataObject({
			dataSourceId: 'dsTest'
		});

		dataObject.setCurrentIndex(-1);

		fetchMock.resetMocks();
	});

	it('can set field values', () => {
		
	});
});