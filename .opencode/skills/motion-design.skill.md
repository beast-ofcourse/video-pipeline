---
description: >-
  Core motion design principles: the 12 principles of animation, easing theory,
  timing, spacing, and rhythm. Loaded by Director before every Creative session.
---

## Rules

1. Every motion must have a purpose — no animation "just because."
2. Easing determines feel: ease-out-expo for premium, spring for playful, linear only for mechanical.
3. A bounce must never exceed 3 oscillations in a sub-30-second clip.
4. Stagger delay must be proportional to scene importance — hero element first, supporting later.
5. Timing: 0.2-0.4s for snappy UI, 0.6-1.0s for cinematic reveals.
6. Rhythm: alternate between fast (action) and slow (breathing room) every 3-5 seconds.

## Decision Trees

- Tone is "premium" or "minimalist" → ease-out-expo, 0.6-1.0s, no bounce
- Tone is "playful" or "energetic" → spring, 0.2-0.4s, bounce acceptable
- Scene is hero moment → stagger children 0.05-0.1s, hero first
- Scene is technical → minimize motion, use fade, no decorative bounce

## Preset Mappings

- ease-out-expo → presets/fade/fade-in.ts, presets/slide/slide-up.ts
- spring → presets/pop/pop-in.ts, presets/bounce/bounce-scale.ts
- stagger → presets/stagger/stagger-pop.ts
- counter → presets/counter/count-up.ts

## Anti-Patterns

- Never use elastic on UI elements — feels unresponsive
- Never animate everything simultaneously — viewer loses focus
- Never use linear for organic movement — real objects accelerate
- Never exceed 3 oscillations on bounce — feels amateur

## Agency Reference

- Apple: ease-out-expo, 0.8s, single element at a time
- Stripe: spring tension 180, friction 12, fast exits
- Linear: stagger 0.06s, scale + fade combined
