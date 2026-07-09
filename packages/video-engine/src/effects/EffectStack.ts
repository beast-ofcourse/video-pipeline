import { Effect } from '../core/types'
import { getEffectRenderer } from './effects'

export class EffectStack {
  applyAll(effects: Effect[], ctx: CanvasRenderingContext2D, width: number, height: number): void {
    const sorted = [...effects].sort((a, b) => a.order - b.order)
    for (const effect of sorted) {
      const renderer = getEffectRenderer(effect.type)
      if (renderer) {
        ctx.save()
        renderer(ctx, effect.params as Record<string, unknown>, width, height)
        ctx.restore()
      }
    }
  }
}
