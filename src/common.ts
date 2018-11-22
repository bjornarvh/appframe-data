export function fireCallback(callback : Function | undefined, ...args : any[]) {
	if (typeof callback === 'function') {
		callback(...args);
	}
}