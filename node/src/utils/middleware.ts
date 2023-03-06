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
	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message });
	} else if (error.name === 'JsonWebTokenError') {
		return res.status(401).json({ error: 'invalid token' });
	} else if (error.name === 'TokenExpiredError') {
		return res.status(401).json({ error: 'token expired' });
	} else if (error.name === 'UserNotFound') {
		return res.status(401).json({ error: error.message });
	} else if (error.name === 'InvalidPasswordError') {
		return res.status(401).json({ error: error.message });
	}
	return next(error);
};

export default {
	unknownEndpoint,
	errorHandler,
};
