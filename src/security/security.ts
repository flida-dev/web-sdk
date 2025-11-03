import { CodeVerifier } from './code-verifier'
import { State } from './state'

export class Security {
    public state = new State()
    public codeVerifier = new CodeVerifier()
}
