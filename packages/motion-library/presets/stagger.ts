export const staggerPresets = [
  { name: 'stagger-pop', type: 'stagger' as const, keyframes: [
    { property: 'scale', frames: [{ at: 0, value: [0, 0] }, { at: 15, value: [1.15, 1.15] }, { at: 30, value: [1, 1] }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 5, value: 1 }] },
  ], defaultDuration: 30 },
  { name: 'stagger-fade', type: 'stagger' as const, keyframes: [
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
  ], defaultDuration: 30 },
  { name: 'stagger-slide-up', type: 'stagger' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, 60] }, { at: 30, value: [0, 0] }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
  ], defaultDuration: 30 },
  { name: 'stagger-slide-left', type: 'stagger' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [60, 0] }, { at: 30, value: [0, 0] }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
  ], defaultDuration: 30 },
  { name: 'stagger-scale', type: 'stagger' as const, keyframes: [
    { property: 'scale', frames: [{ at: 0, value: [0.7, 0.7] }, { at: 30, value: [1, 1] }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
  ], defaultDuration: 30 },
  { name: 'stagger-blur-in', type: 'stagger' as const, keyframes: [
    { property: 'blur', frames: [{ at: 0, value: 6 }, { at: 30, value: 0 }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
  ], defaultDuration: 30 },
  { name: 'stagger-rotate-in', type: 'stagger' as const, keyframes: [
    { property: 'rotation', frames: [{ at: 0, value: -15 }, { at: 30, value: 0 }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
  ], defaultDuration: 30 },
  { name: 'stagger-fall', type: 'stagger' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, -60] }, { at: 30, value: [0, 0] }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 5, value: 1 }] },
    { property: 'rotation', frames: [{ at: 0, value: 5 }, { at: 30, value: 0 }] },
  ], defaultDuration: 30 },
]