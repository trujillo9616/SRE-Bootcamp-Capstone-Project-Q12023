import AWS from 'aws-sdk';

export class SecretsManager {
  static async getSecretValue(SecretId: string, region: string) {
    const config = { region };
    const secretsManager = new AWS.SecretsManager(config);
    try {
      const secretValue = await secretsManager.getSecretValue({ SecretId }).promise();
      if ('SecretString' in secretValue) {
        return secretValue.SecretString;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
