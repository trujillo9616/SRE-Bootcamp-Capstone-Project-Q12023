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

export { usernameError, passwordError };
