export const elasticPresets = [
  { name: 'elastic-in', type: 'elastic' as const, keyframes: [
    { property: 'scale', frames: [{ at: 0, value: [0, 0] }, { at: 15, value: [1.4, 1.4] }, { at: 25, value: [0.85, 0.85] }, { at: 30, value: [1, 1] }] },
  ], defaultDuration: 30 },
  { name: 'elastic-out', type: 'elastic' as const, keyframes: [
    { property: 'scale', frames: [{ at: 0, value: [1, 1] }, { at: 10, value: [1.4, 1.4] }, { at: 20, value: [0.85, 0.85] }, { at: 30, value: [0, 0] }] },
  ], defaultDuration: 30 },
  { name: 'elastic-in-out', type: 'elastic' as const, keyframes: [
    { property: 'scale', frames: [{ at: 0, value: [0, 0] }, { at: 10, value: [1.4, 1.4] }, { at: 20, value: [0.85, 0.85] }, { at: 30, value: [1, 1] }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 5, value: 1 }] },
  ], defaultDuration: 30 },
  { name: 'elastic-scale', type: 'elastic' as const, keyframes: [
    { property: 'scale', frames: [{ at: 0, value: [0.3, 0.3] }, { at: 12, value: [1.5, 1.5] }, { at: 22, value: [0.8, 0.8] }, { at: 30, value: [1, 1] }] },
  ], defaultDuration: 30 },
  { name: 'elastic-slide', type: 'elastic' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, 120] }, { at: 12, value: [0, -20] }, { at: 22, value: [0, 10] }, { at: 30, value: [0, 0] }] },
  ], defaultDuration: 30 },
  { name: 'elastic-rotate', type: 'elastic' as const, keyframes: [
    { property: 'rotation', frames: [{ at: 0, value: -30 }, { at: 12, value: 15 }, { at: 22, value: -5 }, { at: 30, value: 0 }] },
  ], defaultDuration: 30 },
]