import { BrandTheme } from './index'

export const raycast: BrandTheme = {
  name: 'raycast',
  colorPalette: {
    primary: '#FF6363',
    secondary: '#A8A8A8',
    accent: '#FF6363',
    background: '#1A1A1A',
    text: '#FFFFFF',
    gradients: [
      { angle: 180, stops: [{ color: '#2D2D2D', position: 0 }, { color: '#1A1A1A', position: 1 }] },
    ],
  },
  typography: {
    fonts: { heading: 'Inter', body: 'Inter', mono: 'SF Mono' },
    weights: { heading: 700, body: 500 },
    sizes: { h1: 48, h2: 32, body: 18, caption: 13 },
    tracking: -0.3,
    lineHeight: 1.3,
  },
  animationPhilosophy: {
    defaultEasing: 'spring',
    defaultDuration: 0.4,
    staggerDelay: 0.04,
    springTension: 200,
    springFriction: 15,
  },
  cameraStyle: {
    defaultPreset: 'shake',
    movement: 'dynamic',
    depth: false,
  },
  pacing: {
    sceneLength: 2.5,
    beatInterval: 1.5,
    hookDuration: 2,
  },
}
