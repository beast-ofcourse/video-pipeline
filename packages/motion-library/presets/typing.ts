export const typingPresets = [
  { name: 'type-in', type: 'typing' as const, keyframes: [{ property: 'typing', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] }], defaultDuration: 30 },
  { name: 'type-out', type: 'typing' as const, keyframes: [{ property: 'typing', frames: [{ at: 0, value: 1 }, { at: 30, value: 0 }] }], defaultDuration: 30 },
  { name: 'type-in-cursor', type: 'typing' as const, keyframes: [
    { property: 'typing', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
    { property: 'cursor', frames: [{ at: 0, value: 1 }, { at: 30, value: 1 }] },
  ], defaultDuration: 30 },
  { name: 'type-in-stagger', type: 'typing' as const, keyframes: [
    { property: 'typing', frames: [{ at: 0, value: 0 }, { at: 10, value: 0.3 }, { at: 20, value: 0.6 }, { at: 30, value: 1 }] },
  ], defaultDuration: 30 },
  { name: 'type-in-word', type: 'typing' as const, keyframes: [
    { property: 'typing', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 5, value: 1 }] },
  ], defaultDuration: 30 },
  { name: 'type-in-backspace', type: 'typing' as const, keyframes: [
    { property: 'typing', frames: [{ at: 0, value: 0 }, { at: 20, value: 1 }, { at: 25, value: 0.8 }, { at: 30, value: 1 }] },
  ], defaultDuration: 30 },
]