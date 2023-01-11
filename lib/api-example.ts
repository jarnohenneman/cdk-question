/* eslint-disable no-console */
import { join } from 'path';
import { StackProps, Stack } from 'aws-cdk-lib';
import { RestApi, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { HttpMethod } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

interface ApiExampleProps extends StackProps {
  restApi: RestApi
}

/**
 *
 */
export class ApiExample extends Stack {

  constructor(scope: Construct, id: string, props: ApiExampleProps) {
    super(scope, id, props);

    const getExampleFunction = new NodejsFunction(this, 'GetExample', {
      entry: join(__dirname, '../src/api/example', 'get-example.ts'),
    });

    const putExampleFunction = new NodejsFunction(this, 'PutExample', {
      entry: join(__dirname, '../src/api/example', 'put-example.ts'),
    });

    const deleteExampleFunction = new NodejsFunction(this, 'DeleteExample', {
      entry: join(__dirname, '../src/api/example', 'delete-example.ts'),
    });

    const getApi = new LambdaIntegration(getExampleFunction);
    const putApi = new LambdaIntegration(putExampleFunction);
    const deleteApi = new LambdaIntegration(deleteExampleFunction);

    const example = props.restApi.root.addResource('example');
    example.addMethod(HttpMethod.GET, getApi);
    example.addMethod(HttpMethod.PUT, putApi);
    example.addMethod(HttpMethod.DELETE, deleteApi);
  }
}
