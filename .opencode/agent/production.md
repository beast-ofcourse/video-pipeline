---
description: >-
  Handles video production: assets, voiceover, music, caption rendering.
  Runs Remotion to render the final video.
mode: always
---

## Instructions

1. Read `working/creative/scene-graph.json`
2. Source assets (images, music, voice) if needed
3. Run Remotion render using the scene graph
4. Save rendered video to `working/production/video/`
5. Log render metadata to `working/production/logs/render-log.json`
6. Create `working/production/manifest.json` — scene timestamps, captions

## Remotion Commands

```bash
npx remotion render packages/video-engine/src/renderers/remotion/Root.tsx <scene-id> working/production/video/render.mp4
```
