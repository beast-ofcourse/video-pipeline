export const gradientShift = {
  name: 'gradient-shift',
  type: 'line',
  pattern: [
    { property: 'backgroundPosition', frames: [{ at: 0, value: '0% 50%' }, { at: 100, value: '100% 50%' }] },
  ],
  gradientColors: ['#FF0080', '#FF8C00', '#40E0D0', '#FF0080'],
  gradientSize: '200% 100%',
  keyframes: [
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 20, value: 1 }] },
  ],
}
