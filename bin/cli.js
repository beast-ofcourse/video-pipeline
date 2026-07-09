#!/usr/bin/env node
const { initProject } = require('../src/cli/init')
const targetDir = process.argv[2] || '.'
initProject({ targetDir }).catch(err => {
  console.error(err.message)
  process.exit(1)
})
