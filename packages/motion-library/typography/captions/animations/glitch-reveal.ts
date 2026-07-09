export const glitchReveal = {
  name: 'glitch-reveal',
  type: 'line',
  keyframes: [
    { property: 'translateX', frames: [{ at: 0, value: [0, -5] }, { at: 5, value: [0, 5] }, { at: 10, value: [0, -3] }, { at: 15, value: [0, 0] }] },
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 15, value: 1 }] },
    { property: 'clipPath', frames: [{ at: 0, value: 'inset(50% 0 50% 0)' }, { at: 10, value: 'inset(0 0 0 0)' }] },
  ],
  glitchArtifacts: [
    { offset: { x: -2, y: 0 }, color: '#FF00FF', opacity: 0.3, duration: 8 },
    { offset: { x: 2, y: 0 }, color: '#00FFFF', opacity: 0.3, duration: 6 },
  ],
}
