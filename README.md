# @beast-course/video-pipeline

**Autonomous video generation for OpenCode.** From specification to rendered MP4, the pipeline orchestrates research, creative direction, production, and quality assurance — without a GUI, without timelines, without manual keyframing.

```bash
npx @beast-course/video-pipeline init my-project
cd my-project
opencode
/new-video "30-second product launch for a fintech analytics tool"
```

---

## Why this exists

Video production tooling has bifurcated. On one side, professional NLEs (Premiere, After Effects, DaVinci) offer unlimited expressiveness but require hours of manual work per minute of output. On the other, template-based tools (Canva, Kapwing, Descript) trade control for speed.

This pipeline occupies the unexplored middle — **programmatic control without the timeline**. The scene graph is the canonical representation. Constraints handle layout across aspect ratios. Keyframes drive animation. Camera presets and effect stacks provide cinematic depth. The agent system orchestrates the creative workflow.

The result: one scene graph definition produces both 16:9 and 9:16 renders, with motion design quality enforced at every stage.

---

## Architecture

The system has four layers, each independently swappable.

### Scene Graph Engine

The core data model. A scene graph is a tree of typed nodes (text, rect, image, gradient, circle) arranged in scenes, each with a camera configuration and timeline. Nodes carry constraints for layout, arrays of keyframes for animation, and an effect stack for post-processing. The engine evaluates these declaratively — constraints are solved per-frame, keyframes are interpolated, effects are composited in order.

```
SceneGraph
└── Scene (× N, each with a camera + duration)
    └── SceneNode (× M, arranged in a parent-child tree)
        ├── transform — position, rotation, scale
        ├── constraints — anchor, flex, padding, margin, aspect-ratio
        ├── animations — per-property keyframe sequences
        └── effects — composited in order (bloom, blur, glow, grain, ...)
```

One scene graph → any aspect ratio. The constraint solver re-laysouts nodes for 16:9 (horizontal) and 9:16 (vertical) from the same definition. No safe zones, no conditional branches — the constraints express the intent, and the solver computes the layout.

### Motion Library

250+ primitives organized as typed configuration objects (not React components). Each preset exports frames that the timeline engine interprets. This means the LLM generates JSON — easier to produce correctly than JSX — and the results are deterministic, testable, and portable across renderers.

- **96 animation presets** across 15 categories (fade, slide, pop, bounce, elastic, blur, counter, typing, wave, stagger, parallax, float, shake, pulse, light-sweep)
- **17 transitions** (crossfade, slide, zoom, whip-pan, blur, morph, circular-reveal, grid-reveal, and more)
- **8 camera movement configurations** mapped to the camera engine's presets
- **14 backgrounds** (gradient mesh, noise, lights, solid, pattern)
- **15 effect configurations** with sensible defaults
- **15 caption styles** with 10 animation patterns and 7 layouts, plus a generator that resolves style + animation + layout into a scene graph fragment
- **8 brand themes** (Apple, Stripe, Linear, Raycast, Framer, Vercel, Notion, OpenAI) — each defining color palettes, typography stacks, animation philosophy, camera style, and pacing
- **10 UI presets** (hero sections, feature cards, notifications, toasts, buttons, badges, modals, tooltips, avatars)
- **12 particle presets** (sparkle, confetti, snow, fire, smoke, bubbles, stars, rain, magic dust, embers)
- **10 SVG animation presets** (morph, draw, stroke-animate, path-reveal, float)
- **7 chart presets** (bar, line, pie, area, donut, radial)
- **10 scene composition presets** covering product showcases, testimonials, data visualization, tutorials, announcements, social clips, intros, and outros
- **7 complete video templates** (product demo, explainer, social clip, launch teaser, tutorial, testimonial, feature update) — each returning a full `Partial<SceneGraph>` with 3–6 scenes

### Agent System

Five OpenCode agents in a star topology. All communication flows through Director — sub-agents never talk to each other. Director reads pipeline state, dispatches the next stage with full context, evaluates output, and decides retry or advance. It never touches code, assets, or renders.

| Agent | Responsibility | Max Retries |
|-------|---------------|-------------|
| **Director** | Orchestrates the pipeline; reads/writes state; decides retries | — |
| **Research** | Gathers facts, writes script with timestamped scenes | 2 |
| **Creative** | Designs storyboard, selects motion presets, caption styles, camera moves | 3 |
| **Production** | Runs Remotion render, manages assets | 3 |
| **QA** | Structural checks, ffprobe analysis, perceptual review | 5 |

Quality thresholds: minimum 75 per dimension, 85 average, hard-fail on Facts and Rendering. Global ceiling of 12 retries across all stages.

### Motion Design Skills

Five skills loaded into Creative context, encoding production motion design knowledge — not as vague guidelines but as decision trees with measurable constraints.

- **motion-design** — 12 animation principles, easing theory, timing/rhythm rules, anti-patterns, agency references
- **visual-composition** — hierarchy, gestalt principles, rule of thirds, color psychology
- **cinematography** — camera language, depth of field, parallax, shake constraints
- **typography-motion** — kinetic typography, font pairing, readability thresholds (minimum 2× reading time, 4.5:1 contrast ratio)
- **attention-psychology** — hook strategies, cognitive load limits, retention drop patterns

---

## Engine internals

### Constraint solver
Nodes declare layout intent via constraints, not pixel positions. The solver evaluates anchor points, flex direction, grow/shrink ratios, padding, margin, aspect ratio preservation, and percentage/vw/vh units. This is what enables one scene graph to serve multiple aspect ratios — the same constraints produce correct layouts at 1920×1080 and 1080×1920.

### Timeline engine
Per-node, per-property keyframe arrays. Supports scalar and vector interpolation, configurable easing (linear, ease-in, ease-out, ease-in-out, spring, elastic, bounce), custom bezier curves, delay, loop, yoyo, and loop count. The engine is stateless — given the same keyframes and frame number, it produces the same output. Deterministic by design.

### Camera engine
Eight presets (push-zoom, orbit-pan, shake, dolly, parallax, follow, tilt, focus-pull). Each is a function `(camera, progress) → camera` that mutates position, rotation, zoom, focal length, or depth of field over time. The CameraController applies the preset and then projects the camera state onto scene nodes as 2D transforms.

### Effect stack
Seven renderers (bloom, blur, glow, grain, chromatic-aberration, drop-shadow, color-grade) applied per-node in order. Each is a Canvas2D function that receives the rendering context and effect parameters. Effects are composited sequentially — a node can have bloom + glow + grain, each independently configured.

### 3-layer QA
- **Layer 1 — structural:** compares render manifest against blueprint for scene count, duration drift, caption fidelity, node completeness
- **Layer 2 — technical:** ffprobe analysis for resolution (≥1080p), codec (H.264), audio presence, frame rate (≥24fps)
- **Layer 3 — perceptual:** extracts one JPEG per scene at given timestamps for human or AI visual review

---

## Extending

### Adding a preset

```ts
// packages/motion-library/presets/my-custom.ts
export const myCustomPresets = [
  {
    name: 'my-custom',
    type: 'fade' as const,
    keyframes: [
      { property: 'opacity', frames: [{ at: 0, value: 0 }, { at: 30, value: 1 }] },
    ],
  },
]
```

Register it in `packages/motion-library/presets/index.ts`.

### Creating a theme

```ts
import { BrandTheme } from '../themes'

export const myBrand: BrandTheme = {
  name: 'my-brand',
  colorPalette: { primary: '#...', secondary: '#...', /* ... */ },
  typography: { fonts: { heading: 'Inter', body: 'Inter', mono: 'JetBrains Mono' }, /* ... */ },
  animationPhilosophy: { defaultEasing: 'ease-out', defaultDuration: 0.6, /* ... */ },
  cameraStyle: { defaultPreset: 'push-zoom', movement: 'minimal', depth: true },
  pacing: { sceneLength: 4, beatInterval: 2, hookDuration: 3 },
}
```

### Building a template

Templates are functions that receive typed parameters and return a `Partial<SceneGraph>`. They compose scenes from nodes, each with its own constraints, animations, and effects.

```ts
import { SceneGraph } from '@opencode/video-engine'

export function createMyVideo(params: MyParams): Partial<SceneGraph> {
  return {
    scenes: [
      {
        id: 'intro',
        duration: 3,
        fps: 30,
        camera: { /* ... */ },
        nodes: [ /* ... */ ],
      },
    ],
  }
}
```

---

## Development

```bash
npm install              # Install dependencies
npx vitest run           # Run all 111 tests
npx tsc --noEmit         # Type-check the entire project
```

To render a video (requires Remotion and ffmpeg):

```bash
npx remotion render packages/video-engine/src/renderers/remotion/Root.tsx Scene out/render.mp4
```

---

## Project structure

```
packages/
├── video-engine/        → Core: types, serialization, constraint solver,
│                           timeline engine, camera controller, effect stack,
│                           Remotion renderer adapter
├── motion-library/      → Presets: 96 animations, 17 transitions, 8 cameras,
│                           14 backgrounds, 15 effects, 15 caption styles,
│                           10 animations, 7 layouts, 8 themes, 10 UI presets,
│                           12 particle presets, 10 SVG animations, 7 charts,
│                           7 loaders, 9 reveals, 10 icons, 10 scene comps,
│                           7 templates
├── .opencode/           → Agent definitions, motion design skills, commands
├── scripts/             → QA scripts (structural, ffprobe, keyframe extraction)
├── src/                 → CLI scaffold generator
```

---

## License

MIT
