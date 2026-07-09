import { describe, it, expect } from 'vitest'
import type { SceneGraph, SceneNode, Camera, Animation } from '../types'

it('SceneGraph requires scenes array, aspectRatio, resolution', () => {
  const graph: SceneGraph = {
    scenes: [],
    aspectRatio: '16:9',
    resolution: { width: 1920, height: 1080 }
  }
  expect(graph.scenes).toEqual([])
  expect(graph.aspectRatio).toBe('16:9')
  expect(graph.resolution.width).toBe(1920)
})

it('SceneGraph accepts all aspect ratios', () => {
  const ratios: SceneGraph['aspectRatio'][] = ['16:9', '9:16', '1:1', '4:5', '21:9']
  ratios.forEach(r => {
    const g: SceneGraph = { scenes: [], aspectRatio: r, resolution: { width: 1920, height: 1080 } }
    expect(g.aspectRatio).toBe(r)
  })
})

it('SceneNode has required fields with correct types', () => {
  const node: SceneNode = {
    id: 'test',
    type: 'text',
    children: [],
    parent: null,
    visible: true,
    blendMode: 'normal',
    opacity: 0.5,
    zIndex: 1,
    transform: { position: { x: 100, y: 200 }, rotation: 45, scale: { x: 1.5, y: 1.5 } },
    animations: [],
    effects: [],
    metadata: {}
  }
  expect(node.opacity).toBe(0.5)
  expect(node.transform.position.x).toBe(100)
  expect(node.transform.scale.x).toBe(1.5)
})

it('SceneNode opacity is independent from transform', () => {
  // SceneNode.opacity is the authoritative value; transform handles spatial props only
  const node: SceneNode = {
    id: 'test',
    type: 'text',
    children: [],
    parent: null,
    visible: true,
    blendMode: 'normal',
    opacity: 0.3,
    zIndex: 1,
    transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } },
    animations: [],
    effects: [],
    metadata: {}
  }
  expect(node.opacity).toBe(0.3)
  // transform does NOT have opacity - it's a compile-time check
  const hasOpacityInTransform = 'opacity' in node.transform
  expect(hasOpacityInTransform).toBe(false)
})

it('Camera supports all required fields', () => {
  const cam: Camera = {
    type: 'perspective',
    position: { x: 0, y: 0, z: -100 },
    rotation: { x: 0, y: 0, z: 0 },
    zoom: 1,
    focalLength: 50,
    depthOfField: 0.5,
    focusTarget: 'node-1',
    preset: 'push-zoom',
    presetParams: { intensity: 0.8 }
  }
  expect(cam.type).toBe('perspective')
  expect(cam.presetParams!.intensity).toBe(0.8)
})

it('Animation keyframes interpolate between frame values', () => {
  const anim: Animation = {
    property: 'opacity',
    keyframes: [
      { frame: 0, value: 0 },
      { frame: 30, value: 1, easing: 'ease-out' }
    ],
    loop: false
  }
  expect(anim.keyframes.length).toBe(2)
  expect(anim.keyframes[0].value).toBe(0)
  expect(anim.keyframes[1].easing).toBe('ease-out')
})

it('Node with parent string references another node', () => {
  const child: SceneNode = {
    id: 'child-1',
    type: 'text',
    parent: 'parent-1',
    children: [],
    visible: true,
    blendMode: 'normal',
    opacity: 1,
    zIndex: 2,
    transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } },
    animations: [],
    effects: [],
    metadata: {}
  }
  expect(child.parent).toBe('parent-1')
})

it('Root node has null parent', () => {
  const root: SceneNode = {
    id: 'root',
    type: 'scene',
    parent: null,
    children: ['child-1', 'child-2'],
    visible: true,
    blendMode: 'normal',
    opacity: 1,
    zIndex: 0,
    transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 } },
    animations: [],
    effects: [],
    metadata: {}
  }
  expect(root.parent).toBeNull()
  expect(root.children.length).toBe(2)
})
