const DataHandler = require('../src/data-handler');
global.fetch = require('jest-fetch-mock');

describe('DataHandler', () => {
	beforeEach(() => {
		global.fetch.resetMocks();
	});

	it('does stuff', async () => {
		const handler = new DataHandler();
		const data = await handler.retrieve({});

		expect(data).toEqual({});
	});
});