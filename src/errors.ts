export const Errors = {
    INVALID_CONFIG: 'INVALID_CONFIG',
    NO_ACCESS_TOKEN: 'NO_ACCESS_TOKEN',
    NO_REFRESH_TOKEN: 'NO_REFRESH_TOKEN',
    INVALID_STATE: 'INVALID_STATE',
    INVALID_CODE: 'INVALID_CODE',
    TOKEN_EXPIRED: 'TOKEN_EXPIRED',
    UNAUTHORIZED: 'UNAUTHORIZED',
}

export class FlidaError extends Error {
    constructor(code: string, message: string) {
        super(message)
        this.name = 'FlidaError'
        this.code = code
    }

    public code: string
}
