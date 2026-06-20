import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

test('financial report summary labels the current 2026 position without deterministic advice', async () => {
  const source = await readFile('src/components/FinReportSection.tsx', 'utf8')
  assert.match(source, /结构性紧约束/)
  assert.match(source, /事实用于定位周期/)
  assert.doesNotMatch(source, /stage: '上升期'.*超配GPU\/HBM\/CoWoS/)
})

test('visual components do not present stale estimates as current facts', async () => {
  const visualFiles = [
    'src/components/SvgDiagram.tsx',
    'src/components/ExplodedDiagram.tsx',
    'src/components/RealProductExploded.tsx',
  ]
  const source = (await Promise.all(visualFiles.map((file) => readFile(file, 'utf8')))).join('\n')

  assert.doesNotMatch(source, /产能咽喉\s*[|·:]\s*3-4万片\/月/)
  assert.doesNotMatch(source, /CoWoS产能利用率100%/)
  assert.doesNotMatch(source, /英伟达包走80%\+/)
  assert.match(source, /精确利用率未披露/)
  assert.match(source, /UMC利用率79%/)
  assert.match(source, /需求强.*披露不足/)
})
