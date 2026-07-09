# OpenCode Video Pipeline

> **Autonomous, production-grade video generation for OpenCode.** A scene graph engine, motion library, 5-agent orchestration system, and 3-layer QA — all from a single `npx @opencode/video-pipeline init` command.

---

## Quick Start

```bash
# Scaffold a new video project
npx @opencode/video-pipeline init my-video

# Enter the project and start OpenCode
cd my-video
opencode

# Start your first video
/new-video "Create a 30-second product launch video for our new AI tool"
```

---

## Architecture

```
                    ┌─────────────┐
                    │   Director   │  ← Orchestrates all stages
                    └──────┬──────┘
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
   │ Research  │    │ Creative │    │Production│    │    QA    │
   │ (facts,   │    │(story-   │    │ (Remotion│    │(3-layer  │
   │  script)  │    │  board)  │    │  render) │    │  check)  │
   └──────────┘    └──────────┘    └──────────┘    └──────────┘
```

### Star Topology

All communication flows through **Director**. Sub-agents never talk to each other. Director:

1. Reads `state/pipeline-state.json` to know where we are
2. Dispatches the next stage with full context
3. Evaluates output and decides retry or advance
4. Never touches code, assets, or renders — only plans and delegates

### Scene Graph Engine

The canonical representation is a **scene graph** (not React components):

- **Nodes** — text, rect, image, gradient, circle — arranged in a tree
- **Constraints** — anchor, flex, padding, margin, aspect-ratio, percentage/vw/vh units
- **Timelines** — per-node keyframe animations with bezier easing, loops, yoyo
- **Camera** — 8 presets (push-zoom, orbit-pan, shake, dolly, parallax, follow, tilt, focus-pull)
- **Effects** — 7 per-node composable effects (bloom, blur, glow, grain, chromatic-aberration, drop-shadow, color-grade)

**One scene graph → any aspect ratio.** The constraint solver re-laysouts nodes for 16:9 (horizontal) and 9:16 (vertical) from the same definition.

---

## Packages

The video pipeline ships two packages under `packages/`:

### `@opencode/video-engine`
The core engine — scene graph types, constraint solver, timeline engine, camera controller, effect stack, and Remotion renderer adapter.

### `@opencode/motion-library`
Ready-to-use motion presets and configuration:

| Package | Contents |
|---------|----------|
| **presets/** | 96 animation presets across 15 categories (fade, slide, pop, bounce, elastic, blur, counter, typing, wave, stagger, parallax, float, shake, pulse, light-sweep) |
| **transitions/** | 17 scene transitions (crossfade, slide, zoom, whip-pan, blur, light-sweep, morph, circular-reveal, grid-reveal) |
| **cameras/** | 8 camera movement configurations |
| **backgrounds/** | 14 background presets (gradient, noise, lights, solid, pattern) |
| **effects/** | 15 effect configurations |
| **typography/captions/** | 15 caption styles, 10 animations, 7 layouts, and a caption generator |
| **themes/** | 8 brand themes (Apple, Stripe, Linear, Raycast, Framer, Vercel, Notion, OpenAI) + custom template |
| **ui/** | 10 UI presets (hero, cards, notifications, toasts, buttons, badges, modals, tooltips, avatars) |
| **particles/** | 12 particle presets (sparkle, confetti, snow, fire, smoke, bubbles, stars, rain, magic-dust, embers) |
| **svg/** | 10 SVG animation presets (morph, draw, stroke-animate, path-reveal, float) |
| **charts/** | 7 chart presets (bar, line, pie, area, donut, radial) |
| **loaders/** | 7 loader presets (spinner, pulse, skeleton, dots, bar, ring, wave) |
| **reveals/** | 9 reveal animations (wipe, expand, flip, shutter, blinds) |
| **icons/** | 10 Material-style icons (checkmark, cross, arrow, star, heart, play, pause, settings, bell, search) |
| **scenes/** | 10 scene categories with reusable scene graph fragments |
| **templates/** | 7 complete video templates (product-demo, explainer, social-clip, launch-teaser, tutorial, testimonial, feature-update) |

---

## Agent System

| Agent | Role | Model | Max Retries |
|-------|------|-------|-------------|
| **Director** | Orchestrates the pipeline | Claude Sonnet 4 (0.3 temp) | — |
| **Research** | Gathers facts, writes script | Default | 2 |
| **Creative** | Storyboard, motion design, captions | Default | 3 |
| **Production** | Remotion render, asset management | Default | 3 |
| **QA** | Structural, technical, perceptual checks | Default | 5 |

### Quality Thresholds

- Minimum per dimension: **75/100**
- Minimum average: **85/100**
- Hard-fail dimensions: **Facts**, **Rendering**
- Global retry ceiling: **12 attempts**

---

## Motion Design Skills

Five OpenCode skills loaded by Director into Creative context:

| Skill | When Loaded |
|-------|-------------|
| **motion-design** | Every Creative session — 12 principles, easing, timing, rhythm |
| **visual-composition** | Every video project — hierarchy, gestalt, color psychology |
| **cinematography** | When camera/cinematic movement specified |
| **typography-motion** | When text-heavy or captions used |
| **attention-psychology** | Short-form / social clips — retention patterns |

---

## Configuration

### `opencode.json`

```json
{
  "permission": { "external_directory": "deny" },
  "mcp": {
    "context7": { "type": "remote", "url": "https://mcp.context7.com/mcp", "enabled": true }
  }
}
```

### `state/pipeline-state.json`

Tracks complete pipeline state — stages, attempts, quality scores, checkpoints, and logs. Director reads and writes this; sub-agents read it.

---

## Customization

### Adding a Preset

```typescript
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

Then register it in `packages/motion-library/presets/index.ts`.

### Creating a Theme

```typescript
// packages/motion-library/themes/my-brand.ts
import { BrandTheme } from './index'
export const myBrand: BrandTheme = {
  name: 'my-brand',
  // ... fill in all BrandTheme fields
}
```

### Adding a Template

```typescript
// packages/motion-library/templates/my-video.ts
import { SceneGraph } from '@opencode/video-engine'
export function createMyVideo(params: MyParams): Partial<SceneGraph> {
  // Return scene graph with scenes and nodes
}
```

---

## Quality Assurance

Three layers of automated QA:

1. **Structural QA** (`scripts/qa-manifest.js`) — Compares render manifest against blueprint: scene count, timing, caption fidelity, visual completeness
2. **Technical QA** (`scripts/qa-ffprobe.js`) — Uses ffprobe to check resolution, codec, audio, duration, frame rate
3. **Keyframe Extraction** (`scripts/extract-keyframes.js`) — Extracts frame-per-scene JPEGs for human/AI perceptual review

---

## Development

```bash
# Install dependencies
npm install

# Run tests
npx vitest run

# Render a video
npx remotion render packages/video-engine/src/renderers/remotion/Root.tsx Scene out/render.mp4

# Run QA
node scripts/qa-ffprobe.js out/render.mp4
```

---

## License

MIT
