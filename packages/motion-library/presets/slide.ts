export const slidePresets = [
  { name: 'slide-up', type: 'slide' as const, keyframes: [{ property: 'position', frames: [{ at: 0, value: [0, 100] }, { at: 30, value: [0, 0] }] }], defaultDuration: 30 },
  { name: 'slide-down', type: 'slide' as const, keyframes: [{ property: 'position', frames: [{ at: 0, value: [0, -100] }, { at: 30, value: [0, 0] }] }], defaultDuration: 30 },
  { name: 'slide-left', type: 'slide' as const, keyframes: [{ property: 'position', frames: [{ at: 0, value: [100, 0] }, { at: 30, value: [0, 0] }] }], defaultDuration: 30 },
  { name: 'slide-right', type: 'slide' as const, keyframes: [{ property: 'position', frames: [{ at: 0, value: [-100, 0] }, { at: 30, value: [0, 0] }] }], defaultDuration: 30 },
  { name: 'slide-up-fade', type: 'slide' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, 80] }, { at: 30, value: [0, 0] }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
  ], defaultDuration: 30 },
  { name: 'slide-down-fade', type: 'slide' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [0, -80] }, { at: 30, value: [0, 0] }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
  ], defaultDuration: 30 },
  { name: 'slide-left-fade', type: 'slide' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [80, 0] }, { at: 30, value: [0, 0] }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
  ], defaultDuration: 30 },
  { name: 'slide-right-fade', type: 'slide' as const, keyframes: [
    { property: 'position', frames: [{ at: 0, value: [-80, 0] }, { at: 30, value: [0, 0] }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
  ], defaultDuration: 30 },
]