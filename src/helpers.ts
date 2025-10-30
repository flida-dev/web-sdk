import { nanoid } from 'nanoid/non-secure'

export function generateId(size = 48) {
    return nanoid(size)
}

export function getCookie(name: string) {
    try {
        const matches = document.cookie.match(new RegExp(
            `(?:^|; )${(`flida_sdk:${name}`).replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`,
        ))
        return matches ? decodeURIComponent(matches[1]) : undefined
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (e) {
        return undefined
        /* empty */
    }
}

export function setCookie(name: string, value: string): void {
    try {
        const expireTime = new Date(new Date().getTime() + (100_000)).toUTCString()
        const allowedDomain = location.host.split('.').slice(-2).join('.')

        document.cookie = [
            `flida_sdk:${name}=${encodeURIComponent(value)}`,
            `Expires=${expireTime}`,
            'Path=/',
            `Domain=.${allowedDomain}`,
            'SameSite=Strict',
            'Secure',
        ].join('; ')
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (e) {
        /* empty */
    }
}

export function clearCookie(name: string) {
    // eslint-disable-next-line no-console
    console.log('Clearing cookie:', name)
    const allowedDomain = location.host.split('.').slice(-2).join('.')
    try {
        document.cookie = [
            `flida_sdk:${name}=`,
            'Expires=Thu, 01 Jan 1970 00:00:00 UTC',
            'Path=/',
            `Domain=.${allowedDomain}`,
            'SameSite=Strict',
            'Secure',
        ].join('; ')
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (e) {}
}
