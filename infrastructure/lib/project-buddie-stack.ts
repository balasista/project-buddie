import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NetworkStack } from './stacks/network-stack';
import { DatabaseStack } from './stacks/database-stack';
import { StorageStack } from './stacks/storage-stack';
import { SecretsStack } from './stacks/secrets-stack';
import { LambdaStack } from './stacks/lambda-stack';
import { ApiStack } from './stacks/api-stack';
import { EventStack } from './stacks/event-stack';
import { MonitoringStack } from './stacks/monitoring-stack';
import { FrontendStack } from './stacks/frontend-stack';

export interface ProjectBuddieStackProps extends cdk.StackProps {
  environment: string;
}

export class ProjectBuddieStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ProjectBuddieStackProps) {
    super(scope, id, props);

    const { environment } = props;

    // 1. Secrets Stack (needed first)
    const secretsStack = new SecretsStack(this, 'SecretsStack', {
      environment,
    });

    // 2. Network Stack
    const networkStack = new NetworkStack(this, 'NetworkStack', {
      environment,
    });

    // 3. Storage Stack
    const storageStack = new StorageStack(this, 'StorageStack', {
      environment,
    });

    // 4. Database Stack
    const databaseStack = new DatabaseStack(this, 'DatabaseStack', {
      environment,
      vpc: networkStack.vpc,
    });

    // 5. Event Stack
    const eventStack = new EventStack(this, 'EventStack', {
      environment,
    });

    // 6. Lambda Stack
    const lambdaStack = new LambdaStack(this, 'LambdaStack', {
      environment,
      vpc: networkStack.vpc,
      databaseStack,
      storageStack,
      secretsStack,
      eventStack,
    });

    // 7. API Stack
    const apiStack = new ApiStack(this, 'ApiStack', {
      environment,
      lambdaStack,
    });

    // 8. Monitoring Stack
    new MonitoringStack(this, 'MonitoringStack', {
      environment,
      lambdaStack,
      apiStack,
      databaseStack,
    });

    // 9. Frontend Stack
    new FrontendStack(this, 'FrontendStack', {
      environment,
      apiStack,
    });

    // Output important values
    new cdk.CfnOutput(this, 'Environment', {
      value: environment,
      description: 'Deployment environment',
    });

    new cdk.CfnOutput(this, 'Region', {
      value: this.region,
      description: 'AWS Region',
    });
  }
}
