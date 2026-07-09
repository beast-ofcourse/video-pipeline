import { describe, it, expect } from 'vitest'
import { getTheme, getThemeNames, THEMES } from '../index'

it('all 9 themes are registered (8 brands + 1 custom)', () => {
  const names = getThemeNames()
  expect(names.length).toBe(9)
  expect(names).toContain('apple')
  expect(names).toContain('stripe')
  expect(names).toContain('linear')
  expect(names).toContain('raycast')
  expect(names).toContain('framer')
  expect(names).toContain('vercel')
  expect(names).toContain('notion')
  expect(names).toContain('openai')
  expect(names).toContain('custom')
})

it('each theme has all required fields', () => {
  for (const [name, theme] of Object.entries(THEMES)) {
    expect(theme.name).toBe(name)
    expect(theme.colorPalette.primary).toBeDefined()
    expect(theme.typography.fonts.heading).toBeDefined()
    expect(theme.animationPhilosophy.defaultEasing).toBeDefined()
    expect(theme.cameraStyle.defaultPreset).toBeDefined()
    expect(theme.pacing.sceneLength).toBeGreaterThan(0)
  }
})

it('getTheme returns correct theme', () => {
  const theme = getTheme('apple')
  expect(theme).toBeDefined()
  expect(theme?.name).toBe('apple')
  expect(theme?.colorPalette.accent).toBe('#007AFF')
})

it('getTheme returns undefined for unknown', () => {
  expect(getTheme('nonexistent')).toBeUndefined()
})
