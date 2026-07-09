import path from 'path'
import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import { RendererAdapter, RenderOptions, RenderResult } from '../types'
import { SceneGraph, AspectRatio } from '../../core/types'

const RESOLUTION_MAP: Record<AspectRatio, { width: number; height: number }> = {
  '16:9': { width: 1920, height: 1080 },
  '9:16': { width: 1080, height: 1920 },
  '1:1':  { width: 1080, height: 1080 },
  '4:5':  { width: 1080, height: 1350 },
  '21:9': { width: 2560, height: 1080 },
}

export class RemotionRenderer implements RendererAdapter {
  name = 'remotion'

  supports: AspectRatio[] = ['16:9', '9:16', '1:1', '4:5', '21:9']

  async render(sceneGraph: SceneGraph, options: RenderOptions): Promise<RenderResult> {
    const res = RESOLUTION_MAP[options.aspectRatio]
    const fps = options.fps ?? 30
    const totalFrames = Math.ceil(
      sceneGraph.scenes.reduce((sum, s) => sum + s.duration, 0) * fps
    )
    const totalDuration = sceneGraph.scenes.reduce((sum, s) => sum + s.duration, 0)

    try {
      const entryFile = path.resolve(__dirname, './Root.tsx')

      const bundled = await bundle({ entryPoint: entryFile })

      const composition = await selectComposition({
        serveUrl: bundled,
        id: sceneGraph.scenes[0].id,
        inputProps: { sceneGraph },
      })

      const outputLocation = options.outputPath.endsWith('.mp4')
        ? options.outputPath
        : path.join(options.outputPath, 'render.mp4')

      await renderMedia({
        composition,
        serveUrl: bundled,
        codec: 'h264',
        outputLocation,
        inputProps: { sceneGraph },
      })

      return {
        outputPath: outputLocation,
        duration: totalDuration,
        frameCount: totalFrames,
        resolution: { width: res.width, height: res.height },
        success: true,
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      return {
        outputPath: options.outputPath,
        duration: 0,
        frameCount: 0,
        resolution: res,
        success: false,
        error: message,
      }
    }
  }
}
