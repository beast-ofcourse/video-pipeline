import { describe, it, expect } from 'vitest'
import { getPreset, getPresetsByCategory, ALL_PRESETS } from '../index'

it('all 15 categories are registered', () => {
  const categories = Object.keys(ALL_PRESETS)
  expect(categories.length).toBe(15)
  expect(categories).toContain('fade')
  expect(categories).toContain('slide')
  expect(categories).toContain('pop')
  expect(categories).toContain('bounce')
  expect(categories).toContain('elastic')
  expect(categories).toContain('blur')
  expect(categories).toContain('counter')
  expect(categories).toContain('typing')
  expect(categories).toContain('wave')
  expect(categories).toContain('stagger')
  expect(categories).toContain('parallax')
  expect(categories).toContain('float')
  expect(categories).toContain('shake')
  expect(categories).toContain('pulse')
  expect(categories).toContain('light-sweep')
})

it('each category has at least 6 presets', () => {
  for (const [category, presets] of Object.entries(ALL_PRESETS)) {
    expect(presets.length).toBeGreaterThanOrEqual(6)
  }
})

it('getPreset finds correct preset', () => {
  const preset = getPreset('fade', 'fade-in')
  expect(preset).toBeDefined()
  expect(preset?.name).toBe('fade-in')
  expect(preset?.type).toBe('fade')
})

it('getPreset returns undefined for unknown', () => {
  expect(getPreset('fade', 'nonexistent')).toBeUndefined()
  expect(getPreset('unknown', 'test')).toBeUndefined()
})

it('getPresetsByCategory returns all categories', () => {
  const all = getPresetsByCategory()
  expect(Object.keys(all).length).toBe(15)
})