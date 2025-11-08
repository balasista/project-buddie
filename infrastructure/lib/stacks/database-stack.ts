import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export interface DatabaseStackProps {
  environment: string;
  vpc: ec2.Vpc;
}

export class DatabaseStack extends Construct {
  public readonly callSummariesTable: dynamodb.Table;
  public readonly agentStatesTable: dynamodb.Table;
  public readonly ivrJourneysTable: dynamodb.Table;
  public readonly escalationsTable: dynamodb.Table;

  constructor(scope: Construct, id: string, props: DatabaseStackProps) {
    super(scope, id);

    const { environment } = props;
    const removalPolicy = environment === 'prod' ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY;

    // Call Summaries Table
    this.callSummariesTable = new dynamodb.Table(this, 'CallSummariesTable', {
      tableName: `project-buddie-call-summaries-${environment}`,
      partitionKey: { name: 'contactId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'timestamp', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: environment === 'prod',
      removalPolicy: removalPolicy,
      stream: dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
    });

    // GSI for agent queries
    this.callSummariesTable.addGlobalSecondaryIndex({
      indexName: 'agentId-timestamp-index',
      partitionKey: { name: 'agentId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'timestamp', type: dynamodb.AttributeType.STRING },
    });

    // GSI for Salesforce queries
    this.callSummariesTable.addGlobalSecondaryIndex({
      indexName: 'salesforceId-index',
      partitionKey: { name: 'salesforceId', type: dynamodb.AttributeType.STRING },
    });

    // Agent States Table
    this.agentStatesTable = new dynamodb.Table(this, 'AgentStatesTable', {
      tableName: `project-buddie-agent-states-${environment}`,
      partitionKey: { name: 'agentId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'timestamp', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      timeToLiveAttribute: 'ttl',
      removalPolicy: removalPolicy,
      stream: dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
    });

    // IVR Journeys Table
    this.ivrJourneysTable = new dynamodb.Table(this, 'IVRJourneysTable', {
      tableName: `project-buddie-ivr-journeys-${environment}`,
      partitionKey: { name: 'contactId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: environment === 'prod',
      removalPolicy: removalPolicy,
    });

    // GSI for customer phone queries
    this.ivrJourneysTable.addGlobalSecondaryIndex({
      indexName: 'customerPhone-createdAt-index',
      partitionKey: { name: 'customerPhone', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'createdAt', type: dynamodb.AttributeType.STRING },
    });

    // Escalations Table
    this.escalationsTable = new dynamodb.Table(this, 'EscalationsTable', {
      tableName: `project-buddie-escalations-${environment}`,
      partitionKey: { name: 'contactId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'escalationId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: environment === 'prod',
      removalPolicy: removalPolicy,
    });

    // GSI for status queries
    this.escalationsTable.addGlobalSecondaryIndex({
      indexName: 'status-slaDeadline-index',
      partitionKey: { name: 'status', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'slaDeadline', type: dynamodb.AttributeType.STRING },
    });

    // Outputs
    new cdk.CfnOutput(scope, 'CallSummariesTableName', {
      value: this.callSummariesTable.tableName,
      exportName: `project-buddie-call-summaries-table-${environment}`,
    });

    new cdk.CfnOutput(scope, 'AgentStatesTableName', {
      value: this.agentStatesTable.tableName,
      exportName: `project-buddie-agent-states-table-${environment}`,
    });
  }
}
