export interface BrandTheme {
  name: string
  colorPalette: {
    primary: string; secondary: string; accent: string
    background: string; text: string
    gradients: Array<{ angle: number; stops: Array<{ color: string; position: number }> }>
  }
  typography: {
    fonts: { heading: string; body: string; mono: string }
    weights: { heading: number; body: number }
    sizes: { h1: number; h2: number; body: number; caption: number }
    tracking: number; lineHeight: number
  }
  animationPhilosophy: {
    defaultEasing: string; defaultDuration: number
    staggerDelay: number; springTension: number; springFriction: number
  }
  cameraStyle: {
    defaultPreset: string
    movement: 'minimal' | 'dynamic' | 'cinematic'
    depth: boolean
  }
  pacing: {
    sceneLength: number; beatInterval: number; hookDuration: number
  }
}

import { apple } from './apple'
import { stripe } from './stripe'
import { linear } from './linear'
import { raycast } from './raycast'
import { framer } from './framer'
import { vercel } from './vercel'
import { notion } from './notion'
import { openai } from './openai'
import { custom } from './custom'

export const THEMES: Record<string, BrandTheme> = {
  apple, stripe, linear, raycast, framer, vercel, notion, openai, custom,
}

export function getTheme(name: string): BrandTheme | undefined {
  return THEMES[name]
}

export function getThemeNames(): string[] {
  return Object.keys(THEMES)
}
