import { describe, it, expect } from 'vitest'
import { TimelineEngine } from '../TimelineEngine'
import type { Animation } from '../../core/types'

it('interpolates opacity 0→1 over 30 frames', () => {
  const engine = new TimelineEngine()
  const anims: Animation[] = [{
    property: 'opacity',
    keyframes: [{ frame: 0, value: 0 }, { frame: 30, value: 1 }]
  }]
  expect(engine.evaluate(anims, 0)['opacity']).toBe(0)
  expect(engine.evaluate(anims, 15)['opacity']).toBe(0.5)
  expect(engine.evaluate(anims, 30)['opacity']).toBe(1)
})

it('handles multiple simultaneous animations on same node', () => {
  const engine = new TimelineEngine()
  const anims: Animation[] = [
    { property: 'opacity', keyframes: [{ frame: 0, value: 0 }, { frame: 10, value: 1 }] },
    { property: 'position', keyframes: [{ frame: 0, value: [0, 0] }, { frame: 10, value: [100, 0] }] },
  ]
  const state = engine.evaluate(anims, 5)
  expect(state['opacity']).toBeCloseTo(0.5, 2)
  const pos = state['position'] as number[]
  expect(pos[0]).toBeCloseTo(50, 1)
})

it('loops animation when loop is true', () => {
  const engine = new TimelineEngine()
  const anims: Animation[] = [{
    property: 'opacity',
    keyframes: [{ frame: 0, value: 0 }, { frame: 10, value: 1 }],
    loop: true,
  }]
  const state = engine.evaluate(anims, 25)
  expect(state['opacity']).toBeCloseTo(0.5, 2)
})

it('applies delay correctly', () => {
  const engine = new TimelineEngine()
  const anims: Animation[] = [{
    property: 'opacity',
    keyframes: [{ frame: 0, value: 0 }, { frame: 10, value: 1 }],
    delay: 20,
  }]
  expect(engine.evaluate(anims, 10)['opacity']).toBeUndefined()
  const state = engine.evaluate(anims, 25)
  expect(state['opacity']).toBeCloseTo(0.5, 2)
})

it('clamps at last keyframe value after animation ends', () => {
  const engine = new TimelineEngine()
  const anims: Animation[] = [{
    property: 'opacity',
    keyframes: [{ frame: 0, value: 1 }, { frame: 10, value: 0 }],
  }]
  expect(engine.evaluate(anims, 10)['opacity']).toBe(0)
  expect(engine.evaluate(anims, 100)['opacity']).toBe(0)
})

it('yoyo reverses animation on even loop cycles', () => {
  const engine = new TimelineEngine()
  const anims: Animation[] = [{
    property: 'opacity',
    keyframes: [{ frame: 0, value: 0 }, { frame: 10, value: 1 }],
    loop: true,
    yoyo: true,
  }]
  // Frame 5 = first cycle, forward
  const fwd = engine.evaluate(anims, 5)
  expect(fwd['opacity']).toBeCloseTo(0.5, 2)
  // Frame 15 = second cycle, reversed (yoyo)
  const rev = engine.evaluate(anims, 15)
  expect(rev['opacity']).toBeCloseTo(0.5, 2)
})

it('uses easing from keyframe', () => {
  const engine = new TimelineEngine()
  const linear: Animation[] = [{
    property: 'opacity',
    keyframes: [{ frame: 0, value: 0, easing: 'linear' }, { frame: 10, value: 1 }],
  }]
  const easeOut: Animation[] = [{
    property: 'opacity',
    keyframes: [{ frame: 0, value: 0, easing: 'ease-out' }, { frame: 10, value: 1 }],
  }]
  const linearState = engine.evaluate(linear, 2)
  const easeState = engine.evaluate(easeOut, 2)
  // At frame 2 (20%), ease-out starts fast so it should be higher than linear
  expect(linearState['opacity']).toBeCloseTo(0.2, 2)
  expect(easeState['opacity']).toBeGreaterThan(0.2)
})

it('handles empty animations array', () => {
  const engine = new TimelineEngine()
  const state = engine.evaluate([], 50)
  expect(Object.keys(state).length).toBe(0)
})

it('interpolates vector values (position, scale)', () => {
  const engine = new TimelineEngine()
  const anims: Animation[] = [{
    property: 'scale',
    keyframes: [{ frame: 0, value: [0.5, 0.5] }, { frame: 10, value: [1.0, 1.5] }],
  }]
  const state = engine.evaluate(anims, 5)
  const scale = state['scale'] as number[]
  expect(scale[0]).toBeCloseTo(0.75, 2)
  expect(scale[1]).toBeCloseTo(1.0, 2)
})
