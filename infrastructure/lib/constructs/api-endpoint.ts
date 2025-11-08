import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export interface ProjectBuddieApiEndpointProps {
  resource: apigateway.IResource;
  method: string;
  handler: lambda.IFunction;
  requireApiKey?: boolean;
  requestValidator?: apigateway.IRequestValidator;
}

export class ProjectBuddieApiEndpoint extends Construct {
  public readonly method: apigateway.Method;

  constructor(scope: Construct, id: string, props: ProjectBuddieApiEndpointProps) {
    super(scope, id);

    const integration = new apigateway.LambdaIntegration(props.handler, {
      proxy: true,
    });

    this.method = props.resource.addMethod(props.method, integration, {
      apiKeyRequired: props.requireApiKey || false,
      requestValidator: props.requestValidator,
    });
  }
}
