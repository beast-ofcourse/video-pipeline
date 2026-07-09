import { BrandTheme } from './index'

export const apple: BrandTheme = {
  name: 'apple',
  colorPalette: {
    primary: '#000000',
    secondary: '#555555',
    accent: '#007AFF',
    background: '#FFFFFF',
    text: '#1D1D1F',
    gradients: [
      { angle: 180, stops: [{ color: '#F5F5F7', position: 0 }, { color: '#FFFFFF', position: 1 }] },
    ],
  },
  typography: {
    fonts: { heading: 'SF Pro Display', body: 'SF Pro Text', mono: 'SF Mono' },
    weights: { heading: 700, body: 400 },
    sizes: { h1: 72, h2: 48, body: 24, caption: 16 },
    tracking: 2,
    lineHeight: 1.2,
  },
  animationPhilosophy: {
    defaultEasing: 'ease-out',
    defaultDuration: 0.8,
    staggerDelay: 0.08,
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
