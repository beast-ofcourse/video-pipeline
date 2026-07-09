#!/usr/bin/env node
require('tsx')
const { initProject } = require('../src/cli/init')

const args = process.argv.slice(2)
const command = args[0]
const targetDir = args[1] || '.'

if (command === 'init') {
  initProject({ targetDir }).catch(err => {
    console.error(err.message)
    process.exit(1)
  })
} else {
  console.error(`Unknown command: ${command}`)
  console.error('Usage: opencode-video-pipeline init [directory]')
  process.exit(1)
}
