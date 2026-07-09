import { ScenePreset } from './index'

export const heroSectionPresets: ScenePreset[] = [
  {
    name: 'hero-split',
    category: 'hero-section',
    description: 'Split screen hero with text and visual',
    create: (params) => ({
      nodes: [
        { id: 'hs-bg-left', type: 'rect', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 0, transform: { position: { x: -480, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', alignment: 'center', maxWidth: '50%', maxHeight: '100%' }, animations: [], effects: [], metadata: { color: params.leftColor || '#000000' } },
        { id: 'hs-bg-right', type: 'rect', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 0, transform: { position: { x: 480, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', alignment: 'center', maxWidth: '50%', maxHeight: '100%' }, animations: [], effects: [], metadata: { color: params.rightColor || '#007AFF' } },
        { id: 'hs-headline', type: 'text', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: -480, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', alignment: 'start', maxWidth: '40%' }, animations: [{ property: 'opacity', keyframes: [{ frame: 0, value: 0 }, { frame: 30, value: 1 }] }], effects: [], metadata: { content: params.headline || 'Headline', fontSize: 56, fontWeight: 700, color: params.leftTextColor || '#FFFFFF' } },
        { id: 'hs-visual', type: 'image', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: 480, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', alignment: 'center', maxWidth: '40%' }, animations: [{ property: 'opacity', keyframes: [{ frame: 10, value: 0 }, { frame: 40, value: 1 }] }], effects: [], metadata: { src: params.imageSrc || '', objectFit: 'cover' } },
      ],
    }),
  },
  {
    name: 'hero-centered-bold',
    category: 'hero-section',
    description: 'Centered bold text with gradient background',
    create: (params) => ({
      nodes: [
        { id: 'hcb-bg', type: 'gradient', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 0, transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', maxWidth: '100%', maxHeight: '100%' }, animations: [], effects: [], metadata: { colors: [params.bgColor1 || '#667eea', params.bgColor2 || '#764ba2'], angle: 135 } },
        { id: 'hcb-title', type: 'text', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', alignment: 'center', maxWidth: '80%' }, animations: [{ property: 'opacity', keyframes: [{ frame: 0, value: 0 }, { frame: 30, value: 1 }] }, { property: 'scale', keyframes: [{ frame: 0, value: [1.1, 1.1] }, { frame: 30, value: [1, 1] }] }], effects: [], metadata: { content: params.title || 'Bold Statement', fontSize: 80, fontWeight: 800, color: '#FFFFFF', letterSpacing: -2 } },
        { id: 'hcb-sub', type: 'text', children: [], parent: 'hcb-title', visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: 0, y: 100 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'top-center', alignment: 'center', maxWidth: '60%' }, animations: [{ property: 'opacity', keyframes: [{ frame: 20, value: 0 }, { frame: 45, value: 1 }] }], effects: [], metadata: { content: params.subtitle || 'Supporting text', fontSize: 24, fontWeight: 400, color: 'rgba(255,255,255,0.8)' } },
      ],
    }),
  },
]
