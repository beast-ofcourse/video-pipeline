#!/usr/bin/env node
const { execSync } = require('child_process')
const fs = require('fs')

function technicalQA(videoPath) {
  try {
    const info = JSON.parse(execSync(
      `ffprobe -v quiet -print_format json -show_format -show_streams "${videoPath}"`
    ).toString())

    const videoStream = info.streams.find(s => s.codec_type === 'video')
    const audioStream = info.streams.find(s => s.codec_type === 'audio')

    const scores = []

    // Resolution check
    const width = videoStream?.width || 0
    const height = videoStream?.height || 0
    const resolutionOk = width >= 1080 && height >= 1080
    scores.push({
      dimension: 'Rendering',
      score: resolutionOk ? 100 : 50,
      reason: resolutionOk ? `${width}x${height} meets minimum` : `${width}x${height} below minimum`,
      fix: resolutionOk ? 'None needed' : 'Render with correct resolution setting',
    })

    // Codec check
    const codecOk = videoStream?.codec_name === 'h264'
    scores.push({
      dimension: 'Codec',
      score: codecOk ? 100 : 70,
      reason: codecOk ? 'H.264 codec' : `${videoStream?.codec_name} codec`,
      fix: codecOk ? 'None needed' : 'Specify h264 codec in render options',
    })

    // Audio presence
    scores.push({
      dimension: 'Audio',
      score: audioStream ? 100 : 30,
      reason: audioStream ? `Audio present (${audioStream.codec_name})` : 'No audio stream',
      fix: audioStream ? 'None needed' : 'Re-render with audio enabled',
    })

    // Duration sanity
    const duration = parseFloat(info.format?.duration || '0')
    scores.push({
      dimension: 'Duration',
      score: duration > 0 ? 100 : 40,
      reason: duration > 0 ? `${duration.toFixed(1)}s` : 'Could not read duration',
      fix: duration > 0 ? 'None needed' : 'Re-render, verify ffmpeg output',
    })

    // Frame rate check
    const frameRate = videoStream ? eval(videoStream.r_frame_rate || '0') : 0
    const framerateOk = frameRate >= 24
    scores.push({
      dimension: 'Frame Rate',
      score: framerateOk ? 100 : 60,
      reason: framerateOk ? `${frameRate.toFixed(1)} fps` : `${frameRate.toFixed(1)} fps below minimum 24`,
      fix: framerateOk ? 'None needed' : 'Set fps to at least 24 in render options',
    })

    return {
      average: scores.reduce((s, x) => s + x.score, 0) / scores.length,
      scores,
      passed: scores.every(s => s.score >= 75),
      metadata: {
        width,
        height,
        codec: videoStream?.codec_name,
        duration,
        bitrate: info.format?.bit_rate,
        frameRate: frameRate.toFixed(1),
        hasAudio: !!audioStream,
      },
    }
  } catch (err) {
    return {
      average: 0,
      scores: [{ dimension: 'Rendering', score: 0, reason: `Analysis failed: ${err.message}`, fix: 'Re-render and retry' }],
      passed: false,
      metadata: {},
    }
  }
}

// CLI entry
const [,, videoPath] = process.argv
if (videoPath) {
  const result = technicalQA(videoPath)
  const outputDir = 'working/qa'
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  fs.writeFileSync('working/qa/technical-report.json', JSON.stringify(result, null, 2))
  console.log(`Technical QA: ${result.average.toFixed(1)}/100`)
  console.log(`Passed: ${result.passed ? 'YES' : 'NO'}`)
  console.log(`Resolution: ${result.metadata.width}x${result.metadata.height}`)
  console.log(`Duration: ${result.metadata.duration}s`)
  console.log(`Frame Rate: ${result.metadata.frameRate} fps`)
  console.log(`Report: working/qa/technical-report.json`)
  process.exit(result.passed ? 0 : 1)
} else {
  console.log('Usage: node scripts/qa-ffprobe.js <video.mp4>')
}
