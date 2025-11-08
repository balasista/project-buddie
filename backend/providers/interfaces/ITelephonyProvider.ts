/**
 * Platform-agnostic telephony provider interface
 */

export interface ICallDetails {
  contactId: string;
  agentId: string;
  customerId?: string;
  customerPhone: string;
  startTime: string;
  endTime?: string;
  duration: number;
  recordingUrl?: string;
  queue: string;
  disposition?: string;
}

export interface IAgentState {
  agentId: string;
  currentState: string;
  stateStartTime: string;
  contactId?: string;
}

export interface ITelephonyProvider {
  /**
   * Get call details by contact ID
   */
  getCallDetails(contactId: string): Promise<ICallDetails>;

  /**
   * Get agent state
   */
  getAgentState(agentId: string): Promise<IAgentState>;

  /**
   * Get call recording URL
   */
  getRecordingUrl(contactId: string): Promise<string | null>;

  /**
   * Parse Contact Trace Record (CTR) event
   */
  parseCTREvent(event: any): ICallDetails;
}
