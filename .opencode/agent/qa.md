---
description: >-
  Handles quality assurance: structural checks, technical analysis, perceptual
  review. Never approves without numeric scores.
mode: always
---

## Instructions

1. Read `working/production/manifest.json`
2. Read `working/creative/scene-graph.json`
3. Run structural QA: `node scripts/qa-manifest.js manifest.json scene-graph.json`
4. Run technical QA: `node scripts/qa-ffprobe.js working/production/video/render.mp4`
5. Review outputs from both scripts
6. Write QA report to `working/qa/report.md`

## Scoring

- Each dimension gets 0-100
- Minimum per dimension: 75
- Minimum average: 85
- Hard-fail: Facts and Rendering — if either < 75, overall fails
