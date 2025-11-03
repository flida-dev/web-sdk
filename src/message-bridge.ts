import type { AuthResponse, SDKConfig } from './sdk.types'
import type { Security } from './security/security'
import { ID_URL } from './constants'
import { ErrorCode, FlidaError } from './errors'
import { openWindow } from './helpers'
import { SDKMode } from './sdk.types'

type AuthMessageEvent = MessageEvent<{ action: string, payload: AuthResponse }>

export class MessageBridge {
    constructor(private readonly security: Security) {}

    public async init(url: string, config: SDKConfig) {
        const opener = openWindow(url, config.mode === SDKMode.POPUP)

        if (!opener) {
            throw new FlidaError(ErrorCode.BRIDGE_UNABLE_TO_OPEN)
        }

        return new Promise<AuthResponse>((resolve, reject) => {
            let openHandle: ReturnType<typeof setInterval> | undefined
            let timeoutHandle: ReturnType<typeof setTimeout> | undefined
            let reset: () => void

            const assertOpen = () => {
                if (!opener || opener.closed) {
                    reset()
                    reject(new FlidaError(ErrorCode.BRIDGE_PROCESS_CLOSED))
                }
            }

            const onMessage = (event: AuthMessageEvent) => {
                if (
                    event.source !== opener
                    || !opener
                    || event.origin !== ID_URL
                ) {
                    return
                }

                const state = this.security.state.retrieve()

                if (
                    event.data.action !== `oauth2_response_${state}`
                    || !event.data.payload?.state
                ) {
                    return
                }

                try {
                    this.security.state.verifyAndClear(event.data.payload.state)
                    resolve(event.data.payload)
                }
                catch (e) {
                    reject(e)
                }
                finally {
                    reset()
                    opener?.close?.()
                }
            }

            const abort = () => {
                reset()
                opener?.close?.()
                reject(new FlidaError(ErrorCode.BRIDGE_PROCESS_ABORTED))
            }

            reset = () => {
                clearTimeout(timeoutHandle)
                clearInterval(openHandle)
                window.removeEventListener('message', onMessage, false)
            }

            window.addEventListener('message', onMessage, false)
            openHandle = setInterval(() => {
                assertOpen()
            }, 1_000)
            timeoutHandle = setTimeout(() => {
                abort()
            }, 600_000)
        })
    }
}
