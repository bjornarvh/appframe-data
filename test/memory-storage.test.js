const { MemoryStorage } = require('../src/memory-storage');

describe('Memory Storage', () => {
	it('can create, destroy, retrieve and update records', () => {
		const storage = new MemoryStorage();
		const index = storage.create({ data: null });

		expect(index).toBe(0);

		let data = storage.retrieve();
		expect(data).toEqual([{ data: null }]);

		storage.update(0, { data: 1 });
		data = storage.retrieve(0);
		expect(data).toEqual({ data: 1 });

		expect(storage.length()).toBe(1);

		storage.destroy(0);
		expect(storage.length()).toBe(0);
	});

	it('throws error on invalid arguments', () => {
		const storage = new MemoryStorage();
		
		const create = () => storage.create(0);
		expect(create).toThrow(TypeError);

		const destroy = () => storage.destroy('a');
		expect(destroy).toThrow(TypeError);

		const retrieve = () => storage.retrieve('a');
		expect(retrieve).toThrow(TypeError);

		const update = () => storage.update('a');
		expect(update).toThrow(TypeError);
	});
});