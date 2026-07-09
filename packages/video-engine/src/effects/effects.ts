import { Effect } from '../core/types'

export type EffectRenderer = (ctx: CanvasRenderingContext2D, params: Record<string, unknown>, width: number, height: number) => void

const REGISTRY: Record<string, EffectRenderer> = {
  bloom: (ctx, params) => {
    const intensity = (params.intensity as number) ?? 0.5
    ctx.filter = `blur(${intensity * 10}px)`
    ctx.globalCompositeOperation = 'screen'
  },
  blur: (ctx, params) => {
    const amount = (params.amount as number) ?? 5
    ctx.filter = `blur(${amount}px)`
  },
  glow: (ctx, params, w, h) => {
    const color = (params.color as string) ?? '#00ffff'
    const radius = (params.radius as number) ?? 20
    ctx.shadowColor = color
    ctx.shadowBlur = radius
  },
  grain: (ctx, _params, w, h) => {
    const imageData = ctx.getImageData(0, 0, w, h)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 30
      data[i] += noise
      data[i + 1] += noise
      data[i + 2] += noise
    }
    ctx.putImageData(imageData, 0, 0)
  },
  'chromatic-aberration': (ctx, params, w, h) => {
    const shift = (params.shift as number) ?? 3
    const imageData = ctx.getImageData(0, 0, w, h)
    const data = imageData.data
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4
        const rIdx = (y * w + Math.max(0, x - shift)) * 4
        const bIdx = (y * w + Math.min(w - 1, x + shift)) * 4
        data[idx] = data[rIdx]
        data[idx + 2] = data[bIdx]
      }
    }
    ctx.putImageData(imageData, 0, 0)
  },
  'drop-shadow': (ctx, params) => {
    const offsetX = (params.offsetX as number) ?? 4
    const offsetY = (params.offsetY as number) ?? 4
    const blur = (params.blur as number) ?? 8
    const color = (params.color as string) ?? 'rgba(0,0,0,0.5)'
    ctx.shadowColor = color
    ctx.shadowBlur = blur
    ctx.shadowOffsetX = offsetX
    ctx.shadowOffsetY = offsetY
  },
  'color-grade': (ctx, params) => {
    const brightness = (params.brightness as number) ?? 0
    const contrast = (params.contrast as number) ?? 1
    const saturation = (params.saturation as number) ?? 1
    ctx.filter = `brightness(${1 + brightness}) contrast(${contrast}) saturate(${saturation})`
  },
}

export function getEffectRenderer(type: string): EffectRenderer | undefined {
  return REGISTRY[type]
}

export function getEffectNames(): string[] {
  return Object.keys(REGISTRY)
}
