import { BrandTheme } from './index'

export const vercel: BrandTheme = {
  name: 'vercel',
  colorPalette: {
    primary: '#000000',
    secondary: '#888888',
    accent: '#FFFFFF',
    background: '#000000',
    text: '#FFFFFF',
    gradients: [
      { angle: 0, stops: [{ color: '#000000', position: 0 }, { color: '#111111', position: 1 }] },
    ],
  },
  typography: {
    fonts: { heading: 'Inter', body: 'Inter', mono: 'JetBrains Mono' },
    weights: { heading: 700, body: 400 },
    sizes: { h1: 96, h2: 56, body: 24, caption: 16 },
    tracking: -1,
    lineHeight: 1.1,
  },
  animationPhilosophy: {
    defaultEasing: 'ease-out',
    defaultDuration: 0.8,
    staggerDelay: 0.1,
    springTension: 200,
    springFriction: 20,
  },
  cameraStyle: {
    defaultPreset: 'push-zoom',
    movement: 'minimal',
    depth: true,
  },
  pacing: {
    sceneLength: 5,
    beatInterval: 2.5,
    hookDuration: 3.5,
  },
}
