const { MemoryStorage } = require('../src/memory-storage');

describe('Memory Storage', () => {
	let storage;

	beforeEach(() => {
		storage = new MemoryStorage();
		storage.create({ key: 'value' });
	});

	it('can create records', () => {
		const index = storage.create({ data: null });
		expect(index).toBe(1);
	});

	it('can retrieve records', () => {
		let data = storage.retrieve();
		expect(data).toEqual([{ key: 'value' }]);
	});

	it('can update records', () => {
		let data;

		storage.update(0, { key: 'new value' });

		data = storage.retrieve(0);
		expect(data).toEqual({ key: 'new value' });

		storage.update(0, [1, 2, 3]);

		data = storage.retrieve(0);
		expect(data).toEqual([1, 2, 3]);
	});		

	it('can return the storage size', () => {
		const size = storage.length();
		expect(size).toEqual(1);
	});

	it('can remove records', () => {
		storage.destroy(0);
		expect(storage.length()).toBe(0);
	});

	it('throws error if new record isn\'t an object', () => {
		const create = () => storage.create(0);
		expect(create).toThrow(TypeError);
	});

	it('throws error if index is invalid when deleting', () => {
		const destroy = () => storage.destroy('a');
		expect(destroy).toThrow(TypeError);
	});

	it('throws error if index is invalid when retrieving', () => {
		const retrieve = () => storage.retrieve('a');
		expect(retrieve).toThrow(TypeError);
	});

	it('throws error if index is invalid when updating', () => {
		let update = () => storage.update('a');
		expect(update).toThrow(TypeError);
	});

	it('throws error if record is invalid when updating', () => {
		const update = () => storage.update(0, 'a');
		expect(update).toThrow(TypeError);
	});
});