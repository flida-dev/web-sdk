import { generateId } from '../helpers'
import { CookieValue } from './_cookie-value'

export class CodeVerifier extends CookieValue {
    constructor() {
        super(CodeVerifier.cookieName)
    }

    static cookieName = 'code_verifier'

    public retrieve(initial?: string): string {
        return this.persist(initial || this.get() || generateId())
    }

    public clear(): void {
        super.clear()
    }
}
