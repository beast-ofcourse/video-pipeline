import { ALL_PRESETS } from './presets'

const manifest = {
  presets: Object.entries(ALL_PRESETS).flatMap(([category, presets]) =>
    presets.map(p => ({ category, name: p.name }))
  ),
  themes: ['apple', 'stripe', 'linear', 'raycast', 'framer', 'vercel', 'notion', 'openai'],
  transitions: ['mask-reveal', 'morph', 'cross-zoom', 'directional-blur', 'light-sweep',
    'slide', 'scale', 'whip-pan', 'shape-morph', 'svg-reveal', 'liquid-wipe',
    'circular-reveal', 'grid-reveal'],
}

import fs from 'fs'
fs.writeFileSync('packages/motion-library/manifest.json', JSON.stringify(manifest, null, 2))