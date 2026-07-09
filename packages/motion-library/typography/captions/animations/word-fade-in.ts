export const wordFadeIn = {
  name: 'word-fade-in',
  type: 'word',
  keyframes: [
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 15, value: 1 }] },
    { property: 'translateY', frames: [{ at: 0, value: [0, 10] }, { at: 15, value: [0, 0] }] },
  ],
  staggerPerWord: 5,
}
