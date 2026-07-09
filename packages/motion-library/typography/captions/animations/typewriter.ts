export const typewriter = {
  name: 'typewriter',
  type: 'character',
  keyframes: [
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 60, value: 1 }] },
    { property: 'translateX', frames: [{ at: 0, value: [0, -10] }, { at: 60, value: [0, 0] }] },
  ],
  staggerPerCharacter: 2,
  caret: { blink: true, color: '#00FF41', width: 2 },
}
