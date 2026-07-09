import { ScenePreset } from './index'

export const announcementPresets: ScenePreset[] = [
  {
    name: 'launch-announcement',
    category: 'announcement',
    description: 'Product launch or feature announcement',
    create: (params) => ({
      nodes: [
        { id: 'la-bg', type: 'gradient', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 0, transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', maxWidth: '100%', maxHeight: '100%' }, animations: [], effects: [{ type: 'bloom', params: { intensity: 0.2 }, order: 0 }], metadata: { colors: ['#667eea', '#764ba2'], angle: 135 } },
        { id: 'la-badge', type: 'text', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: 0, y: -200 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'top-center', alignment: 'center' }, animations: [{ property: 'opacity', keyframes: [{ frame: 0, value: 0 }, { frame: 20, value: 1 }] }], effects: [], metadata: { content: params.badge || 'ANNOUNCING', fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: 6 } },
        { id: 'la-title', type: 'text', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', alignment: 'center', maxWidth: '80%' }, animations: [{ property: 'opacity', keyframes: [{ frame: 10, value: 0 }, { frame: 30, value: 1 }] }, { property: 'scale', keyframes: [{ frame: 10, value: [1.2, 1.2] }, { frame: 30, value: [1, 1] }] }], effects: [], metadata: { content: params.title || 'Big News', fontSize: 72, fontWeight: 800, color: '#FFFFFF', letterSpacing: -2 } },
        { id: 'la-date', type: 'text', children: [], parent: 'la-title', visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: 0, y: 90 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'top-center', alignment: 'center' }, animations: [{ property: 'opacity', keyframes: [{ frame: 25, value: 0 }, { frame: 50, value: 1 }] }], effects: [], metadata: { content: params.date || 'Coming Q3 2026', fontSize: 22, fontWeight: 400, color: 'rgba(255,255,255,0.7)' } },
      ],
    }),
  },
]
