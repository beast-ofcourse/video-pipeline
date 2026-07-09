import { BrandTheme } from './index'

export const openai: BrandTheme = {
  name: 'openai',
  colorPalette: {
    primary: '#10A37F',
    secondary: '#1A7F64',
    accent: '#8E8EA0',
    background: '#0A0A0A',
    text: '#ECECF1',
    gradients: [
      { angle: 180, stops: [{ color: '#0A0A0A', position: 0 }, { color: '#1A1A2E', position: 1 }] },
    ],
  },
  typography: {
    fonts: { heading: 'Inter', body: 'Inter', mono: 'JetBrains Mono' },
    weights: { heading: 700, body: 400 },
    sizes: { h1: 64, h2: 40, body: 20, caption: 14 },
    tracking: 0,
    lineHeight: 1.4,
  },
  animationPhilosophy: {
    defaultEasing: 'ease-out',
    defaultDuration: 0.7,
    staggerDelay: 0.08,
    springTension: 180,
    springFriction: 18,
  },
  cameraStyle: {
    defaultPreset: 'focus-pull',
    movement: 'cinematic',
    depth: true,
  },
  pacing: {
    sceneLength: 4.5,
    beatInterval: 2,
    hookDuration: 3,
  },
}
