import * as cdk from 'aws-cdk-lib';
import * as events from 'aws-cdk-lib/aws-events';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

export interface EventStackProps {
  environment: string;
}

export class EventStack extends Construct {
  public readonly eventBus: events.EventBus;
  public readonly deadLetterQueue: sqs.Queue;

  constructor(scope: Construct, id: string, props: EventStackProps) {
    super(scope, id);

    const { environment } = props;

    // Custom Event Bus
    this.eventBus = new events.EventBus(this, 'ProjectBuddieEventBus', {
      eventBusName: `project-buddie-events-${environment}`,
    });

    // Dead Letter Queue
    this.deadLetterQueue = new sqs.Queue(this, 'DeadLetterQueue', {
      queueName: `project-buddie-dlq-${environment}`,
      retentionPeriod: cdk.Duration.days(14),
    });

    // Archive all events for replay capability
    new events.Archive(this, 'EventArchive', {
      sourceEventBus: this.eventBus,
      archiveName: `project-buddie-event-archive-${environment}`,
      retention: cdk.Duration.days(365),
      eventPattern: {
        source: events.Match.prefix('project-buddie'),
      },
    });

    // Outputs
    new cdk.CfnOutput(scope, 'EventBusName', {
      value: this.eventBus.eventBusName,
      exportName: `project-buddie-event-bus-${environment}`,
    });
  }
}
