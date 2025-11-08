import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { DatabaseStack } from './database-stack';
import { StorageStack } from './storage-stack';
import { SecretsStack } from './secrets-stack';
import { EventStack } from './event-stack';

export interface LambdaStackProps {
  environment: string;
  vpc: ec2.Vpc;
  databaseStack: DatabaseStack;
  storageStack: StorageStack;
  secretsStack: SecretsStack;
  eventStack: EventStack;
}

export class LambdaStack extends Construct {
  public readonly transcribeCallHandler: lambda.Function;
  public readonly summarizeCallHandler: lambda.Function;
  public readonly salesforceSyncHandler: lambda.Function;
  public readonly agentStateMonitor: lambda.Function;
  public readonly ivrJourneyParser: lambda.Function;
  public readonly escalationTaskCreator: lambda.Function;
  public readonly dailyReportGenerator: lambda.Function;
  public readonly apiHandler: lambda.Function;
  public readonly websocketHandler: lambda.Function;

  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id);

    const { environment, vpc, databaseStack, storageStack, secretsStack } = props;

    // Shared Lambda layer (Python)
    const pythonLayer = new lambda.LayerVersion(this, 'PythonSharedLayer', {
      code: lambda.Code.fromAsset('../backend/shared/python'),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_11],
      description: 'Shared Python libraries for Lambda functions',
    });

    // Shared Lambda layer (Node.js)
    const nodejsLayer = new lambda.LayerVersion(this, 'NodejsSharedLayer', {
      code: lambda.Code.fromAsset('../backend/shared/nodejs'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_20_X],
      description: 'Shared Node.js libraries for Lambda functions',
    });

    // Common environment variables for Python functions
    const pythonEnvVars = {
      ENVIRONMENT: environment,
      SUMMARIES_TABLE: databaseStack.callSummariesTable.tableName,
      AGENT_STATES_TABLE: databaseStack.agentStatesTable.tableName,
      JOURNEYS_TABLE: databaseStack.ivrJourneysTable.tableName,
      ESCALATIONS_TABLE: databaseStack.escalationsTable.tableName,
      RECORDINGS_BUCKET: storageStack.recordingsBucket.bucketName,
      TRANSCRIPTS_BUCKET: storageStack.transcriptsBucket.bucketName,
    };

    // Common environment variables for Node.js functions
    const nodejsEnvVars = {
      ENVIRONMENT: environment,
      SUMMARIES_TABLE: databaseStack.callSummariesTable.tableName,
      SALESFORCE_SECRET_ARN: secretsStack.salesforceSecret.secretArn,
    };

    // Module 1: Transcribe Call Handler (Python)
    this.transcribeCallHandler = new lambda.Function(this, 'TranscribeCallHandler', {
      functionName: `project-buddie-transcribe-call-${environment}`,
      runtime: lambda.Runtime.PYTHON_3_11,
      handler: 'handler.lambda_handler',
      code: lambda.Code.fromAsset('../backend/functions/transcribe-call-handler'),
      layers: [pythonLayer],
      environment: pythonEnvVars,
      timeout: cdk.Duration.seconds(60),
      memorySize: 512,
    });

    // Module 1: Summarize Call Handler (Python)
    this.summarizeCallHandler = new lambda.Function(this, 'SummarizeCallHandler', {
      functionName: `project-buddie-summarize-call-${environment}`,
      runtime: lambda.Runtime.PYTHON_3_11,
      handler: 'handler.lambda_handler',
      code: lambda.Code.fromAsset('../backend/functions/summarize-call-handler'),
      layers: [pythonLayer],
      environment: pythonEnvVars,
      timeout: cdk.Duration.seconds(120),
      memorySize: 1024,
    });

    // Module 1: Salesforce Sync Handler (Node.js)
    this.salesforceSyncHandler = new lambda.Function(this, 'SalesforceSyncHandler', {
      functionName: `project-buddie-salesforce-sync-${environment}`,
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('../backend/functions/salesforce-sync-handler'),
      layers: [nodejsLayer],
      environment: nodejsEnvVars,
      timeout: cdk.Duration.seconds(60),
      memorySize: 512,
    });

    // Module 2: Agent State Monitor (Python)
    this.agentStateMonitor = new lambda.Function(this, 'AgentStateMonitor', {
      functionName: `project-buddie-agent-state-monitor-${environment}`,
      runtime: lambda.Runtime.PYTHON_3_11,
      handler: 'handler.lambda_handler',
      code: lambda.Code.fromAsset('../backend/functions/agent-state-monitor'),
      layers: [pythonLayer],
      environment: pythonEnvVars,
      timeout: cdk.Duration.seconds(30),
      memorySize: 256,
    });

    // Module 3: IVR Journey Parser (Python)
    this.ivrJourneyParser = new lambda.Function(this, 'IVRJourneyParser', {
      functionName: `project-buddie-ivr-journey-parser-${environment}`,
      runtime: lambda.Runtime.PYTHON_3_11,
      handler: 'handler.lambda_handler',
      code: lambda.Code.fromAsset('../backend/functions/ivr-journey-parser'),
      layers: [pythonLayer],
      environment: pythonEnvVars,
      timeout: cdk.Duration.seconds(60),
      memorySize: 512,
    });

    // Module 4: Escalation Task Creator (Node.js)
    this.escalationTaskCreator = new lambda.Function(this, 'EscalationTaskCreator', {
      functionName: `project-buddie-escalation-task-creator-${environment}`,
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('../backend/functions/escalation-task-creator'),
      layers: [nodejsLayer],
      environment: nodejsEnvVars,
      timeout: cdk.Duration.seconds(60),
      memorySize: 512,
    });

    // Module 5: Daily Report Generator (Python)
    this.dailyReportGenerator = new lambda.Function(this, 'DailyReportGenerator', {
      functionName: `project-buddie-daily-report-generator-${environment}`,
      runtime: lambda.Runtime.PYTHON_3_11,
      handler: 'handler.lambda_handler',
      code: lambda.Code.fromAsset('../backend/functions/daily-report-generator'),
      layers: [pythonLayer],
      environment: pythonEnvVars,
      timeout: cdk.Duration.minutes(5),
      memorySize: 1024,
    });

    // API Handler (Node.js)
    this.apiHandler = new lambda.Function(this, 'ApiHandler', {
      functionName: `project-buddie-api-handler-${environment}`,
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('../backend/functions/api-handler'),
      layers: [nodejsLayer],
      environment: nodejsEnvVars,
      timeout: cdk.Duration.seconds(30),
      memorySize: 512,
    });

    // WebSocket Handler (Node.js)
    this.websocketHandler = new lambda.Function(this, 'WebsocketHandler', {
      functionName: `project-buddie-websocket-handler-${environment}`,
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('../backend/functions/websocket-handler'),
      layers: [nodejsLayer],
      environment: nodejsEnvVars,
      timeout: cdk.Duration.seconds(30),
      memorySize: 256,
    });

    // Grant permissions
    databaseStack.callSummariesTable.grantReadWriteData(this.summarizeCallHandler);
    databaseStack.callSummariesTable.grantReadWriteData(this.salesforceSyncHandler);
    databaseStack.agentStatesTable.grantReadWriteData(this.agentStateMonitor);
    databaseStack.ivrJourneysTable.grantReadWriteData(this.ivrJourneyParser);
    databaseStack.escalationsTable.grantReadWriteData(this.escalationTaskCreator);

    storageStack.recordingsBucket.grantRead(this.transcribeCallHandler);
    storageStack.transcriptsBucket.grantReadWrite(this.transcribeCallHandler);
    storageStack.transcriptsBucket.grantRead(this.summarizeCallHandler);

    secretsStack.salesforceSecret.grantRead(this.salesforceSyncHandler);
    secretsStack.salesforceSecret.grantRead(this.escalationTaskCreator);

    // Outputs
    new cdk.CfnOutput(scope, 'ApiHandlerArn', {
      value: this.apiHandler.functionArn,
      exportName: `project-buddie-api-handler-arn-${environment}`,
    });
  }
}
