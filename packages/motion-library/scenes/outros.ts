import { ScenePreset } from './index'

export const outroPresets: ScenePreset[] = [
  {
    name: 'cta-outro',
    category: 'outro',
    description: 'Call-to-action end screen',
    create: (params) => ({
      nodes: [
        { id: 'ou-bg', type: 'gradient', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 0, transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', maxWidth: '100%', maxHeight: '100%' }, animations: [], effects: [], metadata: { colors: ['#0A0A0A', '#1A1A2E'], angle: 180 } },
        { id: 'ou-cta', type: 'text', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: 0, y: -60 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', alignment: 'center', maxWidth: '80%' }, animations: [{ property: 'opacity', keyframes: [{ frame: 0, value: 0 }, { frame: 20, value: 1 }] }, { property: 'scale', keyframes: [{ frame: 0, value: [0.9, 0.9] }, { frame: 20, value: [1, 1] }] }], effects: [], metadata: { content: params.cta || 'Get Started Today', fontSize: 56, fontWeight: 700, color: '#FFFFFF' } },
        { id: 'ou-link', type: 'text', children: [], parent: 'ou-cta', visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: 0, y: 80 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'top-center', alignment: 'center' }, animations: [{ property: 'opacity', keyframes: [{ frame: 15, value: 0 }, { frame: 35, value: 1 }] }], effects: [], metadata: { content: params.url || 'yourwebsite.com', fontSize: 20, fontWeight: 400, color: '#007AFF' } },
        { id: 'ou-brand', type: 'text', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: 0, y: 200 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'bottom-center', alignment: 'center' }, animations: [{ property: 'opacity', keyframes: [{ frame: 25, value: 0 }, { frame: 45, value: 1 }] }], effects: [], metadata: { content: params.brandName || 'Brand', fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.4)' } },
      ],
    }),
  },
]
