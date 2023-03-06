import dotenv from 'dotenv';
dotenv.config();

export interface ConfigType {
	port: number;
	environment: string;
	jwtSecret: string;
	jwtExpiration: string;
	databaseUrl: string;
}

const Config: ConfigType = {
	port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
	environment: process.env.NODE_ENV || 'development',
	jwtSecret: process.env.JWT_SECRET || 'secret',
	jwtExpiration: process.env.JWT_EXPIRATION || '1h',
	databaseUrl:
		process.env.DATABASE_URL ||
		'mysql://user:password@localhost::3306/database',
};

export default Config;
