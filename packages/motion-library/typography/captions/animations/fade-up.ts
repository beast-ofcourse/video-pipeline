export const fadeUp = {
  name: 'fade-up',
  type: 'line',
  keyframes: [
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
    { property: 'translateY', frames: [{ at: 0, value: [0, 20] }, { at: 30, value: [0, 0] }] },
  ],
}
