import * as cdk from 'aws-cdk-lib';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';
import { LambdaStack } from './lambda-stack';
import { ApiStack } from './api-stack';
import { DatabaseStack } from './database-stack';

export interface MonitoringStackProps {
  environment: string;
  lambdaStack: LambdaStack;
  apiStack: ApiStack;
  databaseStack: DatabaseStack;
}

export class MonitoringStack extends Construct {
  constructor(scope: Construct, id: string, props: MonitoringStackProps) {
    super(scope, id);

    const { environment, lambdaStack, apiStack, databaseStack } = props;

    // SNS Topic for alerts
    const alertTopic = new sns.Topic(this, 'AlertTopic', {
      topicName: `project-buddie-alerts-${environment}`,
      displayName: 'Project Buddie Alerts',
    });

    // Add email subscription (to be configured)
    // alertTopic.addSubscription(new subscriptions.EmailSubscription('alerts@example.com'));

    // CloudWatch Dashboard
    const dashboard = new cloudwatch.Dashboard(this, 'ProjectBuddieDashboard', {
      dashboardName: `project-buddie-${environment}`,
    });

    // Lambda Errors Widget
    dashboard.addWidgets(
      new cloudwatch.GraphWidget({
        title: 'Lambda Errors',
        left: [
          lambdaStack.summarizeCallHandler.metricErrors(),
          lambdaStack.salesforceSyncHandler.metricErrors(),
          lambdaStack.agentStateMonitor.metricErrors(),
        ],
      })
    );

    // Lambda Duration Widget
    dashboard.addWidgets(
      new cloudwatch.GraphWidget({
        title: 'Lambda Duration',
        left: [
          lambdaStack.summarizeCallHandler.metricDuration(),
          lambdaStack.salesforceSyncHandler.metricDuration(),
        ],
      })
    );

    // API Gateway Metrics
    dashboard.addWidgets(
      new cloudwatch.GraphWidget({
        title: 'API Gateway Requests',
        left: [
          new cloudwatch.Metric({
            namespace: 'AWS/ApiGateway',
            metricName: 'Count',
            dimensionsMap: {
              ApiName: apiStack.restApi.restApiName,
            },
            statistic: 'Sum',
          }),
        ],
      })
    );

    // DynamoDB Throttles
    dashboard.addWidgets(
      new cloudwatch.GraphWidget({
        title: 'DynamoDB Throttles',
        left: [
          databaseStack.callSummariesTable.metricThrottledRequests(),
          databaseStack.agentStatesTable.metricThrottledRequests(),
        ],
      })
    );

    // Alarms
    // Lambda Error Alarm
    new cloudwatch.Alarm(this, 'SummarizeCallErrorAlarm', {
      alarmName: `project-buddie-summarize-call-errors-${environment}`,
      metric: lambdaStack.summarizeCallHandler.metricErrors(),
      threshold: 5,
      evaluationPeriods: 1,
      datapointsToAlarm: 1,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
    }).addAlarmAction(new cloudwatch.SnsAction(alertTopic));

    // API Gateway 5xx Errors
    new cloudwatch.Alarm(this, 'ApiGateway5xxAlarm', {
      alarmName: `project-buddie-api-5xx-errors-${environment}`,
      metric: new cloudwatch.Metric({
        namespace: 'AWS/ApiGateway',
        metricName: '5XXError',
        dimensionsMap: {
          ApiName: apiStack.restApi.restApiName,
        },
        statistic: 'Sum',
        period: cdk.Duration.minutes(5),
      }),
      threshold: 10,
      evaluationPeriods: 2,
    }).addAlarmAction(new cloudwatch.SnsAction(alertTopic));

    // Outputs
    new cdk.CfnOutput(scope, 'DashboardUrl', {
      value: `https://console.aws.amazon.com/cloudwatch/home?region=${cdk.Stack.of(this).region}#dashboards:name=${dashboard.dashboardName}`,
      description: 'CloudWatch Dashboard URL',
    });

    new cdk.CfnOutput(scope, 'AlertTopicArn', {
      value: alertTopic.topicArn,
      exportName: `project-buddie-alert-topic-${environment}`,
    });
  }
}
