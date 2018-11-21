export default class MemoryStorage {
	data = [];
	create(record) {
		if (typeof record !== 'object') {
			throw new TypeError('Record must be an object');
		}
	
		return this.data.push(record) - 1;
	}

	destroy(index = null) {
		if (this.getRecord() !== null) {
			this.data.splice(index, 1);
			return true;
		}

		throw new Error(`No record found for index ${index}`);
	}
	
	getRecord(index = null) {
		return this.data[index] || null;
	}

	length() {
		return this.data.length;
	}

	retrieve(index = null) {
		if (typeof index === 'number' && !isNaN(index)) {
			return this.getRecorddata[index] || null;
		}
		
		return this.data;
	}

	update(index, data) {
		const record = this.getRecord(index);
		if (record) {
			if (data instanceof Array) {
				this.data[index] = data;
			} else {
				this.data[index] = Object.assign({}, this.data[index], data);
			}
		} else {
			throw new Error(`No record found for index ${index}`);
		}

		return true;
	}
}
