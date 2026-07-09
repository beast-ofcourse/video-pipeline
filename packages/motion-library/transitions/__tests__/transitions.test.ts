import { describe, it, expect } from 'vitest'
import { getTransition, getTransitionNames, transitions } from '../index'

it('has at least 12 transitions', () => {
  expect(transitions.length).toBeGreaterThanOrEqual(12)
})

it('getTransition finds by name', () => {
  expect(getTransition('crossfade')).toBeDefined()
  expect(getTransition('crossfade')?.type).toBe('mask-reveal')
})

it('getTransition returns undefined for unknown', () => {
  expect(getTransition('nonexistent')).toBeUndefined()
})

it('getTransitionNames returns all names', () => {
  const names = getTransitionNames()
  expect(names).toContain('crossfade')
  expect(names).toContain('slide-left')
})
