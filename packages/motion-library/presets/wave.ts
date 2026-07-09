export const wavePresets = [
  { name: 'wave-up', type: 'wave' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, 0] }, { at: 15, value: [0, -20] }, { at: 30, value: [0, 0] }] },
  ], defaultDuration: 30 },
  { name: 'wave-down', type: 'wave' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, 0] }, { at: 15, value: [0, 20] }, { at: 30, value: [0, 0] }] },
  ], defaultDuration: 30 },
  { name: 'wave-scale', type: 'wave' as const, keyframes: [
    { property: 'scale', frames: [{ at: 0, value: [1, 1] }, { at: 15, value: [1.1, 1.1] }, { at: 30, value: [1, 1] }] },
  ], defaultDuration: 30 },
  { name: 'wave-color', type: 'wave' as const, keyframes: [
    { property: 'color', frames: [{ at: 0, value: 0 }, { at: 15, value: 180 }, { at: 30, value: 360 }] },
  ], defaultDuration: 30 },
  { name: 'wave-stagger', type: 'wave' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, 0] }, { at: 10, value: [0, -15] }, { at: 20, value: [0, 0] }, { at: 30, value: [0, -5] }] },
  ], defaultDuration: 30 },
  { name: 'wave-rotate', type: 'wave' as const, keyframes: [
    { property: 'rotation', frames: [{ at: 0, value: 0 }, { at: 15, value: 5 }, { at: 30, value: 0 }] },
  ], defaultDuration: 30 },
]