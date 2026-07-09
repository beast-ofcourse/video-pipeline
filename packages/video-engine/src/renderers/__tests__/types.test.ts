import { describe, it, expect } from 'vitest'
import type { RendererAdapter, RenderOptions, RenderResult } from '../types'
import type { SceneGraph, AspectRatio } from '../../core/types'

it('RendererAdapter interface is structurally sound', () => {
  const adapter: RendererAdapter = {
    name: 'test',
    supports: ['16:9'],
    render: async () => ({
      outputPath: '/tmp/test.mp4',
      duration: 10,
      frameCount: 300,
      resolution: { width: 1920, height: 1080 },
      success: true,
    }),
  }
  expect(adapter.name).toBe('test')
  expect(adapter.supports).toContain('16:9')
})

it('RenderOptions accepts all aspect ratios', () => {
  const ratios: AspectRatio[] = ['16:9', '9:16', '1:1', '4:5', '21:9']
  for (const r of ratios) {
    const options: RenderOptions = { outputPath: '/tmp/test.mp4', aspectRatio: r }
    expect(options.aspectRatio).toBe(r)
  }
})

it('RenderResult can represent failure', () => {
  const result: RenderResult = {
    outputPath: '/tmp/failed.mp4',
    duration: 0,
    frameCount: 0,
    resolution: { width: 0, height: 0 },
    success: false,
    error: 'Render crashed: out of memory',
  }
  expect(result.success).toBe(false)
  expect(result.error).toBeDefined()
})
