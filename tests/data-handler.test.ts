import { DataHandler } from '../src/data-handler';
import fetchMock from 'jest-fetch-mock';

interface Object {
	[index: string] : any;
}

const objectValues = (obj : Object) => {
	const keys = Object.keys(obj);

	return keys.map(
		(key : string) : any => {
			return obj[key];
		}
	);
}

describe('DataHandler', () => {
	let handler = new DataHandler();

	beforeEach(() => {
		handler = new DataHandler({
			dataSourceId: 'dsTest'
		});
		handler.timeout = 30000;
		fetchMock.resetMocks();
	});

	it('gets article ID from global AF object', async () => {
		// global AF object defined in jest.config.js
		expect(handler.articleId).toEqual('test-article');
	});

	it('sends an X-Requested-With header', async() => {
		const mockFunction = fetchMock.mockResponseOnce(JSON.stringify({ success: true }));
		await handler.retrieve({});

		// @ts-ignore
		expect(mockFunction.mock.calls.length).toBe(1);
		// @ts-ignore
		const [path,options] = mockFunction.mock.calls[0];
		expect(path).toBe('/retrieve/test-article/dsTest');
		expect(options).toHaveProperty('headers');
		expect(options.headers).toHaveProperty('X-Requested-With');
		expect(options.headers['X-Requested-With']).toBe('XMLHttpRequest');
	});

	it('can create records', async () => {
		const callback = jest.fn(() => null);
		const record = { key: 'value', more: 'data' };
		const arr = objectValues(record);
		fetchMock.mockResponse(JSON.stringify({ success: arr }));

		const result = await handler.create(record, callback);
		expect(result).toEqual(arr);
		expect(callback).toBeCalledWith(null, arr);
		expect(fetchMock.mock.calls.length).toBe(1);

		const [request] = fetchMock.mock.calls;
		expect(request[0]).toBe('/create/test-article/dsTest');
		expect(request[1].body).toEqual(JSON.stringify(record));
	});

	it('can delete records', async () => {
		const callback = jest.fn(() => null);
		const record = { PrimKey: 'nope' };
		fetchMock.mockResponse(JSON.stringify({ success: true }));

		const result = await handler.destroy(record, callback);
		expect(result).toBe(true);
		expect(callback).toBeCalledWith(null, true);
		expect(fetchMock.mock.calls.length).toBe(1);

		const [request] = fetchMock.mock.calls;
		expect(request[0]).toBe('/destroy/test-article/dsTest');
		expect(request[1].body).toEqual(JSON.stringify(record));
	});

	it('can update records', async () => {
		const callback = jest.fn(() => null);
		const record = { PrimKey: 'nope', field: 'value' };
		const response = { success: objectValues(record) };
		fetchMock.mockResponse(JSON.stringify(response));

		const result = await handler.update(record, callback);
		expect(result).toEqual(response.success);
		expect(callback).toBeCalledWith(null, response.success);
		expect(fetchMock.mock.calls.length).toBe(1);

		const [request] = fetchMock.mock.calls;
		expect(request[0]).toBe('/update/test-article/dsTest');
		expect(request[1].body).toEqual(JSON.stringify(record));
	});

	it('can retrieve records', async () => {
		const callback = jest.fn(() => null);
		const request = { filterString: '1 = 2' };
		const record = { PrimKey: 'nope', field: 'value' };
		const response = { success: objectValues(record) };
		fetchMock.mockResponse(JSON.stringify(response));

		const result = await handler.retrieve(request, callback);
		expect(result).toEqual(response.success);
		expect(callback).toBeCalledWith(null, response.success);
		expect(fetchMock.mock.calls.length).toBe(1);

		const [fetchRequest] = fetchMock.mock.calls;
		expect(fetchRequest[0]).toBe('/retrieve/test-article/dsTest');
		expect(fetchRequest[1].body).toEqual(JSON.stringify(request));
	});

	it('handles expected errors', async () => {
		const callback = jest.fn(() => null);
		const response = { error: ':(((' };
		fetchMock.mockResponse(JSON.stringify(response));

		try {
			await handler.retrieve({ nope: 'nope' }, callback);
		} catch (err) {
			expect(err).toEqual(response.error);
		}

		expect(callback).toBeCalledWith(response.error);
	});

	it('returns false if it times out', async () => {
		const callback = jest.fn(() => null);
		handler.timeout = 10;
		fetchMock.mockResponse(() => new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({ body: '{success:true}' });
			}, 1000)
		}));

		const result = await handler.retrieve({ filterString: '1 = 2' }, callback);

		expect(result).toBe(false);
		expect(callback).toBeCalledTimes(0);
	});

	it('aborts if retrieve request is made before previous retrieve request finishes', async () => {
		const callback = jest.fn(() => null);
		fetchMock.mockResponse(() => new Promise(resolve => {
			setTimeout(() => {
				resolve({ body: JSON.stringify({ success: true }) });
			}, 25);
		}));

		const req1 = handler.retrieve({ filterString: 'req1' }, callback);
		const req2 = handler.retrieve({ filterString: 'req2' }, callback);

		const res1 = await req1;
		const res2 = await req2;

		expect(callback).toBeCalledTimes(1);
		expect(res1).toBe(false);
		expect(res2).toBe(true);
	});
});