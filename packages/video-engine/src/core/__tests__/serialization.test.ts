import { describe, it, expect } from 'vitest'
import { serializeSceneGraph, deserializeSceneGraph } from '../serialization'
import type { SceneGraph } from '../types'

const mockGraph: SceneGraph = {
  scenes: [{
    id: 'scene-1',
    duration: 4.5,
    fps: 30,
    camera: {
      type: 'perspective',
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      zoom: 1,
      focalLength: 50
    },
    nodes: [{
      id: 'title-1',
      type: 'text',
      children: [],
      parent: null,
      visible: true,
      blendMode: 'normal',
      opacity: 1,
      zIndex: 1,
      transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } },
      animations: [],
      effects: [],
      metadata: {}
    }]
  }],
  aspectRatio: '16:9',
  resolution: { width: 1920, height: 1080 }
}

it('round-trips through JSON', () => {
  const json = serializeSceneGraph(mockGraph)
  const parsed = deserializeSceneGraph(json)
  expect(parsed.scenes[0].id).toBe('scene-1')
  expect(parsed.aspectRatio).toBe('16:9')
  expect(parsed.scenes[0].nodes[0].transform.position.x).toBe(0)
})

it('serialization produces valid JSON', () => {
  const json = serializeSceneGraph(mockGraph)
  expect(() => JSON.parse(json)).not.toThrow()
  const parsed = JSON.parse(json)
  expect(parsed.scenes.length).toBe(1)
})

it('throws on empty object', () => {
  expect(() => deserializeSceneGraph('{}')).toThrow('Invalid SceneGraph')
})

it('throws on missing aspectRatio', () => {
  expect(() => deserializeSceneGraph('{"scenes":[],"resolution":{"width":1920,"height":1080}}'))
    .toThrow('aspectRatio')
})

it('throws on malformed JSON', () => {
  expect(() => deserializeSceneGraph('not-json')).toThrow()
})
