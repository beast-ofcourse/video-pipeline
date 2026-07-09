import React from 'react'
import { useCurrentFrame, AbsoluteFill } from 'remotion'
import { Scene, AspectRatio } from '../../core/types'
import { ConstraintEngine, SolvedLayout } from '../../layout/ConstraintEngine'
import { TimelineEngine, FrameState } from '../../timeline/TimelineEngine'

const constraintEngine = new ConstraintEngine()
const timelineEngine = new TimelineEngine()

interface RemotionSceneProps {
  scene: Scene
  viewport: { width: number; height: number }
}

export const RemotionScene: React.FC<RemotionSceneProps> = ({ scene, viewport }) => {
  const frame = useCurrentFrame()

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', overflow: 'hidden' }}>
      {scene.nodes
        .filter(n => n.visible)
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((node) => {
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

  let scaleX = node.transform.scale.x
  let scaleY = node.transform.scale.y
  const scaleVal = animState['scale']
  if (Array.isArray(scaleVal)) {
    scaleX = scaleVal[0] ?? scaleX
    scaleY = scaleVal[1] ?? scaleY
  } else if (typeof scaleVal === 'number') {
    scaleX = scaleVal
    scaleY = scaleVal
  }

  const rotation = (animState['rotation'] as number) ?? node.transform.rotation

  let posX = layout.position.x
  let posY = layout.position.y
  const posVal = animState['position']
  if (Array.isArray(posVal) && posVal.length >= 2) {
    posX = posVal[0]
    posY = posVal[1]
  }

  const blur = animState['blur'] as number | undefined
  const filterStyle = blur ? { filter: `blur(${blur}px)` } : {}

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
        ...filterStyle,
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
        <span
          style={{
            color: (node.metadata?.color as string) || '#fff',
            fontSize: (node.metadata?.fontSize as number) || 48,
            fontWeight: (node.metadata?.fontWeight as number) || 400,
            fontFamily: (node.metadata?.fontFamily as string) || 'Inter, sans-serif',
            textAlign: (node.metadata?.textAlign as React.CSSProperties['textAlign']) || 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          {(node.metadata?.content as string) || ''}
        </span>
      )
    case 'rect':
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: (node.metadata?.color as string) || '#333',
            borderRadius: (node.metadata?.borderRadius as number) ?? 0,
          }}
        />
      )
    case 'image':
      return (
        <img
          src={node.metadata?.src as string}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: (node.metadata?.objectFit as React.CSSProperties['objectFit']) || 'cover' }}
        />
      )
    case 'gradient':
      const colors = (node.metadata?.colors as string[]) || ['#000', '#fff']
      const angle = (node.metadata?.angle as number) ?? 135
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]})`,
          }}
        />
      )
    case 'circle':
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: (node.metadata?.color as string) || '#555',
          }}
        />
      )
    default:
      return null
  }
}
