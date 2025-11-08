import * as cdk from 'aws-cdk-lib';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export interface SecretsStackProps {
  environment: string;
}

export class SecretsStack extends Construct {
  public readonly salesforceSecret: secretsmanager.Secret;
  public readonly slackWebhookSecret: secretsmanager.Secret;
  public readonly apiKeySecret: secretsmanager.Secret;

  constructor(scope: Construct, id: string, props: SecretsStackProps) {
    super(scope, id);

    const { environment } = props;

    // Salesforce Credentials
    this.salesforceSecret = new secretsmanager.Secret(this, 'SalesforceSecret', {
      secretName: `project-buddie/salesforce/${environment}`,
      description: 'Salesforce API credentials',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          instanceUrl: 'https://test.salesforce.com',
          apiVersion: 'v59.0',
        }),
        generateStringKey: 'clientSecret',
      },
    });

    // Slack Webhook URL
    this.slackWebhookSecret = new secretsmanager.Secret(this, 'SlackWebhookSecret', {
      secretName: `project-buddie/slack-webhook/${environment}`,
      description: 'Slack webhook URL for notifications',
    });

    // API Keys
    this.apiKeySecret = new secretsmanager.Secret(this, 'ApiKeySecret', {
      secretName: `project-buddie/api-keys/${environment}`,
      description: 'API keys for frontend authentication',
      generateSecretString: {
        generateStringKey: 'apiKey',
        secretStringTemplate: JSON.stringify({ description: 'Project Buddie API Key' }),
      },
    });

    // Outputs
    new cdk.CfnOutput(scope, 'SalesforceSecretArn', {
      value: this.salesforceSecret.secretArn,
      exportName: `project-buddie-salesforce-secret-${environment}`,
    });
  }
}
