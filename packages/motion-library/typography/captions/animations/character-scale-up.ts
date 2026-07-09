export const characterScaleUp = {
  name: 'character-scale-up',
  type: 'character',
  keyframes: [
    { property: 'scale', frames: [{ at: 0, value: [0.5, 0.5] }, { at: 15, value: [1.1, 1.1] }, { at: 20, value: [1, 1] }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 10, value: 1 }] },
  ],
  staggerPerCharacter: 3,
}
