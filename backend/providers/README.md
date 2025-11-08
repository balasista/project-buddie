# Platform Abstraction Layer

Multi-platform provider support for Project Buddie.

## Overview

This directory contains platform-agnostic interfaces and platform-specific implementations for telephony and CRM systems.

## Architecture

```
providers/
├── interfaces/          # Platform-agnostic interfaces
│   ├── ITelephonyProvider.ts
│   └── ICRMProvider.ts
├── amazon-connect/      # Amazon Connect implementation (MVP)
├── salesforce/          # Salesforce implementation (MVP)
├── genesys/            # Placeholder for Phase 2
└── cisco/              # Placeholder for Phase 2
```

## Current Support (MVP)

- **Telephony**: Amazon Connect
- **CRM**: Salesforce

## Planned Support (Phase 2)

- **Telephony**: Genesys Cloud, Cisco Webex Contact Center
- **CRM**: ServiceNow, Zendesk

## Usage

All Lambda functions should use the interfaces defined in `/interfaces`, not direct platform implementations. This allows for easy platform switching.

```typescript
import { ITelephonyProvider } from './interfaces/ITelephonyProvider';
import { ConnectProvider } from './amazon-connect/ConnectProvider';

const telephonyProvider: ITelephonyProvider = new ConnectProvider();
const callData = await telephonyProvider.getCallDetails(contactId);
```
