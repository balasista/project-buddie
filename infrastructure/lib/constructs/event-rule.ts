import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export interface ProjectBuddieEventRuleProps {
  ruleName: string;
  description: string;
  eventPattern: events.EventPattern;
  targets: lambda.IFunction[];
}

export class ProjectBuddieEventRule extends Construct {
  public readonly rule: events.Rule;

  constructor(scope: Construct, id: string, props: ProjectBuddieEventRuleProps) {
    super(scope, id);

    this.rule = new events.Rule(this, 'Rule', {
      ruleName: props.ruleName,
      description: props.description,
      eventPattern: props.eventPattern,
    });

    // Add all Lambda targets
    props.targets.forEach((target) => {
      this.rule.addTarget(new targets.LambdaFunction(target));
    });
  }
}
