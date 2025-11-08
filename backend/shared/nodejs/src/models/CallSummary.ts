/**
 * Call Summary data model
 */

export interface CallSummary {
  contactId: string;
  timestamp: string;
  agentId: string;
  customerId?: string;
  customerPhone: string;
  issue: string;
  resolution: string;
  nextSteps?: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  category: string;
  transcript?: string;
  recordingUrl?: string;
  salesforceId?: string;
  cost: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface CallSummaryInput {
  contactId: string;
  agentId: string;
  customerPhone: string;
  issue: string;
  resolution: string;
  sentiment: string;
  category: string;
}
