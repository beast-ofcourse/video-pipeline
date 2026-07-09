import { BrandTheme } from './index'

export const notion: BrandTheme = {
  name: 'notion',
  colorPalette: {
    primary: '#37352F',
    secondary: '#9B9A97',
    accent: '#2383E2',
    background: '#FFFFFF',
    text: '#37352F',
    gradients: [
      { angle: 0, stops: [{ color: '#FFFFFF', position: 0 }, { color: '#F7F6F3', position: 1 }] },
    ],
  },
  typography: {
    fonts: { heading: 'Inter', body: 'Inter', mono: 'SF Mono' },
    weights: { heading: 700, body: 400 },
    sizes: { h1: 48, h2: 36, body: 20, caption: 14 },
    tracking: 0,
    lineHeight: 1.5,
  },
  animationPhilosophy: {
    defaultEasing: 'ease-in-out',
    defaultDuration: 0.5,
    staggerDelay: 0.05,
    springTension: 150,
    springFriction: 15,
  },
  cameraStyle: {
    defaultPreset: 'dolly',
    movement: 'minimal',
    depth: false,
  },
  pacing: {
    sceneLength: 4,
    beatInterval: 2,
    hookDuration: 3,
  },
}
