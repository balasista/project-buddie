#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ProjectBuddieStack } from '../lib/project-buddie-stack';

const app = new cdk.App();

// Get environment from context or environment variable
const environment = app.node.tryGetContext('project-buddie:environment') || process.env.ENVIRONMENT || 'dev';
const region = app.node.tryGetContext('project-buddie:region') || process.env.AWS_REGION || 'us-east-1';

// Create the main stack
new ProjectBuddieStack(app, `ProjectBuddieStack-${environment}`, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: region,
  },
  environment: environment,
  tags: {
    Environment: environment,
    Project: 'ProjectBuddie',
    ManagedBy: 'CDK',
  },
});

app.synth();
