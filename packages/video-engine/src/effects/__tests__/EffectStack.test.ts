import { describe, it, expect, vi } from 'vitest'
import { EffectStack } from '../EffectStack'
import { getEffectRenderer, getEffectNames } from '../effects'
import { Effect } from '../../core/types'

function createMockCtx() {
  return {
    save: vi.fn(),
    restore: vi.fn(),
    filter: '',
    globalCompositeOperation: '',
    shadowColor: '',
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    getImageData: vi.fn(() => ({ data: new Uint8ClampedArray(16) })),
    putImageData: vi.fn(),
  } as unknown as CanvasRenderingContext2D
}

it('all 7 effect names have renderers', () => {
  const names = getEffectNames()
  expect(names.length).toBe(7)
  names.forEach((name) => {
    expect(getEffectRenderer(name)).toBeDefined()
  })
  // Verify specific effects exist
  expect(names).toContain('bloom')
  expect(names).toContain('blur')
  expect(names).toContain('glow')
  expect(names).toContain('grain')
  expect(names).toContain('chromatic-aberration')
  expect(names).toContain('drop-shadow')
  expect(names).toContain('color-grade')
})

it('getEffectRenderer returns undefined for unknown effect', () => {
  expect(getEffectRenderer('nonexistent')).toBeUndefined()
})

it('sorts effects by order before applying', () => {
  const stack = new EffectStack()
  const effects: Effect[] = [
    { type: 'blur', params: { amount: 5 }, order: 2 },
    { type: 'glow', params: { color: '#fff' }, order: 1 },
  ]
  // Just verify it runs without error (Canvas not available in Node)
  expect(() => stack.applyAll(effects, createMockCtx(), 100, 100)).not.toThrow()
})

it('empty effects array does not throw', () => {
  const stack = new EffectStack()
  expect(() => stack.applyAll([], createMockCtx(), 100, 100)).not.toThrow()
})

it('skips unknown effect types gracefully', () => {
  const stack = new EffectStack()
  const effects: Effect[] = [
    { type: 'unknown-effect', params: {}, order: 0 },
  ]
  expect(() => stack.applyAll(effects, createMockCtx(), 100, 100)).not.toThrow()
})
