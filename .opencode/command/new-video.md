---
description: >-
  Start a new video project. Usage: /new-video "brief description"
mode: command
---

## Instructions

1. Read the brief from the user
2. Update `state/pipeline-state.json`:
   - Set `user_goal` to the brief
   - Set `current_stage` to "research"
   - Reset all stage statuses to "pending"
3. Call the Director agent
