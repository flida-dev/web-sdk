import type { AuthRequest, Config } from './types'
import { Api } from './api'
import { ID_URL } from './constants'
import { Pkce } from './pkce'
import { State } from './state'

export class SDK {
    constructor(config: Config) {
        this.config = config
        this.pkce = new Pkce(undefined)
        this.state = new State(this.config.state)
    }

    private readonly api = new Api()
    private readonly config: Config
    private readonly pkce: Pkce
    private readonly state: State

    public authorize(): void {
        const authRequest: AuthRequest = {
            client_id: this.config.clientId,
            redirect_uri: this.config.redirectUri,
            state: this.state.getState(),
            scope: this.config.scope.join(' '),
            code_challenge: this.pkce.getCodeChallenge(),
        }

        const params = new URLSearchParams({ ...authRequest })

        window.open(`${ID_URL}/oauth?${params.toString()}`)
    }

    public async exchangeCode(code: string, state: string) {
        const stateError = this.state.checkState(state)
        if (stateError) {
            throw stateError
        }

        const response = await this.api.issueToken({
            client_secret: '',
            client_id: this.config.clientId,
            authorization_code: code,
            code_verifier: this.pkce.getCodeVerifier(),
            redirect_uri: this.config.redirectUri,
        })

        this.pkce.clearSavedCodeVerifier()

        return response
    }

    public async refreshToken(refreshToken: string) {
        const response = await this.api.refreshToken({
            client_secret: '',
            client_id: this.config.clientId,
            refresh_token: refreshToken,
        })

        return response
    }

    public async getUser(accessToken: string) {
        return this.api.getUserInfo({ access_token: accessToken })
    }

    public async logout() {
        return null
    }
}
