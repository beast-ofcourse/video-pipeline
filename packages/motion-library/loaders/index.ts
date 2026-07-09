export interface LoaderPreset {
  name: string
  type: 'spinner' | 'pulse' | 'skeleton' | 'progress' | 'dots' | 'bar' | 'ring' | 'bounce'
  params: Record<string, unknown>
}

export const loaders: LoaderPreset[] = [
  { name: 'circular-spinner', type: 'spinner', params: { size: 32, color: '#007AFF', speed: 1, strokeWidth: 3 } },
  { name: 'pulse-dot', type: 'pulse', params: { size: 12, color: '#007AFF', speed: 1.5, count: 3 } },
  { name: 'skeleton-block', type: 'skeleton', params: { width: '100%', height: 20, borderRadius: 4, speed: 1.5 } },
  { name: 'indeterminate-bar', type: 'bar', params: { width: '60%', height: 4, color: '#007AFF', speed: 1 } },
  { name: 'bouncing-dots', type: 'dots', params: { count: 3, size: 10, color: '#007AFF', speed: 0.8 } },
  { name: 'loading-ring', type: 'ring', params: { size: 40, color: '#007AFF', speed: 1 } },
  { name: 'wave-bar', type: 'bar', params: { bars: 5, color: '#007AFF', speed: 0.6 } },
]

export function getLoader(name: string): LoaderPreset | undefined {
  return loaders.find(l => l.name === name)
}
