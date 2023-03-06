import express, { Request, Response, NextFunction } from 'express';
import { calculationService } from '../services';
import { authService } from '../services';
import validateValue from '../utils/validation';

const maskToCidrRouter = express.Router();

maskToCidrRouter.get(
	'/',
	async (req: Request, res: Response, next: NextFunction) => {
		let input, output;
		try {
			authService.validateToken(req);
			const { value } = req.query;
			validateValue(value, 'string');
			input = value;
			output = calculationService.maskToCidr(value as string);
			return res.send({
				function: 'maskToCidr',
				input,
				output,
			});
		} catch (error) {
			return next(error);
		}
	}
);

export default maskToCidrRouter;
