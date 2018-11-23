const { fireCallback } = require('../src/common');

describe('fireCallback', () => {
	it('calls the callback with all the arguments', () => {
		const testCallback = jest.fn(() => null);
		const result = fireCallback(testCallback, 'test1', 2);

		expect(result).toBe(true);
		expect(testCallback).toBeCalledWith('test1', 2);
	});
	
	it('returns if callback is not a function', () => {
		const result = fireCallback(undefined, 'test2', 2);
		expect(result).toBe(false);
	});
});
