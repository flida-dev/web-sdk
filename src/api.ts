import type { GetUserInfoResponse, TokenResponse } from './api.types'
import { API_URL } from './constants'

export class Api {
    constructor() {

    }

    private async request(endpoint: string, body?: any): Promise<any> {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })

        let json: any
        try {
            // eslint-disable-next-line ts/no-unsafe-assignment
            json = await response.json()
        }
        catch (e) {
            json = { message: `Non-JSON response: ${e as any}` }
        }

        if (!response.ok) {
            console.error('API error:', response.status)
            throw new Error(`Request failed: ${response.status}`)
        }

        return json
    }

    private async tokenService(endpoint: string, json: any) {
        return this.request(`flida.oauth.v1.TokenService/${endpoint}`, json)
    }

    private async oidcService(endpoint: string, json: any) {
        return this.request(`flida.oidc.v1.OIDCService/${endpoint}`, json)
    }

    public async issueToken(json: any): Promise<TokenResponse> {
        return this.tokenService('IssueToken', json)
    }

    public async refreshToken(json: any): Promise<TokenResponse> {
        return this.tokenService('RefreshToken', json)
    }

    public async getUserInfo(json: any): Promise<GetUserInfoResponse> {
        return this.oidcService('GetUserInfo', json)
    }
}
