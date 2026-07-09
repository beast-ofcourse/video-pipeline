export interface TransitionConfig {
  name: string
  type: 'mask-reveal' | 'morph' | 'cross-zoom' | 'directional-blur' | 'light-sweep' |
        'slide' | 'scale' | 'whip-pan' | 'shape-morph' | 'svg-reveal' |
        'liquid-wipe' | 'circular-reveal' | 'grid-reveal'
  duration: number
  easing: string
  params: Record<string, unknown>
}

export const transitions: TransitionConfig[] = [
  { name: 'crossfade', type: 'mask-reveal', duration: 0.5, easing: 'ease-in-out', params: {} },
  { name: 'slide-left', type: 'slide', duration: 0.4, easing: 'ease-out', params: { direction: 'left' } },
  { name: 'slide-right', type: 'slide', duration: 0.4, easing: 'ease-out', params: { direction: 'right' } },
  { name: 'slide-up', type: 'slide', duration: 0.4, easing: 'ease-out', params: { direction: 'up' } },
  { name: 'slide-down', type: 'slide', duration: 0.4, easing: 'ease-out', params: { direction: 'down' } },
  { name: 'zoom-in', type: 'cross-zoom', duration: 0.6, easing: 'ease-out', params: { direction: 'in' } },
  { name: 'zoom-out', type: 'cross-zoom', duration: 0.6, easing: 'ease-out', params: { direction: 'out' } },
  { name: 'scale-down', type: 'scale', duration: 0.5, easing: 'ease-in-out', params: { from: 1, to: 0 } },
  { name: 'scale-up', type: 'scale', duration: 0.5, easing: 'ease-in-out', params: { from: 0, to: 1 } },
  { name: 'whip-pan-left', type: 'whip-pan', duration: 0.3, easing: 'ease-in-out', params: { direction: 'left' } },
  { name: 'whip-pan-right', type: 'whip-pan', duration: 0.3, easing: 'ease-in-out', params: { direction: 'right' } },
  { name: 'blur-in', type: 'directional-blur', duration: 0.5, easing: 'ease-out', params: { blur: 20, direction: 'in' } },
  { name: 'blur-out', type: 'directional-blur', duration: 0.5, easing: 'ease-in', params: { blur: 20, direction: 'out' } },
  { name: 'light-sweep', type: 'light-sweep', duration: 0.7, easing: 'ease-in-out', params: { angle: 45 } },
  { name: 'morph', type: 'morph', duration: 0.6, easing: 'ease-in-out', params: {} },
  { name: 'circular-reveal', type: 'circular-reveal', duration: 0.5, easing: 'ease-out', params: {} },
  { name: 'grid-reveal', type: 'grid-reveal', duration: 0.7, easing: 'ease-out', params: { rows: 8, cols: 8 } },
]

export function getTransition(name: string): TransitionConfig | undefined {
  return transitions.find(t => t.name === name)
}

export function getTransitionNames(): string[] {
  return transitions.map(t => t.name)
}
