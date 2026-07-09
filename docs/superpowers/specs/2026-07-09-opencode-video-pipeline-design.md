# OpenCode Autonomous Video Pipeline — Design Spec

**Date:** 2026-07-09
**Status:** Draft
**Package:** `@opencode/video-pipeline`

---

## 1. Overview

A drop-in npm package for OpenCode that provides a complete, autonomous video production pipeline. A user types `/new-video <brief>` and walks away to a finished, production-grade video — web research, scripting, asset generation, motion graphics, voice, music, rendering, and programmatic QA, all orchestrated by a Director agent.

### Core philosophy

This is a **motion graphics engine**, not a React component library. The architecture resembles After Effects, Apple Motion, or Rive — a scene graph with constraint-based layout, per-node timelines, first-class camera and effects, and a renderer-agnostic adapter layer. Remotion is the default renderer, but swappable.

---

## 2. Distribution & Setup

### Package

```
npm: @opencode/video-pipeline
```

### Usage

```bash
npx @opencode/video-pipeline init my-video-project
cd my-video-project
opencode
# /new-video "30-second product demo for a habit tracker app, Gen Z audience"
```

### Generated project

```
my-video-project/
├── .opencode/
│   ├── agent/
│   │   ├── director.md
│   │   ├── research.md
│   │   ├── creative.md
│   │   ├── production.md
│   │   └── qa.md
│   ├── command/
│   │   ├── new-video.md
│   │   └── status.md
│   └── skills/                    ← Motion design knowledge base
│       ├── motion-design.skill.md
│       ├── visual-composition.skill.md
│       ├── cinematography.skill.md
│       ├── typography-motion.skill.md
│       └── attention-psychology.skill.md
├── state/
│   └── pipeline-state.json
├── working/
│   ├── research/
│   ├── creative/
│   ├── production/
│   │   ├── assets/
│   │   ├── voice/
│   │   ├── music/
│   │   ├── captions/
│   │   ├── video/
│   │   ├── render/
│   │   └── logs/
│   └── qa/
├── packages/
│   ├── video-engine/           ← Scene graph engine + renderers
│   └── motion-library/         ← Presets, templates, caption styles, themes
├── scripts/
│   ├── qa-ffprobe.js
│   ├── qa-manifest.js
│   └── extract-keyframes.js
├── opencode.json
├── AGENTS.md
└── package.json
```

### Init flags

| Flag | Effect |
|------|--------|
| `--minimal` | Agents + config only, no template files |
| `--templates` | Include all scene templates |
| `--captions-only` | Only caption system + agents (for text-first workflows) |

---

## 3. Agent System

### Topology

Star topology. Director is the sole orchestrator. Subagents never invoke each other.

```
                 Director (primary)
                /    |       |      \
         Research Creative Production QA
```

### Agent responsibilities

| Agent | Mode | Model (default) | Writes to | Tools |
|-------|------|-----------------|-----------|-------|
| Director | primary | Opus-4 | `state/**` | task (4 subagents) |
| Research | subagent | Sonnet-5 | `working/research/**` | websearch, webfetch |
| Creative | subagent | Opus-4 | `working/creative/**` | webfetch (ask) |
| Production | subagent | Sonnet-5 | `working/production/**` | bash, webfetch, npm/pip |
| QA | subagent | Sonnet-5 | `working/qa/**` | ffprobe only |

### Pipeline flow

```
Research → Creative → Production → QA → (Director decides)
                                          ├── pass → done
                                          ├── fail → re-invoke failing stage
                                          └── retries exhausted → user
```

### The Creative → Production contract: `scene-blueprint.json`

Creative writes a structured JSON file that bridges prose planning to programmatic execution. This is not the full scene graph — it's the *creative intent* that Production converts into a complete scene graph.

Key fields per scene:
- Duration, hook/script content
- Caption style reference + text layout
- Camera preset reference
- Background type + parameters
- UI component references
- Audio/voice line mapping
- Transition type
- Effect stack
- Motion/timing intent

Production reads this, then generates the complete `scene-graph.json`.

### Director's decision logic

After every QA pass, Director:
1. Reads QA scorecard
2. Compares against `quality_thresholds` (min per dim: 75, avg: 85)
3. Checks hard-fail dimensions (Facts, Rendering)
4. If pass: advance stage or finish
5. If fail: re-invoke exactly the agent responsible for the failing dimension
6. If retries exhausted: report to user with full history

### Retry ceilings

| | Max attempts |
|---|-------------|
| Research | 2 |
| Creative | 3 |
| Production | 3 |
| QA | 5 |
| Global | 12 |

---

## 4. Scene Graph Engine (Core)

This is the heart of the system. Everything is a node in a tree.

### The scene graph

```
Scene
├── Camera
│   ├── position (x, y, z)
│   ├── rotation
│   ├── zoom/scale
│   ├── orbit
│   ├── depth
│   ├── parallax
│   └── presets (push-zoom, orbit-pan, shake, follow, etc.)
├── Background
│   ├── GradientMesh
│   ├── Particles
│   ├── Noise
│   ├── Lights
│   └── Solid
├── UI
│   ├── BrowserWindow
│   ├── Terminal
│   ├── CodeBlock
│   ├── Card
│   ├── Dashboard
│   ├── MobileFrame
│   └── ... (50+ component types as node configs)
├── Text
│   ├── Title
│   ├── Subtitle
│   ├── Captions
│   └── Label
├── Media
│   ├── Image
│   ├── VideoClip
│   ├── Lottie
│   └── Rive
├── Audio
│   ├── Voice
│   ├── Music
│   ├── SFX
│   └── Ambience
└── Effects (per-node stack)
    ├── Bloom
    ├── Blur
    ├── Glow
    ├── ChromaticAberration
    ├── Grain
    ├── Noise
    ├── Shadow
    ├── Reflection
    ├── Gradient
    ├── Mask
    ├── Clip
    └── LightSweep
```

### Node base properties

Every node supports:

```
id          — unique identifier
type        — node type (scene, camera, text, rect, image, etc.)
children    — child node IDs
parent      — parent node ID
visible     — boolean
blendMode   — normal, multiply, screen, overlay, etc.
opacity     — 0–1
zIndex      — stack order
position    — { x, y } (in layout units, not pixels)
rotation    — degrees
scale       — { x, y }
constraints — layout constraints (see §4.1)
animations  — array of Animation objects (see §4.3)
effects     — array of Effect objects (see §4.5)
metadata    — arbitrary key-value (for agent context)
```

### 4.1 Layout Engine

Constraint-based. Inspired by Flutter, CSS Flexbox, Figma AutoLayout.

```
interface Constraints {
  anchor?: 'top-left' | 'top-center' | 'top-right' | 'center' |
           'bottom-left' | 'bottom-center' | 'bottom-right'
  alignment?: 'start' | 'center' | 'end' | 'stretch'
  padding?: { top, right, bottom, left }
  margin?: { top, right, bottom, left }
  maxWidth?: number | string  // number = pixels, string = percentage
  maxHeight?: number | string
  aspectRatio?: number
  relativeTo?: 'parent' | 'viewport' | 'sibling'
  flexDirection?: 'row' | 'column'
  flexGrow?: number
  flexShrink?: number
}
```

The layout engine solves layouts dynamically for any aspect ratio:
- 16:9 (1920×1080)
- 9:16 (1080×1920)
- 1:1 (1080×1080)
- 4:5 (1080×1350)
- 21:9 (2560×1080)

**No duplicate scene definitions. No safe zones. One scene graph, any format.**

### 4.2 Timeline Engine

Every node owns its own timeline. Keyframe-based, not preset-based.

```
interface Keyframe {
  frame: number           // in frames (absolute)
  value: number | number[] // the animated value
  easing: Easing
  bezier?: [number, number, number, number] // custom bezier
}

interface Animation {
  property: 'position' | 'rotation' | 'scale' | 'opacity' |
            'blur' | 'color' | 'clip' | string
  keyframes: Keyframe[]
  loop?: boolean
  loopCount?: number
  yoyo?: boolean
  delay?: number  // frames
}
```

Support:
- Linear, ease-in, ease-out, ease-in-out, spring, elastic, bounce
- Custom bezier curves
- Interpolation of numeric, vector, and color values
- Multiple simultaneous animations per node

### 4.3 Animation Engine

Animations compose. A node can simultaneously animate:
- Opacity (fade in)
- Scale (grow)
- Blur (blur in)
- Rotation (spin)
- Position (slide)

Each is an independent Animation object attached to the same node. The engine evaluates them all at each frame and applies the combined result.

**This is how 200+ text animations emerge from one engine — not from 200 components, but from combinations of opacity + scale + position + clip keyframes.**

### 4.4 Camera Engine

First-class camera object in the scene graph. Not a transform wrapper — a real camera.

```
interface Camera {
  type: 'perspective' | 'orthographic'
  position: { x, y, z }
  rotation: { x, y, z }
  zoom: number
  focalLength: number
  depthOfField?: number
  focusTarget?: string  // node ID to focus on

  // Presets (parameterized presets, not components)
  preset?: 'push-zoom' | 'orbit-pan' | 'dolly' | 'shake' |
           'parallax' | 'follow' | 'tilt' | 'focus-pull'
  presetParams?: Record<string, number>
}
```

All scene layers inherit camera transforms automatically.

### 4.5 Effects Engine

Effects are per-node. Stackable. Composable.

```
interface Effect {
  type: 'bloom' | 'blur' | 'glow' | 'shadow' | 'reflection' |
        'grain' | 'chromatic-aberration' | 'gradient' | 'mask' |
        'clip' | 'noise' | 'light-sweep' | 'drop-shadow' |
        'glassmorphism' | 'neumorphism'
  params: Record<string, number | string | boolean | number[]>
  order: number  // effect application order within the stack
}
```

Effects render independently and composite together. A node can have bloom + glow + grain, each independently configurable.

### 4.6 Renderer Adapter

```
interface RendererAdapter {
  render(sceneGraph: SceneGraph, outputPath: string, options: RenderOptions): Promise<RenderResult>
  supports: ('16:9' | '9:16' | '1:1' | '4:5' | '21:9')[]
}
```

Default: **RemotionRenderer** — traverses the scene graph at each frame, resolves constraints, evaluates timelines, applies camera + effects, and renders via Remotion's `<Composition>`.

Future renderers can be added without changing the scene graph:
- Motion Canvas
- Canvas 2D (for real-time preview)
- WebGL / PixiJS
- Three.js

---

## 5. Motion Library

The motion library has three layers: **animation presets** (atomic keyframe configurations), **library packages** (composed scene graph fragments and presets), and **brand themes** (complete visual identity systems).

Everything is data/config, not pre-built React components. The LLM generates scene graphs that reference these presets by name. The engine resolves them at render time.

### 5.1 Animation Presets (Atomic)

Atomic animation primitives. Each is a keyframe configuration that the Timeline Engine can apply to any node. Every animation type below contains multiple variants.

```
packages/motion-library/presets/

├── fade/
│   ├── fade-in.ts
│   ├── fade-out.ts
│   ├── fade-in-up.ts
│   ├── fade-in-down.ts
│   ├── fade-in-scale.ts
│   └── ... (15+)
│
├── slide/
│   ├── slide-up.ts
│   ├── slide-down.ts
│   ├── slide-left.ts
│   ├── slide-right.ts
│   ├── slide-up-stagger.ts
│   └── ... (15+)
│
├── pop/
│   ├── pop-in.ts
│   ├── pop-out.ts
│   ├── pop-scale.ts
│   ├── pop-rotate.ts
│   └── ... (10+)
│
├── bounce/
│   ├── bounce-in.ts
│   ├── bounce-out.ts
│   ├── bounce-scale.ts
│   ├── bounce-rotate.ts
│   └── ... (10+)
│
├── elastic/
│   ├── elastic-in.ts
│   ├── elastic-out.ts
│   ├── elastic-scale.ts
│   └── ... (8+)
│
├── blur/
│   ├── blur-in.ts
│   ├── blur-out.ts
│   ├── directional-blur-in.ts
│   └── ... (6+)
│
├── counter/
│   ├── count-up.ts
│   ├── count-down.ts
│   ├── count-up-commas.ts
│   └── ... (6+)
│
├── typing/
│   ├── typewriter.ts
│   ├── typewriter-fast.ts
│   ├── typewriter-cursor.ts
│   ├── backspace.ts
│   └── ... (8+)
│
├── wave/
│   ├── wave-in.ts
│   ├── wave-scale.ts
│   ├── wave-rotate.ts
│   └── ... (8+)
│
├── stagger/
│   ├── stagger-fade.ts
│   ├── stagger-slide.ts
│   ├── stagger-scale.ts
│   ├── stagger-pop.ts
│   └── ... (10+)
│
├── parallax/
│   ├── parallax-up.ts
│   ├── parallax-down.ts
│   ├── parallax-depth.ts
│   └── ... (6+)
│
├── float/
│   ├── float-up-down.ts
│   ├── float-rotate.ts
│   ├── float-drift.ts
│   └── ... (6+)
│
├── shake/
│   ├── shake-x.ts
│   ├── shake-y.ts
│   ├── shake-intensity.ts
│   └── ... (6+)
│
├── pulse/
│   ├── pulse-scale.ts
│   ├── pulse-opacity.ts
│   ├── pulse-glow.ts
│   └── ... (6+)
│
└── light-sweep/
    ├── light-sweep-left.ts
    ├── light-sweep-right.ts
    ├── light-sweep-diagonal.ts
    └── ... (6+)
```

All presets share a common interface:

```typescript
interface AnimationPreset {
  name: string
  type: 'fade' | 'slide' | 'pop' | 'bounce' | 'elastic' | 'blur' |
        'counter' | 'typing' | 'wave' | 'stagger' | 'parallax' |
        'float' | 'shake' | 'pulse' | 'light-sweep'
  keyframes: { property: string; frames: { at: number; value: number | number[]; easing?: Easing }[] }
  defaultDuration?: number
  variants?: Record<string, Partial<AnimationPreset>>
}
```

### 5.2 Library Packages (Composed)

Composed scene graph fragments and presets built on the atomic presets. Each package contains multiple presets that combine nodes, animations, and effects into reusable configurations.

```
packages/motion-library/
│
├── transitions/
│   ├── mask-reveal/
│   ├── morph/
│   ├── cross-zoom/
│   ├── directional-blur/
│   ├── light-sweep/
│   ├── slide/
│   ├── scale/
│   ├── whip-pan/
│   ├── shape-morph/
│   ├── svg-reveal/
│   ├── liquid-wipe/
│   ├── circular-reveal/
│   └── grid-reveal/
│
├── cameras/
│   ├── push-zoom.ts
│   ├── orbit-pan.ts
│   ├── dolly.ts
│   ├── shake.ts
│   ├── parallax.ts
│   ├── follow.ts
│   ├── tilt.ts
│   ├── focus-pull.ts
│   └── ... (15+)
│
├── typography/
│   ├── kinetic/
│   ├── reveal/
│   ├── split/
│   ├── gradient/
│   ├── glitch/
│   ├── handwriting/
│   ├── 3d-text/
│   └── captions/
│       ├── styles/           ← 50-80 font + treatment presets
│       │   ├── neon-pulse.ts
│       │   ├── bold-impact.ts
│       │   ├── elegant-serif.ts
│       │   ├── cyber-glitch.ts
│       │   ├── minimal-clean.ts
│       │   ├── retro-vhs.ts
│       │   ├── gradient-melt.ts
│       │   └── ...
│       ├── animations/       ← keyframe presets for text reveal
│       │   ├── typewriter.ts
│       │   ├── character-scale-up.ts
│       │   ├── word-stagger.ts
│       │   ├── line-reveal.ts
│       │   ├── blur-in-pop.ts
│       │   ├── slide-up-stagger.ts
│       │   └── ... (30+)
│       ├── layouts/          ← constraint configurations
│       │   ├── single-line-center.ts
│       │   ├── dual-line-stacked.ts
│       │   ├── karaoke.ts
│       │   ├── word-by-word.ts
│       │   └── ... (15+)
│       └── generator.ts      ← resolves style + layout + animation
│
├── ui/
│   ├── hero-sections/
│   ├── feature-cards/
│   ├── pricing-cards/
│   ├── notifications/
│   ├── toasts/
│   ├── tooltips/
│   ├── popups/
│   ├── chat-bubbles/
│   ├── search-bars/
│   ├── command-palettes/
│   └── timelines/
│
├── backgrounds/
│   ├── gradient-mesh/
│   ├── noise/
│   ├── lights/
│   ├── particles-backdrop/
│   └── ... (15+)
│
├── effects/
│   ├── bloom/
│   ├── glow/
│   ├── blur/
│   ├── chromatic-aberration/
│   ├── grain/
│   ├── noise/
│   ├── light-sweep/
│   ├── shadow/
│   ├── reflection/
│   ├── glassmorphism/
│   ├── neumorphism/
│   ├── film-burn/
│   └── motion-blur/
│
├── particles/
│   ├── sparkle/
│   ├── confetti/
│   ├── snow/
│   ├── fire/
│   ├── smoke/
│   ├── bubbles/
│   ├── stars/
│   └── ... (15+)
│
├── svg/
│   ├── morph/
│   ├── draw/
│   ├── stroke-animate/
│   ├── path-reveal/
│   └── ... (10+)
│
├── graphs/
│   └── ... (less structured, organic)
│
├── charts/
│   ├── bar/
│   ├── line/
│   ├── pie/
│   ├── area/
│   ├── radial/
│   └── ... (10+)
│
├── loaders/
│   ├── spinner/
│   ├── skeleton/
│   ├── progress-bar/
│   ├── pulse-ring/
│   └── ... (10+)
│
├── reveals/
│   ├── clip-reveal/
│   ├── wipe-reveal/
│   ├── mask-reveal/
│   ├── shape-reveal/
│   └── ... (10+)
│
├── icons/
│   ├── check/
│   ├── arrow/
│   ├── close/
│   ├── menu/
│   ├── loading/
│   └── ... (50+ animated icons)
│
├── product-showcases/
│   ├── device-rotation/
│   ├── feature-highlight/
│   ├── comparison/
│   ├── testimonial/
│   └── ... (15+)
│
├── hero-sections/
│   ├── centered-hero/
│   ├── split-hero/
│   ├── video-bg-hero/
│   └── ... (10+)
│
├── storytelling/
│   ├── hook-open/
│   ├── problem-solution/
│   ├── before-after/
│   ├── journey/
│   └── ... (10+)
│
├── code-blocks/
│   ├── syntax-highlight/
│   ├── typewriter-code/
│   ├── diff-view/
│   ├── terminal-output/
│   └── ... (10+)
│
├── browser/
│   ├── browser-window/
│   ├── address-bar/
│   ├── tabs/
│   ├── devtools/
│   └── ... (10+)
│
├── terminal/
│   ├── terminal-window/
│   ├── command-line/
│   ├── terminal-output/
│   └── ... (8+)
│
├── devices/
│   ├── iphone-frame/
│   ├── macbook-frame/
│   ├── android-frame/
│   ├── tablet-frame/
│   ├── monitor-frame/
│   └── ... (10+)
│
├── timeline/
│   ├── horizontal-timeline/
│   ├── vertical-timeline/
│   ├── interactive-timeline/
│   └── ... (8+)
│
└── templates/
    ├── product-demo/
    ├── explainer/
    ├── social-clip/
    ├── launch-teaser/
    ├── tutorial/
    ├── testimonial/
    ├── feature-update/
    └── ... (50+)
```

### 5.3 Brand Themes

A brand theme is a complete visual identity system. Creative specifies a theme name instead of choosing every parameter individually. Production resolves it into scene graph parameters automatically.

```
packages/motion-library/themes/
│
├── apple/
│   ├── color-palette.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── animation-philosophy.ts
│   ├── camera-style.ts
│   ├── transition-style.ts
│   ├── icon-style.ts
│   ├── backgrounds.ts
│   ├── motion-rules.ts
│   ├── sound-design.ts
│   └── pacing.ts
│
├── stripe/                ← Clean, professional, blue-heavy
├── linear/                ← Dark mode, gradients, smooth
├── raycast/               ← Bold color, red accents, fast
├── framer/                ← Playful, pastel, bouncy
├── vercel/                ← Geometric, monochrome, tech
├── notion/                ← Warm, sans-serif, organic
├── openai/                ← Dark, green accents, futuristic
├── custom/                ← User-defined theme
└── index.ts               ← theme registry, resolved by name
```

Each theme file exports:

```typescript
interface BrandTheme {
  name: string
  colorPalette: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    gradients: Gradient[]
  }
  typography: {
    fonts: { heading: string; body: string; mono: string }
    weights: { heading: number; body: number }
    sizes: { h1: number; h2: number; body: number; caption: number }
    tracking: number
    lineHeight: number
  }
  spacing: {
    unit: number
    padding: number
    gap: number
    sectionGap: number
  }
  animationPhilosophy: {
    defaultEasing: string
    defaultDuration: number
    staggerDelay: number
    springTension: number
    springFriction: number
  }
  cameraStyle: {
    defaultPreset: string
    movement: 'minimal' | 'dynamic' | 'cinematic'
    depth: boolean
  }
  transitionStyle: {
    default: string
    duration: number
  }
  iconStyle: {
    style: 'outline' | 'filled' | 'duotone'
    strokeWidth: number
    rounded: boolean
  }
  backgrounds: {
    default: string
    patterns: string[]
  }
  motionRules: {
    reduceMotion: boolean
    parallaxIntensity: number
    blurIntensity: number
  }
  soundDesign: {
    musicGenre: string
    musicMood: string
    sfxStyle: string
  }
  pacing: {
    sceneLength: number
    beatInterval: number
    hookDuration: number
  }
}
```

### Production agent's discovery mechanism

The Production agent reads a generated manifest at the start of each job. The manifest lists every available preset by name with a one-line description and category path.

```typescript
// packages/motion-library/manifest.json (auto-generated)
{
  "presets": [
    { "category": "fade", "name": "fade-in", "description": "Opacity 0→1" },
    { "category": "fade", "name": "fade-in-up", "description": "Opacity 0→1 + translateY 20→0" },
    { "category": "slide", "name": "slide-up", "description": "TranslateY 50→0" },
    ...
  ],
  "library": [
    { "package": "transitions", "name": "mask-reveal", "description": "Circular wipe transition" },
    { "package": "cameras", "name": "push-zoom", "description": "Slow zoom in with depth" },
    { "package": "typography/captions", "name": "neon-pulse", "description": "Green neon glow caption" },
    ...
  ],
  "themes": ["apple", "stripe", "linear", "raycast", "framer", "vercel", "notion", "openai"]
}
```

---

## 5A. Motion Design Knowledge Base (Skills)

A set of 5 OpenCode skills that ground every creative decision in established motion design principles. Director loads the relevant skills into Creative's context before each task.

### Skill overview

| Skill | Topics | When Director loads it |
|-------|--------|----------------------|
| **motion-design.skill.md** | 12 principles of animation, easing, timing, spacing, rhythm | Every video project |
| **visual-composition.skill.md** | Visual hierarchy, composition, gestalt principles, color psychology | Every video project |
| **cinematography.skill.md** | Camera language, depth, lighting, parallax | When camera/cinematic movement is specified |
| **typography-motion.skill.md** | Kinetic typography, font pairing, motion readability | When captions or text-heavy scenes exist |
| **attention-psychology.skill.md** | Motion psychology, attention management, eye tracking, cognitive load | Short-form / social clips (retention-critical) |

### Skill structure (each .skill.md)

Every skill follows the same format — rules first, then actionable decision trees, then references to presets in the motion library.

```
---
description: >-
  [Core topic and when this skill activates]
---

## Rules

[3-7 hard rules that must never be violated]

## Decision Trees

[When X → use Y pattern. When Z → avoid W.]

## Preset Mappings

[This principle maps to: fade/fade-in-up.ts, stagger/stagger-pop.ts]

## Anti-Patterns

[Don't do X — it causes Y problem in the render.]

## Agency Reference

[Apple uses this technique in X spot. Stripe applies it in Y.]
```

### Example: motion-design.skill.md (condensed)

```markdown
---
description: >-
  Core motion design principles: the 12 principles of animation, easing
  theory, timing, spacing, and rhythm. Loaded by Director before every
  Creative planning session for any video project.
---

## Rules

1. Every motion must have a purpose — no animation "just because."
   Decorative motion distracts from the message.
2. Easing determines feel: ease-out-expo for premium/cinematic,
   spring for playful, linear only for mechanical/technical.
3. A bounce should never exceed 3 oscillations in a sub-30-second clip.
4. Stagger delay must be proportional to scene importance — the
   hero element animates first, supporting elements follow.

## Decision Trees

- Brand tone is "premium" or "minimalist" →
  Use ease-out-expo, slow durations (0.6-1.0s), no bounce
- Brand tone is "playful" or "energetic" →
  Use spring, snappy durations (0.2-0.4s), bounce acceptable
- Scene is a reveal or hero moment →
  Stagger child elements with 0.05-0.1s delay, hero first
- Scene is technical/data-heavy →
  Minimize motion, use fade transitions, no decorative bounce

## Preset Mappings

- ease-out-expo → presets/fade/fade-in.ts, presets/slide/slide-up.ts
- spring → presets/pop/pop-in.ts, presets/bounce/bounce-scale.ts
- stagger → presets/stagger/stagger-pop.ts
- counter → presets/counter/count-up.ts

## Anti-Patterns

- Don't use elastic easing on UI elements — it feels unresponsive
- Don't animate every element on screen simultaneously —
  the viewer doesn't know where to look
- Don't use linear easing for organic movement —
  real objects accelerate and decelerate

## Agency Reference

- Apple keynote reveals: ease-out-expo, 0.8s, single element at a time
- Stripe product demos: spring tension 180, friction 12, fast exits
- Linear's UI reveals: stagger 0.06s, scale + fade combined
```

### How the agent system uses skills

```
Director receives: /new-video "30-sec product demo for dev tools"

1. Director reads the brief, detects:
   - dev tools → typography-motion (code blocks, terminal)
   - product demo → cinematography (product shots)
   - short-form → attention-psychology (retention)

2. Director loads these 4 skills into Creative's task prompt
   (motion-design and visual-composition are always loaded)

3. Creative receives skills inline — it doesn't need to find them.
   Every creative decision references the rules and decision trees.

4. QA later checks the scene-blueprint against the same principles:
   "Scene 3 uses elastic easing on a code block — anti-pattern flagged
   in motion-design skill. Score: Typography 68/100."
```

### Skill files (shipped with the package)

```
.opencode/skills/
├── motion-design.skill.md
├── visual-composition.skill.md
├── cinematography.skill.md
├── typography-motion.skill.md
└── attention-psychology.skill.md
```

---

## 6. Rendering Pipeline

### Per-video flow

```
1. Production reads scene-blueprint.json (Creative's intent)
2. Production resolves presets → scene-graph.json (complete tree)
3. video-engine deserializes scene-graph.json
4. ConstraintEngine solves layouts for target aspect ratio
5. TimelineEngine precomputes all keyframe interpolations
6. Camera transforms applied
7. Effects applied per node, composited
8. RemotionRenderer renders frame N:
   a. Traverse scene graph → resolve each node at frame N
   b. Apply layout constraints
   c. Interpolate animations
   d. Apply camera
   e. Render node subtree
   f. Composite with blend modes
   g. Apply effects stack
   h. Output frame
9. FFmpeg encodes frames → final .mp4
```

### Dual format strategy

Because the layout engine is constraint-based, one scene graph produces valid layouts for any aspect ratio. The render is called twice with different viewport dimensions:

```bash
npx remotion render Video out/horizontal.mp4 --props '{"aspectRatio":"16:9"}'
npx remotion render Video out/vertical.mp4 --props '{"aspectRatio":"9:16"}'
```

No duplicate scene definitions. No safe zones. The same scene graph adapts.

### Output structure

```
working/production/render/
├── horizontal/
│   ├── render.mp4
│   └── manifest.json
├── vertical/
│   ├── render.mp4
│   └── manifest.json
├── technical-report.json      ← ffprobe results
├── keyframes/
│   ├── scene-01-h.jpg
│   ├── scene-01-v.jpg
│   └── ...
└── logs/
```

---

## 7. QA System (Three-Layer)

### Layer 1 — Structural QA (metadata, instant, free)

Compares render manifest against Creative's scene plan:
- Scene count matches
- Durations match
- All expected assets present (voice, music, captions)
- Text content matches script

**Scores:** Script Fidelity, Scene Completeness

### Layer 2 — Technical QA (ffprobe, fast, automated)

Runs ffprobe and frame analysis:
- Resolution, codec, bitrate, frame rate
- Black frame detection
- Frozen frame detection
- Audio silence / peak / clipping detection
- A/V sync estimation

**Scores:** Rendering Quality, Technical Integrity

### Layer 3 — Perceptual QA (multimodal LLM, optional)

Extracts keyframes at scene boundaries. Multimodal LLM evaluates:
- Visual quality against Creative's brief
- Color and typography correctness
- Motion smoothness
- Overall engagement

**Scores:** Visual Quality, Animation, Typography, Color

### Hard-fail dimensions

- **Facts** (checked against research.md) — must be ≥75 or stop
- **Rendering** (Layer 2 technical check) — must be ≥75 or stop

### Quality thresholds (configurable in state)

```json
{
  "minimum_per_dimension": 75,
  "minimum_average": 85,
  "hard_fail_dimensions": ["Facts", "Rendering"]
}
```

---

## 8. Package CLI Reference

```
@opencode/video-pipeline

Commands:
  init [dir]      Scaffold a new video pipeline project
    --minimal       Agents + config only
    --templates     Include scene templates
    --captions-only Caption system + agents

  new [brief]     (delegates to /new-video command)
  status          (delegates to /status command)
```

---

## 9. Build Order

| Phase | What | Rationale |
|-------|------|-----------|
| **P1** | Core engine: SceneGraph types + serialization + constraint layout solver | Foundations |
| **P2** | Timeline engine: Keyframes + easing + interpolation + composable animations | Motion core |
| **P3** | Remotion renderer adapter + frame-by-frame traversal | First rendered output |
| **P4** | Camera engine: position, zoom, orbit, depth, presets | First-class camera |
| **P5** | Effects engine: per-node stack + compositing pipeline | Visual polish |
| **P6** | Motion design skills: motion-design, visual-composition, cinematography, typography-motion, attention-psychology | Creative foundation |
| **P7** | Agent system: all 5 agent prompts + state machine + pipeline logic | Orchestration |
| **P8** | CLI scaffold: `init` command + project generation + `opencode.json` + `AGENTS.md` | Package ships |
| **P9** | Animation presets: all 15 categories (fade, slide, pop, bounce, elastic, blur, counter, typing, wave, stagger, parallax, float, shake, pulse, light-sweep) | Atomic building blocks |
| **P10** | Caption system: 50-80 styles + 30+ animations + 15+ layouts + generator | High-value feature |
| **P11** | Brand themes: apple, stripe, linear, raycast, framer, vercel, notion, openai + custom | Visual identity system |
| **P12** | Library packages - critical: transitions, cameras, typography, backgrounds, effects | Most-used packages |
| **P13** | Library packages - UI: ui, particles, svg, charts, loaders, reveals, icons | Scene content |
| **P14** | Library packages - scenes: product-showcases, hero-sections, storytelling, code-blocks, browser, terminal, devices, timeline | Narrative scenes |
| **P15** | Templates: 50+ full video templates (product demo, explainer, social clip, launch teaser, tutorial, testimonial) | Ship ready |
| **P16** | QA system: Layer 1 (structural manifest check) + Layer 2 (ffprobe technical) + Layer 3 (multimodal perceptual) | Quality loop |
| **P17** | Documentation, examples, and public launch | Ship |

---

## 10. Technology Decisions

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Scene graph engine | TypeScript, no framework dependencies | Swappable renderers |
| Renderer | Remotion (default), adapter pattern for future | Mature, programmatic video |
| Layout engine | Custom constraint solver | Inspired by Flutter/Figma |
| Effects | GLSL-like, implemented per renderer | Portable across renderers |
| Animation | Keyframe-based, own engine | Remotion-compatible via `useCurrentFrame()` |
| LLM model | Opus-4 (Director/Creative), Sonnet-5 (rest) | Heavy reasoning vs. cost |
| Package format | npm, scaffolds local workspace | Works with any package manager |

---

## 11. Design Decisions & Deliberate Deferrals

### Made now
- Scene graph as the canonical representation (not React components)
- Constraint-based layout (not safe zones)
- Per-node keyframe timelines (not preset animations)
- Renderer adapter pattern (Remotion is default, not baked in)
- Per-node effect stacks (not global effect layers)
- Three-layer QA (structural + technical + perceptual)

### Deferred
- **Real-time preview** — The engine can produce one, but it's not needed for automated pipeline. Add when interactive editing is needed.
- **Non-Remotion renderers** — The adapter is defined, but only Remotion is implemented initially. Canvas/WebGL renderers are v2.
- **Audio waveform visualization** — Belongs in the UI component presets; can be added as a node type without engine changes.
- **Collaborative editing** — Not relevant for an autonomous pipeline.
- **Plugin system for custom node types** — The architecture supports it via the `type` field, but the plugin registry is future work.

---

*End of spec. Ready for review.*
