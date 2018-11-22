export default class MemoryStorage {
	data : Array<object> = [];

	create(record : object) : number {
		if (typeof record !== 'object') {
			throw new TypeError('Record must be an object');
		}
	
		return this.data.push(record) - 1;
	}

	destroy(index : number | null = null) : boolean {
		if (index !== null && this.getRecord() !== null) {
			this.data.splice(index, 1);
			return true;
		}

		return false;
	}
	
	getRecord(index : number | null = null) : object | null {
		if (index === null) {
			return null;
		}

		return this.data[index] || null;
	}

	length() : number {
		return this.data.length;
	}

	retrieve(index : number | null = null) : Array<object> | object | null {
		if (typeof index === 'number' && !isNaN(index)) {
			return this.getRecord(index);
		}
		
		return this.data;
	}

	update(index : number, data : Array<any> | object) : boolean {
		const record = this.getRecord(index);
		if (record) {
			if (data instanceof Array) {
				this.data[index] = data;
			} else {
				this.data[index] = Object.assign({}, this.data[index], data);
			}

			return true;
		}
		
		return false;
	}
}
