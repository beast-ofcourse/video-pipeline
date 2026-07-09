export const pulsePresets = [
  { name: 'pulse-slow', type: 'pulse' as const, keyframes: [
    { property: 'opacity', frames: [{ at: 0, value: 1 }, { at: 50, value: 0.6 }, { at: 100, value: 1 }] },
  ], defaultDuration: 60 },
  { name: 'pulse-fast', type: 'pulse' as const, keyframes: [
    { property: 'opacity', frames: [{ at: 0, value: 1 }, { at: 25, value: 0.4 }, { at: 50, value: 1 }, { at: 75, value: 0.4 }, { at: 100, value: 1 }] },
  ], defaultDuration: 30 },
  { name: 'pulse-scale', type: 'pulse' as const, keyframes: [
    { property: 'scale', frames: [{ at: 0, value: [1, 1] }, { at: 50, value: [1.05, 1.05] }, { at: 100, value: [1, 1] }] },
  ], defaultDuration: 60 },
  { name: 'pulse-glow', type: 'pulse' as const, keyframes: [
    { property: 'opacity', frames: [{ at: 0, value: 0.8 }, { at: 50, value: 1 }, { at: 100, value: 0.8 }] },
    { property: 'scale', frames: [{ at: 0, value: [1, 1] }, { at: 50, value: [1.03, 1.03] }, { at: 100, value: [1, 1] }] },
  ], defaultDuration: 60 },
  { name: 'pulse-color', type: 'pulse' as const, keyframes: [
    { property: 'color', frames: [{ at: 0, value: 0 }, { at: 50, value: 180 }, { at: 100, value: 360 }] },
  ], defaultDuration: 60 },
  { name: 'pulse-wave', type: 'pulse' as const, keyframes: [
    { property: 'scale', frames: [{ at: 0, value: [1, 1] }, { at: 25, value: [1.08, 1.08] }, { at: 50, value: [1, 1] }, { at: 75, value: [1.08, 1.08] }, { at: 100, value: [1, 1] }] },
    { property: 'opacity', frames: [{ at: 0, value: 1 }, { at: 25, value: 0.7 }, { at: 50, value: 1 }, { at: 75, value: 0.7 }, { at: 100, value: 1 }] },
  ], defaultDuration: 60 },
]