import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as apigw from '@aws-cdk/aws-apigateway';

export class DynamoDbStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'Payments-table', {
      partitionKey: { name: 'Payment ID', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'Status', type: dynamodb.AttributeType.STRING },
    });

    const payments = new lambda.Function(this, 'Payments-lambda', {
      runtime: lambda.Runtime.PYTHON_3_7,
      code: lambda.Code.fromAsset('lib/lambda/'),
      handler: 'payment.handler',
      environment: {
        PAYMENT_TABLE_NAME: table.tableName,
      }
    });

    table.grantReadWriteData(payments);

    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: payments,
    });
  }
}
