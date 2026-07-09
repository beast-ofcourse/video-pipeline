import { BrandTheme } from './index'

export const stripe: BrandTheme = {
  name: 'stripe',
  colorPalette: {
    primary: '#635BFF',
    secondary: '#00D4AA',
    accent: '#32325D',
    background: '#F6F9FC',
    text: '#1A1F36',
    gradients: [
      { angle: 135, stops: [{ color: '#635BFF', position: 0 }, { color: '#00D4AA', position: 1 }] },
    ],
  },
  typography: {
    fonts: { heading: 'Inter', body: 'Inter', mono: 'SF Mono' },
    weights: { heading: 600, body: 400 },
    sizes: { h1: 64, h2: 40, body: 20, caption: 14 },
    tracking: 0,
    lineHeight: 1.4,
  },
  animationPhilosophy: {
    defaultEasing: 'spring',
    defaultDuration: 0.5,
    staggerDelay: 0.06,
    springTension: 180,
    springFriction: 12,
  },
  cameraStyle: {
    defaultPreset: 'parallax',
    movement: 'dynamic',
    depth: true,
  },
  pacing: {
    sceneLength: 3,
    beatInterval: 1.5,
    hookDuration: 2.5,
  },
}
