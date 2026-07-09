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

    // Default to parent size if no explicit size given
    if (!width && !height) {
      width = parentSize.width
      height = parentSize.height
    } else if (!width) {
      width = parentSize.width
    } else if (!height) {
      height = parentSize.height
    }

    // Aspect ratio override
    if (c.aspectRatio && width && height) {
      const byWidth = height * c.aspectRatio
      const byHeight = width / c.aspectRatio
      if (byWidth <= width) {
        width = Math.max(byWidth, 1)
      } else {
        height = Math.max(byHeight, 1)
      }
    }

    // Flex grow/shrink (percentage of remaining space)
    if (c.flexGrow && c.flexGrow > 0) {
      width = parentSize.width * (c.flexGrow / (c.flexGrow + (c.flexShrink ?? 1)))
    }

    // Anchor-based positioning
    const position = this.solveAnchor(c.anchor ?? 'top-left', { width, height }, parentSize)

    // Apply padding (reduces size, shifts position inward)
    if (c.padding) {
      position.x += c.padding.left ?? 0
      position.y += c.padding.top ?? 0
      width = Math.max(0, width - (c.padding.left ?? 0) - (c.padding.right ?? 0))
      height = Math.max(0, height - (c.padding.top ?? 0) - (c.padding.bottom ?? 0))
    }

    // Apply margin (shifts position outward, keeps size)
    if (c.margin) {
      position.x += c.margin.left ?? 0
      position.y += c.margin.top ?? 0
    }

    // Alignment adjustments (for stretch, center, end)
    if (c.alignment === 'center') {
      position.x = (parentSize.width - width) / 2
    } else if (c.alignment === 'end') {
      position.x = parentSize.width - width - (c.margin?.right ?? 0)
    } else if (c.alignment === 'stretch') {
      width = parentSize.width - (c.margin?.left ?? 0) - (c.margin?.right ?? 0)
    }

    return {
      position: { x: Math.round(position.x), y: Math.round(position.y) },
      size: { width: Math.max(Math.round(width), 0), height: Math.max(Math.round(height), 0) }
    }
  }

  solveAll(graph: SceneGraph): Map<string, SolvedLayout> {
    const viewport = { width: graph.resolution.width, height: graph.resolution.height }
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
    if (value === undefined || value === 0) return 0
    if (typeof value === 'number') return Math.max(value, 1)
    if (typeof value === 'string') {
      if (value.endsWith('%')) return Math.max((parseFloat(value) / 100) * parentDim, 1)
      if (value.endsWith('vw')) return Math.max((parseFloat(value) / 100) * viewportDim, 1)
      if (value.endsWith('vh')) return Math.max((parseFloat(value) / 100) * viewportDim, 1)
      if (value.endsWith('px')) return Math.max(parseFloat(value), 1)
    }
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
}
