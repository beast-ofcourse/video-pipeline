import { BrandTheme } from './index'

export const linear: BrandTheme = {
  name: 'linear',
  colorPalette: {
    primary: '#5E6AD2',
    secondary: '#8B5CF6',
    accent: '#22D3EE',
    background: '#0F0F1A',
    text: '#E2E8F0',
    gradients: [
      { angle: 90, stops: [{ color: '#5E6AD2', position: 0 }, { color: '#8B5CF6', position: 1 }] },
    ],
  },
  typography: {
    fonts: { heading: 'Inter', body: 'Inter', mono: 'JetBrains Mono' },
    weights: { heading: 700, body: 400 },
    sizes: { h1: 56, h2: 36, body: 18, caption: 14 },
    tracking: -0.5,
    lineHeight: 1.3,
  },
  animationPhilosophy: {
    defaultEasing: 'ease-out',
    defaultDuration: 0.6,
    staggerDelay: 0.06,
    springTension: 300,
    springFriction: 25,
  },
  cameraStyle: {
    defaultPreset: 'push-zoom',
    movement: 'minimal',
    depth: false,
  },
  pacing: {
    sceneLength: 3.5,
    beatInterval: 2,
    hookDuration: 2,
  },
}
