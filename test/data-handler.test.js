const { DataHandler } = require('../src/data-handler');
global.fetch = require('jest-fetch-mock');

describe('DataHandler', () => {
	let handler = new DataHandler();

	beforeEach(() => {
		handler = new DataHandler({
			dataSourceId: 'dsTest'
		});
		global.fetch.resetMocks();
	});

	it('gets article ID from global AF object', async () => {
		// global AF object defined in jest.config.js
		expect(handler.articleId).toEqual('test-article');
	});

	it('can create records', async () => {
		const callback = jest.fn(() => null);
		const record = { key: 'value', more: 'data' };
		const arr = Array.from(Object.values(record));
		fetch.mockResponse(JSON.stringify({ success: arr }));

		const result = await handler.create(record, callback);
		expect(result).toEqual(arr);
		expect(callback).toBeCalledWith(null, arr);
		expect(fetch.mock.calls.length).toBe(1);

		const [request] = fetch.mock.calls;
		expect(request[0]).toBe('/create/test-article/dsTest');
		expect(request[1].body).toEqual(JSON.stringify(record));
	});

	it('can delete records', async () => {
		const callback = jest.fn(() => null);
		const record = { PrimKey: 'nope' };
		fetch.mockResponse(JSON.stringify({ success: true }));

		const result = await handler.destroy(record, callback);
		expect(result).toBe(true);
		expect(callback).toBeCalledWith(null, true);
		expect(fetch.mock.calls.length).toBe(1);

		const [request] = fetch.mock.calls;
		expect(request[0]).toBe('/destroy/test-article/dsTest');
		expect(request[1].body).toEqual(JSON.stringify(record));
	});

	it('can update records', async () => {
		const callback = jest.fn(() => null);
		const record = { PrimKey: 'nope', field: 'value' };
		const response = { success: Array.from(Object.values(record)) };
		fetch.mockResponse(JSON.stringify(response));

		const result = await handler.update(record, callback);
		expect(result).toEqual(response.success);
		expect(callback).toBeCalledWith(null, response.success);
		expect(fetch.mock.calls.length).toBe(1);

		const [request] = fetch.mock.calls;
		expect(request[0]).toBe('/update/test-article/dsTest');
		expect(request[1].body).toEqual(JSON.stringify(record));
	});

	it('can retrieve records', async () => {
		const callback = jest.fn(() => null);
		const request = { filterString: '1 = 2' };
		const record = { PrimKey: 'nope', field: 'value' };
		const response = { success: Array.from(Object.values(record)) };
		fetch.mockResponse(JSON.stringify(response));

		const result = await handler.retrieve(request, callback);
		expect(result).toEqual(response.success);
		expect(callback).toBeCalledWith(null, response.success);
		expect(fetch.mock.calls.length).toBe(1);

		const [fetchRequest] = fetch.mock.calls;
		expect(fetchRequest[0]).toBe('/retrieve/test-article/dsTest');
		expect(fetchRequest[1].body).toEqual(JSON.stringify(request));
	});

	it('handles expected errors', async () => {
		const callback = jest.fn(() => null);
		const response = { error: ':(((' };
		fetch.mockResponse(JSON.stringify(response));

		try {
			await handler.retrieve({ nope: 'nope' });
		} catch (err) {
			expect(err).toEqual(response.error);
		}

		expect(callback).toBeCalledWith(response.error);
	});
});