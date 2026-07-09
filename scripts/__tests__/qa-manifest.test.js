const { describe, it } = require('node:test')
const assert = require('node:assert')
const fs = require('fs')
const path = require('path')

// Re-create the structuralQA function for testing
function structuralQA(manifestPath, blueprintPath) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  const blueprint = JSON.parse(fs.readFileSync(blueprintPath, 'utf8'))
  const scores = []
  const sceneCountMatch = manifest.scenes.length === blueprint.scenes.length
  scores.push({
    dimension: 'Scene Completeness',
    score: sceneCountMatch ? 100 : 60,
    reason: sceneCountMatch ? `All ${manifest.scenes.length} scenes present` : `Expected ${blueprint.scenes.length} scenes, found ${manifest.scenes.length}`,
  })
  let durationScore = 100
  for (const scene of manifest.scenes) {
    const planned = blueprint.scenes.find(s => s.id === scene.id)
    if (!planned) continue
    if (Math.abs(scene.duration - planned.duration) > 0.5) durationScore = Math.min(durationScore, 70)
  }
  scores.push({ dimension: 'Timing', score: durationScore, reason: '' })
  const avg = scores.reduce((s, x) => s + x.score, 0) / scores.length
  return { average: avg, scores, passed: scores.every(s => s.score >= 75) }
}

it('structuralQA: matching scenes passes', () => {
  const dir = fs.mkdtempSync('qa-test-')
  fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify({ scenes: [{ id: 's1', duration: 3 }, { id: 's2', duration: 4 }] }))
  fs.writeFileSync(path.join(dir, 'blueprint.json'), JSON.stringify({ scenes: [{ id: 's1', duration: 3 }, { id: 's2', duration: 4 }] }))
  const result = structuralQA(path.join(dir, 'manifest.json'), path.join(dir, 'blueprint.json'))
  assert.strictEqual(result.passed, true)
  assert.strictEqual(result.scores[0].score, 100)
  fs.rmSync(dir, { recursive: true, force: true })
})

it('structuralQA: missing scene fails', () => {
  const dir = fs.mkdtempSync('qa-test-')
  fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify({ scenes: [{ id: 's1', duration: 3 }] }))
  fs.writeFileSync(path.join(dir, 'blueprint.json'), JSON.stringify({ scenes: [{ id: 's1', duration: 3 }, { id: 's2', duration: 4 }] }))
  const result = structuralQA(path.join(dir, 'manifest.json'), path.join(dir, 'blueprint.json'))
  assert.strictEqual(result.passed, false)
  assert.strictEqual(result.scores[0].score, 60)
  fs.rmSync(dir, { recursive: true, force: true })
})
