export interface UIPreset {
  name: string
  type: 'hero-section' | 'feature-card' | 'notification' | 'toast' | 'button' | 'badge' | 'progress-bar' | 'modal' | 'tooltip' | 'avatar'
  sceneNodes: Array<{
    id: string
    type: string
    constraints?: Record<string, unknown>
    metadata: Record<string, unknown>
    animations?: Array<{ property: string; keyframes: Array<{ frame: number; value: number | number[] }> }>
  }>
}

export const uiPresets: UIPreset[] = [
  {
    name: 'hero-center',
    type: 'hero-section',
    sceneNodes: [
      { id: 'hero-bg', type: 'gradient', constraints: { anchor: 'center', maxWidth: '100%', maxHeight: '100%' }, metadata: { colors: ['#0A0A0A', '#1A1A2E'], angle: 180 } },
      { id: 'hero-title', type: 'text', constraints: { anchor: 'center', alignment: 'center', maxWidth: '70%' }, metadata: { content: 'Hero Title', fontSize: 72, fontWeight: 700, color: '#FFFFFF' }, animations: [{ property: 'opacity', keyframes: [{ frame: 0, value: 0 }, { frame: 30, value: 1 }] }] },
      { id: 'hero-subtitle', type: 'text', constraints: { anchor: 'top-center', alignment: 'center', maxWidth: '60%' }, metadata: { content: 'Subtitle text here', fontSize: 28, fontWeight: 400, color: 'rgba(255,255,255,0.7)' }, animations: [{ property: 'opacity', keyframes: [{ frame: 15, value: 0 }, { frame: 40, value: 1 }] }] },
    ],
  },
  {
    name: 'feature-card',
    type: 'feature-card',
    sceneNodes: [
      { id: 'card-bg', type: 'rect', constraints: { anchor: 'center', maxWidth: '30%', aspectRatio: 1.5 }, metadata: { color: '#1A1A2E', borderRadius: 12 } },
      { id: 'card-icon', type: 'text', constraints: { anchor: 'top-center', alignment: 'center', padding: { top: 20, left: 0, right: 0, bottom: 0 } }, metadata: { content: '★', fontSize: 48, color: '#007AFF' } },
      { id: 'card-title', type: 'text', constraints: { anchor: 'center', alignment: 'center', maxWidth: '80%' }, metadata: { content: 'Feature Title', fontSize: 24, fontWeight: 600, color: '#FFFFFF' } },
      { id: 'card-desc', type: 'text', constraints: { anchor: 'top-center', alignment: 'center', maxWidth: '80%' }, metadata: { content: 'Description text', fontSize: 16, fontWeight: 400, color: 'rgba(255,255,255,0.6)' } },
    ],
  },
  {
    name: 'notification-top',
    type: 'notification',
    sceneNodes: [
      { id: 'notif-bg', type: 'rect', constraints: { anchor: 'top-center', maxWidth: '80%', maxHeight: 60 }, metadata: { color: '#1A1A2E', borderRadius: 8 } },
      { id: 'notif-text', type: 'text', constraints: { anchor: 'center', alignment: 'center' }, metadata: { content: 'New update available', fontSize: 16, fontWeight: 500, color: '#FFFFFF' } },
    ],
  },
  {
    name: 'toast-success',
    type: 'toast',
    sceneNodes: [
      { id: 'toast-bg', type: 'rect', constraints: { anchor: 'bottom-center', maxWidth: '60%', maxHeight: 50 }, metadata: { color: '#10B981', borderRadius: 25 } },
      { id: 'toast-icon', type: 'text', constraints: { anchor: 'center', alignment: 'center' }, metadata: { content: '✓ Success!', fontSize: 18, fontWeight: 600, color: '#FFFFFF' } },
    ],
  },
  {
    name: 'cta-button',
    type: 'button',
    sceneNodes: [
      { id: 'btn-bg', type: 'rect', constraints: { anchor: 'center', maxWidth: 200, maxHeight: 56 }, metadata: { color: '#007AFF', borderRadius: 28 } },
      { id: 'btn-text', type: 'text', constraints: { anchor: 'center', alignment: 'center' }, metadata: { content: 'Get Started', fontSize: 20, fontWeight: 600, color: '#FFFFFF' } },
    ],
  },
  {
    name: 'progress-bar',
    type: 'progress-bar',
    sceneNodes: [
      { id: 'progress-track', type: 'rect', constraints: { anchor: 'center', maxWidth: '60%', maxHeight: 6 }, metadata: { color: '#333333', borderRadius: 3 } },
      { id: 'progress-fill', type: 'rect', constraints: { anchor: 'center', maxWidth: '30%', maxHeight: 6 }, metadata: { color: '#007AFF', borderRadius: 3 } },
    ],
  },
  {
    name: 'badge-new',
    type: 'badge',
    sceneNodes: [
      { id: 'badge-bg', type: 'rect', constraints: { anchor: 'top-right', maxWidth: 60, maxHeight: 24 }, metadata: { color: '#FF6B6B', borderRadius: 12 } },
      { id: 'badge-text', type: 'text', constraints: { anchor: 'center', alignment: 'center' }, metadata: { content: 'NEW', fontSize: 12, fontWeight: 700, color: '#FFFFFF' } },
    ],
  },
  {
    name: 'modal-center',
    type: 'modal',
    sceneNodes: [
      { id: 'modal-overlay', type: 'rect', constraints: { anchor: 'center', maxWidth: '100%', maxHeight: '100%' }, metadata: { color: 'rgba(0,0,0,0.5)' } },
      { id: 'modal-bg', type: 'rect', constraints: { anchor: 'center', maxWidth: '50%', aspectRatio: 1.4 }, metadata: { color: '#1A1A2E', borderRadius: 16 } },
      { id: 'modal-title', type: 'text', constraints: { anchor: 'center', alignment: 'center', maxWidth: '70%' }, metadata: { content: 'Modal Title', fontSize: 28, fontWeight: 600, color: '#FFFFFF' } },
    ],
  },
  {
    name: 'tooltip-bottom',
    type: 'tooltip',
    sceneNodes: [
      { id: 'tooltip-bg', type: 'rect', constraints: { anchor: 'bottom-center', maxWidth: 120, maxHeight: 32 }, metadata: { color: '#333333', borderRadius: 6 } },
      { id: 'tooltip-text', type: 'text', constraints: { anchor: 'center', alignment: 'center' }, metadata: { content: 'Tooltip text', fontSize: 12, fontWeight: 500, color: '#FFFFFF' } },
    ],
  },
  {
    name: 'avatar-circle',
    type: 'avatar',
    sceneNodes: [
      { id: 'avatar-bg', type: 'circle', constraints: { anchor: 'center', maxWidth: 48, maxHeight: 48 }, metadata: { color: '#007AFF' } },
      { id: 'avatar-initials', type: 'text', constraints: { anchor: 'center', alignment: 'center' }, metadata: { content: 'JD', fontSize: 18, fontWeight: 700, color: '#FFFFFF' } },
    ],
  },
]

export function getUIPreset(name: string): UIPreset | undefined {
  return uiPresets.find(u => u.name === name)
}
