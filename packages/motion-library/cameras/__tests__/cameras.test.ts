import { describe, it, expect } from 'vitest'
import { getCamera, getCameraNames, cameras } from '../index'

it('has at least 6 camera configs', () => {
  expect(cameras.length).toBeGreaterThanOrEqual(6)
})

it('getCamera finds by name', () => {
  expect(getCamera('gentle-push')).toBeDefined()
  expect(getCamera('gentle-push')?.preset).toBe('push-zoom')
})

it('getCamera returns undefined for unknown', () => {
  expect(getCamera('nonexistent')).toBeUndefined()
})
