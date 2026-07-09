export const fadePresets = [
  { name: 'fade-in', type: 'fade' as const, keyframes: [{ property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] }], defaultDuration: 30 },
  { name: 'fade-out', type: 'fade' as const, keyframes: [{ property: 'opacity', frames: [{ at: 0, value: 1 }, { at: 30, value: 0 }] }], defaultDuration: 30 },
  { name: 'fade-in-up', type: 'fade' as const, keyframes: [
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
    { property: 'position', frames: [{ at: 0, value: [0, 50] }, { at: 30, value: [0, 0] }] },
  ], defaultDuration: 30 },
  { name: 'fade-in-down', type: 'fade' as const, keyframes: [
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
    { property: 'position', frames: [{ at: 0, value: [0, -50] }, { at: 30, value: [0, 0] }] },
  ], defaultDuration: 30 },
  { name: 'fade-in-scale', type: 'fade' as const, keyframes: [
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
    { property: 'scale', frames: [{ at: 0, value: [0.8, 0.8] }, { at: 30, value: [1, 1] }] },
  ], defaultDuration: 30 },
  { name: 'fade-in-rotate', type: 'fade' as const, keyframes: [
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
    { property: 'rotation', frames: [{ at: 0, value: -10 }, { at: 30, value: 0 }] },
  ], defaultDuration: 30 },
]