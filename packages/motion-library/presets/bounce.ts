export const bouncePresets = [
  { name: 'bounce-scale', type: 'bounce' as const, keyframes: [
    { property: 'scale', frames: [{ at: 0, value: [0, 0] }, { at: 10, value: [1.3, 1.3] }, { at: 20, value: [0.85, 0.85] }, { at: 30, value: [1, 1] }] },
  ], defaultDuration: 30 },
  { name: 'bounce-up', type: 'bounce' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, 0] }, { at: 10, value: [0, -40] }, { at: 20, value: [0, 0] }, { at: 25, value: [0, -15] }, { at: 30, value: [0, 0] }] },
  ], defaultDuration: 30 },
  { name: 'bounce-down', type: 'bounce' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, 0] }, { at: 10, value: [0, 40] }, { at: 20, value: [0, 0] }, { at: 25, value: [0, 15] }, { at: 30, value: [0, 0] }] },
  ], defaultDuration: 30 },
  { name: 'bounce-in', type: 'bounce' as const, keyframes: [
    { property: 'scale', frames: [{ at: 0, value: [0, 0] }, { at: 10, value: [1.3, 1.3] }, { at: 20, value: [0.85, 0.85] }, { at: 30, value: [1, 1] }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 5, value: 1 }] },
  ], defaultDuration: 30 },
  { name: 'bounce-out', type: 'bounce' as const, keyframes: [
    { property: 'scale', frames: [{ at: 0, value: [1, 1] }, { at: 10, value: [1.3, 1.3] }, { at: 20, value: [0.85, 0.85] }, { at: 30, value: [0, 0] }] },
    { property: 'opacity', frames: [{ at: 20, value: 1 }, { at: 30, value: 0 }] },
  ], defaultDuration: 30 },
  { name: 'bounce-rotate', type: 'bounce' as const, keyframes: [
    { property: 'rotation', frames: [{ at: 0, value: 0 }, { at: 10, value: -20 }, { at: 20, value: 5 }, { at: 30, value: 0 }] },
  ], defaultDuration: 30 },
]