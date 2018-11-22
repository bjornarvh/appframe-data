const { fireCallback } = require('../src/common');

test('Callback is called with correct arguments in fireCallback', () => {
	let firstArg = '';
	let secondArg = '';

	function testCallback(arg1, arg2) {
		firstArg = arg1;
		secondArg = arg2;
	}

	fireCallback(testCallback, 'test1', 2);

	expect(firstArg).toBe('test1');
	expect(secondArg).toBe(2);
});
