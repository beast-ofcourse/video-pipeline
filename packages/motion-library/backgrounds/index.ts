export interface BackgroundConfig {
  name: string
  type: 'gradient-mesh' | 'noise' | 'lights' | 'particles-backdrop' | 'solid' | 'gradient-linear' | 'gradient-radial' | 'pattern'
  params: Record<string, unknown>
}

export const backgrounds: BackgroundConfig[] = [
  { name: 'deep-space', type: 'gradient-mesh', params: { colors: ['#0F0F1A', '#1A1A2E', '#16213E'], divisions: 8 } },
  { name: 'sunset', type: 'gradient-linear', params: { angle: 180, colors: ['#FF6B6B', '#FFA07A', '#FFD93D'] } },
  { name: 'ocean', type: 'gradient-linear', params: { angle: 180, colors: ['#0077B6', '#00B4D8', '#90E0EF'] } },
  { name: 'forest', type: 'gradient-linear', params: { angle: 135, colors: ['#1B4332', '#2D6A4F', '#40916C'] } },
  { name: 'neon-city', type: 'gradient-radial', params: { colors: ['#FF006E', '#8338EC', '#3A86FF'], position: 'center' } },
  { name: 'warm-glow', type: 'lights', params: { colors: ['#FFD700', '#FF8C00', '#FF6347'], count: 12, blur: 60 } },
  { name: 'cool-mist', type: 'lights', params: { colors: ['#E0F7FA', '#B2EBF2', '#80DEEA'], count: 8, blur: 80 } },
  { name: 'film-grain', type: 'noise', params: { opacity: 0.05, scale: 1.5 } },
  { name: 'paper-texture', type: 'noise', params: { opacity: 0.03, scale: 2 } },
  { name: 'midnight', type: 'solid', params: { color: '#0A0A0A' } },
  { name: 'pure-white', type: 'solid', params: { color: '#FFFFFF' } },
  { name: 'charcoal', type: 'solid', params: { color: '#1A1A1A' } },
  { name: 'circuit-board', type: 'pattern', params: { pattern: 'dots', color: '#333333', size: 20, opacity: 0.1 } },
  { name: 'carbon-fiber', type: 'pattern', params: { pattern: 'lines', color: '#444444', size: 4, opacity: 0.15 } },
]

export function getBackground(name: string): BackgroundConfig | undefined {
  return backgrounds.find(b => b.name === name)
}

export function getBackgroundNames(): string[] {
  return backgrounds.map(b => b.name)
}
