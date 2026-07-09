import { BrandTheme } from './index'

export const framer: BrandTheme = {
  name: 'framer',
  colorPalette: {
    primary: '#333333',
    secondary: '#666666',
    accent: '#0055FF',
    background: '#FFFFFF',
    text: '#111111',
    gradients: [
      { angle: 0, stops: [{ color: '#F5F5F5', position: 0 }, { color: '#EEEEEE', position: 1 }] },
    ],
  },
  typography: {
    fonts: { heading: 'Inter', body: 'Inter', mono: 'Source Code Pro' },
    weights: { heading: 600, body: 400 },
    sizes: { h1: 64, h2: 40, body: 22, caption: 14 },
    tracking: -0.5,
    lineHeight: 1.2,
  },
  animationPhilosophy: {
    defaultEasing: 'spring',
    defaultDuration: 0.6,
    staggerDelay: 0.05,
    springTension: 250,
    springFriction: 18,
  },
  cameraStyle: {
    defaultPreset: 'orbit-pan',
    movement: 'dynamic',
    depth: true,
  },
  pacing: {
    sceneLength: 4,
    beatInterval: 2,
    hookDuration: 3,
  },
}
