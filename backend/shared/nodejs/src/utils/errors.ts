/**
 * Custom error classes
 */

export class BuddieError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BuddieError';
  }
}

export class ValidationError extends BuddieError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class DatabaseError extends BuddieError {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export class SalesforceError extends BuddieError {
  constructor(message: string) {
    super(message);
    this.name = 'SalesforceError';
  }
}

export class ExternalServiceError extends BuddieError {
  constructor(message: string) {
    super(message);
    this.name = 'ExternalServiceError';
  }
}
