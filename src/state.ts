import { errors, FlidaError } from './errors'
import { clearCookie, generateId, getCookie, setCookie } from './helpers'

export class State {
    constructor(configState: string | undefined) {
        this.state = configState || ''
    }

    private state = ''

    public getState(): string {
        if (this.state) {
            return this.state
        }

        const oldState = getCookie('state')

        if (!oldState) {
            const newState = generateId()
            setCookie('state', newState)
            return newState
        }

        return oldState
    }

    public checkState(check: string): FlidaError | undefined {
        if (this.getState() !== check) {
            return new FlidaError(errors.INVALID_STATE, 'State mismatch error')
        }

        clearCookie('state')
        this.state = ''
    }
}
