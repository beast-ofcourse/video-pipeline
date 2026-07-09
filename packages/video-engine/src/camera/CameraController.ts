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