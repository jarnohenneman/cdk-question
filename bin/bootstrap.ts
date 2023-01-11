#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { ApiExample } from '../lib/api-example';
import { DefaultApiGateway } from '../lib/default-api-gateway';

const app = new App();

/**
 * IMPORTANT: Stack configured with Termination protection, this is a CloudFormation feature that helps prevent
 * accidental stack deletions.
 */
const apiGateway = new DefaultApiGateway(app, 'DefaultApiGateway', {
  env: {
    region: 'eu-west-1',
    account: '123456789',
  },
  terminationProtection: true,
});

new ApiExample(app, 'ExampleApi', {
  env: {
    region: 'eu-west-1',
    account: '123456789',
  },
  restApi: apiGateway.restApi,
});