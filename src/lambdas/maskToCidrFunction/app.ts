import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
const BINARY_ONE = '1';
const BINARY_ZERO = '0';
const MIN_MASK = 0;
const MAX_MASK = 255;

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult;
  try {
    const maskValue = getValue(event);
    response = {
      statusCode: 200,
      body: JSON.stringify({
        function: 'mask-to-cidr',
        input: maskValue,
        output: maskToCidr(maskValue),
      }),
    };
  } catch (error: any) {
    response = {
      statusCode: 400,
      body: JSON.stringify({
        function: 'mask-to-cidr',
        error: error.message,
      }),
    };
  }
  return response;
};

function getValue(event: APIGatewayProxyEvent): string {
  if (!event.queryStringParameters || !event.queryStringParameters.value) {
    throw new Error('Missing value query parameter!');
  }
  return event.queryStringParameters.value;
}

function maskToCidr(mask: string) {
  const maskOctets = mask.split('.');
  if (maskOctets.length !== 4) {
    throw new Error('Invalid mask value!');
  }
  for (let i = 0; i < maskOctets.length; i++) {
    const octet = parseInt(maskOctets[i], 10);
    if (isNaN(octet) || octet < MIN_MASK || octet > MAX_MASK) {
      throw new Error('Invalid mask value!');
    }
    maskOctets[i] = decimalToBinary(octet);
  }
  return countOnes(maskOctets.join(''));
}

function decimalToBinary(decimal: number) {
  return (decimal >> 0).toString(2);
}

function countOnes(binary: string) {
  let count = 0,
    seenZero = false;
  for (let i = 0; i < binary.length; i++) {
    if (seenZero && binary[i] === BINARY_ONE) {
      throw new Error('Invalid mask value!');
    }
    if (binary[i] === BINARY_ZERO) {
      seenZero = true;
    } else {
      count++;
    }
  }
  return count.toString();
}
