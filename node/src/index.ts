import Config, { ConfigType } from './config';
import app from './server';

const config: ConfigType = Config;

app.listen(config.port, function () {
	console.log(`Server is listening on port ${config.port}`);
});
