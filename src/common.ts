export function fireCallback(callback : Function, ...args : any[]) {
	if (typeof callback === 'function') {
		callback(...args);
	}
}