# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of Project Buddie seriously. If you have discovered a security vulnerability, please report it to us privately.

### How to Report

**DO NOT** create a public GitHub issue for security vulnerabilities.

Instead:

1. Email: security@projectbuddie.com
2. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: Within 24 hours
- **Initial Assessment**: Within 3 business days
- **Status Updates**: Weekly until resolved
- **Resolution**: Depends on severity (Critical: 7 days, High: 14 days, Medium: 30 days)

## Security Best Practices

### For Developers

1. **Never commit secrets**
   - Use AWS Secrets Manager
   - Add sensitive files to .gitignore
   - Use environment variables

2. **Keep dependencies updated**
   - Run `npm audit` regularly
   - Monitor Dependabot alerts
   - Update dependencies monthly

3. **Follow least privilege**
   - IAM policies with minimum permissions
   - Lambda execution roles scoped to requirements
   - API Gateway authentication required

4. **Validate all inputs**
   - Use Pydantic for Python
   - Use Zod for TypeScript
   - Sanitize user inputs

5. **Enable logging**
   - CloudWatch Logs for all Lambda functions
   - VPC Flow Logs
   - API Gateway access logs

### For Operators

1. **Enable MFA**
   - All AWS accounts
   - Production deployments
   - Sensitive operations

2. **Monitor CloudWatch Alarms**
   - Lambda errors
   - API Gateway 5xx errors
   - DynamoDB throttles

3. **Regular security audits**
   - Monthly vulnerability scans
   - Quarterly penetration tests
   - Annual compliance reviews

4. **Backup and recovery**
   - Point-in-time recovery for prod DynamoDB
   - S3 versioning enabled
   - Regular restore testing

## Compliance

- **GDPR**: Customer data can be deleted on request
- **SOC 2**: Controls documented (coming soon)
- **HIPAA**: Not currently HIPAA compliant

## Encryption

- **At Rest**: All data encrypted (S3, DynamoDB, CloudWatch Logs)
- **In Transit**: TLS 1.2+ for all API calls
- **Secrets**: AWS Secrets Manager with KMS encryption

## Known Issues

None currently. Check GitHub Security Advisories for updates.

## Bug Bounty

We do not currently have a bug bounty program.

## Contact

- Security Team: security@projectbuddie.com
- General Inquiries: support@projectbuddie.com
