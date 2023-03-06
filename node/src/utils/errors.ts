const usernameError = () => {
	const error = new Error('Invalid username or password');
	error.name = 'UserNotFoundError';
	return error;
};

const passwordError = () => {
	const error = new Error('Invalid username or password');
	error.name = 'InvalidPasswordError';
	return error;
};

const customError = (message: string, name: string) => {
	const error = new Error(message);
	error.name = name;
	return error;
};

export { usernameError, passwordError, customError };
