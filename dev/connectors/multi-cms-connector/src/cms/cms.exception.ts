// cms.exceptions.ts
export class CmsModuleError extends Error {
  constructor(
    message: string,
    public readonly context?: string,
  ) {
    super(message);
    this.name = 'CmsModuleError';
  }
}

export class CmsConfigError extends CmsModuleError {
  constructor(message: string) {
    super(message, 'Configuration');
    this.name = 'CmsConfigError';
  }
}

export class CmsQueryError extends CmsModuleError {
  constructor(
    message: string,
    public readonly originalError?: Error,
  ) {
    super(message, 'Query');
    this.name = 'CmsQueryError';
  }
}
