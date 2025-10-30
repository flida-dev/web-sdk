export const errors = {
    INVALID_STATE: 'INVALID_STATE',
}

export class FlidaError extends Error {
    constructor(code: string, message: string) {
        super(message)
        this.name = 'FlidaError'
        this.code = code
    }

    public code: string
}
