export interface TokenResponse {
    token: {
        access_token: string
        refresh_token: string
        id_token: string
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
