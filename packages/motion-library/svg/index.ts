export interface SVGAnimationPreset {
  name: string
  type: 'morph' | 'draw' | 'stroke-animate' | 'path-reveal' | 'rotate-3d' | 'scale-bounce' | 'gradient-shift' | 'float-path'
  params: Record<string, unknown>
}

export const svgAnimationPresets: SVGAnimationPreset[] = [
  { name: 'morph-circle-square', type: 'morph', params: { from: 'circle', to: 'square', duration: 30, easing: 'ease-in-out' } },
  { name: 'morph-square-triangle', type: 'morph', params: { from: 'square', to: 'triangle', duration: 30, easing: 'ease-in-out' } },
  { name: 'draw-line', type: 'draw', params: { direction: 'left-to-right', duration: 40, easing: 'ease-out' } },
  { name: 'draw-circle', type: 'draw', params: { direction: 'clockwise', duration: 50, easing: 'linear' } },
  { name: 'stroke-pulse', type: 'stroke-animate', params: { from: 1, to: 3, duration: 20, easing: 'ease-in-out', loop: true } },
  { name: 'stroke-dash', type: 'stroke-animate', params: { from: 0, to: 100, duration: 40, easing: 'ease-out' } },
  { name: 'path-reveal-left', type: 'path-reveal', params: { direction: 'left', duration: 35, easing: 'ease-out' } },
  { name: 'path-reveal-center', type: 'path-reveal', params: { direction: 'center', duration: 35, easing: 'ease-out' } },
  { name: 'floating-y', type: 'float-path', params: { amplitude: 10, frequency: 0.5, axis: 'y', loop: true } },
  { name: 'floating-x', type: 'float-path', params: { amplitude: 8, frequency: 0.3, axis: 'x', loop: true } },
]

export function getSVGAnimation(name: string): SVGAnimationPreset | undefined {
  return svgAnimationPresets.find(s => s.name === name)
}
