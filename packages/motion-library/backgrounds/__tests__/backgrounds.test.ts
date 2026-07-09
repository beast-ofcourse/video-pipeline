import { describe, it, expect } from 'vitest'
import { getBackground, getBackgroundNames, backgrounds } from '../index'

it('has at least 10 backgrounds', () => {
  expect(backgrounds.length).toBeGreaterThanOrEqual(10)
})

it('getBackground finds by name', () => {
  expect(getBackground('deep-space')).toBeDefined()
  expect(getBackground('deep-space')?.type).toBe('gradient-mesh')
})

it('getBackground returns undefined for unknown', () => {
  expect(getBackground('nonexistent')).toBeUndefined()
})
