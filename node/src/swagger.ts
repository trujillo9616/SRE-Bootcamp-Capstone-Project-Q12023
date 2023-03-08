import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application, Request, Response } from 'express';

const swaggerDefinition = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'SRE Capstone Project API',
			version: '1.0.0',
			description: 'API for the Wizeline Academy SRE Capstone Project',
		},
		contact: {
			name: 'Adrian Trujillo',
			url: 'truji.dev',
		},
		servers: [
			{
				url: 'http://localhost:8000',
				description: 'Local development server',
			},
		],
		tags: [
			{
				name: 'Health',
				description: 'API Health check',
			},
			{
				name: 'Login',
				description: 'Authenticate user',
			},
			{
				name: 'CIDR to Mask',
				description: 'Convert CIDR to Mask',
			},
			{
				name: 'Mask to CIDR',
				description: 'Convert Mask to CIDR',
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
	},
	apis: ['src/routes/**.ts', '../prisma/schema.prisma'],
};

const swaggerSpec = swaggerJSDoc(swaggerDefinition);

const swaggerDocs = (app: Application, port: number) => {
	app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
	app.get('/api/docs.json', (_req: Request, res: Response) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(swaggerSpec);
	});

	console.log(
		`📓 Version 1 Docs are available at http://localhost:${port}/api/docs`
	);
};

export default swaggerDocs;
