export const shakePresets = [
  { name: 'shake-x', type: 'shake' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, 0] }, { at: 5, value: [-5, 0] }, { at: 10, value: [5, 0] }, { at: 15, value: [-5, 0] }, { at: 20, value: [5, 0] }, { at: 25, value: [-3, 0] }, { at: 30, value: [0, 0] }] },
  ], defaultDuration: 30 },
  { name: 'shake-y', type: 'shake' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, 0] }, { at: 5, value: [0, -5] }, { at: 10, value: [0, 5] }, { at: 15, value: [0, -5] }, { at: 20, value: [0, 5] }, { at: 25, value: [0, -3] }, { at: 30, value: [0, 0] }] },
  ], defaultDuration: 30 },
  { name: 'shake-hard', type: 'shake' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, 0] }, { at: 4, value: [-10, -5] }, { at: 8, value: [10, 5] }, { at: 12, value: [-8, -3] }, { at: 16, value: [8, 3] }, { at: 20, value: [-5, -2] }, { at: 24, value: [5, 2] }, { at: 30, value: [0, 0] }] },
  ], defaultDuration: 30 },
  { name: 'shake-gentle', type: 'shake' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, 0] }, { at: 10, value: [-2, 0] }, { at: 20, value: [2, 0] }, { at: 30, value: [0, 0] }] },
  ], defaultDuration: 30 },
  { name: 'shake-rotate', type: 'shake' as const, keyframes: [
    { property: 'rotation', frames: [{ at: 0, value: 0 }, { at: 5, value: -5 }, { at: 10, value: 5 }, { at: 15, value: -5 }, { at: 20, value: 5 }, { at: 25, value: -3 }, { at: 30, value: 0 }] },
  ], defaultDuration: 30 },
  { name: 'shake-3d', type: 'shake' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, 0] }, { at: 5, value: [-4, -3] }, { at: 10, value: [4, 3] }, { at: 15, value: [-3, -2] }, { at: 20, value: [3, 2] }, { at: 25, value: [-2, -1] }, { at: 30, value: [0, 0] }] },
    { property: 'rotation', frames: [{ at: 0, value: 0 }, { at: 5, value: -3 }, { at: 10, value: 3 }, { at: 15, value: -2 }, { at: 20, value: 2 }, { at: 30, value: 0 }] },
  ], defaultDuration: 30 },
]