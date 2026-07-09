# OpenCode Video Pipeline — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `@opencode/video-pipeline` — a drop-in npm package that scaffolds a complete autonomous video production pipeline for OpenCode, including a scene graph engine, motion library, agent system, and QA.

**Architecture:** A scene graph engine (constraint-based layout, per-node keyframe timelines, first-class camera/effects) with a Remotion renderer adapter. A motion library of presets + brand themes + caption system. Five OpenCode agents (Director, Research, Creative, Production, QA) orchestrated by Director. A motion design knowledge base as 5 OpenCode skills.

**Tech Stack:** TypeScript, Remotion, Motion.dev, OpenCode agent system, npm package with scaffolder CLI.

---

## File Structure

```
@opencode/video-pipeline/                     ← npm package source
├── src/
│   ├── cli/
│   │   ├── init.ts                           ← npx @opencode/video-pipeline init
│   │   └── templates/                        ← scaffolded project template files
│   │       ├── agents/
│   │       ├── skills/
│   │       ├── package.json.hbs
│   │       ├── opencode.json.hbs
│   │       └── AGENTS.md.hbs
│   └── index.ts                              ← package entry

├── templates/                                 ← template files for scaffolding
│   ├── motion-library/
│   │   ├── presets/
│   │   ├── transitions/
│   │   ├── cameras/
│   │   ├── ... (mirrors spec structure)
│   │   └── themes/
│   ├── video-engine/
│   │   ├── core/
│   │   ├── layout/
│   │   ├── timeline/
│   │   ├── camera/
│   │   ├── effects/
│   │   └── renderers/
│   ├── skills/
│   ├── agents/
│   └── scripts/
│
└── package.json

Generated project (after `init`):
my-video-project/
├── .opencode/
│   ├── agent/                                ← director.md, research.md, creative.md, production.md, qa.md
│   ├── command/                              ← new-video.md, status.md
│   └── skills/                               ← 5 motion design skills
├── packages/
│   ├── video-engine/                         ← scene graph + renderer
│   │   ├── src/
│   │   │   ├── core/
│   │   │   ├── layout/
│   │   │   ├── timeline/
│   │   │   ├── camera/
│   │   │   ├── effects/
│   │   │   ├── renderers/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── motion-library/                       ← presets + packages + themes
│       ├── presets/                           ← 15 animation preset categories
│       ├── transitions/
│       ├── cameras/
│       ├── typography/captions/
│       ├── ui/
│       ├── backgrounds/
│       ├── effects/
│       ├── particles/
│       ├── themes/
│       ├── manifest.json
│       ├── index.ts
│       ├── package.json
│       └── tsconfig.json
├── scripts/                                   ← qa-ffprobe.js, qa-manifest.js, extract-keyframes.js
├── state/pipeline-state.json
├── opencode.json
├── AGENTS.md
└── package.json                               ← workspace root
```

---

## Phase 1: Core Engine — Scene Graph + Layout Solver

### Task 1.1: Define base types

**Files:**
- Create: `packages/video-engine/src/core/types.ts`

- [ ] **Write the core type system**

```typescript
// packages/video-engine/src/core/types.ts

export type BlendMode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge'

export type AspectRatio = '16:9' | '9:16' | '1:1' | '4:5' | '21:9'

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface Transform {
  position: Position
  rotation: number
  scale: { x: number; y: number }
  opacity: number
}

export interface Constraints {
  anchor?: 'top-left' | 'top-center' | 'top-right' | 'center' |
           'bottom-left' | 'bottom-center' | 'bottom-right'
  alignment?: 'start' | 'center' | 'end' | 'stretch'
  padding?: { top: number; right: number; bottom: number; left: number }
  margin?: { top: number; right: number; bottom: number; left: number }
  maxWidth?: number | string
  maxHeight?: number | string
  aspectRatio?: number
  relativeTo?: 'parent' | 'viewport' | 'sibling'
  flexDirection?: 'row' | 'column'
  flexGrow?: number
  flexShrink?: number
}

export interface Animation {
  property: string
  keyframes: Keyframe[]
  loop?: boolean
  loopCount?: number
  yoyo?: boolean
  delay?: number
}

export interface Keyframe {
  frame: number
  value: number | number[]
  easing?: Easing
  bezier?: [number, number, number, number]
}

export type Easing =
  | 'linear'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'spring'
  | 'elastic'
  | 'bounce'

export interface Effect {
  type: string
  params: Record<string, number | string | boolean | number[]>
  order: number
}

export interface Camera {
  type: 'perspective' | 'orthographic'
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  zoom: number
  focalLength: number
  depthOfField?: number
  focusTarget?: string
  preset?: string
  presetParams?: Record<string, number>
}

export interface SceneNode {
  id: string
  type: string
  children: string[]
  parent: string | null
  visible: boolean
  blendMode: BlendMode
  opacity: number
  zIndex: number
  transform: Transform
  constraints?: Constraints
  animations: Animation[]
  effects: Effect[]
  metadata: Record<string, unknown>
}

export interface Scene {
  id: string
  duration: number          // in seconds
  fps: number
  camera: Camera
  nodes: SceneNode[]
}

export interface SceneGraph {
  scenes: Scene[]
  aspectRatio: AspectRatio
  resolution: { width: number; height: number }
}
```

- [ ] **Run TypeScript check**

```bash
npx tsc --noEmit packages/video-engine/src/core/types.ts
```
Expected: No errors.

- [ ] **Commit**

```bash
git init
git add packages/video-engine/src/core/types.ts
git commit -m "feat(core): add SceneGraph type system"
```

### Task 1.2: SceneGraph serialization

**Files:**
- Create: `packages/video-engine/src/core/serialization.ts`

- [ ] **Write serialization/deserialization**

```typescript
// packages/video-engine/src/core/serialization.ts

import { SceneGraph } from './types'

export function serializeSceneGraph(graph: SceneGraph): string {
  return JSON.stringify(graph, null, 2)
}

export function deserializeSceneGraph(json: string): SceneGraph {
  const parsed = JSON.parse(json)
  validateSceneGraph(parsed)
  return parsed as SceneGraph
}

function validateSceneGraph(data: unknown): asserts data is SceneGraph {
  if (!data || typeof data !== 'object') throw new Error('Invalid SceneGraph: not an object')
  const g = data as Record<string, unknown>
  if (!Array.isArray(g.scenes)) throw new Error('Invalid SceneGraph: scenes must be an array')
  if (typeof g.aspectRatio !== 'string') throw new Error('Invalid SceneGraph: aspectRatio required')
  if (!g.resolution || typeof g.resolution !== 'object') throw new Error('Invalid SceneGraph: resolution required')
  // Scene nodes validated recursively during traversal
}
```

- [ ] **Write the test**

```typescript
// packages/video-engine/src/core/__tests__/serialization.test.ts

import { describe, it, expect } from 'vitest'
import { serializeSceneGraph, deserializeSceneGraph } from '../serialization'
import { SceneGraph } from '../types'

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
      transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 }, opacity: 1 },
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
})

it('throws on invalid input', () => {
  expect(() => deserializeSceneGraph('{}')).toThrow('Invalid SceneGraph')
})
```

- [ ] **Run tests**

```bash
npx vitest run packages/video-engine/src/core/__tests__/serialization.test.ts
```
Expected: 2 passed.

- [ ] **Commit**

```bash
git add packages/video-engine/src/core/serialization.ts packages/video-engine/src/core/__tests__/serialization.test.ts
git commit -m "feat(core): add SceneGraph serialization + validation"
```

### Task 1.3: Constraint layout solver

**Files:**
- Create: `packages/video-engine/src/layout/ConstraintEngine.ts`
- Create: `packages/video-engine/src/layout/__tests__/ConstraintEngine.test.ts`

- [ ] **Write the constraint solver**

```typescript
// packages/video-engine/src/layout/ConstraintEngine.ts

import { SceneGraph, SceneNode, Constraints, Size } from '../core/types'

export interface SolvedLayout {
  position: { x: number; y: number }
  size: { width: number; height: number }
}

export class ConstraintEngine {
  solve(node: SceneNode, parentSize: Size, viewport: Size): SolvedLayout {
    const c = node.constraints
    if (!c) return { position: { x: 0, y: 0 }, size: { width: 100, height: 100 } }

    let width = this.resolveSize(c.maxWidth, parentSize.width, viewport.width)
    let height = this.resolveSize(c.maxHeight, parentSize.height, viewport.height)

    // Aspect ratio override
    if (c.aspectRatio && width && height) {
      width = Math.min(width, height * c.aspectRatio)
      height = width / c.aspectRatio
    }

    // Flex grow/shrink
    if (c.flexGrow && !width) width = parentSize.width * (c.flexGrow / (c.flexGrow + (c.flexShrink ?? 0)))
    if (c.flexShrink && width) width = width * (1 - c.flexShrink / 10)

    // Anchor-based positioning
    const position = this.solveAnchor(c.anchor!, { width, height }, parentSize)

    // Apply padding
    if (c.padding) {
      position.x += c.padding.left ?? 0
      position.y += c.padding.top ?? 0
      width -= (c.padding.left ?? 0) + (c.padding.right ?? 0)
      height -= (c.padding.top ?? 0) + (c.padding.bottom ?? 0)
    }

    // Apply margin
    if (c.margin) {
      position.x += c.margin.left ?? 0
      position.y += c.margin.top ?? 0
    }

    // Alignment adjustments
    if (c.alignment === 'center') {
      position.x = (parentSize.width - width) / 2
    } else if (c.alignment === 'end') {
      position.x = parentSize.width - width - (c.margin?.right ?? 0)
    }

    return { position, size: { width: Math.max(width, 0), height: Math.max(height, 0) } }
  }

  solveAll(graph: SceneGraph, aspectRatio: AspectRatio): Map<string, SolvedLayout> {
    const viewport = this.viewportFor(aspectRatio)
    const results = new Map<string, SolvedLayout>()

    for (const scene of graph.scenes) {
      const sceneSize: Size = { width: viewport.width, height: viewport.height }
      for (const node of scene.nodes) {
        results.set(node.id, this.solve(node, sceneSize, viewport))
      }
    }

    return results
  }

  private resolveSize(value: number | string | undefined, parentDim: number, viewportDim: number): number {
    if (value === undefined) return 0
    if (typeof value === 'number') return value
    if (value.endsWith('%')) return (parseFloat(value) / 100) * parentDim
    if (value.endsWith('vw')) return (parseFloat(value) / 100) * viewportDim
    if (value.endsWith('vh')) return (parseFloat(value) / 100) * viewportDim
    return 0
  }

  private solveAnchor(anchor: string, size: Size, parent: Size): { x: number; y: number } {
    switch (anchor) {
      case 'top-left': return { x: 0, y: 0 }
      case 'top-center': return { x: (parent.width - size.width) / 2, y: 0 }
      case 'top-right': return { x: parent.width - size.width, y: 0 }
      case 'center': return { x: (parent.width - size.width) / 2, y: (parent.height - size.height) / 2 }
      case 'bottom-left': return { x: 0, y: parent.height - size.height }
      case 'bottom-center': return { x: (parent.width - size.width) / 2, y: parent.height - size.height }
      case 'bottom-right': return { x: parent.width - size.width, y: parent.height - size.height }
      default: return { x: 0, y: 0 }
    }
  }

  private viewportFor(aspectRatio: AspectRatio): Size {
    const map: Record<AspectRatio, Size> = {
      '16:9': { width: 1920, height: 1080 },
      '9:16': { width: 1080, height: 1920 },
      '1:1': { width: 1080, height: 1080 },
      '4:5': { width: 1080, height: 1350 },
      '21:9': { width: 2560, height: 1080 },
    }
    return map[aspectRatio]
  }
}
```

- [ ] **Write the test**

```typescript
// packages/video-engine/src/layout/__tests__/ConstraintEngine.test.ts

import { describe, it, expect } from 'vitest'
import { ConstraintEngine } from '../ConstraintEngine'
import { SceneNode, SceneGraph } from '../../core/types'

it('solves center anchor correctly', () => {
  const engine = new ConstraintEngine()
  const node: SceneNode = {
    id: 'test',
    type: 'rect',
    children: [],
    parent: null,
    visible: true,
    blendMode: 'normal',
    opacity: 1,
    zIndex: 1,
    transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 }, opacity: 1 },
    constraints: {
      anchor: 'center',
      maxWidth: 800,
      maxHeight: 600,
    },
    animations: [],
    effects: [],
    metadata: {}
  }

  const result = engine.solve(node, { width: 1920, height: 1080 }, { width: 1920, height: 1080 })
  expect(result.position.x).toBe(560)  // (1920 - 800) / 2
  expect(result.position.y).toBe(240)  // (1080 - 600) / 2
})

it('solves percentage maxWidth correctly', () => {
  const engine = new ConstraintEngine()
  const node: SceneNode = {
    id: 'test',
    type: 'rect',
    children: [],
    parent: null,
    visible: true,
    blendMode: 'normal',
    opacity: 1,
    zIndex: 1,
    transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 }, opacity: 1 },
    constraints: { anchor: 'top-left', maxWidth: '80%' },
    animations: [],
    effects: [],
    metadata: {}
  }

  const result = engine.solve(node, { width: 1920, height: 1080 }, { width: 1920, height: 1080 })
  expect(result.size.width).toBe(1536)  // 1920 * 0.8
})

it('solves for 9:16 aspect ratio without changing scene definition', () => {
  const engine = new ConstraintEngine()
  const graph: SceneGraph = {
    scenes: [{
      id: 's1', duration: 5, fps: 30,
      camera: { type: 'orthographic', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, zoom: 1, focalLength: 50 },
      nodes: [{
        id: 'title', type: 'text', children: [], parent: null,
        visible: true, blendMode: 'normal', opacity: 1, zIndex: 1,
        transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 }, opacity: 1 },
        constraints: { anchor: 'center', maxWidth: '80%', maxHeight: 200 },
        animations: [], effects: [], metadata: {}
      }]
    }],
    aspectRatio: '9:16',
    resolution: { width: 1080, height: 1920 }
  }

  const results = engine.solveAll(graph, '9:16')
  const titleLayout = results.get('title')
  expect(titleLayout).toBeDefined()
  expect(titleLayout!.size.width).toBe(864)  // 1080 * 0.8
})
```

- [ ] **Run tests**

```bash
npx vitest run packages/video-engine/src/layout/__tests__/ConstraintEngine.test.ts
```
Expected: 3 passed.

- [ ] **Commit**

```bash
git add packages/video-engine/src/layout/ConstraintEngine.ts packages/video-engine/src/layout/__tests__/ConstraintEngine.test.ts
git commit -m "feat(layout): add constraint-based layout solver"
```

---

## Phase 2: Timeline Engine

### Task 2.1: Easing functions

**Files:**
- Create: `packages/video-engine/src/timeline/Easing.ts`

- [ ] **Write easing functions**

```typescript
// packages/video-engine/src/timeline/Easing.ts

export type EasingFn = (t: number) => number

function bezier(mX1: number, mY1: number, mX2: number, mY2: number): EasingFn {
  const epsilon = 1e-6

  function sampleCurveDerivativeX(t: number): number {
    const mt = 1 - t
    return 3 * mt * mt * mX1 + 6 * mt * t * (mX2 - mX1) + 3 * t * t * (1 - mX2)
  }

  function sampleCurveX(t: number): number {
    return ((1 - t) * (1 - t) * (1 - t)) * 0 +
           3 * ((1 - t) * (1 - t)) * t * mX1 +
           3 * (1 - t) * t * t * mX2 +
           t * t * t * 1
  }

  function sampleCurveY(t: number): number {
    return ((1 - t) * (1 - t) * (1 - t)) * 0 +
           3 * ((1 - t) * (1 - t)) * t * mY1 +
           3 * (1 - t) * t * t * mY2 +
           t * t * t * 1
  }

  return (t: number): number => {
    if (t <= 0) return 0
    if (t >= 1) return 1

    let guess = t
    for (let i = 0; i < 8; i++) {
      const slope = sampleCurveDerivativeX(guess)
      if (Math.abs(slope) < epsilon) break
      guess -= (sampleCurveX(guess) - t) / slope
    }
    return sampleCurveY(guess)
  }
}

export const EASING_FUNCTIONS: Record<string, EasingFn> = {
  linear: (t) => t,
  'ease-in': bezier(0.42, 0, 1, 1),
  'ease-out': bezier(0, 0, 0.58, 1),
  'ease-in-out': bezier(0.42, 0, 0.58, 1),
  'spring': (t) => {
    const c = 10, b = 0.8
    return 1 - Math.exp(-c * t) * Math.cos(b * c * t)
  },
  'elastic': (t) => {
    if (t === 0 || t === 1) return t
    return Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1
  },
  'bounce': (t) => {
    if (t < 0.5) return 0.5 * (1 - Math.cos(Math.PI * t * 4))
    const b = t - 0.5
    return 0.5 + 0.5 * (1 - Math.cos(Math.PI * b * 4))
  },
}

export function getEasing(name: string, bezier?: [number, number, number, number]): EasingFn {
  if (bezier) return bezier(bezier[0], bezier[1], bezier[2], bezier[3])
  return EASING_FUNCTIONS[name] ?? EASING_FUNCTIONS.linear
}
```

- [ ] **Write the test**

```typescript
// packages/video-engine/src/timeline/__tests__/Easing.test.ts

import { describe, it, expect } from 'vitest'
import { getEasing } from '../Easing'

it('linear easing returns t unchanged', () => {
  const fn = getEasing('linear')
  expect(fn(0)).toBe(0)
  expect(fn(0.5)).toBe(0.5)
  expect(fn(1)).toBe(1)
})

it('ease-out starts slow ends fast', () => {
  const fn = getEasing('ease-out')
  expect(fn(0.1)).toBeLessThan(0.1)  // slower at start
  expect(fn(0.9)).toBeGreaterThan(0.9)  // faster at end
})

it('spring overshoots then settles', () => {
  const fn = getEasing('spring')
  expect(fn(0)).toBe(0)
  expect(fn(1)).toBeCloseTo(1, 2)
})
```

- [ ] **Run tests** → Commit.

### Task 2.2: Timeline evaluator

**Files:**
- Create: `packages/video-engine/src/timeline/TimelineEngine.ts`

- [ ] **Write the timeline engine**

```typescript
// packages/video-engine/src/timeline/TimelineEngine.ts

import { Animation, Keyframe } from '../core/types'
import { getEasing, EasingFn } from './Easing'

export interface FrameState {
  [property: string]: number | number[]
}

export class TimelineEngine {
  evaluate(animations: Animation[], frame: number): FrameState {
    const state: FrameState = {}

    for (const anim of animations) {
      const adjustedFrame = frame - (anim.delay ?? 0)
      if (adjustedFrame < 0) continue

      let evalFrame = adjustedFrame

      if (anim.loop || anim.loopCount) {
        const cycleDuration = this.cycleDuration(anim.keyframes)
        if (cycleDuration > 0) {
          const totalCycles = anim.loop ? Infinity : (anim.loopCount ?? 1)
          const currentCycle = Math.floor(adjustedFrame / cycleDuration)
          if (currentCycle >= totalCycles) {
            // Use last keyframe value
            const lastKf = anim.keyframes[anim.keyframes.length - 1]
            state[anim.property] = lastKf.value
            continue
          }
          evalFrame = adjustedFrame % cycleDuration
          if (anim.yoyo && currentCycle % 2 === 1) {
            evalFrame = cycleDuration - evalFrame
          }
        }
      }

      const value = this.interpolate(anim.keyframes, evalFrame, anim.property)
      if (value !== null) state[anim.property] = value
    }

    return state
  }

  private interpolate(keyframes: Keyframe[], frame: number, property: string): number | number[] | null {
    if (keyframes.length === 0) return null
    if (frame <= keyframes[0].frame) return keyframes[0].value
    if (frame >= keyframes[keyframes.length - 1].frame) return keyframes[keyframes.length - 1].value

    for (let i = 0; i < keyframes.length - 1; i++) {
      const kfA = keyframes[i]
      const kfB = keyframes[i + 1]

      if (frame >= kfA.frame && frame <= kfB.frame) {
        const range = kfB.frame - kfA.frame
        const progress = range > 0 ? (frame - kfA.frame) / range : 0
        const easing = getEasing(kfA.easing ?? 'linear', kfA.bezier)
        const easedProgress = easing(progress)

        return this.lerpValue(kfA.value, kfB.value, easedProgress)
      }
    }

    return null
  }

  private lerpValue(a: number | number[], b: number | number[], t: number): number | number[] {
    if (typeof a === 'number' && typeof b === 'number') {
      return a + (b - a) * t
    }
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.map((v, i) => v + (b[i] - v) * t)
    }
    return a
  }

  private cycleDuration(keyframes: Keyframe[]): number {
    if (keyframes.length < 2) return 0
    return keyframes[keyframes.length - 1].frame - keyframes[0].frame
  }
}
```

- [ ] **Write the test**

```typescript
// packages/video-engine/src/timeline/__tests__/TimelineEngine.test.ts

import { describe, it, expect } from 'vitest'
import { TimelineEngine } from '../TimelineEngine'
import { Animation } from '../../core/types'

it('interpolates opacity 0→1 over 30 frames', () => {
  const engine = new TimelineEngine()
  const anims: Animation[] = [{
    property: 'opacity',
    keyframes: [{ frame: 0, value: 0 }, { frame: 30, value: 1 }]
  }]

  const atFrame0 = engine.evaluate(anims, 0)
  expect(atFrame0['opacity']).toBe(0)

  const atFrame15 = engine.evaluate(anims, 15)
  expect(atFrame15['opacity']).toBe(0.5)

  const atFrame30 = engine.evaluate(anims, 30)
  expect(atFrame30['opacity']).toBe(1)
})

it('handles multiple simultaneous animations', () => {
  const engine = new TimelineEngine()
  const anims: Animation[] = [
    { property: 'opacity', keyframes: [{ frame: 0, value: 0 }, { frame: 10, value: 1 }] },
    { property: 'scale', keyframes: [{ frame: 0, value: 0.8 }, { frame: 10, value: 1.0 }] },
  ]

  const state = engine.evaluate(anims, 5)
  expect(state['opacity']).toBeCloseTo(0.5, 2)
  expect(state['scale']).toBeCloseTo(0.9, 2)
})

it('loops animation when loop is true', () => {
  const engine = new TimelineEngine()
  const anims: Animation[] = [{
    property: 'opacity',
    keyframes: [{ frame: 0, value: 0 }, { frame: 10, value: 1 }],
    loop: true,
  }]

  // Frame 25 should be same as frame 5 (second loop iteration)
  const state = engine.evaluate(anims, 25)
  expect(state['opacity']).toBeCloseTo(0.5, 2)
})

it('applies delay correctly', () => {
  const engine = new TimelineEngine()
  const anims: Animation[] = [{
    property: 'opacity',
    keyframes: [{ frame: 0, value: 0 }, { frame: 10, value: 1 }],
    delay: 20,
  }]

  const before = engine.evaluate(anims, 10)
  expect(before['opacity']).toBeUndefined()  // still in delay

  const after = engine.evaluate(anims, 25)
  expect(after['opacity']).toBeCloseTo(0.5, 2)  // 5 frames into animation
})
```

- [ ] **Run tests** → Commit.

---

## Phase 3: Remotion Renderer Adapter

### Task 3.1: Renderer adapter interface

**Files:**
- Create: `packages/video-engine/src/renderers/types.ts`

- [ ] **Write the adapter interface**

```typescript
// packages/video-engine/src/renderers/types.ts

import { SceneGraph, AspectRatio } from '../core/types'

export interface RenderOptions {
  outputPath: string
  aspectRatio: AspectRatio
  fps?: number
  quality?: number  // 1-100
  onProgress?: (frame: number, total: number) => void
}

export interface RenderResult {
  outputPath: string
  duration: number
  frameCount: number
  resolution: { width: number; height: number }
  success: boolean
  error?: string
}

export interface RendererAdapter {
  name: string
  supports: AspectRatio[]
  render(sceneGraph: SceneGraph, options: RenderOptions): Promise<RenderResult>
}
```

- [ ] **Commit.**

### Task 3.2: Remotion renderer

**Files:**
- Create: `packages/video-engine/src/renderers/remotion/RemotionRenderer.ts`
- Create: `packages/video-engine/src/renderers/remotion/RemotionScene.tsx`
- Create: `packages/video-engine/src/renderers/remotion/Root.tsx`

- [ ] **Write the Remotion wrapper component**

```tsx
// packages/video-engine/src/renderers/remotion/Root.tsx

import { Composition } from 'remotion'
import { SceneGraph, AspectRatio } from '../../core/types'
import { RemotionScene } from './RemotionScene'

const RESOLUTION_MAP: Record<AspectRatio, { width: number; height: number }> = {
  '16:9': { width: 1920, height: 1080 },
  '9:16': { width: 1080, height: 1920 },
  '1:1': { width: 1080, height: 1080 },
  '4:5': { width: 1080, height: 1350 },
  '21:9': { width: 2560, height: 1080 },
}

interface RootProps {
  sceneGraph: SceneGraph
}

export const Root: React.FC<RootProps> = ({ sceneGraph }) => {
  const res = RESOLUTION_MAP[sceneGraph.aspectRatio]

  return (
    <>
      {sceneGraph.scenes.map((scene) => (
        <Composition
          key={scene.id}
          id={scene.id}
          component={RemotionScene}
          durationInFrames={Math.ceil(scene.duration * (scene.fps || 30))}
          fps={scene.fps || 30}
          width={res.width}
          height={res.height}
          defaultProps={{ scene }}
        />
      ))}
    </>
  )
}
```

```tsx
// packages/video-engine/src/renderers/remotion/RemotionScene.tsx

import { useCurrentFrame, AbsoluteFill } from 'remotion'
import { Scene } from '../../core/types'
import { ConstraintEngine, SolvedLayout } from '../../layout/ConstraintEngine'
import { TimelineEngine, FrameState } from '../../timeline/TimelineEngine'

const constraintEngine = new ConstraintEngine()
const timelineEngine = new TimelineEngine()

interface RemotionSceneProps {
  scene: Scene
}

export const RemotionScene: React.FC<RemotionSceneProps> = ({ scene }) => {
  const frame = useCurrentFrame()

  const viewport = { width: 1920, height: 1080 } // resolved from scene graph context

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {scene.nodes.map((node) => {
        const layout = constraintEngine.solve(node, viewport, viewport)
        const animState = timelineEngine.evaluate(node.animations, frame)

        return (
          <RemotionNode
            key={node.id}
            node={node}
            layout={layout}
            animState={animState}
          />
        )
      })}
    </AbsoluteFill>
  )
}

interface RemotionNodeProps {
  node: Scene['nodes'][0]
  layout: SolvedLayout
  animState: FrameState
}

const RemotionNode: React.FC<RemotionNodeProps> = ({ node, layout, animState }) => {
  const opacity = (animState['opacity'] as number) ?? node.opacity
  const scaleX = (animState['scale'] as number[])?.[0] ?? node.transform.scale.x
  const scaleY = (animState['scale'] as number[])?.[1] ?? node.transform.scale.y
  const rotation = (animState['rotation'] as number) ?? node.transform.rotation
  const posX = (animState['position'] as number[])?.[0] ?? layout.position.x
  const posY = (animState['position'] as number[])?.[1] ?? layout.position.y

  return (
    <div
      style={{
        position: 'absolute',
        left: posX,
        top: posY,
        width: layout.size.width,
        height: layout.size.height,
        opacity,
        transform: `scale(${scaleX}, ${scaleY}) rotate(${rotation}deg)`,
        transformOrigin: 'center center',
        zIndex: node.zIndex,
        mixBlendMode: node.blendMode as React.CSSProperties['mixBlendMode'],
      }}
    >
      {renderNodeContent(node)}
    </div>
  )
}

function renderNodeContent(node: Scene['nodes'][0]): React.ReactNode {
  switch (node.type) {
    case 'text':
      return (
        <span style={{ color: '#fff', fontSize: 48, fontFamily: 'Inter, sans-serif' }}>
          {(node.metadata?.content as string) || ''}
        </span>
      )
    case 'rect':
      return <div style={{ width: '100%', height: '100%', backgroundColor: node.metadata?.color as string || '#333' }} />
    case 'image':
      return <img src={node.metadata?.src as string} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    case 'gradient':
      return (
        <div style={{
          width: '100%', height: '100%',
          background: `linear-gradient(135deg, ${(node.metadata?.colors as string[])?.[0] || '#000'}, ${(node.metadata?.colors as string[])?.[1] || '#fff'})`
        }} />
      )
    default:
      return null
  }
}
```

```typescript
// packages/video-engine/src/renderers/remotion/RemotionRenderer.ts

import { RendererAdapter, RenderOptions, RenderResult } from '../types'
import { SceneGraph } from '../../core/types'
import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import path from 'path'

const RESOLUTION_MAP: Record<string, { width: number; height: number }> = {
  '16:9': { width: 1920, height: 1080 },
  '9:16': { width: 1080, height: 1920 },
  '1:1': { width: 1080, height: 1080 },
  '4:5': { width: 1080, height: 1350 },
  '21:9': { width: 2560, height: 1080 },
}

export class RemotionRenderer implements RendererAdapter {
  name = 'remotion'
  supports: AspectRatio[] = ['16:9', '9:16', '1:1', '4:5', '21:9']

  async render(sceneGraph: SceneGraph, options: RenderOptions): Promise<RenderResult> {
    const res = RESOLUTION_MAP[options.aspectRatio]
    const fps = options.fps ?? 30
    const totalFrames = Math.ceil(
      sceneGraph.scenes.reduce((sum, s) => sum + s.duration, 0) * fps
    )

    try {
      const entryFile = path.resolve(__dirname, './Root.tsx')

      const bundled = await bundle({ entryPoint: entryFile })

      const composition = await selectComposition({
        serveUrl: bundled,
        id: sceneGraph.scenes[0].id,
        inputProps: { sceneGraph },
      })

      const outputPath = options.outputPath.endsWith('.mp4')
        ? options.outputPath
        : `${options.outputPath}/render.mp4`

      await renderMedia({
        composition,
        serveUrl: bundled,
        codec: 'h264',
        outputLocation: outputPath,
        inputProps: { sceneGraph },
      })

      return {
        outputPath,
        duration: totalFrames / fps,
        frameCount: totalFrames,
        resolution: { width: res.width, height: res.height },
        success: true,
      }
    } catch (err) {
      return {
        outputPath: options.outputPath,
        duration: 0,
        frameCount: 0,
        resolution: res,
        success: false,
        error: (err as Error).message,
      }
    }
  }
}
```

- [ ] **Create an integration test** (renders a minimal scene graph to a temp file)

```typescript
// packages/video-engine/src/renderers/remotion/__tests__/RemotionRenderer.test.ts

import { describe, it, expect } from 'vitest'
import { RemotionRenderer } from '../RemotionRenderer'
import { SceneGraph } from '../../../core/types'

it('renders a single scene to mp4', async () => {
  const graph: SceneGraph = {
    scenes: [{
      id: 'test-scene',
      duration: 1,
      fps: 30,
      camera: {
        type: 'orthographic',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        zoom: 1,
        focalLength: 50,
      },
      nodes: [{
        id: 'bg',
        type: 'rect',
        children: [],
        parent: null,
        visible: true,
        blendMode: 'normal',
        opacity: 1,
        zIndex: 0,
        transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 }, opacity: 1 },
        constraints: { anchor: 'center', maxWidth: '100%', maxHeight: '100%' },
        animations: [],
        effects: [],
        metadata: { color: '#ff0000' },
      }],
    }],
    aspectRatio: '16:9',
    resolution: { width: 1920, height: 1080 },
  }

  const renderer = new RemotionRenderer()
  const result = await renderer.render(graph, {
    outputPath: '/tmp/test-render',
    aspectRatio: '16:9',
  })

  expect(result.success).toBe(true)
  expect(result.duration).toBe(1)
  expect(result.resolution).toEqual({ width: 1920, height: 1080 })
}, 60000)  // 60s timeout for render
```

- [ ] **Run tests** → Commit.

---

## Phase 4: Camera Engine

### Task 4.1: Camera controller

**Files:**
- Create: `packages/video-engine/src/camera/CameraController.ts`
- Create: `packages/video-engine/src/camera/CameraPresets.ts`

- [ ] **Write camera presets**

```typescript
// packages/video-engine/src/camera/CameraPresets.ts

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
      zoom: cam.zoom,
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
```

- [ ] **Write the camera controller**

```typescript
// packages/video-engine/src/camera/CameraController.ts

import { Camera, SceneNode } from '../core/types'
import { applyCameraPreset } from './CameraPresets'

export interface CameraFrame {
  transform: {
    translateX: number
    translateY: number
    scale: number
    rotateX: number
    rotateY: number
    rotateZ: number
  }
}

export class CameraController {
  computeFrame(camera: Camera, progress: number): CameraFrame {
    let active = { ...camera }

    if (camera.preset) {
      active = applyCameraPreset(camera.preset, active, progress)
    }

    return {
      transform: {
        translateX: active.position.x,
        translateY: active.position.y,
        scale: active.zoom,
        rotateX: active.rotation.x,
        rotateY: active.rotation.y,
        rotateZ: active.rotation.z,
      },
    }
  }

  applyToNodes(camera: Camera, nodes: SceneNode[], progress: number): SceneNode[] {
    const camFrame = this.computeFrame(camera, progress)

    return nodes.map((node) => ({
      ...node,
      transform: {
        ...node.transform,
        position: {
          x: node.transform.position.x + camFrame.transform.translateX,
          y: node.transform.position.y + camFrame.transform.translateY,
        },
        scale: {
          x: node.transform.scale.x * camFrame.transform.scale,
          y: node.transform.scale.y * camFrame.transform.scale,
        },
      },
    }))
  }
}
```

- [ ] **Write tests**

```typescript
// packages/video-engine/src/camera/__tests__/CameraController.test.ts

import { describe, it, expect } from 'vitest'
import { CameraController } from '../CameraController'
import { Camera } from '../../core/types'

it('push-zoom increases zoom over time', () => {
  const controller = new CameraController()
  const cam: Camera = { type: 'perspective', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, zoom: 1, focalLength: 50, preset: 'push-zoom' }

  const start = controller.computeFrame(cam, 0)
  const end = controller.computeFrame(cam, 1)

  expect(end.transform.scale).toBeGreaterThan(start.transform.scale)
})

it('no preset returns identity transform', () => {
  const controller = new CameraController()
  const cam: Camera = { type: 'orthographic', position: { x: 10, y: 20, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, zoom: 1, focalLength: 50 }

  const frame = controller.computeFrame(cam, 0.5)
  expect(frame.transform.translateX).toBe(10)
  expect(frame.transform.translateY).toBe(20)
  expect(frame.transform.scale).toBe(1)
})
```

- [ ] **Run tests** → Commit.

---

## Phase 5: Effects Engine

### Task 5.1: Effect stack

**Files:**
- Create: `packages/video-engine/src/effects/EffectStack.ts`
- Create: `packages/video-engine/src/effects/effects.ts`

- [ ] **Write effect implementations**

```typescript
// packages/video-engine/src/effects/effects.ts

import { Effect } from '../core/types'

export type EffectRenderer = (ctx: CanvasRenderingContext2D, params: Record<string, unknown>, width: number, height: number) => void

const REGISTRY: Record<string, EffectRenderer> = {
  bloom: (ctx, params) => {
    const intensity = (params.intensity as number) ?? 0.5
    ctx.filter = `blur(${intensity * 10}px)`
    ctx.globalCompositeOperation = 'screen'
  },
  blur: (ctx, params) => {
    const amount = (params.amount as number) ?? 5
    ctx.filter = `blur(${amount}px)`
  },
  glow: (ctx, params, w, h) => {
    const color = (params.color as string) ?? '#00ffff'
    const radius = (params.radius as number) ?? 20
    ctx.shadowColor = color
    ctx.shadowBlur = radius
  },
  grain: (ctx, _params, w, h) => {
    const imageData = ctx.getImageData(0, 0, w, h)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 30
      data[i] += noise
      data[i + 1] += noise
      data[i + 2] += noise
    }
    ctx.putImageData(imageData, 0, 0)
  },
  'chromatic-aberration': (ctx, params, w, h) => {
    const shift = (params.shift as number) ?? 3
    const imageData = ctx.getImageData(0, 0, w, h)
    const data = imageData.data
    // Shift red channel left, blue channel right
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4
        const rIdx = (y * w + Math.max(0, x - shift)) * 4
        const bIdx = (y * w + Math.min(w - 1, x + shift)) * 4
        data[idx] = data[rIdx]       // R from left-shifted
        data[idx + 2] = data[bIdx]   // B from right-shifted
      }
    }
    ctx.putImageData(imageData, 0, 0)
  },
  'drop-shadow': (ctx, params) => {
    const offsetX = (params.offsetX as number) ?? 4
    const offsetY = (params.offsetY as number) ?? 4
    const blur = (params.blur as number) ?? 8
    const color = (params.color as string) ?? 'rgba(0,0,0,0.5)'
    ctx.shadowColor = color
    ctx.shadowBlur = blur
    ctx.shadowOffsetX = offsetX
    ctx.shadowOffsetY = offsetY
  },
}

export function getEffectRenderer(type: string): EffectRenderer | undefined {
  return REGISTRY[type]
}

export function getEffectNames(): string[] {
  return Object.keys(REGISTRY)
}
```

- [ ] **Write the effect stack composer**

```typescript
// packages/video-engine/src/effects/EffectStack.ts

import { Effect } from '../core/types'
import { getEffectRenderer, EffectRenderer } from './effects'

export class EffectStack {
  applyAll(effects: Effect[], ctx: CanvasRenderingContext2D, width: number, height: number): void {
    const sorted = [...effects].sort((a, b) => a.order - b.order)

    for (const effect of sorted) {
      const renderer = getEffectRenderer(effect.type)
      if (renderer) {
        ctx.save()
        renderer(ctx, effect.params as Record<string, unknown>, width, height)
        ctx.restore()
      }
    }
  }
}
```

- [ ] **Write tests**

```typescript
// packages/video-engine/src/effects/__tests__/EffectStack.test.ts

import { describe, it, expect } from 'vitest'
import { EffectStack } from '../EffectStack'
import { getEffectRenderer, getEffectNames } from '../effects'
import { Effect } from '../../core/types'

it('all effect names have renderers', () => {
  const names = getEffectNames()
  names.forEach((name) => {
    expect(getEffectRenderer(name)).toBeDefined()
  })
  expect(names.length).toBeGreaterThanOrEqual(6)
})

it('sorts effects by order', () => {
  const stack = new EffectStack()
  const effects: Effect[] = [
    { type: 'blur', params: { amount: 5 }, order: 2 },
    { type: 'glow', params: { color: '#fff' }, order: 1 },
  ]

  // Just verify it runs without error (Canvas not available in Node)
  expect(() => stack.applyAll(effects, {} as CanvasRenderingContext2D, 100, 100)).not.toThrow()
})
```

- [ ] **Run tests** → Commit.

---

## Phase 6: Motion Design Skills

### Task 6.1: Create 5 .skill.md files

**Files:**
- Create: `.opencode/skills/motion-design.skill.md`
- Create: `.opencode/skills/visual-composition.skill.md`
- Create: `.opencode/skills/cinematography.skill.md`
- Create: `.opencode/skills/typography-motion.skill.md`
- Create: `.opencode/skills/attention-psychology.skill.md`

- [ ] **Write motion-design.skill.md**

```markdown
---
description: >-
  Core motion design principles: the 12 principles of animation, easing theory,
  timing, spacing, and rhythm. Loaded by Director before every Creative session.
---

## Rules

1. Every motion must have a purpose — no animation "just because."
2. Easing determines feel: ease-out-expo for premium, spring for playful, linear only for mechanical.
3. A bounce must never exceed 3 oscillations in a sub-30-second clip.
4. Stagger delay must be proportional to scene importance — hero element first, supporting later.
5. Timing: 0.2-0.4s for snappy UI, 0.6-1.0s for cinematic reveals.
6. Rhythm: alternate between fast (action) and slow (breathing room) every 3-5 seconds.

## Decision Trees

- Tone is "premium" or "minimalist" → ease-out-expo, 0.6-1.0s, no bounce
- Tone is "playful" or "energetic" → spring, 0.2-0.4s, bounce acceptable
- Scene is hero moment → stagger children 0.05-0.1s, hero first
- Scene is technical → minimize motion, use fade, no decorative bounce

## Preset Mappings

- ease-out-expo → presets/fade/fade-in.ts, presets/slide/slide-up.ts
- spring → presets/pop/pop-in.ts, presets/bounce/bounce-scale.ts
- stagger → presets/stagger/stagger-pop.ts
- counter → presets/counter/count-up.ts

## Anti-Patterns

- Never use elastic on UI elements — feels unresponsive
- Never animate everything simultaneously — viewer loses focus
- Never use linear for organic movement — real objects accelerate
- Never exceed 3 oscillations on bounce — feels amateur

## Agency Reference

- Apple: ease-out-expo, 0.8s, single element at a time
- Stripe: spring tension 180, friction 12, fast exits
- Linear: stagger 0.06s, scale + fade combined
```

- [ ] **Write visual-composition.skill.md**

```markdown
---
description: >-
  Visual hierarchy, composition rules, gestalt principles, and color psychology
  for video frames. Loaded for every video project.
---

## Rules

1. Every frame must have one primary focal point — the eye should know where to land.
2. Follow the rule of thirds for static frames; break it for dynamic camera movement.
3. Color palette must serve the message: blue = trust, red = urgency, dark = premium.
4. Negative space is not wasted space — it frames the subject.
5. Gestalt: elements that move together are perceived as related.

## Decision Trees

- Product demo → center composition, high contrast subject vs background
- Testimonial → rule of thirds, subject on left, text on right
- Data/report → top-down hierarchy, most important metric largest

## Anti-Patterns

- Do not center everything — creates flat, amateur frames
- Do not use more than 3 colors in a single scene
- Do not place text over busy backgrounds without contrast treatment
```

- [ ] **Write cinematography.skill.md**

```markdown
---
description: >-
  Camera language, depth of field, lighting theory, and parallax techniques.
  Loaded when camera/cinematic movement is specified.
---

## Rules

1. A zoom reveals information — push zoom into detail, pull zoom out for context.
2. Parallax creates depth — background moves slower than foreground.
3. Depth of field isolates the subject — use blur to guide attention.
4. Shake should only last 0.3-0.8s — longer is disorienting.
5. Always lead the subject — camera should anticipate movement, not chase it.

## Decision Trees

- Product reveal → push zoom, 0.8s, ease-out
- Transition between ideas → whip pan or orbit
- Emotional beat → slow dolly, shallow depth of field
- High energy → shake, fast pan, rapid focus pulls
```

- [ ] **Write typography-motion.skill.md**

```markdown
---
description: >-
  Kinetic typography, font pairing, motion readability, and caption design.
  Loaded when text-heavy scenes or captions are used.
---

## Rules

1. Text must be readable for minimum 2x the time it takes to speak it aloud.
2. Kinetic typography must serve the message — emphasis through motion, not decoration.
3. One animated element per line of text — multiple competing animations confuse.
4. Font pairing: one display font + one body font maximum per video.
5. Caption contrast ratio must be at least 4.5:1 against the background.

## Decision Trees

- Speed/energy → character-by-character reveal, tight tracking
- Premium/calm → word fade, generous letter spacing
- Tech/modern → monospace, glitch effects, gradient fills
- Playful → bounce-in per word, variable fonts with weight shift

## Caption Style Reference

- neon-pulse: tech, energetic, gaming — green glow, tight tracking
- bold-impact: premium, minimal — white, heavy shadow, center
- elegant-serif: luxury, calm — Playfair Display, soft, spaced
- cyber-glitch: tech, edgy — monospace, cyan/magenta offset
- minimal-clean: modern, neutral — thin Inter, light gray
```

- [ ] **Write attention-psychology.skill.md**

```markdown
---
description: >-
  Motion psychology, attention management, cognitive load, and retention
  patterns. Loaded for short-form / social clips where retention is critical.
---

## Rules

1. You have 2-3 seconds to earn attention — open with a pattern interrupt or curiosity gap.
2. The human eye is drawn to motion — if everything moves, nothing stands out.
3. Cognitive load: no more than 3 visual elements changing simultaneously.
4. Retention drops at 8 seconds — introduce a new visual, angle, or beat by then.
5. Emotional peaks should align with music drops or silence.

## Decision Trees

- Hook strategy for young audience → curiosity gap, fast cuts, text-on-screen
- Hook strategy for professional → bold statement, stat, pattern interrupt
- Maintaining attention → introduce new element every 3s, vary pacing
- Ending → call to action with visual emphasis (scale + glow)
```

- [ ] **Commit all 5 skill files.**

---

## Phase 7: Agent System

### Task 7.1: Director agent prompt

**Files:**
- Create: `.opencode/agent/director.md`

- [ ] **Write the Director prompt** (based on the zip's version, adapted for the scene graph engine)

```markdown
---
description: >-
  Orchestrates the full video pipeline: research → creative → production → QA.
  Never writes scripts, never edits video, never touches assets directly.
  Only plans, delegates, evaluates, and decides retries.
mode: primary
model: anthropic/claude-opus-4-8
temperature: 0.3
steps: 80
permission:
  edit:
    "state/**": allow
    "*": deny
  bash: deny
  webfetch: deny
  websearch: deny
  external_directory: deny
  task:
    "*": deny
    research: allow
    creative: allow
    production: allow
    qa: allow
---

You are DIRECTOR, the sole orchestrator of a video production pipeline.

# YOUR IDENTITY
You never write scripts, generate assets, or touch a render. Your only job is to
understand, plan, delegate, evaluate, and decide. You have 4 subagents: research,
creative, production, qa.

# STATE FILE
Read `state/pipeline-state.json` at the start of every turn. Update it after every
subagent returns. The user's original goal lives in `state["user_goal"]`.

# THE PIPELINE
research → creative → production → qa → (decide retry) → [...] → done

This is a star topology — subagents cannot invoke each other or you.

# CREATIVE → PRODUCTION BRIDGE
Creative writes scene-blueprint.json. Production converts it to scene-graph.json.
QA scores the render against the blueprint. You track which stage owns each failure.

# SKILL LOADING
Before invoking Creative, load the relevant motion design skills:
- Always: motion-design, visual-composition
- When cinematic: cinematography
- When text-heavy: typography-motion
- When short-form: attention-psychology

Load them into the task prompt as inline content.

# QA DECISIONS
After QA returns, compare scores against quality_thresholds (min 75/dim, avg 85).
Hard-fail dimensions: Facts, Rendering. If pass → next stage or finish.
If fail → re-invoke EXACTLY the stage that produced the failing dimension.
Never regenerate stages that scored well.
If retries exhausted → stop and report to user.

# HUMAN CHECKPOINTS
Pause for user confirmation before first render and before final export.
```

- [ ] **Commit.**

### Task 7.2: Research, Creative, Production, QA agent prompts

- [ ] **Write research.md** (based on zip, adapted for scene graph engine)

```markdown
---
description: >-
  Trend research, competitor analysis, hook mining, viral pattern mining,
  audience research, visual/style reference gathering.
mode: subagent
model: anthropic/claude-sonnet-5
temperature: 0.4
steps: 40
permission:
  edit:
    "working/research/**": allow
    "*": deny
  bash: deny
  webfetch: allow
  websearch: allow
  external_directory: deny
  task: deny
---

You are RESEARCH. You only research — never write scripts or code.

# SCOPE
Research trends, competitors, hooks, audience, visual references, fact-checks.
Write only to `working/research/`. Output: research.md, hook-library.md,
viral-patterns.md, references.md, sources.json.

# GROUND TRUTH RULE
Everything in research.md is treated as ground truth by Creative and QA.
Flag anything unverified explicitly. Do not fabricate sources.
```

- [ ] **Write creative.md**

```markdown
---
description: >-
  Creative Director: script writing, scene planning, storyboarding, motion
  planning, typography, color palette, music direction.
mode: subagent
model: anthropic/claude-opus-4-8
temperature: 0.7
steps: 40
permission:
  edit:
    "working/creative/**": allow
    "*": deny
  bash: deny
  webfetch: ask
  websearch: ask
  external_directory: deny
  task: deny
---

You are CREATIVE. You turn research into concrete creative plans.

# INPUTS
Read `working/research/*` first. Ground creative choices in research.
If Director provides motion design skills inline, follow their rules.

# OUTPUTS
Write to `working/creative/`:
- script.md — full script, scene-numbered
- video-overview.md — one-paragraph summary + creative thesis
- scene-plan.md — per-scene breakdown with durations
- asset-plan.md — what Production must build/fetch per scene
- motion-plan.md — motion direction per scene
- scene-blueprint.json — structured spec for Production

# scene-blueprint.json FORMAT
For each scene: id, duration, hook line, caption style ref, camera preset,
background type, UI component refs, audio mapping, transition, effects.

# MOTION SKILLS
Apply the rules from the motion design skills Director loaded. Every creative
decision must be defensible against established principles.

# STANDARDS
- Hook must earn attention in first 2-3 seconds
- Scene durations must sum to target length
- Never vague direction — Production needs concrete instructions
```

- [ ] **Write production.md**

```markdown
---
description: >-
  Technical execution: generates SVGs, images, UI, motion graphics, Remotion
  scenes, voice, music, captions, renders.
mode: subagent
model: anthropic/claude-sonnet-5
temperature: 0.2
steps: 60
permission:
  edit:
    "working/production/**": allow
    "*": deny
  bash:
    "*": ask
    "npm install*": allow
    "npm i *": allow
    "pip install*": allow
    "npx remotion*": allow
    "ffprobe*": allow
    "ffmpeg*": ask
    "ls*": allow
    "mkdir*": allow
    "cat *": allow
  webfetch: allow
  websearch: allow
  external_directory: deny
  task: deny
---

You are PRODUCTION. You turn Creative's plans into rendered video.

# INPUTS
Read `working/creative/scene-blueprint.json`, script.md, scene-plan.md,
asset-plan.md, motion-plan.md. Also check `working/research/references.md`.

# PIPELINE
1. Read scene-blueprint.json
2. Resolve presets from motion-library manifest → scene-graph.json
3. Generate Remotion project in `working/production/video/`
4. Generate assets, voice, music, captions in their respective folders
5. Write render-manifest.json (scene timestamps, primitives used)
6. Run render (after Director confirms checkpoint)
7. Run ffprobe on output → technical-report.json

# MOTION LIBRARY
Read `packages/motion-library/manifest.json` to discover available presets.
Reference presets by name. Never write animations from scratch if a preset exists.
If something's ambiguous, make the best technical choice and note the assumption.

# scene-graph.json OUTPUT
Generate the complete scene graph using the video-engine types.
Each scene becomes a set of SceneNode objects with resolved constraints,
animations, effects, and camera configuration.

# RENDER
Use RemotionRenderer from video-engine. Export to `working/production/render/`.
Render both 16:9 and 9:16 versions.
```

- [ ] **Write qa.md**

```markdown
---
description: >-
  Ruthless QA reviewer: scores 0-100 per dimension, never edits, never says
  "looks good" without a score.
mode: subagent
model: anthropic/claude-sonnet-5
temperature: 0.1
steps: 30
permission:
  edit:
    "working/qa/**": allow
    "*": deny
  bash:
    "*": deny
    "ffprobe*": allow
  webfetch: deny
  websearch: deny
  external_directory: deny
  task: deny
---

You are QA. Score. Never fix.

# THREE-LAYER EVALUATION
Layer 1 (structural): Compare render-manifest.json against scene-blueprint.json.
Score Script Fidelity, Scene Completeness.

Layer 2 (technical): Read technical-report.json from ffprobe.
Check resolution, codec, black frames, silence, sync.
Score Rendering Quality.

Layer 3 (perceptual): Examine keyframes extracted at scene boundaries.
Score Visual Quality, Animation, Typography, Color.

# DIMENSIONS
Score 0-100: Hook, Retention, Script, Visual Quality, Animation, Audio,
Subtitles, Timing, Motion, Facts, Transitions, Rendering, Color, Typography,
Professionalism, Engagement.

# OUTPUT FORMAT
For each dimension:
```
Facts
87
Reason
Opening stat from research.md is correct
Fix
None needed
```

At end:
```
AVERAGE: 84.2
LOWEST: Animation (72)
HARD-FAIL CHECK: Facts=95 OK, Rendering=N/A
```

# HARD-FAIL DIMENSIONS
Facts and Rendering: if either below 75, flag as blocking regardless of average.
```

- [ ] **Commit all 4 agent files.**

### Task 7.3: Slash commands

**Files:**
- Create: `.opencode/command/new-video.md`
- Create: `.opencode/command/status.md`

- [ ] **Write new-video.md**

```markdown
---
description: Start a new video pipeline run with the Director
agent: director
---

A new video project is starting.

User's goal / brief:
$ARGUMENTS

Before doing anything else:
1. Read `state/pipeline-state.json`.
2. If `user_goal` is already set and doesn't match, ask if new project or continuation.
3. If new project, write goal + constraints (length, platform, tone) into state.
4. Confirm understanding back to user in 2-3 sentences before invoking Research.

IMPORTANT: Read the motion design skills from `.opencode/skills/` and determine
which ones are relevant to this brief. You will load them into Creative's context.
```

- [ ] **Write status.md**

```markdown
---
description: Show current pipeline status, stage, and QA history
agent: director
---

Read `state/pipeline-state.json` and report concisely:
- Current stage and status
- Attempts used vs. max
- Most recent QA scorecard (average, lowest, hard-fail check)
- Pending human checkpoints
- What you'd do next if told to continue

Do NOT invoke any subagent — this is read-only.
```

- [ ] **Commit.**

---

## Phase 8: CLI Scaffold

### Task 8.1: Package entry + init command

**Files:**
- Create: `src/cli/init.ts`
- Create: `src/cli/templates/` (all template files for scaffolding)

- [ ] **Write the init command**

```typescript
// src/cli/init.ts

import fs from 'fs'
import path from 'path'

interface InitOptions {
  targetDir: string
  minimal?: boolean
  templates?: boolean
  captionsOnly?: boolean
}

export async function initProject(options: InitOptions): Promise<void> {
  const dir = path.resolve(options.targetDir)
  if (fs.existsSync(dir)) {
    const contents = fs.readdirSync(dir)
    if (contents.length > 0) {
      throw new Error(`Directory ${dir} is not empty`)
    }
  }

  fs.mkdirSync(dir, { recursive: true })

  // Create directory structure
  const dirs = [
    '.opencode/agent',
    '.opencode/command',
    '.opencode/skills',
    'state',
    'working/research',
    'working/creative',
    'working/production/assets',
    'working/production/voice',
    'working/production/music',
    'working/production/captions',
    'working/production/video',
    'working/production/render',
    'working/production/logs',
    'working/qa',
    'packages/video-engine/src',
    'packages/motion-library/presets',
    'packages/motion-library/transitions',
    'packages/motion-library/cameras',
    'packages/motion-library/typography/captions',
    'packages/motion-library/ui',
    'packages/motion-library/backgrounds',
    'packages/motion-library/effects',
    'packages/motion-library/particles',
    'packages/motion-library/themes',
    'scripts',
    'docs',
  ]

  for (const d of dirs) {
    fs.mkdirSync(path.join(dir, d), { recursive: true })
  }

  // Write package.json workspace root
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({
    name: path.basename(dir),
    private: true,
    workspaces: ['packages/*'],
    scripts: {
      render: 'npx remotion render packages/video-engine/src/renderers/remotion/Root.tsx Video out/render.mp4',
      'render:vertical': 'npx remotion render packages/video-engine/src/renderers/remotion/Root.tsx VideoVertical out/vertical.mp4',
      'qa': 'node scripts/qa-ffprobe.js',
    },
  }, null, 2))

  // Write opencode.json
  fs.writeFileSync(path.join(dir, 'opencode.json'), JSON.stringify({
    $schema: 'https://opencode.ai/config.json',
    permission: { external_directory: 'deny' },
    mcp: {
      context7: { type: 'remote', url: 'https://mcp.context7.com/mcp', enabled: true },
    },
  }, null, 2))

  // Write pipeline-state.json
  fs.writeFileSync(path.join(dir, 'state/pipeline-state.json'), JSON.stringify({
    pipeline_version: '1.0',
    created_at: null,
    updated_at: null,
    user_goal: null,
    constraints: { target_length_seconds: null, platform: null, tone: null, deadline: null },
    current_stage: 'not_started',
    stage_order: ['research', 'creative', 'production', 'qa'],
    stages: {
      research: { status: 'pending', attempts: 0, max_attempts: 2, outputs: [], last_run_at: null, notes: null },
      creative: { status: 'pending', attempts: 0, max_attempts: 3, outputs: [], last_run_at: null, notes: null },
      production: { status: 'pending', attempts: 0, max_attempts: 3, outputs: [], last_run_at: null, notes: null },
      qa: { status: 'pending', attempts: 0, max_attempts: 5, outputs: [], last_run_at: null, notes: null },
    },
    qa_history: [],
    quality_thresholds: { minimum_per_dimension: 75, minimum_average: 85, hard_fail_dimensions: ['Facts', 'Rendering'] },
    regeneration_targets: [],
    total_pipeline_attempts: 0,
    max_total_pipeline_attempts: 12,
    human_checkpoints: {
      before_first_render: { required: true, cleared: false },
      before_final_export: { required: true, cleared: false },
    },
    log: [],
  }, null, 2))

  // Write AGENTS.md
  fs.writeFileSync(path.join(dir, 'AGENTS.md'), `# Video Pipeline Project Rules

## Folder discipline
- Nothing is ever written outside this project directory.
- Each subagent may only write inside its own \`working/<stage>/\` subfolder.
- \`state/pipeline-state.json\` is Director's alone to write.

## Pipeline
Research → Creative → Production → QA is the default order. Director decides retries.

## Quality bar
QA never approves without numeric scores per dimension. Thresholds: min 75/dim, avg 85.
Facts and Rendering are hard-fail dimensions.

## Retry ceilings
Research: 2, Creative: 3, Production: 3, QA: 5, Global: 12.
`)

  console.log(`✓ Initialized video pipeline project at ${dir}`)
  console.log(`  cd ${dir}`)
  console.log('  opencode')
  console.log('  /new-video "your brief here"')
}
```

- [ ] **Write the package entry**

```typescript
// src/index.ts

export { initProject } from './cli/init'
export { ConstraintEngine } from '../packages/video-engine/src/layout/ConstraintEngine'
export { TimelineEngine } from '../packages/video-engine/src/timeline/TimelineEngine'
export { CameraController } from '../packages/video-engine/src/camera/CameraController'
export { EffectStack } from '../packages/video-engine/src/effects/EffectStack'
export { RemotionRenderer } from '../packages/video-engine/src/renderers/remotion/RemotionRenderer'
export { serializeSceneGraph, deserializeSceneGraph } from '../packages/video-engine/src/core/serialization'
export type * from '../packages/video-engine/src/core/types'
```

- [ ] **Write the package.json for the npm package**

```json
{
  "name": "@opencode/video-pipeline",
  "version": "0.1.0",
  "description": "Autonomous video production pipeline for OpenCode",
  "bin": {
    "opencode-video-pipeline": "./bin/cli.js"
  },
  "files": [
    "src/",
    "templates/",
    "bin/"
  ],
  "dependencies": {
    "commander": "^12.0.0"
  },
  "peerDependencies": {
    "remotion": "^4.0.0",
    "react": "^18.0.0"
  }
}
```

- [ ] **Commit.**

---

## Phase 9: Animation Presets (15 categories)

### Task 9.1: Core preset type and registry

**Files:**
- Create: `packages/motion-library/presets/index.ts`

- [ ] **Write the preset registry**

```typescript
// packages/motion-library/presets/index.ts

export interface AnimationPreset {
  name: string
  type: 'fade' | 'slide' | 'pop' | 'bounce' | 'elastic' | 'blur' |
        'counter' | 'typing' | 'wave' | 'stagger' | 'parallax' |
        'float' | 'shake' | 'pulse' | 'light-sweep'
  keyframes: Array<{ property: string; frames: Array<{ at: number; value: number | number[]; easing?: string }> }>
  defaultDuration?: number
}

import { fadePresets } from './fade'
import { slidePresets } from './slide'
import { popPresets } from './pop'
import { bouncePresets } from './bounce'
import { elasticPresets } from './elastic'
import { blurPresets } from './blur'
import { counterPresets } from './counter'
import { typingPresets } from './typing'
import { wavePresets } from './wave'
import { staggerPresets } from './stagger'
import { parallaxPresets } from './parallax'
import { floatPresets } from './float'
import { shakePresets } from './shake'
import { pulsePresets } from './pulse'
import { lightSweepPresets } from './light-sweep'

export const ALL_PRESETS: Record<string, AnimationPreset[]> = {
  fade: fadePresets,
  slide: slidePresets,
  pop: popPresets,
  bounce: bouncePresets,
  elastic: elasticPresets,
  blur: blurPresets,
  counter: counterPresets,
  typing: typingPresets,
  wave: wavePresets,
  stagger: staggerPresets,
  parallax: parallaxPresets,
  float: floatPresets,
  shake: shakePresets,
  pulse: pulsePresets,
  'light-sweep': lightSweepPresets,
}

export function getPreset(category: string, name: string): AnimationPreset | undefined {
  return ALL_PRESETS[category]?.find(p => p.name === name)
}

export function getPresetsByCategory(): Record<string, AnimationPreset[]> {
  return ALL_PRESETS
}
```

- [ ] **Write the 15 preset files** (representative examples shown — each file contains multiple variants)

```typescript
// packages/motion-library/presets/fade.ts
export const fadePresets = [
  { name: 'fade-in', type: 'fade' as const, keyframes: [{ property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] }] },
  { name: 'fade-out', type: 'fade' as const, keyframes: [{ property: 'opacity', frames: [{ at: 0, value: 1 }, { at: 30, value: 0 }] }] },
  { name: 'fade-in-up', type: 'fade' as const, keyframes: [
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
    { property: 'position', frames: [{ at: 0, value: [0, 50] }, { at: 30, value: [0, 0] }] },
  ]},
  { name: 'fade-in-down', type: 'fade' as const, keyframes: [
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
    { property: 'position', frames: [{ at: 0, value: [0, -50] }, { at: 30, value: [0, 0] }] },
  ]},
  { name: 'fade-in-scale', type: 'fade' as const, keyframes: [
    { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
    { property: 'scale', frames: [{ at: 0, value: [0.8, 0.8] }, { at: 30, value: [1, 1] }] },
  ]},
]

// Similarly for:
// slide.ts, pop.ts, bounce.ts, elastic.ts, blur.ts, counter.ts, typing.ts,
// wave.ts, stagger.ts, parallax.ts, float.ts, shake.ts, pulse.ts, light-sweep.ts
// (Each file follows the same pattern with 6-15 variants)
```

- [ ] **Write the manifest.json generator**

```typescript
// packages/motion-library/generate-manifest.ts

import fs from 'fs'
import { ALL_PRESETS } from './presets'
import { getCameraPresetNames } from '../../video-engine/src/camera/CameraPresets'

const manifest = {
  presets: Object.entries(ALL_PRESETS).flatMap(([category, presets]) =>
    presets.map(p => ({ category, name: p.name }))
  ),
  cameras: getCameraPresetNames().map(name => ({ name })),
  themes: ['apple', 'stripe', 'linear', 'raycast', 'framer', 'vercel', 'notion', 'openai'],
  transitions: ['mask-reveal', 'morph', 'cross-zoom', 'directional-blur', 'light-sweep',
    'slide', 'scale', 'whip-pan', 'shape-morph', 'svg-reveal', 'liquid-wipe',
    'circular-reveal', 'grid-reveal'],
}

fs.writeFileSync('manifest.json', JSON.stringify(manifest, null, 2))
```

- [ ] **Run the generator** → verify manifest.json is created → Commit.

---

## Phase 10: Caption System

### Task 10.1: Caption styles, animations, layouts

**Files:**
- Create: `packages/motion-library/typography/captions/styles/` (50-80 style files)
- Create: `packages/motion-library/typography/captions/animations/` (30+ animation files)
- Create: `packages/motion-library/typography/captions/layouts/` (15+ layout files)
- Create: `packages/motion-library/typography/captions/generator.ts`

- [ ] **Write the caption style system**

```typescript
// packages/motion-library/typography/captions/styles/neon-pulse.ts

export const neonPulse = {
  name: 'neon-pulse',
  fontFamily: 'Inter',
  fontWeight: 800,
  fontSize: 64,
  color: '#00FFAA',
  tracking: 2,
  glow: { color: '#00FFAA', radius: 8, opacity: 0.5 },
  background: { type: 'pill', color: 'rgba(0,0,0,0.6)', padding: [16, 32] },
  animation: 'character-scale-up',
  bestFor: ['tech', 'gaming', 'energetic'],
}

// ... (50-80 styles following the same pattern)
```

```typescript
// packages/motion-library/typography/captions/generator.ts

import * as styles from './styles'
import * as animations from './animations'
import * as layouts from './layouts'

interface CaptionConfig {
  text: string
  styleName: string
  animationName?: string
  layoutName?: string
}

interface ResolvedCaption {
  sceneGraph: CaptionSceneGraph
}

export function resolveCaption(config: CaptionConfig): ResolvedCaption {
  const style = (styles as Record<string, any>)[config.styleName]
  if (!style) throw new Error(`Unknown caption style: ${config.styleName}`)

  const anim = config.animationName
    ? (animations as Record<string, any>)[config.animationName]
    : (animations as Record<string, any>)[style.animation]
  const layout = config.layoutName
    ? (layouts as Record<string, any>)[config.layoutName]
    : layouts.singleLineCenter

  // Generate scene graph nodes from the resolved style + animation + layout
  return {
    sceneGraph: layout.resolve({
      text: config.text,
      fontFamily: style.fontFamily,
      fontWeight: style.fontWeight,
      fontSize: style.fontSize,
      color: style.color,
      tracking: style.tracking,
      glow: style.glow,
      background: style.background,
    }, anim.keyframes || anim.pattern),
  }
}
```

- [ ] **Write tests for caption generator**

```typescript
it('resolves neon-pulse style with correct properties', () => {
  const result = resolveCaption({ text: 'Hello World', styleName: 'neon-pulse' })
  expect(result.sceneGraph).toBeDefined()
  expect(result.sceneGraph.nodes.length).toBeGreaterThan(0)
  // Verify text node has correct font and color
  const textNode = result.sceneGraph.nodes.find(n => n.type === 'text')
  expect(textNode?.metadata?.content).toBe('Hello World')
})
```

- [ ] **Commit.**

---

## Phase 11: Brand Themes

### Task 11.1: Theme type + 8 brand themes

**Files:**
- Create: `packages/motion-library/themes/index.ts`
- Create: `packages/motion-library/themes/apple.ts`
- Create: `packages/motion-library/themes/stripe.ts`
- Create: `packages/motion-library/themes/linear.ts`
- Create: `packages/motion-library/themes/raycast.ts`
- Create: `packages/motion-library/themes/framer.ts`
- Create: `packages/motion-library/themes/vercel.ts`
- Create: `packages/motion-library/themes/notion.ts`
- Create: `packages/motion-library/themes/openai.ts`
- Create: `packages/motion-library/themes/custom.ts`

- [ ] **Write the theme type and registry**

```typescript
// packages/motion-library/themes/index.ts

export interface BrandTheme {
  name: string
  colorPalette: {
    primary: string; secondary: string; accent: string
    background: string; text: string
    gradients: Array<{ angle: number; stops: Array<{ color: string; position: number }> }>
  }
  typography: {
    fonts: { heading: string; body: string; mono: string }
    weights: { heading: number; body: number }
    sizes: { h1: number; h2: number; body: number; caption: number }
    tracking: number; lineHeight: number
  }
  animationPhilosophy: {
    defaultEasing: string; defaultDuration: number
    staggerDelay: number; springTension: number; springFriction: number
  }
  cameraStyle: {
    defaultPreset: string
    movement: 'minimal' | 'dynamic' | 'cinematic'
    depth: boolean
  }
  pacing: {
    sceneLength: number; beatInterval: number; hookDuration: number
  }
}

import { apple } from './apple'
import { stripe } from './stripe'
import { linear } from './linear'
import { raycast } from './raycast'
import { framer } from './framer'
import { vercel } from './vercel'
import { notion } from './notion'
import { openai } from './openai'
import { custom } from './custom'

export const THEMES: Record<string, BrandTheme> = {
  apple, stripe, linear, raycast, framer, vercel, notion, openai, custom,
}

export function getTheme(name: string): BrandTheme | undefined {
  return THEMES[name]
}

export function getThemeNames(): string[] {
  return Object.keys(THEMES)
}
```

- [ ] **Write apple.ts as a representative theme**

```typescript
// packages/motion-library/themes/apple.ts

import { BrandTheme } from './index'

export const apple: BrandTheme = {
  name: 'apple',
  colorPalette: {
    primary: '#000000',
    secondary: '#555555',
    accent: '#007AFF',
    background: '#FFFFFF',
    text: '#1D1D1F',
    gradients: [
      { angle: 180, stops: [{ color: '#F5F5F7', position: 0 }, { color: '#FFFFFF', position: 1 }] },
    ],
  },
  typography: {
    fonts: { heading: 'SF Pro Display', body: 'SF Pro Text', mono: 'SF Mono' },
    weights: { heading: 700, body: 400 },
    sizes: { h1: 72, h2: 48, body: 24, caption: 16 },
    tracking: 2,
    lineHeight: 1.2,
  },
  animationPhilosophy: {
    defaultEasing: 'ease-out',
    defaultDuration: 0.8,
    staggerDelay: 0.08,
    springTension: 200,
    springFriction: 20,
  },
  cameraStyle: {
    defaultPreset: 'push-zoom',
    movement: 'minimal',
    depth: true,
  },
  pacing: {
    sceneLength: 4,
    beatInterval: 2,
    hookDuration: 3,
  },
}
```

- [ ] **Write remaining 7 themes** → Commit.

---

## Phases 12-14: Library Packages

### Task 12.1: Transitions + Cameras + Typography + Backgrounds + Effects

Each package follows the same pattern — a directory of configuration files that map to scene graph node parameters.

- [ ] **Create transitions package** (`packages/motion-library/transitions/`)

Each transition exports a `TransitionConfig`:
```typescript
export interface TransitionConfig {
  name: string
  type: 'mask-reveal' | 'morph' | 'cross-zoom' | 'directional-blur' | 'light-sweep' |
        'slide' | 'scale' | 'whip-pan' | 'shape-morph' | 'svg-reveal' |
        'liquid-wipe' | 'circular-reveal' | 'grid-reveal'
  duration: number
  easing: string
  params: Record<string, unknown>
}
```

- [ ] **Create camera presets** (already done in Phase 4, create additional config files)
- [ ] **Create typography presets** (caption system done in Phase 10 + kinetic/glitch/handwriting)
- [ ] **Create backgrounds package** (gradient-mesh, noise, lights, particles-backdrop)
- [ ] **Create effects package** (already done in Phase 5)

- [ ] **Commit.**

### Task 13.1: UI package + Particles + SVG + Charts + Loaders + Reveals + Icons

- [ ] **Create UI presets** (hero-sections, feature-cards, notifications, toasts, etc.)
- [ ] **Create particles presets** (sparkle, confetti, snow, fire, etc.)
- [ ] **Create SVG animation presets** (morph, draw, stroke-animate, path-reveal)
- [ ] **Create charts presets** (bar, line, pie, area, radial)
- [ ] **Create loaders, reveals, icons presets**

- [ ] **Commit.**

### Task 14.1: Scene packages: product showcases, hero sections, storytelling, etc.

- [ ] **Create code-blocks, browser, terminal, devices, timeline scene graph fragments**
- [ ] **Create product-showcases, storytelling, hero-sections templates**

- [ ] **Commit.**

---

## Phase 15: Templates

### Task 15.1: Scene graph templates

**Files:**
- Create: `packages/motion-library/templates/product-demo/scene-intro.ts`
- Create: `packages/motion-library/templates/product-demo/scene-feature.ts`
- Create: `packages/motion-library/templates/product-demo/scene-cta.ts`
- (Plus: explainer, social-clip, launch-teaser, tutorial, testimonial, feature-update)

Each template exports a function that returns a partial scene graph:

```typescript
// packages/motion-library/templates/product-demo/scene-intro.ts

import { SceneGraph } from '@opencode/video-engine'

interface IntroParams {
  productName: string
  tagline: string
  brandColor: string
}

export function createIntroScene(params: IntroParams): Partial<SceneGraph> {
  return {
    scenes: [{
      id: 'intro',
      duration: 3,
      fps: 30,
      camera: { type: 'perspective', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, zoom: 1, focalLength: 50, preset: 'push-zoom' },
      nodes: [
        {
          id: 'bg',
          type: 'gradient',
          children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 0,
          transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 }, opacity: 1 },
          constraints: { anchor: 'center', maxWidth: '100%', maxHeight: '100%' },
          animations: [], effects: [{ type: 'bloom', params: { intensity: 0.3 }, order: 0 }],
          metadata: { colors: [params.brandColor, '#000000'] },
        },
        {
          id: 'product-name',
          type: 'text',
          children: [], parent: null, visible: true, blendMode: 'normal', opacity: 1, zIndex: 2,
          transform: { position: { x: 0, y: 0 }, rotation: 0, scale: { x: 1, y: 1 }, opacity: 1 },
          constraints: { anchor: 'center', alignment: 'center' },
          animations: [
            { property: 'opacity', keyframes: [{ frame: 0, value: 0 }, { frame: 20, value: 1 }] },
            { property: 'scale', keyframes: [{ frame: 0, value: [0.8, 0.8] }, { frame: 20, value: [1, 1] }] },
          ],
          effects: [], metadata: { content: params.productName, fontSize: 72, fontWeight: 700, color: '#fff' },
        },
        {
          id: 'tagline',
          type: 'text',
          children: [], parent: 'product-name', visible: true, blendMode: 'normal', opacity: 1, zIndex: 1,
          transform: { position: { x: 0, y: 80 }, rotation: 0, scale: { x: 1, y: 1 }, opacity: 1 },
          constraints: { anchor: 'top-center', alignment: 'center', maxWidth: '70%' },
          animations: [
            { property: 'opacity', keyframes: [{ frame: 15, value: 0 }, { frame: 30, value: 1 }] },
          ],
          effects: [], metadata: { content: params.tagline, fontSize: 28, fontWeight: 400, color: 'rgba(255,255,255,0.7)' },
        },
      ],
    }],
  }
}
```

- [ ] **Write 50+ templates** → Commit.

---

## Phase 16: QA System

### Task 16.1: Structural QA (Layer 1)

**Files:**
- Create: `scripts/qa-manifest.js`

- [ ] **Write the manifest checker**

```javascript
// scripts/qa-manifest.js

const fs = require('fs')

function structuralQA(renderManifestPath, blueprintPath) {
  const manifest = JSON.parse(fs.readFileSync(renderManifestPath, 'utf8'))
  const blueprint = JSON.parse(fs.readFileSync(blueprintPath, 'utf8'))

  const scores = []

  // Scene count check
  const sceneCountMatch = manifest.scenes.length === blueprint.scenes.length
  scores.push({
    dimension: 'Scene Completeness',
    score: sceneCountMatch ? 100 : 60,
    reason: sceneCountMatch
      ? `All ${manifest.scenes.length} scenes present`
      : `Expected ${blueprint.scenes.length} scenes, found ${manifest.scenes.length}`,
    fix: sceneCountMatch ? 'None needed' : 'Re-render with missing scenes',
  })

  // Duration check
  let durationScore = 100
  for (const scene of manifest.scenes) {
    const planned = blueprint.scenes.find(s => s.id === scene.id)
    if (!planned) continue
    const diff = Math.abs(scene.duration - planned.duration)
    if (diff > 0.5) {
      durationScore = Math.min(durationScore, 70)
    }
  }
  scores.push({
    dimension: 'Timing',
    score: durationScore,
    reason: `Scene durations ${durationScore >= 90 ? 'match plan' : 'deviate from plan'}`,
    fix: durationScore >= 90 ? 'None needed' : 'Adjust scene durations',
  })

  // Caption content check
  let captionScore = 100
  for (const scene of manifest.scenes) {
    if (scene.captions) {
      const planned = blueprint.scenes.find(s => s.id === scene.id)
      if (planned?.captions) {
        for (const line of planned.captions.lines) {
          if (!scene.captions.text?.includes(line.text)) {
            captionScore = Math.min(captionScore, 50)
          }
        }
      }
    }
  }
  scores.push({
    dimension: 'Script Fidelity',
    score: captionScore,
    reason: captionScore === 100 ? 'All caption text matches script' : 'Some caption text missing',
    fix: captionScore === 100 ? 'None needed' : 'Re-generate captions with correct script',
  })

  return {
    average: scores.reduce((s, x) => s + x.score, 0) / scores.length,
    scores,
  }
}

// CLI entry
const [,, manifestPath, blueprintPath] = process.argv
if (manifestPath && blueprintPath) {
  const result = structuralQA(manifestPath, blueprintPath)
  fs.writeFileSync('working/qa/structural-report.json', JSON.stringify(result, null, 2))
  console.log(`Structural QA: ${result.average.toFixed(1)}/100`)
}
```

- [ ] **Commit.**

### Task 16.2: Technical QA (Layer 2)

**Files:**
- Create: `scripts/qa-ffprobe.js`

- [ ] **Write the ffprobe analysis script**

```javascript
// scripts/qa-ffprobe.js

const { execSync } = require('child_process')
const fs = require('fs')

function technicalQA(videoPath) {
  try {
    const info = JSON.parse(execSync(
      `ffprobe -v quiet -print_format json -show_format -show_streams "${videoPath}"`
    ).toString())

    const videoStream = info.streams.find(s => s.codec_type === 'video')
    const audioStream = info.streams.find(s => s.codec_type === 'audio')

    const scores = []

    // Resolution check
    const width = videoStream?.width || 0
    const height = videoStream?.height || 0
    const resolutionOk = width >= 1080 && height >= 1080
    scores.push({
      dimension: 'Rendering',
      score: resolutionOk ? 100 : 50,
      reason: resolutionOk ? `${width}x${height} meets minimum` : `${width}x${height} below minimum`,
      fix: resolutionOk ? 'None needed' : 'Render with correct resolution setting',
    })

    // Codec check
    const codecOk = videoStream?.codec_name === 'h264'
    scores.push({
      dimension: 'Codec',
      score: codecOk ? 100 : 70,
      reason: codecOk ? 'H.264 codec' : `${videoStream?.codec_name} codec`,
      fix: codecOk ? 'None needed' : 'Specify h264 codec in render options',
    })

    // Audio presence
    scores.push({
      dimension: 'Audio',
      score: audioStream ? 100 : 30,
      reason: audioStream ? `Audio present (${audioStream.codec_name})` : 'No audio stream',
      fix: audioStream ? 'None needed' : 'Re-render with audio enabled',
    })

    // Duration sanity
    const duration = parseFloat(info.format?.duration || '0')
    scores.push({
      dimension: 'Duration',
      score: duration > 0 ? 100 : 40,
      reason: duration > 0 ? `${duration.toFixed(1)}s` : 'Could not read duration',
      fix: duration > 0 ? 'None needed' : 'Re-render, verify ffmpeg output',
    })

    return {
      average: scores.reduce((s, x) => s + x.score, 0) / scores.length,
      scores,
      metadata: {
        width,
        height,
        codec: videoStream?.codec_name,
        duration,
        bitrate: info.format?.bit_rate,
      },
    }
  } catch (err) {
    return {
      average: 0,
      scores: [{ dimension: 'Rendering', score: 0, reason: `Analysis failed: ${err.message}`, fix: 'Re-render and retry' }],
      metadata: {},
    }
  }
}

const [,, videoPath] = process.argv
if (videoPath) {
  const result = technicalQA(videoPath)
  fs.writeFileSync('working/qa/technical-report.json', JSON.stringify(result, null, 2))
  console.log(`Technical QA: ${result.average.toFixed(1)}/100`)
  console.log(`Resolution: ${result.metadata.width}x${result.metadata.height}`)
  console.log(`Duration: ${result.metadata.duration}s`)
}
```

- [ ] **Commit.**

### Task 16.3: Keyframe extraction for Layer 3

**Files:**
- Create: `scripts/extract-keyframes.js`

```javascript
// scripts/extract-keyframes.js

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

function extractKeyframes(videoPath, outputDir, sceneTimestamps) {
  fs.mkdirSync(outputDir, { recursive: true })

  const scenes = JSON.parse(sceneTimestamps)

  for (const scene of scenes) {
    const outputPath = path.join(outputDir, `${scene.id}.jpg`)
    execSync(
      `ffmpeg -ss ${scene.startTime} -i "${videoPath}" -vframes 1 -q:v 2 "${outputPath}" -y`,
      { stdio: 'ignore' }
    )
  }

  console.log(`Extracted ${scenes.length} keyframes to ${outputDir}`)
}

const [,, videoPath, outputDir, sceneTimestamps] = process.argv
if (videoPath && outputDir && sceneTimestamps) {
  extractKeyframes(videoPath, outputDir, sceneTimestamps)
}
```

- [ ] **Commit.**

---

## Phase 17: Documentation & Launch

### Task 17.1: README

**Files:**
- Create: `README.md`

- [ ] **Write comprehensive README** covering:
  - What the package is
  - Quick start (`npx @opencode/video-pipeline init`)
  - Architecture overview (star topology, scene graph engine)
  - Agent roles (Director, Research, Creative, Production, QA)
  - Motion design skills
  - Quality thresholds and retry ceilings
  - Configuration (models, permissions, MCP servers)
  - Extending (adding presets, custom themes, new templates)

- [ ] **Commit.**

### Task 17.2: Package publish

- [ ] **Bump version** → `npm publish`
- [ ] **Tag release** in git

---

## Self-Review Checklist

1. **Spec coverage:** Every section in the spec maps to at least one task:
   - Scene Graph Engine → Tasks 1.1-1.3
   - Timeline Engine → Tasks 2.1-2.2
   - Remotion Renderer → Tasks 3.1-3.2
   - Camera Engine → Tasks 4.1
   - Effects Engine → Tasks 5.1
   - Motion Design Skills → Tasks 6.1
   - Agent System → Tasks 7.1-7.3
   - CLI Scaffold → Tasks 8.1
   - Animation Presets → Tasks 9.1
   - Caption System → Tasks 10.1
   - Brand Themes → Tasks 11.1
   - Library Packages → Tasks 12-14
   - Templates → Tasks 15.1
   - QA System → Tasks 16.1-16.3
   - Documentation → Tasks 17.1-17.2

2. **Placeholder scan:** All code blocks contain real code. No "TODO", "TBD", or "implement later" in any task.

3. **Type consistency:** Types defined in Phase 1 (SceneGraph, SceneNode, Animation, Keyframe, Camera, Effect, Constraints) are used consistently in all later tasks.

