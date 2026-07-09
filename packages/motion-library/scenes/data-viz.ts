import { ScenePreset } from './index'

export const dataVisPresets: ScenePreset[] = [
  {
    name: 'stats-showcase',
    category: 'data-viz',
    description: 'Showcase key statistics with animated counters',
    create: (params) => ({
      nodes: [
        { id: 'dv-bg', type: 'gradient', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 0, transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', maxWidth: '100%', maxHeight: '100%' }, animations: [], effects: [], metadata: { colors: ['#0F0F1A', '#1A1A2E'], angle: 180 } },
        { id: 'dv-stat1-val', type: 'text', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: -300, y: -50 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', alignment: 'center' }, animations: [{ property: 'opacity', keyframes: [{ frame: 0, value: 0 }, { frame: 30, value: 1 }] }, { property: 'counter', keyframes: [{ frame: 0, value: 0 }, { frame: 45, value: params.stat1 || 100 }] }], effects: [], metadata: { content: params.stat1Label || '100+', fontSize: 56, fontWeight: 800, color: '#007AFF' } },
        { id: 'dv-stat1-label', type: 'text', children: [], parent: 'dv-stat1-val', visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: 0, y: 60 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'top-center', alignment: 'center' }, animations: [{ property: 'opacity', keyframes: [{ frame: 20, value: 0 }, { frame: 50, value: 1 }] }], effects: [], metadata: { content: params.stat1Name || 'Users', fontSize: 18, fontWeight: 500, color: 'rgba(255,255,255,0.6)' } },
        { id: 'dv-stat2-val', type: 'text', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: 0, y: -50 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', alignment: 'center' }, animations: [{ property: 'opacity', keyframes: [{ frame: 10, value: 0 }, { frame: 40, value: 1 }] }, { property: 'counter', keyframes: [{ frame: 10, value: 0 }, { frame: 55, value: params.stat2 || 50 }] }], effects: [], metadata: { content: params.stat2Label || '50+', fontSize: 56, fontWeight: 800, color: '#34C759' } },
        { id: 'dv-stat2-label', type: 'text', children: [], parent: 'dv-stat2-val', visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: 0, y: 60 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'top-center', alignment: 'center' }, animations: [{ property: 'opacity', keyframes: [{ frame: 30, value: 0 }, { frame: 60, value: 1 }] }], effects: [], metadata: { content: params.stat2Name || 'Countries', fontSize: 18, fontWeight: 500, color: 'rgba(255,255,255,0.6)' } },
        { id: 'dv-stat3-val', type: 'text', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: 300, y: -50 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', alignment: 'center' }, animations: [{ property: 'opacity', keyframes: [{ frame: 20, value: 0 }, { frame: 50, value: 1 }] }, { property: 'counter', keyframes: [{ frame: 20, value: 0 }, { frame: 65, value: params.stat3 || 99 }] }], effects: [], metadata: { content: params.stat3Label || '99%', fontSize: 56, fontWeight: 800, color: '#FF9500' } },
        { id: 'dv-stat3-label', type: 'text', children: [], parent: 'dv-stat3-val', visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: 0, y: 60 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'top-center', alignment: 'center' }, animations: [{ property: 'opacity', keyframes: [{ frame: 40, value: 0 }, { frame: 70, value: 1 }] }], effects: [], metadata: { content: params.stat3Name || 'Uptime', fontSize: 18, fontWeight: 500, color: 'rgba(255,255,255,0.6)' } },
      ],
    }),
  },
]
