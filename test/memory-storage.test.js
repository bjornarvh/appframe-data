const { MemoryStorage } = require('../src/memory-storage');

describe('Memory Storage', () => {
	it('can create, destroy, retrieve and update records', () => {
		const storage = new MemoryStorage();
		const index = storage.create({ data: null });

		expect(index).toBe(0);

		let data = storage.retrieve();
		expect(data).toEqual([{ data: null }]);

		const result = storage.update(0, { data: 1 });
		expect(result).toBe(true);

		data = storage.retrieve(0);
		expect(data).toEqual({ data: 1 });

		expect(storage.length()).toBe(1);

		storage.destroy(0);
		expect(storage.length()).toBe(0);
	});
});