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
