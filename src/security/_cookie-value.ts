import { clearCookie, getCookie, setCookie } from '../helpers'

export class CookieValue {
    protected name = ''

    constructor(name: string) {
        this.name = name
    }

    protected persist(value: string) {
        if (!this.get())
            setCookie(this.name, value)

        return value
    }

    protected get() {
        return getCookie(this.name)
    }

    protected clear() {
        return clearCookie(this.name)
    }
}
