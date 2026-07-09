import { BrandTheme } from './index'

export const custom: BrandTheme = {
  name: 'custom',
  colorPalette: {
    primary: '#333333',
    secondary: '#666666',
    accent: '#0066FF',
    background: '#FFFFFF',
    text: '#111111',
    gradients: [
      { angle: 180, stops: [{ color: '#F5F5F5', position: 0 }, { color: '#FFFFFF', position: 1 }] },
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
    defaultDuration: 0.6,
    staggerDelay: 0.06,
    springTension: 200,
    springFriction: 20,
  },
  cameraStyle: {
    defaultPreset: 'push-zoom',
    movement: 'minimal',
    depth: true,
  },
  pacing: {
    sceneLength: 4,
    beatInterval: 2,
    hookDuration: 3,
  },
}
