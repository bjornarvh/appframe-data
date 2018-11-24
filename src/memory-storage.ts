import { IStorageEngine } from '../types';
const invalidIndexError = 'Index must be a number and be within the range of the data indices.';
const invalidRecordError = 'Record must be an object';

export class MemoryStorage implements IStorageEngine {
	data : Array<object> = [];

	/**
	 * Adds a record to the storage
	 * 
	 * @param record Record to add to the storage
	 * @returns Index of the created record
	 */
	create(record : object) : number {
		if (typeof record !== 'object') {
			throw new TypeError(invalidRecordError);
		}
	
		return this.data.push(record) - 1;
	}

	/**
	 * Removes a record from the storage
	 * 
	 * @param index Index of the record to remove
	 */
	destroy(index : number) : void {
		if (this.isValidIndex(index)) {
			this.data.splice(index, 1);
		} else {
			throw new TypeError(invalidIndexError);
		}
	}
	
	/**
	 * Checks if an index is valid for the storage.
	 * 
	 * @param index Index to be checked if is valid
	 */
	isValidIndex(index : number | null) : boolean {
		if (typeof index === 'number' && !isNaN(index)) {
			return index >= 0 && index < this.data.length;
		}

		return false;
	}

	/**
	 * @returns Current number of records stored.
	 */
	length() : number {
		return this.data.length;
	}

	/**
	 * Retrieves a single record from the storage, or an array of
	 * all records if index is not given.
	 * 
	 * @param index Index of the record to be retrieved
	 */
	retrieve(index? : number) : Array<object> | object | null {
		if (typeof index === 'undefined') {
			return this.data;
		} else if (this.isValidIndex(index)) {
			return this.data[index];
		}
		
		throw new TypeError(invalidIndexError);
	}

	/**
	 * 
	 * @param index Index of the record to update
	 * @param data Data to update the record with
	 */
	update(index : number, data : Array<any> | object) : void {
		if (this.isValidIndex(index)) {
			if (data instanceof Array) {
				this.data[index] = data;
			} else if (typeof data === 'object') {
				this.data[index] = Object.assign({}, this.data[index], data);
			} else {
				throw new TypeError(invalidRecordError);
			}
		} else {
			throw new TypeError(invalidIndexError);
		}
	}
}
