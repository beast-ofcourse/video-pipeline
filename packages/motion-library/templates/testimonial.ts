import { SceneGraph } from '../../video-engine/src/core/types'

export interface TestimonialParams {
  quote: string
  authorName: string
  authorTitle: string
  brandColor: string
  avatarUrl?: string
  stats?: Array<{ label: string; value: string }>
  logoUrl?: string
}

export function createTestimonial(params: TestimonialParams): Partial<SceneGraph> {
  return {
    scenes: [
      {
        id: 'quote',
        duration: 4,
        fps: 30,
        camera: {
          type: 'perspective',
          position: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          zoom: 1,
          focalLength: 50,
        },
        nodes: [
          {
            id: 'quote-bg',
            type: 'rect',
            children: [],
            parent: null,
            visible: true,
            blendMode: 'normal',
            opacity: 1,
            zIndex: 0,
            transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } },
            constraints: { anchor: 'center', maxWidth: '100%', maxHeight: '100%' },
            animations: [],
            effects: [{ type: 'vignette', params: { intensity: 0.3 }, order: 0 }],
            metadata: { color: '#0A0A0A' },
          },
          {
            id: 'quote-mark',
            type: 'text',
            children: [],
            parent: null,
            visible: true,
            blendMode: 'normal',
            opacity: 1,
            zIndex: 1,
            transform: { position: { x: -280, y: -180 }, rotation: 0, scale: { x: 1, y: 1 } },
            constraints: { anchor: 'top-left', alignment: 'start' },
            animations: [
              { property: 'opacity', keyframes: [{ frame: 0, value: 0 }, { frame: 20, value: 0.2 }] },
              { property: 'scale', keyframes: [{ frame: 0, value: [0.5, 0.5] }, { frame: 20, value: [1, 1] }] },
            ],
            effects: [],
            metadata: { content: '"', fontSize: 160, fontWeight: 900, color: params.brandColor },
          },
          {
            id: 'quote-text',
            type: 'text',
            children: [],
            parent: null,
            visible: true,
            blendMode: 'normal',
            opacity: 1,
            zIndex: 2,
            transform: { position: { x: 0, y: -40 }, rotation: 0, scale: { x: 1, y: 1 } },
            constraints: { anchor: 'center', alignment: 'center', maxWidth: '75%' },
            animations: [
              { property: 'opacity', keyframes: [{ frame: 5, value: 0 }, { frame: 30, value: 1 }] },
              { property: 'position', keyframes: [{ frame: 5, value: [0, 20] }, { frame: 30, value: [0, -40] }] },
            ],
            effects: [],
            metadata: { content: params.quote, fontSize: 32, fontWeight: 500, color: '#fff', lineHeight: 1.5, fontStyle: 'italic' },
          },
          {
            id: 'quote-author-avatar',
            type: params.avatarUrl ? 'image' : 'shape',
            children: [],
            parent: null,
            visible: true,
            blendMode: 'normal',
            opacity: 1,
            zIndex: 2,
            transform: { position: { x: -80, y: 120 }, rotation: 0, scale: { x: 0, y: 0 } },
            constraints: { anchor: 'center', alignment: 'center' },
            animations: [
              { property: 'scale', keyframes: [{ frame: 25, value: [0, 0] }, { frame: 40, value: [1, 1] }] },
            ],
            effects: [],
            metadata: params.avatarUrl
              ? { src: params.avatarUrl, width: 48, height: 48, borderRadius: 24, fit: 'cover' }
              : { shape: 'circle', size: 48, fillColor: params.brandColor },
          },
          {
            id: 'quote-author-name',
            type: 'text',
            children: [],
            parent: 'quote-author-avatar',
            visible: true,
            blendMode: 'normal',
            opacity: 1,
            zIndex: 3,
            transform: { position: { x: 70, y: -8 }, rotation: 0, scale: { x: 1, y: 1 } },
            constraints: { anchor: 'center-left', alignment: 'start' },
            animations: [
              { property: 'opacity', keyframes: [{ frame: 30, value: 0 }, { frame: 48, value: 1 }] },
            ],
            effects: [],
            metadata: { content: params.authorName, fontSize: 18, fontWeight: 700, color: '#fff' },
          },
          {
            id: 'quote-author-title',
            type: 'text',
            children: [],
            parent: 'quote-author-name',
            visible: true,
            blendMode: 'normal',
            opacity: 1,
            zIndex: 3,
            transform: { position: { x: 0, y: 22 }, rotation: 0, scale: { x: 1, y: 1 } },
            constraints: { anchor: 'center-left', alignment: 'start' },
            animations: [
              { property: 'opacity', keyframes: [{ frame: 35, value: 0 }, { frame: 55, value: 0.6 }] },
            ],
            effects: [],
            metadata: { content: params.authorTitle, fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,0.5)' },
          },
        ],
      },
      ...(params.stats
        ? [
            {
              id: 'stats',
              duration: 3,
              fps: 30,
              camera: {
                type: 'perspective',
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
                zoom: 1,
                focalLength: 50,
              },
              nodes: [
                {
                  id: 'stats-bg',
                  type: 'rect',
                  children: [],
                  parent: null,
                  visible: true,
                  blendMode: 'normal',
                  opacity: 1,
                  zIndex: 0,
                  transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } },
                  constraints: { anchor: 'center', maxWidth: '100%', maxHeight: '100%' },
                  animations: [],
                  effects: [{ type: 'gradient-overlay', params: { colors: ['#000000', params.brandColor], opacity: 0.2 }, order: 0 }],
                  metadata: { color: '#0A0A0A' },
                },
                {
                  id: 'stats-label',
                  type: 'text',
                  children: [],
                  parent: null,
                  visible: true,
                  blendMode: 'normal',
                  opacity: 1,
                  zIndex: 1,
                  transform: { position: { x: 0, y: -200 }, rotation: 0, scale: { x: 1, y: 1 } },
                  constraints: { anchor: 'center', alignment: 'center' },
                  animations: [
                    { property: 'opacity', keyframes: [{ frame: 0, value: 0 }, { frame: 15, value: 0.5 }] },
                  ],
                  effects: [],
                  metadata: { content: 'RESULTS', fontSize: 16, fontWeight: 600, color: params.brandColor, letterSpacing: 4 },
                },
                ...params.stats.flatMap((stat, i) => {
                  const offsetX = (i - (params.stats!.length - 1) / 2) * 250
                  return [
                    {
                      id: `stat-value-${i}`,
                      type: 'text',
                      children: [],
                      parent: null,
                      visible: true,
                      blendMode: 'normal',
                      opacity: 1,
                      zIndex: 2,
                      transform: { position: { x: offsetX, y: -30 }, rotation: 0, scale: { x: 1, y: 1 } },
                      constraints: { anchor: 'center', alignment: 'center' },
                      animations: [
                        { property: 'opacity', keyframes: [{ frame: 10 + i * 10, value: 0 }, { frame: 30 + i * 10, value: 1 }] },
                        { property: 'scale', keyframes: [{ frame: 10 + i * 10, value: [1.2, 1.2] }, { frame: 30 + i * 10, value: [1, 1] }] },
                      ],
                      effects: [],
                      metadata: { content: stat.value, fontSize: 56, fontWeight: 900, color: '#fff' },
                    },
                    {
                      id: `stat-label-${i}`,
                      type: 'text',
                      children: [],
                      parent: `stat-value-${i}`,
                      visible: true,
                      blendMode: 'normal',
                      opacity: 1,
                      zIndex: 2,
                      transform: { position: { x: 0, y: 45 }, rotation: 0, scale: { x: 1, y: 1 } },
                      constraints: { anchor: 'top-center', alignment: 'center', maxWidth: 200 },
                      animations: [
                        { property: 'opacity', keyframes: [{ frame: 20 + i * 10, value: 0 }, { frame: 40 + i * 10, value: 0.6 }] },
                      ],
                      effects: [],
                      metadata: { content: stat.label, fontSize: 16, fontWeight: 400, color: 'rgba(255,255,255,0.6)' },
                    },
                  ]
                }),
              ],
            },
          ]
        : []),
      {
        id: 'brand',
        duration: 2.5,
        fps: 30,
        camera: {
          type: 'perspective',
          position: { x: 0, y: 0, z: 0 },
          rotation: { x: 0, y: 0, z: 0 },
          zoom: 1,
          focalLength: 50,
        },
        nodes: [
          {
            id: 'brand-bg',
            type: 'rect',
            children: [],
            parent: null,
            visible: true,
            blendMode: 'normal',
            opacity: 1,
            zIndex: 0,
            transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } },
            constraints: { anchor: 'center', maxWidth: '100%', maxHeight: '100%' },
            animations: [],
            effects: [],
            metadata: { color: '#000000' },
          },
          {
            id: 'brand-logo',
            type: params.logoUrl ? 'image' : 'text',
            children: [],
            parent: null,
            visible: true,
            blendMode: 'normal',
            opacity: 1,
            zIndex: 1,
            transform: { position: { x: 0, y: -20 }, rotation: 0, scale: { x: 0, y: 0 } },
            constraints: { anchor: 'center', alignment: 'center' },
            animations: [
              { property: 'scale', keyframes: [{ frame: 0, value: [0, 0] }, { frame: 20, value: [1, 1] }] },
              { property: 'opacity', keyframes: [{ frame: 0, value: 0 }, { frame: 5, value: 1 }] },
            ],
            effects: [],
            metadata: params.logoUrl
              ? { src: params.logoUrl, width: 180, height: 50, fit: 'contain' }
              : { content: 'Trusted by industry leaders', fontSize: 28, fontWeight: 600, color: 'rgba(255,255,255,0.8)' },
          },
          {
            id: 'brand-tagline',
            type: 'text',
            children: [],
            parent: 'brand-logo',
            visible: true,
            blendMode: 'normal',
            opacity: 1,
            zIndex: 1,
            transform: { position: { x: 0, y: 70 }, rotation: 0, scale: { x: 1, y: 1 } },
            constraints: { anchor: 'top-center', alignment: 'center' },
            animations: [
              { property: 'opacity', keyframes: [{ frame: 20, value: 0 }, { frame: 40, value: 0.5 }] },
            ],
            effects: [],
            metadata: { content: 'Join thousands of happy customers', fontSize: 16, fontWeight: 400, color: 'rgba(255,255,255,0.4)' },
          },
        ],
      },
    ],
  }
}
