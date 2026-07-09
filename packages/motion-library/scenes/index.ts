export interface ScenePreset {
  name: string
  category: 'product-showcase' | 'storytelling' | 'hero-section' | 'testimonial' | 'data-viz' | 'tutorial' | 'announcement' | 'social-clip' | 'intro' | 'outro'
  description: string
  create: (params: Record<string, unknown>) => {
    nodes: Array<{
      id: string
      type: string
      children: string[]
      parent: string | null
      visible: boolean
      blendMode: string
      opacity: number
      zIndex: number
      transform: { position: { x: number; y: number }; rotation: number; scale: { x: number; y: number } }
      constraints: Record<string, unknown>
      animations: Array<{ property: string; keyframes: Array<{ frame: number; value: number | number[] }> }>
      effects: Array<{ type: string; params: Record<string, unknown>; order: number }>
      metadata: Record<string, unknown>
    }>
  }
}

import { productShowcasePresets } from './product-showcase'
import { storytellingPresets } from './storytelling'
import { heroSectionPresets } from './hero-sections'
import { testimonialPresets } from './testimonials'
import { dataVisPresets } from './data-viz'
import { tutorialPresets } from './tutorials'
import { announcementPresets } from './announcements'
import { socialClipPresets } from './social-clips'
import { introPresets } from './intros'
import { outroPresets } from './outros'

export const scenePresets: Record<string, ScenePreset[]> = {
  'product-showcase': productShowcasePresets,
  'storytelling': storytellingPresets,
  'hero-section': heroSectionPresets,
  'testimonial': testimonialPresets,
  'data-viz': dataVisPresets,
  'tutorial': tutorialPresets,
  'announcement': announcementPresets,
  'social-clip': socialClipPresets,
  'intro': introPresets,
  'outro': outroPresets,
}

export function getScenePreset(category: string, name: string): ScenePreset | undefined {
  return scenePresets[category]?.find(s => s.name === name)
}

export function getScenePresetsByCategory(): Record<string, ScenePreset[]> {
  return scenePresets
}
