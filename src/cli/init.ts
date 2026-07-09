import fs from 'fs'
import path from 'path'

export interface InitOptions {
  targetDir: string
  withVoiceover?: boolean
  withMusic?: boolean
  captionsOnly?: boolean
}

export async function initProject(options: InitOptions): Promise<void> {
  const dir = path.resolve(options.targetDir)
  if (fs.existsSync(dir)) {
    const contents = fs.readdirSync(dir)
    if (contents.length > 0) {
      throw new Error(`Directory ${dir} is not empty`)
    }
  }

  fs.mkdirSync(dir, { recursive: true })

  // Create directory structure
  const dirs = [
    '.opencode/agent',
    '.opencode/command',
    '.opencode/skills',
    'state',
    'working/research',
    'working/creative',
    'working/production/assets',
    'working/production/voice',
    'working/production/music',
    'working/production/captions',
    'working/production/video',
    'working/production/render',
    'working/production/logs',
    'working/qa',
    'packages/video-engine/src',
    'packages/motion-library/presets',
    'packages/motion-library/transitions',
    'packages/motion-library/cameras',
    'packages/motion-library/typography/captions',
    'packages/motion-library/ui',
    'packages/motion-library/backgrounds',
    'packages/motion-library/effects',
    'packages/motion-library/particles',
    'packages/motion-library/themes',
    'scripts',
    'docs',
  ]

  for (const d of dirs) {
    fs.mkdirSync(path.join(dir, d), { recursive: true })
  }

  // Write package.json workspace root
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({
    name: path.basename(dir),
    private: true,
    workspaces: ['packages/*'],
    scripts: {
      render: 'npx remotion render packages/video-engine/src/renderers/remotion/Root.tsx Video out/render.mp4',
      'render:vertical': 'npx remotion render packages/video-engine/src/renderers/remotion/Root.tsx VideoVertical out/vertical.mp4',
      'qa': 'node scripts/qa-ffprobe.js',
    },
  }, null, 2))

  // Write opencode.json
  fs.writeFileSync(path.join(dir, 'opencode.json'), JSON.stringify({
    $schema: 'https://opencode.ai/config.json',
    permission: { external_directory: 'deny' },
    mcp: {
      context7: { type: 'remote', url: 'https://mcp.context7.com/mcp', enabled: true },
    },
  }, null, 2))

  // Write pipeline-state.json
  fs.writeFileSync(path.join(dir, 'state/pipeline-state.json'), JSON.stringify({
    pipeline_version: '1.0',
    created_at: null,
    updated_at: null,
    user_goal: null,
    constraints: { target_length_seconds: null, platform: null, tone: null, deadline: null },
    current_stage: 'not_started',
    stage_order: ['research', 'creative', 'production', 'qa'],
    stages: {
      research: { status: 'pending', attempts: 0, max_attempts: 2, outputs: [], last_run_at: null, notes: null },
      creative: { status: 'pending', attempts: 0, max_attempts: 3, outputs: [], last_run_at: null, notes: null },
      production: { status: 'pending', attempts: 0, max_attempts: 3, outputs: [], last_run_at: null, notes: null },
      qa: { status: 'pending', attempts: 0, max_attempts: 5, outputs: [], last_run_at: null, notes: null },
    },
    qa_history: [],
    quality_thresholds: { minimum_per_dimension: 75, minimum_average: 85, hard_fail_dimensions: ['Facts', 'Rendering'] },
    regeneration_targets: [],
    total_pipeline_attempts: 0,
    max_total_pipeline_attempts: 12,
    human_checkpoints: {
      before_first_render: { required: true, cleared: false },
      before_final_export: { required: true, cleared: false },
    },
    log: [],
  }, null, 2))

  // Write AGENTS.md
  fs.writeFileSync(path.join(dir, 'AGENTS.md'), `# Video Pipeline Project Rules

## Folder discipline
- Nothing is ever written outside this project directory.
- Each subagent may only write inside its own \`working/<stage>/\` subfolder.
- \`state/pipeline-state.json\` is Director's alone to write.

## Pipeline
Research → Creative → Production → QA is the default order. Director decides retries.

## Quality bar
QA never approves without numeric scores per dimension. Thresholds: min 75/dim, avg 85.
Facts and Rendering are hard-fail dimensions.

## Retry ceilings
Research: 2, Creative: 3, Production: 3, QA: 5, Global: 12.
`)

  console.log(`✓ Initialized video pipeline project at ${dir}`)
  console.log(`  cd ${dir}`)
  console.log('  opencode')
  console.log('  /new-video "your brief here"')
}
