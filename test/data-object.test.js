/* eslint-env node */
/* eslint-disable no-undef */
const DataObject = require('../src/data-object');

global.af = {
	article: {
		id: 'test'
	}
};

test('data object gets correct ID', () => {
	const dataObject = new DataObject({
		dataSourceId: 'dsTestObject'
	});

	expect(dataObject.getDataSourceId()).toBe('dsTestOBject');
});