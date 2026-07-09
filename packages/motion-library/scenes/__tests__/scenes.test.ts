import { describe, it, expect } from 'vitest'
import { getScenePreset, getScenePresetsByCategory } from '../index'

it('all 10 categories have presets', () => {
  const all = getScenePresetsByCategory()
  expect(Object.keys(all).length).toBe(10)
})

it('getScenePreset finds presets by category and name', () => {
  const preset = getScenePreset('product-showcase', 'hero-product-left')
  expect(preset).toBeDefined()
  expect(preset?.name).toBe('hero-product-left')
})

it('getScenePreset returns undefined for unknown', () => {
  expect(getScenePreset('product-showcase', 'nonexistent')).toBeUndefined()
  expect(getScenePreset('unknown', 'test')).toBeUndefined()
})

it('each preset create() returns nodes array', () => {
  const all = getScenePresetsByCategory()
  for (const [, presets] of Object.entries(all)) {
    for (const preset of presets) {
      const result = preset.create({})
      expect(result.nodes.length).toBeGreaterThan(0)
    }
  }
})
