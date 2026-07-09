import { Camera } from '../core/types'

export interface CameraPreset {
  name: string
  apply(camera: Camera, progress: number): Camera
}

const PRESETS: Record<string, CameraPreset> = {
  'push-zoom': {
    name: 'push-zoom',
    apply: (cam, t) => ({
      ...cam,
      zoom: cam.zoom + t * 0.15,
      position: { ...cam.position, z: cam.position.z - t * 50 },
    }),
  },
  'orbit-pan': {
    name: 'orbit-pan',
    apply: (cam, t) => ({
      ...cam,
      position: {
        x: cam.position.x + Math.sin(t * Math.PI * 2) * 100,
        y: cam.position.y,
        z: cam.position.z,
      },
      rotation: {
        ...cam.rotation,
        y: cam.rotation.y + t * 30,
      },
    }),
  },
  'shake': {
    name: 'shake',
    apply: (cam, t) => ({
      ...cam,
      position: {
        x: cam.position.x + Math.sin(t * 100) * (1 - t) * 15,
        y: cam.position.y + Math.cos(t * 80) * (1 - t) * 10,
        z: cam.position.z,
      },
    }),
  },
  'dolly': {
    name: 'dolly',
    apply: (cam, t) => ({
      ...cam,
      position: { ...cam.position, z: cam.position.z - t * 200 },
    }),
  },
  'parallax': {
    name: 'parallax',
    apply: (cam, t) => ({
      ...cam,
      position: {
        x: cam.position.x + Math.sin(t * Math.PI) * 80,
        y: cam.position.y + Math.cos(t * Math.PI) * 40,
        z: cam.position.z,
      },
    }),
  },
  'follow': {
    name: 'follow',
    apply: (cam, t) => ({
      ...cam,
      position: { ...cam.position, x: cam.position.x + t * 200 },
    }),
  },
  'tilt': {
    name: 'tilt',
    apply: (cam, t) => ({
      ...cam,
      rotation: { ...cam.rotation, x: cam.rotation.x + t * 20 },
    }),
  },
  'focus-pull': {
    name: 'focus-pull',
    apply: (cam, t) => ({
      ...cam,
      depthOfField: 1 - t,
      focalLength: cam.focalLength + t * 30,
    }),
  },
}

export function applyCameraPreset(presetName: string, camera: Camera, progress: number): Camera {
  const preset = PRESETS[presetName]
  if (!preset) return camera
  return preset.apply(camera, Math.min(progress, 1))
}

export function getCameraPresetNames(): string[] {
  return Object.keys(PRESETS)
}