import { ScenePreset } from './index'

export const tutorialPresets: ScenePreset[] = [
  {
    name: 'step-instruction',
    category: 'tutorial',
    description: 'Step-by-step instruction with code or text',
    create: (params) => ({
      nodes: [
        { id: 'tu-bg', type: 'rect', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 0, transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', maxWidth: '100%', maxHeight: '100%' }, animations: [], effects: [], metadata: { color: params.bgColor || '#1E1E2E' } },
        { id: 'tu-step', type: 'text', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: -400, y: -200 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'top-left', alignment: 'start' }, animations: [{ property: 'opacity', keyframes: [{ frame: 0, value: 0 }, { frame: 20, value: 1 }] }], effects: [], metadata: { content: `Step ${params.stepNumber || '1'}`, fontSize: 16, fontWeight: 700, color: '#007AFF', letterSpacing: 2 } },
        { id: 'tu-title', type: 'text', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: -400, y: -150 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'top-left', alignment: 'start', maxWidth: '80%' }, animations: [{ property: 'opacity', keyframes: [{ frame: 10, value: 0 }, { frame: 35, value: 1 }] }], effects: [], metadata: { content: params.title || 'Step Title', fontSize: 40, fontWeight: 600, color: '#FFFFFF' } },
        { id: 'tu-code', type: 'text', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: -400, y: 50 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'top-left', alignment: 'start', maxWidth: '80%' }, animations: [{ property: 'opacity', keyframes: [{ frame: 20, value: 0 }, { frame: 45, value: 1 }] }], effects: [], metadata: { content: params.code || 'npm install @opencode/video-pipeline', fontSize: 18, fontWeight: 400, color: '#34C759', fontFamily: 'JetBrains Mono, monospace' } },
      ],
    }),
  },
]
