import { ScenePreset } from './index'

export const storytellingPresets: ScenePreset[] = [
  {
    name: 'hero-journey',
    category: 'storytelling',
    description: 'Character journey with parallax background',
    create: (params) => ({
      nodes: [
        { id: 'st-bg', type: 'gradient', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 0, transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', maxWidth: '100%', maxHeight: '100%' }, animations: [], effects: [], metadata: { colors: ['#0F2027', '#203A43', '#2C5364'], angle: 135 } },
        { id: 'st-title', type: 'text', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 3, transform: { position: { x: 0, y: -100 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', alignment: 'center', maxWidth: '70%' }, animations: [{ property: 'opacity', keyframes: [{ frame: 0, value: 0 }, { frame: 30, value: 1 }] }], effects: [], metadata: { content: params.title || 'The Journey', fontSize: 64, fontWeight: 700, color: '#FFFFFF' } },
        { id: 'st-subtitle', type: 'text', children: [], parent: 'st-title', visible: true, blendMode: 'normal', opacity: 1, zIndex: 2, transform: { position: { x: 0, y: 90 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'top-center', alignment: 'center', maxWidth: '60%' }, animations: [{ property: 'opacity', keyframes: [{ frame: 15, value: 0 }, { frame: 40, value: 1 }] }], effects: [], metadata: { content: params.subtitle || 'A story of transformation', fontSize: 24, fontWeight: 400, color: 'rgba(255,255,255,0.7)' } },
      ],
    }),
  },
]
