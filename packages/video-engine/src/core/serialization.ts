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
  const res = g.resolution as Record<string, unknown>
  if (typeof res.width !== 'number') throw new Error('Invalid SceneGraph: resolution.width required')
  if (typeof res.height !== 'number') throw new Error('Invalid SceneGraph: resolution.height required')
}
