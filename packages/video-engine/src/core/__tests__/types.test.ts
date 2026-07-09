import { describe, it, expect } from 'vitest'
import type { SceneGraph, SceneNode } from '../types'

it('types are correctly structured', () => {
  // Compile-time test - if this passes, the types compile
  const graph: SceneGraph = {
    scenes: [],
    aspectRatio: '16:9',
    resolution: { width: 1920, height: 1080 }
  }
  expect(graph.aspectRatio).toBe('16:9')
})

it('SceneNode has all required fields', () => {
  const node: SceneNode = {
    id: 'test',
    type: 'text',
    children: [],
    parent: null,
    visible: true,
    blendMode: 'normal',
    opacity: 1,
    zIndex: 1,
    transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 }, opacity: 1 },
    animations: [],
    effects: [],
    metadata: {}
  }
  expect(node.id).toBe('test')
})
