export const parallaxPresets = [
  { name: 'parallax-scroll', type: 'parallax' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, 0] }, { at: 50, value: [0, -100] }, { at: 100, value: [0, -200] }] },
  ], defaultDuration: 100 },
  { name: 'parallax-tilt', type: 'parallax' as const, keyframes: [
    { property: 'rotation', frames: [{ at: 0, value: [0, 0] }, { at: 50, value: [5, -5] }, { at: 100, value: [0, 0] }] },
  ], defaultDuration: 100 },
  { name: 'parallax-depth', type: 'parallax' as const, keyframes: [
    { property: 'scale', frames: [{ at: 0, value: [1, 1] }, { at: 50, value: [1.05, 1.05] }, { at: 100, value: [1.1, 1.1] }] },
    { property: 'opacity', frames: [{ at: 0, value: 1 }, { at: 100, value: 0.6 }] },
  ], defaultDuration: 100 },
  { name: 'parallax-mouse', type: 'parallax' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, 0] }, { at: 50, value: [10, -10] }, { at: 100, value: [0, 0] }] },
  ], defaultDuration: 100 },
  { name: 'parallax-stagger', type: 'parallax' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, 0] }, { at: 50, value: [0, -50] }, { at: 100, value: [0, -100] }] },
    { property: 'opacity', frames: [{ at: 0, value: 1 }, { at: 100, value: 0.5 }] },
  ], defaultDuration: 100 },
  { name: 'parallax-zoom', type: 'parallax' as const, keyframes: [
    { property: 'scale', frames: [{ at: 0, value: [1, 1] }, { at: 50, value: [1.1, 1.1] }, { at: 100, value: [1.2, 1.2] }] },
    { property: 'position', frames: [{ at: 0, value: [0, 0] }, { at: 100, value: [0, -50] }] },
  ], defaultDuration: 100 },
]