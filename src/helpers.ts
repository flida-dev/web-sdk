import { nanoid } from 'nanoid/non-secure'

export function generateId(size = 48) {
    return nanoid(size)
}

function getCookieDomain() {
    const hostname = location.hostname

    // В большинстве случаев этой проверки должно хватить
    if (hostname === 'localhost' || /^(?:\d{1,3}\.){3}\d{1,3}$/.test(hostname)) {
        return
    }

    return hostname.split('.').slice(-2).join('.')
}

export function getCookie(name: string) {
    try {
        const matches = document.cookie.match(new RegExp(
            `(?:^|; )${(`flida_sdk:${name}`).replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`,
        ))
        return matches ? decodeURIComponent(matches[1]) : ''
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (e) {
        return ''
    }
}

export function setCookie(name: string, value: string): void {
    const expireTime = new Date(new Date().getTime() + 900_000).toUTCString()
    const domain = getCookieDomain()

    const cookie = [
        `flida_sdk:${name}=${encodeURIComponent(value)}`,
        `Expires=${expireTime}`,
        'Path=/',
        'SameSite=Strict',
        'Secure',
    ]

    if (domain) {
        cookie.push(`Domain=.${domain}`)
    }

    document.cookie = cookie.join('; ')
}

export function clearCookie(name: string) {
    const domain = getCookieDomain()

    const cookie = [
        `flida_sdk:${name}=`,
        'Expires=Thu, 01 Jan 1970 00:00:00 UTC',
        'Path=/',
        'SameSite=Strict',
        'Secure',
    ]

    if (domain) {
        cookie.push(`Domain=.${domain}`)
    }

    document.cookie = cookie.join('; ')
}

export function openWindow(url: string, popup = false): WindowProxy | null {
    let windowFeatures = ''
    const POPUP_SIZE = 600

    if (popup) {
        const top = screen.height / 2 - POPUP_SIZE / 2
        const left = screen.width / 2 - POPUP_SIZE / 2

        windowFeatures = [
            `top=${top}`,
            `left=${left}`,
            `width=${POPUP_SIZE}`,
            `height=${POPUP_SIZE}`,
            `location=true`,
        ].join(',')
    }

    return window.open(url, '_blank', windowFeatures)
}
