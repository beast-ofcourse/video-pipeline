import React from 'react'
import { Composition } from 'remotion'
import { SceneGraph, AspectRatio } from '../../core/types'
import { RemotionScene } from './RemotionScene'

const RESOLUTION_MAP: Record<AspectRatio, { width: number; height: number }> = {
  '16:9': { width: 1920, height: 1080 },
  '9:16': { width: 1080, height: 1920 },
  '1:1':  { width: 1080, height: 1080 },
  '4:5':  { width: 1080, height: 1350 },
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
          component={RemotionScene as unknown as React.FC<Record<string, unknown>>}
          durationInFrames={Math.ceil(scene.duration * (scene.fps || 30))}
          fps={scene.fps || 30}
          width={res.width}
          height={res.height}
          defaultProps={{ scene, viewport: res }}
        />
      ))}
    </>
  )
}
