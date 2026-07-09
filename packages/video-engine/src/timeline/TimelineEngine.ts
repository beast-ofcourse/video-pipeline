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

      const value = this.interpolate(anim.keyframes, evalFrame)
      if (value !== null) state[anim.property] = value
    }

    return state
  }

  private interpolate(keyframes: Keyframe[], frame: number): number | number[] | null {
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
      return a.map((v, i) => {
        const bi = i < b.length ? b[i] : b[b.length - 1]
        return v + (bi - v) * t
      })
    }
    return a
  }

  private cycleDuration(keyframes: Keyframe[]): number {
    if (keyframes.length < 2) return 0
    return keyframes[keyframes.length - 1].frame - keyframes[0].frame
  }
}
