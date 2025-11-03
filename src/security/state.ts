import { ErrorCode, FlidaError } from '../errors'
import { generateId } from '../helpers'
import { CookieValue } from './_cookie-value'

export class State extends CookieValue {
    constructor() {
        super(State.cookieName)
    }

    static cookieName = 'state'

    public retrieve(initial?: string) {
        return this.persist(initial || this.get() || generateId())
    }

    public verifyAndClear(apiState: string): void {
        const value = this.get()

        /**
         * Работает только если значение было установлено:
         * после вызова StateManager.retrieve()
         */
        if (!value) {
            throw new FlidaError(ErrorCode.MISSING_STATE)
        }

        if (value !== apiState) {
            throw new FlidaError(ErrorCode.INVALID_STATE)
        }

        this.clear()
    }
}
