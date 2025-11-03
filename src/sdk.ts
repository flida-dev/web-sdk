import type { AuthRequest, AuthResponse, SDKConfig } from './sdk.types'
import { Api } from './api'
import { ID_URL } from './constants'
import { MessageBridge } from './message-bridge'
import { SDKMode } from './sdk.types'
import { generateCodeChallenge } from './security/generate-code-challenge'
import { Security } from './security/security'

export class SDK {
    constructor(config: SDKConfig) {
        this.api = new Api(config.mock?.api)
        this.config = { mode: SDKMode.REDIRECT, ...config }
    }

    private config: SDKConfig
    private api: Api
    private security = new Security()
    private messageBridge = new MessageBridge(this.security)

    private createAuthRequest(): AuthRequest {
        const state = this.security.state.retrieve()
        const codeVerifier = this.security.codeVerifier.retrieve()
        const codeChallenge = generateCodeChallenge(codeVerifier)

        const request: AuthRequest = {
            state,
            client_id: this.config.clientId,
            redirect_uri: this.config.redirectUri,
            scope: this.config.scope.join(' '),
            code_challenge: codeChallenge,
        }

        if (this.config.mode !== SDKMode.REDIRECT) {
            request.origin = `${location.protocol}//${location.hostname}`
        }

        return request
    }

    public async authorize(): Promise<AuthResponse | void> {
        const authRequest = this.createAuthRequest()

        const searchParams = new URLSearchParams({ ...authRequest }).toString()

        const url = `${ID_URL}/oauth?${searchParams}`

        if (this.config.mode === SDKMode.REDIRECT) {
            location.assign(url)
            return Promise.resolve()
        }
        else {
            return this.messageBridge.init(url, this.config)
        }
    }

    public async exchangeCode(code: string, state: string) {
        const codeVerifier = this.security.codeVerifier.retrieve()

        try {
            const response = await this.api.issueToken({
                client_id: this.config.clientId,
                authorization_code: code,
                code_verifier: codeVerifier,
                redirect_uri: this.config.redirectUri,
            })

            this.security.state.verifyAndClear(state)
            this.security.codeVerifier.clear()

            return response
        }
        catch (e) {
            console.error(e)
            throw e
        }
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
}
