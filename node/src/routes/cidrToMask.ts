import express, { Request, Response, NextFunction } from 'express';
import { calculationService, authService } from '../services';
import validateValue from '../utils/validation';

const cidrToMaskRouter = express.Router();

cidrToMaskRouter.get(
	'/',
	async (req: Request, res: Response, next: NextFunction) => {
		let input, output;
		try {
			authService.validateToken(req);
			const { value } = req.query;
			validateValue(value, 'string');
			input = value;
			output = calculationService.cidrToMask(value as string);
			return res.send({
				function: 'cidrToMask',
				input,
				output,
			});
		} catch (error) {
			return next(error);
		}
	}
);

export default cidrToMaskRouter;
