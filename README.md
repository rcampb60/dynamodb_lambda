# dynamodb_lambda

This repo allows you to deploy a CDK stack with a Lambda which is triggered by API Gateway which then writes to a DynamoDB table. 

The lambda produces a UUID for each item it stores, so each successive trigger will record a new item, each with its own unique ID and timestamps for 'created' and 'updated'. 

The REST API can be triggered by running curl -i and the API Gateway Endpoint produced at the point of deployment to AWS.

