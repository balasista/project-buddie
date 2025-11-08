import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export interface StorageStackProps {
  environment: string;
}

export class StorageStack extends Construct {
  public readonly recordingsBucket: s3.Bucket;
  public readonly transcriptsBucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: StorageStackProps) {
    super(scope, id);

    const { environment } = props;
    const removalPolicy = environment === 'prod' ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY;

    // Call Recordings Bucket
    this.recordingsBucket = new s3.Bucket(this, 'RecordingsBucket', {
      bucketName: `project-buddie-recordings-${environment}-${cdk.Aws.ACCOUNT_ID}`,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      versioned: environment === 'prod',
      removalPolicy: removalPolicy,
      autoDeleteObjects: environment !== 'prod',
      lifecycleRules: [
        {
          id: 'archive-old-recordings',
          enabled: true,
          transitions: [
            {
              storageClass: s3.StorageClass.INTELLIGENT_TIERING,
              transitionAfter: cdk.Duration.days(30),
            },
            {
              storageClass: s3.StorageClass.GLACIER,
              transitionAfter: cdk.Duration.days(90),
            },
          ],
          expiration: cdk.Duration.days(365),
        },
      ],
    });

    // Transcripts Bucket
    this.transcriptsBucket = new s3.Bucket(this, 'TranscriptsBucket', {
      bucketName: `project-buddie-transcripts-${environment}-${cdk.Aws.ACCOUNT_ID}`,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      versioned: environment === 'prod',
      removalPolicy: removalPolicy,
      autoDeleteObjects: environment !== 'prod',
      lifecycleRules: [
        {
          id: 'transition-to-ia',
          enabled: true,
          transitions: [
            {
              storageClass: s3.StorageClass.INFREQUENT_ACCESS,
              transitionAfter: cdk.Duration.days(90),
            },
          ],
        },
      ],
    });

    // Outputs
    new cdk.CfnOutput(scope, 'RecordingsBucketName', {
      value: this.recordingsBucket.bucketName,
      exportName: `project-buddie-recordings-bucket-${environment}`,
    });

    new cdk.CfnOutput(scope, 'TranscriptsBucketName', {
      value: this.transcriptsBucket.bucketName,
      exportName: `project-buddie-transcripts-bucket-${environment}`,
    });
  }
}
