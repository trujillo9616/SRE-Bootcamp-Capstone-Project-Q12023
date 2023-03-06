function exclude<T, K extends keyof T>(model: T, keys: K[]): Omit<T, K> {
	for (const key of keys) {
		delete model[key];
	}
	return model;
}

export default exclude;
