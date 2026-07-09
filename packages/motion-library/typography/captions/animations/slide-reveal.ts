export const slideReveal = {
  name: 'slide-reveal',
  type: 'line',
  keyframes: [
    { property: 'translateX', frames: [{ at: 0, value: [0, -100] }, { at: 30, value: [0, 0] }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 15, value: 1 }] },
  ],
}
