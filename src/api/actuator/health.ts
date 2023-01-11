/* eslint-disable no-console */

import { APIGatewayProxyResultV2 } from 'aws-lambda';

export const handler = async (): Promise<APIGatewayProxyResultV2> => {
  let message = { Status: 'UP' };

  return {
    statusCode: 200,
    body: JSON.stringify(message),
  };
};