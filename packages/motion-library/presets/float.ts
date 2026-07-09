export const floatPresets = [
  { name: 'float-up', type: 'float' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, 0] }, { at: 50, value: [0, -15] }, { at: 100, value: [0, 0] }] },
  ], defaultDuration: 60 },
  { name: 'float-down', type: 'float' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, 0] }, { at: 50, value: [0, 15] }, { at: 100, value: [0, 0] }] },
  ], defaultDuration: 60 },
  { name: 'float-sway', type: 'float' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, 0] }, { at: 25, value: [10, -5] }, { at: 50, value: [0, -10] }, { at: 75, value: [-10, -5] }, { at: 100, value: [0, 0] }] },
  ], defaultDuration: 60 },
  { name: 'float-bob', type: 'float' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, 0] }, { at: 30, value: [0, -8] }, { at: 60, value: [0, 0] }, { at: 90, value: [0, -4] }, { at: 100, value: [0, 0] }] },
  ], defaultDuration: 60 },
  { name: 'float-drift', type: 'float' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, 0] }, { at: 50, value: [20, -10] }, { at: 100, value: [40, 0] }] },
  ], defaultDuration: 60 },
  { name: 'float-orbital', type: 'float' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, 0] }, { at: 25, value: [15, -15] }, { at: 50, value: [0, -25] }, { at: 75, value: [-15, -15] }, { at: 100, value: [0, 0] }] },
  ], defaultDuration: 60 },
]