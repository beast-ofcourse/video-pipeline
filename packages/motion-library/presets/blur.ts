export const blurPresets = [
  { name: 'blur-in', type: 'blur' as const, keyframes: [
    { property: 'blur', frames: [{ at: 0, value: 10 }, { at: 30, value: 0 }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
  ], defaultDuration: 30 },
  { name: 'blur-out', type: 'blur' as const, keyframes: [
    { property: 'blur', frames: [{ at: 0, value: 0 }, { at: 30, value: 10 }] },
    { property: 'opacity', frames: [{ at: 0, value: 1 }, { at: 30, value: 0 }] },
  ], defaultDuration: 30 },
  { name: 'blur-in-up', type: 'blur' as const, keyframes: [
    { property: 'blur', frames: [{ at: 0, value: 8 }, { at: 30, value: 0 }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
    { property: 'position', frames: [{ at: 0, value: [0, 40] }, { at: 30, value: [0, 0] }] },
  ], defaultDuration: 30 },
  { name: 'blur-in-scale', type: 'blur' as const, keyframes: [
    { property: 'blur', frames: [{ at: 0, value: 6 }, { at: 30, value: 0 }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
    { property: 'scale', frames: [{ at: 0, value: [0.85, 0.85] }, { at: 30, value: [1, 1] }] },
  ], defaultDuration: 30 },
  { name: 'blur-in-rotate', type: 'blur' as const, keyframes: [
    { property: 'blur', frames: [{ at: 0, value: 8 }, { at: 30, value: 0 }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
    { property: 'rotation', frames: [{ at: 0, value: -8 }, { at: 30, value: 0 }] },
  ], defaultDuration: 30 },
  { name: 'blur-out-fade', type: 'blur' as const, keyframes: [
    { property: 'blur', frames: [{ at: 0, value: 0 }, { at: 30, value: 12 }] },
    { property: 'opacity', frames: [{ at: 0, value: 1 }, { at: 30, value: 0 }] },
  ], defaultDuration: 30 },
]