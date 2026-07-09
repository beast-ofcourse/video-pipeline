import { ScenePreset } from './index'

export const socialClipPresets: ScenePreset[] = [
  {
    name: 'quote-card',
    category: 'social-clip',
    description: 'Square social media quote card',
    create: (params) => ({
      nodes: [
        { id: 'sc-bg', type: 'gradient', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 0, transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', maxWidth: '100%', maxHeight: '100%' }, animations: [], effects: [], metadata: { colors: [params.bgColor1 || '#1A1A2E', params.bgColor2 || '#16213E'], angle: 180 } },
        { id: 'sc-text', type: 'text', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: 0, y: -30 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', alignment: 'center', maxWidth: '85%' }, animations: [{ property: 'opacity', keyframes: [{ frame: 0, value: 0 }, { frame: 20, value: 1 }] }], effects: [], metadata: { content: params.text || 'Your message here', fontSize: 36, fontWeight: 700, color: '#FFFFFF', textAlign: 'center' } },
        { id: 'sc-brand', type: 'text', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: 0, y: 200 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'bottom-center', alignment: 'center' }, animations: [{ property: 'opacity', keyframes: [{ frame: 15, value: 0 }, { frame: 35, value: 1 }] }], effects: [], metadata: { content: params.brand || '@brand', fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.4)' } },
      ],
    }),
  },
]
