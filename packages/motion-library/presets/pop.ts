export const popPresets = [
  { name: 'pop-in', type: 'pop' as const, keyframes: [
    { property: 'scale', frames: [{ at: 0, value: [0, 0] }, { at: 15, value: [1.15, 1.15] }, { at: 30, value: [1, 1] }] },
  ], defaultDuration: 30 },
  { name: 'pop-out', type: 'pop' as const, keyframes: [
    { property: 'scale', frames: [{ at: 0, value: [1, 1] }, { at: 15, value: [1.15, 1.15] }, { at: 30, value: [0, 0] }] },
  ], defaultDuration: 30 },
  { name: 'pop-in-scale', type: 'pop' as const, keyframes: [
    { property: 'scale', frames: [{ at: 0, value: [0.5, 0.5] }, { at: 20, value: [1.1, 1.1] }, { at: 30, value: [1, 1] }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 20, value: 1 }] },
  ], defaultDuration: 30 },
  { name: 'pop-in-rotate', type: 'pop' as const, keyframes: [
    { property: 'scale', frames: [{ at: 0, value: [0, 0] }, { at: 15, value: [1.15, 1.15] }, { at: 30, value: [1, 1] }] },
    { property: 'rotation', frames: [{ at: 0, value: -15 }, { at: 30, value: 0 }] },
  ], defaultDuration: 30 },
  { name: 'pop-in-bounce', type: 'pop' as const, keyframes: [
    { property: 'scale', frames: [{ at: 0, value: [0, 0] }, { at: 10, value: [1.2, 1.2] }, { at: 20, value: [0.9, 0.9] }, { at: 30, value: [1, 1] }] },
  ], defaultDuration: 30 },
  { name: 'pop-in-stagger', type: 'pop' as const, keyframes: [
    { property: 'scale', frames: [{ at: 0, value: [0, 0] }, { at: 15, value: [1.15, 1.15] }, { at: 30, value: [1, 1] }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 5, value: 1 }] },
  ], defaultDuration: 30 },
]