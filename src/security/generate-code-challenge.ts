import { Base64 } from 'js-base64'
import { sha256 } from 'js-sha256'

export function generateCodeChallenge(codeVerifier: string) {
    const hashBytes = sha256.array(codeVerifier)
    const uint8Hash = new Uint8Array(hashBytes)
    return Base64.fromUint8Array(uint8Hash, true)
}
