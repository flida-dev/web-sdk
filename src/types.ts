export interface Config {
    readonly clientId: string
    readonly redirectUri: string
    readonly scope: string[]
    readonly state?: string
    readonly pkce?: PkceConfig
}

export type PkceConfig = (
    | { codeChallenge: string, codeVerifier?: never }
    | { codeChallenge?: never, codeVerifier?: string }
)

export interface AuthRequest {
    client_id: string
    redirect_uri: string
    scope: string
    state: string
    code_challenge: string
}

export interface TokenResponse {
    token: {
        access_token: string
        id_token: string
        refresh_token: string
        token_type: string
        expires_in: number
    }
}

export interface GetUserInfoResponse {
    id: string
    name: string
    e_mail_addresses: string[]
    phone_numbers: string[]
}
