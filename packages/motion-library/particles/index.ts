export interface ParticlePreset {
  name: string
  type: 'sparkle' | 'confetti' | 'snow' | 'fire' | 'smoke' | 'bubbles' | 'stars' | 'raindrops' | 'magic-dust' | 'embers'
  count: number
  params: Record<string, unknown>
}

export const particlePresets: ParticlePreset[] = [
  { name: 'gentle-sparkle', type: 'sparkle', count: 30, params: { size: [2, 6], speed: [0.5, 1.5], colors: ['#FFD700', '#FFA500', '#FFFFFF'], lifetime: [60, 120] } },
  { name: 'heavy-sparkle', type: 'sparkle', count: 100, params: { size: [1, 4], speed: [1, 3], colors: ['#FFD700', '#FFFFFF'], lifetime: [30, 90] } },
  { name: 'birthday-confetti', type: 'confetti', count: 150, params: { colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'], gravity: 0.3, rotation: true } },
  { name: 'gentle-snow', type: 'snow', count: 80, params: { size: [2, 8], speed: [0.5, 2], wind: 0.5, opacity: [0.3, 0.8] } },
  { name: 'blizzard', type: 'snow', count: 300, params: { size: [1, 5], speed: [2, 5], wind: 2, opacity: [0.5, 1] } },
  { name: 'campfire', type: 'fire', count: 50, params: { size: [4, 12], speed: [1, 3], colors: ['#FF4500', '#FF6347', '#FFD700'], lifetime: [20, 60] } },
  { name: 'smoke-whisp', type: 'smoke', count: 20, params: { size: [10, 30], speed: [0.3, 1], opacity: [0.1, 0.4], lifetime: [60, 120] } },
  { name: 'champagne-bubbles', type: 'bubbles', count: 40, params: { size: [3, 10], speed: [1, 3], opacity: [0.2, 0.6], popThreshold: 0.8 } },
  { name: 'night-sky', type: 'stars', count: 200, params: { size: [1, 3], twinkle: true, twinkleSpeed: [0.5, 2], opacity: [0.3, 1] } },
  { name: 'light-rain', type: 'raindrops', count: 100, params: { length: [10, 30], speed: [5, 10], angle: 10, opacity: [0.2, 0.5] } },
  { name: 'magic-sparkle', type: 'magic-dust', count: 60, params: { size: [2, 8], speed: [0.5, 2], colors: ['#FF69B4', '#87CEEB', '#DDA0DD', '#98FB98'], trail: true } },
  { name: 'floating-embers', type: 'embers', count: 30, params: { size: [2, 6], speed: [0.3, 1.5], colors: ['#FF6347', '#FF8C00', '#FFD700'], lifetime: [40, 100] } },
]

export function getParticlePreset(name: string): ParticlePreset | undefined {
  return particlePresets.find(p => p.name === name)
}
