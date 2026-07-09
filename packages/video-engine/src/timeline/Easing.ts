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
    const n1 = 7.5625
    const d1 = 2.75
    if (t < 1 / d1) {
      return n1 * t * t
    } else if (t < 2 / d1) {
      return n1 * (t - 1.5 / d1) * (t - 1.5 / d1) + 0.75
    } else if (t < 2.5 / d1) {
      return n1 * (t - 2.25 / d1) * (t - 2.25 / d1) + 0.9375
    } else {
      return n1 * (t - 2.625 / d1) * (t - 2.625 / d1) + 0.984375
    }
  },
}

export function getEasing(name: string, bezierParams?: [number, number, number, number]): EasingFn {
  if (bezierParams) return bezier(bezierParams[0], bezierParams[1], bezierParams[2], bezierParams[3])
  return EASING_FUNCTIONS[name] ?? EASING_FUNCTIONS.linear
}
