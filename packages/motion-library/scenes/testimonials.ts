import { ScenePreset } from './index'

export const testimonialPresets: ScenePreset[] = [
  {
    name: 'testimonial-card',
    category: 'testimonial',
    description: 'Testimonial with quote and avatar',
    create: (params) => ({
      nodes: [
        { id: 't-bg', type: 'rect', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 0, transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', maxWidth: '100%', maxHeight: '100%' }, animations: [], effects: [], metadata: { color: params.bgColor || '#1A1A2E' } },
        { id: 't-quote', type: 'text', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: 0, y: -40 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', alignment: 'center', maxWidth: '70%' }, animations: [{ property: 'opacity', keyframes: [{ frame: 0, value: 0 }, { frame: 30, value: 1 }] }], effects: [], metadata: { content: `"${params.quote || 'Amazing product!'}"`, fontSize: 32, fontWeight: 500, color: '#FFFFFF', fontStyle: 'italic' } },
        { id: 't-author', type: 'text', children: [], parent: 't-quote', visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: 0, y: 80 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'top-center', alignment: 'center' }, animations: [{ property: 'opacity', keyframes: [{ frame: 20, value: 0 }, { frame: 45, value: 1 }] }], effects: [], metadata: { content: `— ${params.author || 'Customer Name'}`, fontSize: 18, fontWeight: 400, color: 'rgba(255,255,255,0.6)' } },
        { id: 't-role', type: 'text', children: [], parent: 't-author', visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: 0, y: 28 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'top-center', alignment: 'center' }, animations: [{ property: 'opacity', keyframes: [{ frame: 30, value: 0 }, { frame: 55, value: 1 }] }], effects: [], metadata: { content: params.role || 'Title', fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,0.4)' } },
      ],
    }),
  },
]
