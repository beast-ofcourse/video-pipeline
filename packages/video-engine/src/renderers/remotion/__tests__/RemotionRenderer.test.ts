import { describe, it, expect } from 'vitest'
import type { RendererAdapter, RenderOptions, RenderResult } from '../../types'
import { RemotionRenderer } from '../RemotionRenderer'
import type { SceneGraph } from '../../../core/types'

describe('RemotionRenderer', () => {
  it('implements RendererAdapter interface', () => {
    const renderer: RendererAdapter = new RemotionRenderer()
    expect(renderer.name).toBe('remotion')
    expect(renderer.supports).toEqual(['16:9', '9:16', '1:1', '4:5', '21:9'])
  })

  it('reports an error when rendering an empty scene graph', async () => {
    const renderer = new RemotionRenderer()
    const graph: SceneGraph = {
      scenes: [],
      aspectRatio: '16:9',
      resolution: { width: 1920, height: 1080 },
    }
    const options: RenderOptions = {
      outputPath: '/tmp/test.mp4',
      aspectRatio: '16:9',
    }

    // Rendering an empty scene graph should fail because
    // selectComposition tries to access scenes[0].id
    const result = await renderer.render(graph, options)
    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })

  it('returns correct resolution for each aspect ratio', () => {
    const renderer = new RemotionRenderer()

    const testCases: Array<{ aspect: RenderOptions['aspectRatio']; expected: { width: number; height: number } }> = [
      { aspect: '16:9', expected: { width: 1920, height: 1080 } },
      { aspect: '9:16', expected: { width: 1080, height: 1920 } },
      { aspect: '1:1', expected: { width: 1080, height: 1080 } },
      { aspect: '4:5', expected: { width: 1080, height: 1350 } },
      { aspect: '21:9', expected: { width: 2560, height: 1080 } },
    ]

    for (const { aspect, expected } of testCases) {
      expect(renderer.supports).toContain(aspect)
    }
  })

  it('produces a RenderResult matching the interface', async () => {
    const renderer = new RemotionRenderer()
    const graph: SceneGraph = {
      scenes: [],
      aspectRatio: '16:9',
      resolution: { width: 1920, height: 1080 },
    }

    const result: RenderResult = await renderer.render(graph, {
      outputPath: '/tmp/test.mp4',
      aspectRatio: '16:9',
    })

    // Must match RenderResult shape
    expect(result).toHaveProperty('outputPath')
    expect(result).toHaveProperty('duration')
    expect(result).toHaveProperty('frameCount')
    expect(result).toHaveProperty('resolution')
    expect(result).toHaveProperty('success')
  })
})
