import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

test('financial report summary labels the current 2026 position without deterministic advice', async () => {
  const source = await readFile('src/components/FinReportSection.tsx', 'utf8')
  assert.match(source, /结构性紧约束/)
  assert.match(source, /事实用于定位周期/)
  assert.doesNotMatch(source, /stage: '上升期'.*超配GPU\/HBM\/CoWoS/)
})
