/* eslint-disable no-console */

import { APIGatewayProxyResultV2 } from 'aws-lambda';

export const handler = async (): Promise<APIGatewayProxyResultV2> => {
  let message = { Status: 'put-api' };

  return {
    statusCode: 200,
    body: JSON.stringify(message),
  };
};