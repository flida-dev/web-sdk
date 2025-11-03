import { vi } from 'vitest'

vi.mock('nanoid/non-secure', () => {
    return {
        nanoid: vi.fn(() => 'nanoid'),
    }
})
