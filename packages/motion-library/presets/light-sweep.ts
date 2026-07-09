export const lightSweepPresets = [
  { name: 'light-sweep-left', type: 'light-sweep' as const, keyframes: [
    { property: 'light-sweep', frames: [{ at: 0, value: [-100, 0] }, { at: 30, value: [200, 0] }] },
  ], defaultDuration: 30 },
  { name: 'light-sweep-right', type: 'light-sweep' as const, keyframes: [
    { property: 'light-sweep', frames: [{ at: 0, value: [200, 0] }, { at: 30, value: [-100, 0] }] },
  ], defaultDuration: 30 },
  { name: 'light-sweep-top', type: 'light-sweep' as const, keyframes: [
    { property: 'light-sweep', frames: [{ at: 0, value: [0, -100] }, { at: 30, value: [0, 200] }] },
  ], defaultDuration: 30 },
  { name: 'light-sweep-bottom', type: 'light-sweep' as const, keyframes: [
    { property: 'light-sweep', frames: [{ at: 0, value: [0, 200] }, { at: 30, value: [0, -100] }] },
  ], defaultDuration: 30 },
  { name: 'light-sweep-diagonal', type: 'light-sweep' as const, keyframes: [
    { property: 'light-sweep', frames: [{ at: 0, value: [-100, -100] }, { at: 30, value: [200, 200] }] },
  ], defaultDuration: 30 },
  { name: 'light-sweep-radial', type: 'light-sweep' as const, keyframes: [
    { property: 'light-sweep', frames: [{ at: 0, value: 0 }, { at: 15, value: 50 }, { at: 30, value: 100 }] },
  ], defaultDuration: 30 },
]