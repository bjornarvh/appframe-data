export function fireCallback(callback : Function | undefined, ...args : any[]) : boolean {
	if (typeof callback === 'function') {
		callback(...args);
		return true;
	}

	return false;
}