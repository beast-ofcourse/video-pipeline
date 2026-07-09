import { ScenePreset } from './index'

export const productShowcasePresets: ScenePreset[] = [
  {
    name: 'hero-product-left',
    category: 'product-showcase',
    description: 'Product image on left, text on right',
    create: (params) => ({
      nodes: [
        { id: 'ps-bg', type: 'gradient', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 0, transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', maxWidth: '100%', maxHeight: '100%' }, animations: [], effects: [], metadata: { colors: [params.bgColor1 || '#0A0A0A', params.bgColor2 || '#1A1A2E'], angle: 180 } },
        { id: 'ps-product', type: 'image', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: -200, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', alignment: 'center', maxWidth: '40%' }, animations: [{ property: 'opacity', keyframes: [{ frame: 0, value: 0 }, { frame: 30, value: 1 }] }, { property: 'position', keyframes: [{ frame: 0, value: [-200, 50] }, { frame: 30, value: [-200, 0] }] }], effects: [{ type: 'drop-shadow', params: { offsetX: 0, offsetY: 10, blur: 20, color: 'rgba(0,0,0,0.5)' }, order: 0 }], metadata: { src: params.imageSrc || '', objectFit: 'contain' } },
        { id: 'ps-title', type: 'text', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 2, transform: { position: { x: 200, y: -40 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', alignment: 'start', maxWidth: '35%' }, animations: [{ property: 'opacity', keyframes: [{ frame: 10, value: 0 }, { frame: 40, value: 1 }] }, { property: 'position', keyframes: [{ frame: 10, value: [200, 60] }, { frame: 40, value: [200, -40] }] }], effects: [], metadata: { content: params.title || 'Product Name', fontSize: 48, fontWeight: 700, color: '#FFFFFF' } },
        { id: 'ps-desc', type: 'text', children: [], parent: 'ps-title', visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: 0, y: 70 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'top-left', alignment: 'start', maxWidth: '35%' }, animations: [{ property: 'opacity', keyframes: [{ frame: 20, value: 0 }, { frame: 50, value: 1 }] }], effects: [], metadata: { content: params.description || 'Product description goes here', fontSize: 20, fontWeight: 400, color: 'rgba(255,255,255,0.7)' } },
      ],
    }),
  },
  {
    name: 'product-center',
    category: 'product-showcase',
    description: 'Product centered with floating details',
    create: (params) => ({
      nodes: [
        { id: 'pc-bg', type: 'gradient', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 0, transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', maxWidth: '100%', maxHeight: '100%' }, animations: [], effects: [], metadata: { colors: [params.bgColor1 || '#000000', params.bgColor2 || '#111111'], angle: 0 } },
        { id: 'pc-product', type: 'image', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 1, transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'center', alignment: 'center', maxWidth: '50%' }, animations: [{ property: 'scale', keyframes: [{ frame: 0, value: [0.8, 0.8] }, { frame: 30, value: [1, 1] }] }], effects: [], metadata: { src: params.imageSrc || '', objectFit: 'contain' } },
        { id: 'pc-badge', type: 'text', children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 2, transform: { position: { x: 0, y: -300 }, rotation: 0, scale: { x: 1, y: 1 } }, constraints: { anchor: 'top-center', alignment: 'center' }, animations: [{ property: 'opacity', keyframes: [{ frame: 5, value: 0 }, { frame: 25, value: 1 }] }], effects: [], metadata: { content: params.badge || 'NEW', fontSize: 14, fontWeight: 700, color: '#007AFF', letterSpacing: 4 } },
      ],
    }),
  },
]
