export enum ErrorCode {
    MISSING_STATE,
    INVALID_STATE,
    BRIDGE_UNABLE_TO_OPEN,
    BRIDGE_PROCESS_CLOSED,
    BRIDGE_PROCESS_ABORTED,
}

const descriptions: Record<ErrorCode, string> = {
    [ErrorCode.MISSING_STATE]: 'Missing state',
    [ErrorCode.INVALID_STATE]: 'Invalid state',
    [ErrorCode.BRIDGE_UNABLE_TO_OPEN]: 'Unable to open tab',
    [ErrorCode.BRIDGE_PROCESS_CLOSED]: 'Process closed',
    [ErrorCode.BRIDGE_PROCESS_ABORTED]: 'Process aborted',
}

export class FlidaError extends Error {
    constructor(public readonly code: ErrorCode) {
        super(descriptions[code])
        this.name = 'FlidaError'
    }
}
