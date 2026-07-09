import { SceneGraph, AspectRatio } from '../core/types'

export interface RenderOptions {
  outputPath: string
  aspectRatio: AspectRatio
  fps?: number
  quality?: number
  onProgress?: (frame: number, total: number) => void
}

export interface RenderResult {
  outputPath: string
  duration: number
  frameCount: number
  resolution: { width: number; height: number }
  success: boolean
  error?: string
}

export interface RendererAdapter {
  name: string
  supports: AspectRatio[]
  render(sceneGraph: SceneGraph, options: RenderOptions): Promise<RenderResult>
}
