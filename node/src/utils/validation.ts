import { customError } from './errors';

const validateValue = (value: unknown, type: string) => {
	if (!value) {
		throw customError('Value is required', 'ValueRequiredError');
	}
	if (typeof value !== type) {
		throw customError(`Value is not of type ${type}`, 'ValueTypeError');
	}
};

export default validateValue;
