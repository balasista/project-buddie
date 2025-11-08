import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2';
import { Construct } from 'constructs';
import { LambdaStack } from './lambda-stack';

export interface ApiStackProps {
  environment: string;
  lambdaStack: LambdaStack;
}

export class ApiStack extends Construct {
  public readonly restApi: apigateway.RestApi;
  public readonly websocketApi: apigatewayv2.CfnApi;

  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id);

    const { environment, lambdaStack } = props;

    // REST API
    this.restApi = new apigateway.RestApi(this, 'ProjectBuddieRestApi', {
      restApiName: `project-buddie-api-${environment}`,
      description: 'Project Buddie REST API',
      deployOptions: {
        stageName: environment,
        throttlingRateLimit: 1000,
        throttlingBurstLimit: 2000,
        loggingLevel: apigateway.MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
        tracingEnabled: true,
      },
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    // Lambda Integration
    const lambdaIntegration = new apigateway.LambdaIntegration(lambdaStack.apiHandler);

    // API Resources
    const v1 = this.restApi.root.addResource('api').addResource('v1');

    // /api/v1/summaries
    const summaries = v1.addResource('summaries');
    summaries.addMethod('GET', lambdaIntegration);
    summaries.addResource('{contactId}').addMethod('GET', lambdaIntegration);

    // /api/v1/agents
    const agents = v1.addResource('agents');
    agents.addMethod('GET', lambdaIntegration);
    agents.addResource('{agentId}').addMethod('GET', lambdaIntegration);

    // /api/v1/journeys
    const journeys = v1.addResource('journeys');
    journeys.addMethod('GET', lambdaIntegration);
    journeys.addResource('{contactId}').addMethod('GET', lambdaIntegration);

    // /api/v1/escalations
    const escalations = v1.addResource('escalations');
    escalations.addMethod('GET', lambdaIntegration);
    escalations.addResource('{escalationId}').addMethod('GET', lambdaIntegration);

    // WebSocket API (placeholder for now)
    // TODO: Implement full WebSocket API with CDK v2

    // Outputs
    new cdk.CfnOutput(scope, 'RestApiUrl', {
      value: this.restApi.url,
      description: 'REST API endpoint URL',
      exportName: `project-buddie-api-url-${environment}`,
    });

    new cdk.CfnOutput(scope, 'RestApiId', {
      value: this.restApi.restApiId,
      exportName: `project-buddie-api-id-${environment}`,
    });
  }
}
