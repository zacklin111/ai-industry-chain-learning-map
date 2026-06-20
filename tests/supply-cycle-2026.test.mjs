import test from 'node:test'
import assert from 'node:assert/strict'
import {
  finReportData,
  quickRefData,
  supplyCycleAsOf,
  supplyCycleSnapshot2026,
  weeks,
} from '../src/data.ts'

test('2026 supply-cycle snapshot is complete and auditable', () => {
  assert.equal(supplyCycleAsOf, '2026-06-20')
  assert.equal(supplyCycleSnapshot2026.length, 10)
  assert.deepEqual(
    supplyCycleSnapshot2026.map((item) => item.id),
    Array.from({ length: 10 }, (_, index) => `SC-${String(index + 1).padStart(2, '0')}`),
  )

  for (const item of supplyCycleSnapshot2026) {
    assert.match(item.sourceUrl, /^https:\/\//)
    assert.ok(item.latestMetric.length > 0)
    assert.ok(item.period.length > 0)
    assert.ok(item.leadingIndicator.length > 0)
    assert.ok(item.reversalSignal.length > 0)
  }
})

test('the three material 2026 reversals are explicit', () => {
  const bySegment = new Map(supplyCycleSnapshot2026.map((item) => [item.segment, item]))
  assert.equal(bySegment.get('NAND Flash')?.currentStatus, '严重紧缺')
  assert.equal(bySegment.get('标准DRAM')?.currentStatus, '严重紧缺')
  assert.equal(bySegment.get('成熟制程')?.currentStatus, '复苏/趋平衡')
})

test('week 3 exposes the current snapshot without deleting history', () => {
  const week3 = weeks.find((week) => week.week === 3)
  const currentDay = week3?.days.find((day) => day.day === 15)
  assert.equal(currentDay?.updatedAt, supplyCycleAsOf)
  assert.equal(currentDay?.sources?.length, 10)
  assert.equal(currentDay?.tables[1].rows.length, 10)
  assert.equal(currentDay?.tables[1].headers[1], '截至2026-06-20的周期位置')

  const historicalCase = week3?.days.find((day) => day.day === 19)
  assert.ok(historicalCase?.tables.some((table) => table.headers.includes('当前水平（2024）')))
})

test('current learning tables use 2026 facts while historical case remains', () => {
  const week3 = weeks.find((week) => week.week === 3)
  const panorama = week3?.days.find((day) => day.day === 20)?.tables[0]
  assert.equal(panorama?.rows.length, 10)
  assert.ok(panorama?.rows.some((row) => row[0] === 'NAND Flash' && row[1] === '严重紧缺'))
  assert.ok(panorama?.rows.some((row) => row[0] === '标准DRAM' && row[1] === '严重紧缺'))
  assert.ok(panorama?.rows.some((row) => row[0] === '成熟制程' && row[1] === '复苏/趋平衡'))

  const currentCycleStage = finReportData.tables[2].rows[0][0]
  assert.equal(currentCycleStage, '结构性紧约束（截至2026-06-20）')
  assert.ok(quickRefData.some((item) => item.number === '+70%至+75%'))
  assert.ok(quickRefData.some((item) => item.number === '79%'))

  const historicalCase = week3?.days.find((day) => day.day === 19)
  assert.ok(JSON.stringify(historicalCase).includes('当前水平（2024）'))
  assert.ok(finReportData.cases[0].title.includes('2024 Q1'))
})
