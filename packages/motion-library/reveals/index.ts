export interface RevealPreset {
  name: string
  type: 'wipe' | 'mask' | 'expand' | 'rotate' | 'flip' | 'shutter' | 'blinds'
  direction: string
  params: Record<string, unknown>
}

export const reveals: RevealPreset[] = [
  { name: 'wipe-left', type: 'wipe', direction: 'left', params: { duration: 30, easing: 'ease-out' } },
  { name: 'wipe-right', type: 'wipe', direction: 'right', params: { duration: 30, easing: 'ease-out' } },
  { name: 'wipe-up', type: 'wipe', direction: 'up', params: { duration: 30, easing: 'ease-out' } },
  { name: 'wipe-down', type: 'wipe', direction: 'down', params: { duration: 30, easing: 'ease-out' } },
  { name: 'circle-expand', type: 'expand', direction: 'center', params: { duration: 35, easing: 'ease-in-out', origin: 'center' } },
  { name: 'flip-horizontal', type: 'flip', direction: 'horizontal', params: { duration: 40, easing: 'ease-in-out' } },
  { name: 'flip-vertical', type: 'flip', direction: 'vertical', params: { duration: 40, easing: 'ease-in-out' } },
  { name: 'shutter-open', type: 'shutter', direction: 'horizontal', params: { duration: 25, easing: 'ease-in-out', count: 2 } },
  { name: 'vertical-blinds', type: 'blinds', direction: 'vertical', params: { duration: 40, easing: 'ease-out', count: 8 } },
]

export function getReveal(name: string): RevealPreset | undefined {
  return reveals.find(r => r.name === name)
}
