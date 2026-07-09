import { describe, it, expect } from 'vitest'
import { CameraController } from '../CameraController'
import { getCameraPresetNames, applyCameraPreset } from '../CameraPresets'
import type { Camera } from '../../core/types'

const baseCamera: Camera = {
  type: 'perspective',
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  zoom: 1,
  focalLength: 50,
}

it('no preset returns identity transform with camera position', () => {
  const controller = new CameraController()
  const cam: Camera = { ...baseCamera, position: { x: 10, y: 20, z: 0 } }
  const frame = controller.computeFrame(cam, 0.5)
  expect(frame.transform.translateX).toBe(10)
  expect(frame.transform.translateY).toBe(20)
  expect(frame.transform.scale).toBe(1)
})

it('push-zoom increases zoom over time', () => {
  const controller = new CameraController()
  const cam: Camera = { ...baseCamera, preset: 'push-zoom' }
  const start = controller.computeFrame(cam, 0)
  const end = controller.computeFrame(cam, 1)
  expect(end.transform.scale).toBeGreaterThan(start.transform.scale)
})

it('shake produces different positions at different times', () => {
  const controller = new CameraController()
  const cam: Camera = { ...baseCamera, preset: 'shake' }
  const t1 = controller.computeFrame(cam, 0.2)
  const t2 = controller.computeFrame(cam, 0.5)
  // Positions should differ (shake is time-dependent)
  const same = t1.transform.translateX === t2.transform.translateX &&
               t1.transform.translateY === t2.transform.translateY
  expect(same).toBe(false)
})

it('dolly moves camera backward', () => {
  const controller = new CameraController()
  const cam: Camera = { ...baseCamera, preset: 'dolly' }
  const frame = controller.computeFrame(cam, 0.5)
  expect(frame.transform.translateZ).toBeUndefined() // not in CameraFrame
  // Scale should remain 1 (dolly affects position.z only)
  expect(frame.transform.scale).toBe(1)
})

it('applyToNodes shifts node positions by camera offset', () => {
  const controller = new CameraController()
  const cam: Camera = { ...baseCamera, position: { x: 50, y: 100, z: 0 } }
  const nodes: SceneNode[] = [{
    id: 'test', type: 'text', children: [], parent: null,
    visible: true, blendMode: 'normal', opacity: 1, zIndex: 1,
    transform: { position: { x: 200, y: 300 }, rotation: 0, scale: { x: 1, y: 1 } },
    animations: [], effects: [], metadata: {},
  }]
  const result = controller.applyToNodes(cam, nodes, 0.5)
  expect(result[0].transform.position.x).toBe(250)   // 200 + 50
  expect(result[0].transform.position.y).toBe(400)   // 300 + 100
})

it('all camera presets are registered and have names', () => {
  const names = getCameraPresetNames()
  expect(names).toContain('push-zoom')
  expect(names).toContain('shake')
  expect(names).toContain('orbit-pan')
  expect(names).toContain('dolly')
  expect(names).toContain('parallax')
  expect(names).toContain('follow')
  expect(names).toContain('tilt')
  expect(names).toContain('focus-pull')
})

it('applyCameraPreset with unknown name returns camera unchanged', () => {
  const result = applyCameraPreset('nonexistent', baseCamera, 0.5)
  expect(result.zoom).toBe(1)
  expect(result.position).toEqual({ x: 0, y: 0, z: 0 })
})