import { describe, it, expect } from 'vitest'
import { resolveCaption } from '../generator'
import * as styles from '../styles'

it('resolves neon-pulse style with correct properties', () => {
  const result = resolveCaption({ text: 'Hello World', styleName: 'neon-pulse' })
  expect(result.sceneGraph).toBeDefined()
  expect(result.sceneGraph.nodes.length).toBeGreaterThan(0)
  const textNode = result.sceneGraph.nodes.find((n: any) => n.type === 'text')
  expect(textNode?.metadata?.content).toBe('Hello World')
  expect(textNode?.metadata?.fontFamily).toBe('Inter')
})

it('throws for unknown style', () => {
  expect(() => resolveCaption({ text: 'test', styleName: 'nonexistent' })).toThrow()
})

it('all exported styles have required fields', () => {
  const styleEntries = Object.entries(styles)
  expect(styleEntries.length).toBeGreaterThanOrEqual(10)
  for (const [, style] of styleEntries) {
    expect(style.name).toBeDefined()
    expect(style.fontFamily).toBeDefined()
    expect(style.fontSize).toBeGreaterThan(0)
    expect(style.color).toBeDefined()
    expect(style.animation).toBeDefined()
  }
})
