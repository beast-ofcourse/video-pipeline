export const lineReveal = {
  name: 'line-reveal',
  type: 'line',
  keyframes: [
    { property: 'translateY', frames: [{ at: 0, value: [0, 30] }, { at: 25, value: [0, 0] }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 20, value: 1 }] },
  ],
}
