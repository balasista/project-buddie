import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export interface ProjectBuddieDynamoDBTableProps {
  tableName: string;
  partitionKey: dynamodb.Attribute;
  sortKey?: dynamodb.Attribute;
  environment: string;
  enableStream?: boolean;
  enablePointInTimeRecovery?: boolean;
  timeToLiveAttribute?: string;
}

export class ProjectBuddieDynamoDBTable extends Construct {
  public readonly table: dynamodb.Table;

  constructor(scope: Construct, id: string, props: ProjectBuddieDynamoDBTableProps) {
    super(scope, id);

    const removalPolicy = props.environment === 'prod' ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY;

    this.table = new dynamodb.Table(this, 'Table', {
      tableName: props.tableName,
      partitionKey: props.partitionKey,
      sortKey: props.sortKey,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      pointInTimeRecovery: props.enablePointInTimeRecovery !== undefined ? props.enablePointInTimeRecovery : props.environment === 'prod',
      stream: props.enableStream ? dynamodb.StreamViewType.NEW_AND_OLD_IMAGES : undefined,
      timeToLiveAttribute: props.timeToLiveAttribute,
      removalPolicy: removalPolicy,
    });
  }
}
