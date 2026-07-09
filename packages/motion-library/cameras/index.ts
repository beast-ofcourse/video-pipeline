export interface CameraConfig {
  name: string
  preset: string
  duration: number
  easing: string
  params: Record<string, number>
}

export const cameras: CameraConfig[] = [
  { name: 'gentle-push', preset: 'push-zoom', duration: 2, easing: 'ease-out', params: { zoomFactor: 0.15 } },
  { name: 'slow-orbit', preset: 'orbit-pan', duration: 4, easing: 'linear', params: { radius: 100, speed: 0.25 } },
  { name: 'quick-shake', preset: 'shake', duration: 0.5, easing: 'ease-out', params: { intensity: 15, frequency: 100 } },
  { name: 'deep-dolly', preset: 'dolly', duration: 3, easing: 'ease-in-out', params: { distance: 200 } },
  { name: 'parallax-spin', preset: 'parallax', duration: 3, easing: 'ease-in-out', params: { xAmount: 80, yAmount: 40 } },
  { name: 'follow-pan', preset: 'follow', duration: 2, easing: 'linear', params: { distance: 200 } },
  { name: 'dramatic-tilt', preset: 'tilt', duration: 1.5, easing: 'ease-out', params: { angle: 20 } },
  { name: 'focus-rack', preset: 'focus-pull', duration: 1, easing: 'ease-in-out', params: { focalShift: 30 } },
]

export function getCamera(name: string): CameraConfig | undefined {
  return cameras.find(c => c.name === name)
}

export function getCameraNames(): string[] {
  return cameras.map(c => c.name)
}
