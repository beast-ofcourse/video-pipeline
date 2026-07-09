import { describe, it, expect } from 'vitest'
import { getEasing, EASING_FUNCTIONS } from '../Easing'

it('linear easing returns t unchanged', () => {
  const fn = getEasing('linear')
  expect(fn(0)).toBe(0)
  expect(fn(0.5)).toBe(0.5)
  expect(fn(1)).toBe(1)
})

it('ease-out starts fast, stays above linear', () => {
  const fn = getEasing('ease-out')
  expect(fn(0.1)).toBeGreaterThan(0.1)
  expect(fn(0.5)).toBeGreaterThan(0.5)
})

it('ease-in starts slow, stays below linear', () => {
  const fn = getEasing('ease-in')
  expect(fn(0.1)).toBeLessThan(0.1)
  expect(fn(0.5)).toBeLessThan(0.5)
})

it('spring overshoots then settles to 1', () => {
  const fn = getEasing('spring')
  expect(fn(0)).toBe(0)
  expect(fn(1)).toBeCloseTo(1, 2)
  // At some t between 0 and 1, spring exceeds 1 (overshoot)
  let maxVal = 0
  for (let i = 1; i < 100; i++) {
    const v = fn(i / 100)
    if (v > maxVal) maxVal = v
  }
  expect(maxVal).toBeGreaterThan(1)
})

it('elastic returns 0 at start and 1 at end', () => {
  const fn = getEasing('elastic')
  expect(fn(0)).toBe(0)
  expect(fn(1)).toBe(1)
})

it('bounce returns expected range', () => {
  const fn = getEasing('bounce')
  for (let i = 0; i <= 100; i++) {
    const v = fn(i / 100)
    expect(v).toBeGreaterThanOrEqual(0)
    expect(v).toBeLessThanOrEqual(1.05)
  }
})

it('unknown easing falls back to linear', () => {
  const fn = getEasing('nonexistent')
  expect(fn(0.5)).toBe(0.5)
})

it('custom bezier overrides named easing', () => {
  // Custom easeInOutBack approximation
  const fn = getEasing('linear', [0.68, -0.6, 0.32, 1.6])
  expect(fn(0)).toBe(0)
  expect(fn(1)).toBe(1)
  // Should overshoot at some point (back easing does this)
  let overshoot = false
  for (let i = 0; i <= 100; i++) {
    const v = fn(i / 100)
    if (v > 1) overshoot = true
  }
  expect(overshoot).toBe(true)
})

it('all easing functions start at 0 and end at 1', () => {
  for (const [name, fn] of Object.entries(EASING_FUNCTIONS)) {
    expect(fn(0)).toBeCloseTo(0, 2)
    expect(fn(1)).toBeCloseTo(1, 2)
  }
})
