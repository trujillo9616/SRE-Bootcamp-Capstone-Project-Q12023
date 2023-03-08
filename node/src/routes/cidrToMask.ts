import express, { Request, Response, NextFunction } from 'express';
import { calculationService, authService } from '../services';
import validateValue from '../utils/validation';

const cidrToMaskRouter = express.Router();

/**
 * @swagger
 * /api/cidrToMask:
 *  get:
 *   tags: [CIDR to Mask]
 *   summary: Convert CIDR to Mask
 *   description: Enter a CIDR number from 0 to 32 and get the corresponding mask
 *   parameters:
 *     - in: query
 *       name: value
 *       schema:
 *         type: string
 *       description: CIDR number
 *   security:
 *     - bearerAuth: []
 *   responses:
 *     200:
 *       description: Successfully converted CIDR to Mask
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
