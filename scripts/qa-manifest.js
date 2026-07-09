#!/usr/bin/env node
const fs = require('fs')

function structuralQA(renderManifestPath, blueprintPath) {
  const manifest = JSON.parse(fs.readFileSync(renderManifestPath, 'utf8'))
  const blueprint = JSON.parse(fs.readFileSync(blueprintPath, 'utf8'))

  const scores = []

  // Scene count check
  const sceneCountMatch = manifest.scenes && blueprint.scenes &&
    manifest.scenes.length === blueprint.scenes.length
  scores.push({
    dimension: 'Scene Completeness',
    score: sceneCountMatch ? 100 : 60,
    reason: sceneCountMatch
      ? `All ${manifest.scenes.length} scenes present`
      : `Expected ${blueprint.scenes.length} scenes, found ${manifest.scenes ? manifest.scenes.length : 0}`,
    fix: sceneCountMatch ? 'None needed' : 'Re-render with missing scenes',
  })

  // Duration check
  let durationScore = 100
  if (manifest.scenes && blueprint.scenes) {
    for (const scene of manifest.scenes) {
      const planned = blueprint.scenes.find(s => s.id === scene.id)
      if (!planned) continue
      const diff = Math.abs(scene.duration - planned.duration)
      if (diff > 0.5) {
        durationScore = Math.min(durationScore, 70)
      }
    }
  }
  scores.push({
    dimension: 'Timing',
    score: durationScore,
    reason: `Scene durations ${durationScore >= 90 ? 'match plan' : 'deviate from plan'}`,
    fix: durationScore >= 90 ? 'None needed' : 'Adjust scene durations',
  })

  // Caption content check
  let captionScore = 100
  if (manifest.scenes && blueprint.scenes) {
    for (const scene of manifest.scenes) {
      if (scene.captions) {
        const planned = blueprint.scenes.find(s => s.id === scene.id)
        if (planned && planned.captions && planned.captions.lines) {
          for (const line of planned.captions.lines) {
            if (!scene.captions.text || !scene.captions.text.includes(line.text)) {
              captionScore = Math.min(captionScore, 50)
            }
          }
        }
      }
    }
  }
  scores.push({
    dimension: 'Script Fidelity',
    score: captionScore,
    reason: captionScore === 100 ? 'All caption text matches script' : 'Some caption text missing',
    fix: captionScore === 100 ? 'None needed' : 'Re-generate captions with correct script',
  })

  // Node count check
  let nodeScore = 100
  if (manifest.scenes && blueprint.scenes) {
    for (const scene of manifest.scenes) {
      const planned = blueprint.scenes.find(s => s.id === scene.id)
      if (!planned) continue
      const manifestNodes = scene.nodes ? scene.nodes.length : 0
      const plannedNodes = planned.nodes ? planned.nodes.length : 0
      if (manifestNodes < plannedNodes) {
        nodeScore = Math.min(nodeScore, 70)
      }
    }
  }
  scores.push({
    dimension: 'Visual Completeness',
    score: nodeScore,
    reason: nodeScore === 100 ? 'All visual elements present' : 'Some visual elements missing',
    fix: nodeScore === 100 ? 'None needed' : 'Check render logs for missing elements',
  })

  return {
    average: scores.reduce((s, x) => s + x.score, 0) / scores.length,
    scores,
    passed: scores.every(s => s.score >= 75),
  }
}

// CLI entry
const [,, manifestPath, blueprintPath] = process.argv
if (manifestPath && blueprintPath) {
  const result = structuralQA(manifestPath, blueprintPath)
  const outputDir = 'working/qa'
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  fs.writeFileSync('working/qa/structural-report.json', JSON.stringify(result, null, 2))
  console.log(`Structural QA: ${result.average.toFixed(1)}/100`)
  console.log(`Passed: ${result.passed ? 'YES' : 'NO'}`)
  console.log(`Report: working/qa/structural-report.json`)
  process.exit(result.passed ? 0 : 1)
} else {
  console.log('Usage: node scripts/qa-manifest.js <manifest.json> <blueprint.json>')
}
