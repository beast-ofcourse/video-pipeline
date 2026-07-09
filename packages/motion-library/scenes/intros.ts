import { ScenePreset } from './index'

export const introPresets: ScenePreset[] = [
  {
    name: 'logo-intro',
    category: 'intro',
    description: 'Logo reveal with fade-in',
    create: (params) => ({
      nodes: [
        { id: 'in-bg', type: 'rect', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 0, transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', maxWidth: '100%', maxHeight: '100%' }, animations: [{ property: 'opacity', keyframes: [{ frame: 0, value: 1 }, { frame: 60, value: 0 }] }], effects: [], metadata: { color: params.bgColor || '#000000' } },
        { id: 'in-logo', type: 'text', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', alignment: 'center' }, animations: [{ property: 'opacity', keyframes: [{ frame: 0, value: 0 }, { frame: 20, value: 1 }, { frame: 50, value: 1 }, { frame: 60, value: 0 }] }, { property: 'scale', keyframes: [{ frame: 0, value: [0.8, 0.8] }, { frame: 20, value: [1, 1] }] }], effects: [], metadata: { content: params.logoText || 'LOGO', fontSize: 72, fontWeight: 800, color: '#FFFFFF', letterSpacing: 8 } },
      ],
    }),
  },
]
