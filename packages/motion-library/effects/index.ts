export interface EffectConfig {
  name: string
  type: string
  defaults: Record<string, unknown>
  description: string
}

export const effectConfigs: EffectConfig[] = [
  { name: 'soft-bloom', type: 'bloom', defaults: { intensity: 0.3 }, description: 'Soft screen bloom' },
  { name: 'strong-bloom', type: 'bloom', defaults: { intensity: 0.8 }, description: 'Strong screen bloom' },
  { name: 'subtle-blur', type: 'blur', defaults: { amount: 3 }, description: 'Subtle gaussian blur' },
  { name: 'heavy-blur', type: 'blur', defaults: { amount: 15 }, description: 'Heavy gaussian blur' },
  { name: 'cyan-glow', type: 'glow', defaults: { color: '#00ffff', radius: 15 }, description: 'Cyan glow effect' },
  { name: 'warm-glow', type: 'glow', defaults: { color: '#ffaa00', radius: 20 }, description: 'Warm orange glow' },
  { name: 'light-grain', type: 'grain', defaults: {}, description: 'Light film grain' },
  { name: 'heavy-grain', type: 'grain', defaults: {}, description: 'Heavy film grain' },
  { name: 'rgb-shift', type: 'chromatic-aberration', defaults: { shift: 2 }, description: 'Subtle RGB channel shift' },
  { name: 'glitch-shift', type: 'chromatic-aberration', defaults: { shift: 6 }, description: 'Heavy glitch RGB shift' },
  { name: 'soft-shadow', type: 'drop-shadow', defaults: { offsetX: 2, offsetY: 2, blur: 4, color: 'rgba(0,0,0,0.3)' }, description: 'Soft drop shadow' },
  { name: 'heavy-shadow', type: 'drop-shadow', defaults: { offsetX: 8, offsetY: 8, blur: 16, color: 'rgba(0,0,0,0.6)' }, description: 'Heavy drop shadow' },
  { name: 'vibrant', type: 'color-grade', defaults: { brightness: 0.05, contrast: 1.2, saturation: 1.3 }, description: 'Vibrant color grade' },
  { name: 'muted', type: 'color-grade', defaults: { brightness: 0, contrast: 0.9, saturation: 0.6 }, description: 'Muted/desaturated color grade' },
  { name: 'dramatic', type: 'color-grade', defaults: { brightness: -0.1, contrast: 1.4, saturation: 1.1 }, description: 'Dramatic high-contrast grade' },
]

export function getEffectConfig(name: string): EffectConfig | undefined {
  return effectConfigs.find(e => e.name === name)
}

export function getEffectConfigNames(): string[] {
  return effectConfigs.map(e => e.name)
}
