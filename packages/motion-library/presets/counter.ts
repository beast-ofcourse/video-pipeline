export const counterPresets = [
  { name: 'count-up', type: 'counter' as const, keyframes: [{ property: 'counter', frames: [{ at: 0, value: 0 }, { at: 30, value: 100 }] }], defaultDuration: 30 },
  { name: 'count-down', type: 'counter' as const, keyframes: [{ property: 'counter', frames: [{ at: 0, value: 100 }, { at: 30, value: 0 }] }], defaultDuration: 30 },
  { name: 'count-up-commas', type: 'counter' as const, keyframes: [{ property: 'counter', frames: [{ at: 0, value: 0 }, { at: 30, value: 1000000 }] }], defaultDuration: 30 },
  { name: 'count-up-percent', type: 'counter' as const, keyframes: [{ property: 'counter', frames: [{ at: 0, value: 0 }, { at: 30, value: 100 }] }], defaultDuration: 30 },
  { name: 'count-up-dollar', type: 'counter' as const, keyframes: [{ property: 'counter', frames: [{ at: 0, value: 0 }, { at: 30, value: 999 }] }], defaultDuration: 30 },
  { name: 'count-down-percent', type: 'counter' as const, keyframes: [{ property: 'counter', frames: [{ at: 0, value: 100 }, { at: 30, value: 0 }] }], defaultDuration: 30 },
  { name: 'count-stagger', type: 'counter' as const, keyframes: [
    { property: 'counter', frames: [{ at: 0, value: 0 }, { at: 10, value: 30 }, { at: 20, value: 60 }, { at: 30, value: 100 }] },
  ], defaultDuration: 30 },
  { name: 'count-up-spring', type: 'counter' as const, keyframes: [
    { property: 'counter', frames: [{ at: 0, value: 0 }, { at: 15, value: 110 }, { at: 30, value: 100 }] },
  ], defaultDuration: 30 },
]