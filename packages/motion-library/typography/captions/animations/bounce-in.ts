export const bounceIn = {
  name: 'bounce-in',
  type: 'word',
  keyframes: [
    { property: 'translateY', frames: [{ at: 0, value: [0, 40] }, { at: 35, value: [0, -10] }, { at: 50, value: [0, 0] }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 10, value: 1 }] },
  ],
  staggerPerWord: 6,
}
