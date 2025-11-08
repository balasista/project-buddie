import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export interface ProjectBuddieLambdaFunctionProps {
  functionName: string;
  handler: string;
  code: lambda.Code;
  runtime: lambda.Runtime;
  environment?: { [key: string]: string };
  timeout?: cdk.Duration;
  memorySize?: number;
  layers?: lambda.ILayerVersion[];
  description?: string;
}

export class ProjectBuddieLambdaFunction extends Construct {
  public readonly function: lambda.Function;

  constructor(scope: Construct, id: string, props: ProjectBuddieLambdaFunctionProps) {
    super(scope, id);

    this.function = new lambda.Function(this, 'Function', {
      functionName: props.functionName,
      runtime: props.runtime,
      handler: props.handler,
      code: props.code,
      environment: props.environment,
      timeout: props.timeout || cdk.Duration.seconds(30),
      memorySize: props.memorySize || 512,
      layers: props.layers,
      description: props.description,
      tracing: lambda.Tracing.ACTIVE,
      logRetention: logs.RetentionDays.ONE_WEEK,
    });
  }
}
