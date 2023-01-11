/* eslint-disable no-console */
import { join } from 'path';
import { StackProps, Stack } from 'aws-cdk-lib';
import { RestApi, LambdaIntegration, MethodLoggingLevel } from 'aws-cdk-lib/aws-apigateway';
import { HttpMethod } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

interface DefaultApiGatewayProps extends StackProps {
}

/**
 *
 */
export class DefaultApiGateway extends Stack {
  public readonly restApi: RestApi;

  constructor(scope: Construct, id: string, props: DefaultApiGatewayProps) {
    super(scope, id, props);

    const getHealthFunction = new NodejsFunction(this, 'GetHealthFunction', {
      description: 'GetHealthFunction',
      entry: join(__dirname, '../src/api/actuator', 'health.ts'),
    });

    const getInfoFunction = new NodejsFunction(this, 'GetInfoFunction', {
      description: 'GetInfoFunction',
      entry: join(__dirname, '../src/api/actuator', 'info.ts'),
    });

    const getHealth = new LambdaIntegration(getHealthFunction);
    const getInfo = new LambdaIntegration(getInfoFunction);

    const restApi = new RestApi(this, 'itemsApi', {
      restApiName: 'itemsApi',
      cloudWatchRole: true,
      deployOptions: {
        loggingLevel: MethodLoggingLevel.ERROR,
        dataTraceEnabled: true,
        tracingEnabled: true,
      },
    });

    this.restApi = restApi;

    const actuator = restApi.root.addResource('actuator');

    const health = actuator.addResource('health');
    health.addMethod(HttpMethod.GET, getHealth);

    const info = actuator.addResource('info');
    info.addMethod(HttpMethod.GET, getInfo);
  }
}
