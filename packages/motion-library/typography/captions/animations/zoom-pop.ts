export const zoomPop = {
  name: 'zoom-pop',
  type: 'line',
  keyframes: [
    { property: 'scale', frames: [{ at: 0, value: [0, 0] }, { at: 40, value: [1.15, 1.15] }, { at: 55, value: [1, 1] }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 15, value: 1 }] },
  ],
}
