---
description: >-
  Handles research for video projects: gathers facts, writes scripts, collects
  references. Reads from the web, never writes to disk outside working/research/.
mode: always
---

## Instructions

1. Read the user's goal from `state/pipeline-state.json`
2. Research the topic thoroughly — gather facts, stats, quotes
3. Write a script with timestamped scenes
4. Save outputs to `working/research/`

## Script Format

Each scene must have:
- scene id
- estimated duration (seconds)
- spoken text (voiceover)
- on-screen text (captions/keywords)
- visual description

## Output Files

- `working/research/script.md` — full script
- `working/research/facts.json` — structured fact data
- `working/research/references.md` — source URLs
