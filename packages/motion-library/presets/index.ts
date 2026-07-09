export interface AnimationPreset {
  name: string
  type: 'fade' | 'slide' | 'pop' | 'bounce' | 'elastic' | 'blur' |
        'counter' | 'typing' | 'wave' | 'stagger' | 'parallax' |
        'float' | 'shake' | 'pulse' | 'light-sweep'
  keyframes: Array<{ property: string; frames: Array<{ at: number; value: number | number[]; easing?: string }> }>
  defaultDuration?: number
}

import { fadePresets } from './fade'
import { slidePresets } from './slide'
import { popPresets } from './pop'
import { bouncePresets } from './bounce'
import { elasticPresets } from './elastic'
import { blurPresets } from './blur'
import { counterPresets } from './counter'
import { typingPresets } from './typing'
import { wavePresets } from './wave'
import { staggerPresets } from './stagger'
import { parallaxPresets } from './parallax'
import { floatPresets } from './float'
import { shakePresets } from './shake'
import { pulsePresets } from './pulse'
import { lightSweepPresets } from './light-sweep'

export const ALL_PRESETS: Record<string, AnimationPreset[]> = {
  fade: fadePresets,
  slide: slidePresets,
  pop: popPresets,
  bounce: bouncePresets,
  elastic: elasticPresets,
  blur: blurPresets,
  counter: counterPresets,
  typing: typingPresets,
  wave: wavePresets,
  stagger: staggerPresets,
  parallax: parallaxPresets,
  float: floatPresets,
  shake: shakePresets,
  pulse: pulsePresets,
  'light-sweep': lightSweepPresets,
}

export function getPreset(category: string, name: string): AnimationPreset | undefined {
  return ALL_PRESETS[category]?.find(p => p.name === name)
}

export function getPresetsByCategory(): Record<string, AnimationPreset[]> {
  return ALL_PRESETS
}