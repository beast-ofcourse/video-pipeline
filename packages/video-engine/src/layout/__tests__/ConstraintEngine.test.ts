import { describe, it, expect } from 'vitest'
import { ConstraintEngine } from '../ConstraintEngine'
import type { SceneNode, SceneGraph } from '../../core/types'

it('solves center anchor correctly', () => {
  const engine = new ConstraintEngine()
  const node: SceneNode = {
    id: 'test', type: 'rect', children: [], parent: null,
    visible: true, blendMode: 'normal', opacity: 1, zIndex: 1,
    transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } },
    constraints: { anchor: 'center', maxWidth: 800, maxHeight: 600 },
    animations: [], effects: [], metadata: {}
  }
  const result = engine.solve(node, { width: 1920, height: 1080 }, { width: 1920, height: 1080 })
  expect(result.position.x).toBe(560)  // (1920 - 800) / 2
  expect(result.position.y).toBe(240)  // (1080 - 600) / 2
  expect(result.size.width).toBe(800)
  expect(result.size.height).toBe(600)
})

it('solves percentage maxWidth correctly', () => {
  const engine = new ConstraintEngine()
  const node: SceneNode = {
    id: 'test', type: 'rect', children: [], parent: null,
    visible: true, blendMode: 'normal', opacity: 1, zIndex: 1,
    transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } },
    constraints: { anchor: 'top-left', maxWidth: '80%' },
    animations: [], effects: [], metadata: {}
  }
  const result = engine.solve(node, { width: 1920, height: 1080 }, { width: 1920, height: 1080 })
  expect(result.size.width).toBe(1536)  // 1920 * 0.8
  expect(result.size.height).toBe(1080)  // defaults to parent height
})

it('returns default layout when no constraints', () => {
  const engine = new ConstraintEngine()
  const node: SceneNode = {
    id: 'test', type: 'rect', children: [], parent: null,
    visible: true, blendMode: 'normal', opacity: 1, zIndex: 1,
    transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } },
    constraints: undefined,
    animations: [], effects: [], metadata: {}
  }
  const result = engine.solve(node, { width: 1920, height: 1080 }, { width: 1920, height: 1080 })
  expect(result.position.x).toBe(0)
  expect(result.position.y).toBe(0)
})

it('solves for 9:16 aspect ratio with same scene definition', () => {
  const engine = new ConstraintEngine()
  const graph: SceneGraph = {
    scenes: [{
      id: 's1', duration: 5, fps: 30,
      camera: { type: 'orthographic', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, zoom: 1, focalLength: 50 },
      nodes: [{
        id: 'title', type: 'text', children: [], parent: null,
        visible: true, blendMode: 'normal', opacity: 1, zIndex: 1,
        transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } },
        constraints: { anchor: 'center', maxWidth: '80%', maxHeight: 200 },
        animations: [], effects: [], metadata: {}
      }]
    }],
    aspectRatio: '9:16',
    resolution: { width: 1080, height: 1920 }
  }

  const results = engine.solveAll(graph)
  const titleLayout = results.get('title')
  expect(titleLayout).toBeDefined()
  expect(titleLayout!.size.width).toBe(864)  // 1080 * 0.8
  expect(titleLayout!.position.x).toBe(108)  // (1080 - 864) / 2 = 108
})

it('applies padding correctly', () => {
  const engine = new ConstraintEngine()
  const node: SceneNode = {
    id: 'test', type: 'rect', children: [], parent: null,
    visible: true, blendMode: 'normal', opacity: 1, zIndex: 1,
    transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } },
    constraints: { anchor: 'top-left', maxWidth: 800, maxHeight: 600, padding: { top: 10, right: 20, bottom: 10, left: 20 } },
    animations: [], effects: [], metadata: {}
  }
  const result = engine.solve(node, { width: 1920, height: 1080 }, { width: 1920, height: 1080 })
  expect(result.position.x).toBe(20)
  expect(result.position.y).toBe(10)
  expect(result.size.width).toBe(760)   // 800 - 20 - 20
  expect(result.size.height).toBe(580)  // 600 - 10 - 10
})

it('bottom-right anchor positions correctly', () => {
  const engine = new ConstraintEngine()
  const node: SceneNode = {
    id: 'test', type: 'rect', children: [], parent: null,
    visible: true, blendMode: 'normal', opacity: 1, zIndex: 1,
    transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } },
    constraints: { anchor: 'bottom-right', maxWidth: 400, maxHeight: 300 },
    animations: [], effects: [], metadata: {}
  }
  const result = engine.solve(node, { width: 1920, height: 1080 }, { width: 1920, height: 1080 })
  expect(result.position.x).toBe(1520)  // 1920 - 400
  expect(result.position.y).toBe(780)   // 1080 - 300
})

it('maintains aspect ratio', () => {
  const engine = new ConstraintEngine()
  const node: SceneNode = {
    id: 'test', type: 'rect', children: [], parent: null,
    visible: true, blendMode: 'normal', opacity: 1, zIndex: 1,
    transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } },
    constraints: { anchor: 'center', maxWidth: 800, maxHeight: 600, aspectRatio: 16/9 },
    animations: [], effects: [], metadata: {}
  }
  const result = engine.solve(node, { width: 1920, height: 1080 }, { width: 1920, height: 1080 })
  // 16:9 with max 800x600 → width should be 800, height should be 800 * 9/16 = 450
  expect(result.size.width).toBe(800)
  expect(result.size.height).toBe(450)  // 800 * 9/16 = 450
})
