export function fireCallback(callback, ...args) {
	if (typeof callback === 'function') {
		callback(...args);
	}
}