import express, { Request, Response, NextFunction } from 'express';
import { calculationService } from '../services';
import { authService } from '../services';
import validateValue from '../utils/validation';

const maskToCidrRouter = express.Router();

/**
 * @swagger
 * /api/maskToCidr:
 *  get:
 *   tags: [Mask to CIDR]
 *   summary: Convert Mask to CIDR
 *   description: Enter a valid IPv4 mask and get the CIDR number
 *   parameters:
 *     - in: query
 *       name: value
 *       schema:
 *         type: string
 *       description: IPv4 mask
 *   security:
 *     - bearerAuth: []
 *   responses:
 *     200:
 *       description: Successfully converted Mask to CIDR
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               function:
 *                 type: string
 *               input:
 *                 type: string
 *               output:
 *                 type: string
 *     401:
 *       description: Unauthorized error
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *             error:
 *               type: string
 *     400:
 *       description: Invalid input error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 */
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
