export enum SDKMode {
    REDIRECT,
    POPUP,
    NEW_TAB,
}

export interface SDKConfig {
    /**
     * Client ID приложения
     */
    readonly clientId: string
    /**
     * Redirect URI приложения
     */
    readonly redirectUri: string
    /**
     * Запрашиваемые права доступа
     */
    readonly scope: string[]
    /**
     * Идентификатор состояния
     */
    readonly state?: string
    /**
     * PKCE конфигурация
     */
    readonly pkce?: PkceConfig
    /**
     * Mode
     */
    readonly mode?: SDKMode

    mock?: {
        api: string
    }
}

/**
 * PKCE конфигурация
 *
 * Либо codeChallenge, либо codeVerifier должны быть заданы
 */
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
    origin?: string
}

export interface AuthResponse {
    code: string
    state: string
}
