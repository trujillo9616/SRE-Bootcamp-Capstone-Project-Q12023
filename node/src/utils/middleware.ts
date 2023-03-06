import { Request, Response, NextFunction } from 'express';

const unknownEndpoint = (_req: Request, res: Response) => {
	res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (
	error: Error,
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	switch (error.name) {
		case 'CastError':
			return res.status(400).send({ error: 'malformatted id' });
		case 'ValidationError':
			return res.status(400).json({ error: error.message });
		case 'JsonWebTokenError':
			return res.status(401).json({ error: 'invalid token' });
		case 'TokenExpiredError':
			return res.status(401).json({ error: 'token expired' });
		case 'UserNotFound':
			return res.status(401).json({ error: error.message });
		case 'InvalidPasswordError':
			return res.status(401).json({ error: error.message });
		case 'ValueRequiredError':
			return res.status(400).json({ error: error.message });
		case 'ValueTypeError':
			return res.status(400).json({ error: error.message });
		case 'InvalidCidrError':
			return res.status(400).json({ error: error.message });
		case 'InvalidMaskError':
			return res.status(400).json({ error: error.message });
		case 'MissingTokenError':
			return res.status(401).json({ error: error.message });
		case 'InvalidTokenError':
			return res.status(401).json({ error: error.message });
		case 'TokenError':
			return res.status(401).json({ error: error.message });
	}
	return next(error);
};

export default {
	unknownEndpoint,
	errorHandler,
};
