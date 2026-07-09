#!/usr/bin/env node
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

function extractKeyframes(videoPath, outputDir, sceneTimestamps) {
  fs.mkdirSync(outputDir, { recursive: true })

  const scenes = JSON.parse(sceneTimestamps)

  for (const scene of scenes) {
    const outputPath = path.join(outputDir, `scene-${scene.id}-${scene.startTime.toFixed(1)}s.jpg`)
    try {
      execSync(
        `ffmpeg -ss ${scene.startTime} -i "${videoPath}" -vframes 1 -q:v 2 "${outputPath}" -y`,
        { stdio: 'ignore', timeout: 30000 }
      )
      console.log(`  ✓ Scene ${scene.id}: ${outputPath}`)
    } catch (err) {
      console.error(`  ✗ Scene ${scene.id}: Failed - ${err.message}`)
    }
  }

  console.log(`\nExtracted ${scenes.length} keyframes to ${outputDir}`)
}

// CLI entry
const [,, videoPath, outputDir, sceneTimestamps] = process.argv
if (videoPath && outputDir && sceneTimestamps) {
  extractKeyframes(videoPath, outputDir, sceneTimestamps)
} else {
  console.log('Usage: node scripts/extract-keyframes.js <video.mp4> <output-dir> \'[{"id":"scene1","startTime":0}]\'')
}
