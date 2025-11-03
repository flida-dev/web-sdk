import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ErrorCode, FlidaError } from '../errors'
import { clearCookie, getCookie, setCookie } from '../helpers'
import { State } from './state'

describe('State', () => {
    let state: State
    const configState = 'config-state'

    beforeEach(() => {
        clearCookie(State.cookieName)
        state = new State()
        vi.clearAllMocks()
    })

    describe('retrieve', () => {
        it('должен взять state из config и сохранить в куки', () => {
            const result = state.retrieve(configState)

            expect(result).toBe(configState)
            expect(getCookie(State.cookieName)).toBe(configState)
        })

        it('должен взять state из куки, если куки уже есть', () => {
            setCookie(State.cookieName, configState) // Предварительный state

            const result = state.retrieve()

            expect(result).toBe(configState)
        })

        it('должен сгенерировать ID и сохранить в куки, если config и куки пустые', () => {
            const result = state.retrieve()

            expect(result).toMatch('nanoid')
            expect(getCookie(State.cookieName)).toBe(result)
        })
    })

    describe('verifyAndClear', () => {
        it('должен очистить куки и state при совпадении', () => {
            state.retrieve(configState)

            expect(() => state.verifyAndClear(configState)).not.toThrow()

            expect(getCookie(State.cookieName)).toBe('')
        })

        it('должен бросить INVALID_STATE и не чистить куки на несовпадении', () => {
            state.retrieve(configState)

            expect(() => state.verifyAndClear('wrong')).toThrow(
                new FlidaError(ErrorCode.INVALID_STATE),
            )
            expect(getCookie(State.cookieName)).toBe(configState)
        })

        it('должен бросить MISSING_STATE, если retrieve не вызван', () => {
            expect(() => state.verifyAndClear('wrong')).toThrow(
                new FlidaError(ErrorCode.MISSING_STATE),
            )
        })
    })
})
