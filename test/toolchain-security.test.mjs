import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import config from '../vite.config.js'

const packageJson = JSON.parse(
  await readFile(new URL('../package.json', import.meta.url), 'utf8'),
)

test('the supported Vite toolchain and Node runtime are explicit', () => {
  assert.equal(packageJson.devDependencies.vite, '^8.1.5')
  assert.equal(packageJson.devDependencies['@vitejs/plugin-react'], '^6.0.3')
  assert.equal(packageJson.engines.node, '^20.19.0 || >=22.12.0')
})

test('development and preview servers remain local-only', () => {
  assert.equal(config.server.host, '127.0.0.1')
  assert.deepEqual(config.server.allowedHosts, [])
  assert.equal(config.server.fs.strict, true)
  assert.equal(config.preview.host, '127.0.0.1')
  assert.deepEqual(config.preview.allowedHosts, [])
})
