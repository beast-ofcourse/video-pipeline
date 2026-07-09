import * as styles from './styles'
import * as animations from './animations'
import * as layouts from './layouts'

interface CaptionConfig {
  text: string
  styleName: string
  animationName?: string
  layoutName?: string
}

interface CaptionSceneGraph {
  nodes: any[]
}

function findBy<K extends string>(module: Record<string, any>, nameOrKey: K): any {
  // Prefer direct export key match first, then search by the object's `name` property
  return module[nameOrKey] || Object.values(module).find(v => v && typeof v === 'object' && v.name === nameOrKey)
}

export function resolveCaption(config: CaptionConfig): { sceneGraph: CaptionSceneGraph } {
  const style = findBy(styles, config.styleName)
  if (!style) throw new Error(`Unknown caption style: ${config.styleName}`)

  const animName = config.animationName || style.animation
  const anim = findBy(animations, animName)
  if (!anim) throw new Error(`Unknown animation: ${animName}`)

  const layoutName = config.layoutName || 'singleLineCenter'
  const layout = findBy(layouts, layoutName)
  if (!layout) throw new Error(`Unknown layout: ${layoutName}`)

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
    }, anim.keyframes || [anim.pattern]),
  }
}
