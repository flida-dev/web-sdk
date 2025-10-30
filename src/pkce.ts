import type { PkceConfig } from './types'
import { Base64 } from 'js-base64'
import { sha256 } from 'js-sha256'
import { clearCookie, generateId, getCookie, setCookie } from './helpers'

export class Pkce {
    constructor(
        private readonly config?: PkceConfig,
    ) {}

    public clearSavedCodeVerifier() {
        clearCookie('code_verifier')
    }

    getCodeVerifier() {
        if (this.config?.codeVerifier) {
            return this.config.codeVerifier
        }

        const oldCodeVerifier = getCookie('code_verifier')

        if (!oldCodeVerifier) {
            const newCodeVerifier = generateId()
            setCookie('code_verifier', newCodeVerifier)
            return newCodeVerifier
        }

        return oldCodeVerifier
    }

    getCodeChallenge = (): string => {
        if (this.config?.codeChallenge) {
            return this.config.codeChallenge
        }

        const codeVerifier = this.getCodeVerifier()
        const hashBytes = sha256.array(codeVerifier)
        const uint8Hash = new Uint8Array(hashBytes)

        return Base64.fromUint8Array(uint8Hash, true)
    }
}
