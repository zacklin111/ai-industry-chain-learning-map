# AI 产业链 2026 供需数据同步更新 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将截至 2026-06-20 的 10 个 AI 产业链供需快照同步到项目全部“当前状态”展示，同时保留明确标注的历史案例。

**Architecture:** 在 `src/data.ts` 中建立唯一的类型化快照，W3 的 `DayContent` 直接携带更新时间和来源元数据，`DayCard` 负责统一渲染证据标签及链接。W1、财报区、速查表和图解组件只做定点文案同步，不进行无关重构。

**Tech Stack:** React 19、TypeScript 5.9、Vite 7、Node.js test runner、ESLint 9

---

## 文件结构

- Modify: `src/data.ts` — 定义 2026 快照、更新 W1/W3/财报/速查数据，并保留历史案例。
- Modify: `src/App.tsx` — 在 `DayCard` 中展示更新时间、证据类型、置信度和来源链接。
- Modify: `src/components/SvgDiagram.tsx` — 同步基础设施总图中的当前周期口径。
- Modify: `src/components/ExplodedDiagram.tsx` — 同步旧版图解组件中的当前口径。
- Modify: `src/components/RealProductExploded.tsx` — 同步实际渲染的产品图解当前口径。
- Modify: `src/components/FinReportSection.tsx` — 将“当前周期”表达调整为截至 2026-06-20 的事实/推断分层。
- Modify: `package.json` — 增加静态数据验证命令。
- Create: `tests/supply-cycle-2026.test.mjs` — 验证 10 条快照、来源、反转和历史案例边界。
- Create: `tests/current-copy.test.mjs` — 防止视觉组件重新出现已废弃的当前口径。

## Task 1: 建立可审计的 2026 快照

**Files:**
- Create: `tests/supply-cycle-2026.test.mjs`
- Modify: `src/data.ts:1-19`
- Modify: `package.json:6-11`

- [ ] **Step 1: 写入失败的数据完整性测试**

```js
// tests/supply-cycle-2026.test.mjs
import test from 'node:test'
import assert from 'node:assert/strict'
import { supplyCycleAsOf, supplyCycleSnapshot2026 } from '../src/data.ts'

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
```

- [ ] **Step 2: 运行测试，确认因快照导出不存在而失败**

Run: `node --test tests/supply-cycle-2026.test.mjs`

Expected: FAIL，提示 `src/data.ts` 未导出 `supplyCycleAsOf` 或 `supplyCycleSnapshot2026`。

- [ ] **Step 3: 在 `src/data.ts` 增加类型与完整快照**

```ts
export type SupplyEvidenceType =
  | '公司披露'
  | '公司业绩会披露'
  | '上游设备商披露'
  | '行业研究'
  | '公司产品披露+推断'
  | '官方机构'

export interface SupplyCycleSnapshotItem {
  id: string
  segment: string
  oldStatus2024: string
  currentStatus: string
  supplyScore: number
  priceMomentum: number
  latestMetric: string
  period: string
  evidenceType: SupplyEvidenceType
  confidence: '高' | '中高' | '中低'
  leadingIndicator: string
  reversalSignal: string
  sourceTitle: string
  sourceUrl: string
}

export const supplyCycleAsOf = '2026-06-20'

export const supplyCycleSnapshot2026: SupplyCycleSnapshotItem[] = [
  { id: 'SC-01', segment: 'AI加速器/GPU', oldStatus2024: '紧缺', currentStatus: '紧缺', supplyScore: 2, priceMomentum: 1, latestMetric: 'NVIDIA季度收入816亿美元，环比+20%，同比+85%', period: 'FY2027 Q1 ended 2026-04-26', evidenceType: '公司披露', confidence: '高', leadingIndicator: 'AI基础设施收入与交付节奏', reversalSignal: '收入/指引连续两季减速且库存上升', sourceTitle: 'NVIDIA Q1 FY2027 Results', sourceUrl: 'https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-First-Quarter-Fiscal-2027/default.aspx' },
  { id: 'SC-02', segment: 'CoWoS先进封装', oldStatus2024: '紧缺', currentStatus: '紧缺', supplyScore: 2, priceMomentum: 1, latestMetric: 'TSMC称当前主流供给仍是大尺寸CoWoS；未披露精确利用率', period: '2026 Q1', evidenceType: '公司业绩会披露', confidence: '中高', leadingIndicator: '先进封装扩产与设备到位', reversalSignal: '客户交期显著缩短或产能利用率跌破90%', sourceTitle: 'TSMC Q1 2026 Earnings Call Transcript', sourceUrl: 'https://investor.tsmc.com/english/encrypt/files/encrypt_file/reports/2026-04/3cef85204275f94fd111485cfdf4adb3c0263c45/TSMC%201Q26%20Transcript.pdf' },
  { id: 'SC-03', segment: 'HBM', oldStatus2024: '紧缺', currentStatus: '紧缺', supplyScore: 2, priceMomentum: 2, latestMetric: 'SK hynix Q1收入52.5763万亿韩元、营业利润率72%；AI高附加值内存需求强', period: '2026 Q1', evidenceType: '公司披露', confidence: '高', leadingIndicator: 'HBM4量产与长期协议覆盖', reversalSignal: 'HBM ASP下降且库存/交期同步上升', sourceTitle: 'SK hynix Q1 2026 Results', sourceUrl: 'https://news.skhynix.com/q1-2026-business-results/' },
  { id: 'SC-04', segment: '先进逻辑制程', oldStatus2024: '分化', currentStatus: '紧缺', supplyScore: 2, priceMomentum: 1, latestMetric: 'ASML称先进逻辑与内存需求持续超过供给，限制预计延续至2026年以后', period: '2026 Q1', evidenceType: '上游设备商披露', confidence: '高', leadingIndicator: '先进节点客户扩产与ASML订单', reversalSignal: '先进节点利用率下滑或客户推迟扩产', sourceTitle: 'ASML Q1 2026 Results', sourceUrl: 'https://www.asml.com/en/news/press-releases/2026/q1-2026-financial-results' },
  { id: 'SC-05', segment: '成熟制程', oldStatus2024: '产能过剩', currentStatus: '复苏/趋平衡', supplyScore: 0.5, priceMomentum: 0, latestMetric: 'UMC利用率79%，晶圆出货量环比+2.7%，22nm收入占比14%', period: '2026 Q1', evidenceType: '公司披露', confidence: '高', leadingIndicator: '利用率与22nm收入占比', reversalSignal: '利用率重新跌破70%并出现降价', sourceTitle: 'UMC Q1 2026 Results', sourceUrl: 'https://www.nasdaq.com/press-release/umc-reports-first-quarter-2026-results-2026-04-29' },
  { id: 'SC-06', segment: '标准DRAM', oldStatus2024: '偏紧', currentStatus: '严重紧缺', supplyScore: 2, priceMomentum: 2, latestMetric: 'TrendForce预计Q2一般型DRAM合约价环比+58%至+63%', period: '2026 Q2 forecast', evidenceType: '行业研究', confidence: '中高', leadingIndicator: '供应商库存与HBM转产比例', reversalSignal: '合约价转跌且供应商库存回升', sourceTitle: 'TrendForce Q2 2026 Memory Price Forecast', sourceUrl: 'https://www.trendforce.com/presscenter/news/20260331-12995.html' },
  { id: 'SC-07', segment: 'NAND Flash', oldStatus2024: '供过于求', currentStatus: '严重紧缺', supplyScore: 2, priceMomentum: 2, latestMetric: 'TrendForce预计Q2 NAND Flash合约价环比+70%至+75%', period: '2026 Q2 forecast', evidenceType: '行业研究', confidence: '中高', leadingIndicator: '企业级SSD需求与供应商bit growth', reversalSignal: '合约价转跌或新增产能超预期', sourceTitle: 'TrendForce Q2 2026 Memory Price Forecast', sourceUrl: 'https://www.trendforce.com/presscenter/news/20260331-12995.html' },
  { id: 'SC-08', segment: '光模块/高速互连', oldStatus2024: '供需平衡', currentStatus: '需求强/披露不足', supplyScore: 1, priceMomentum: 1, latestMetric: '1.6T产品持续导入，但公开来源缺少行业统一利用率与ASP口径', period: '2026 H1', evidenceType: '公司产品披露+推断', confidence: '中低', leadingIndicator: '1.6T认证与出货、DSP供应', reversalSignal: 'ASP连续两季下降且库存上升', sourceTitle: 'Coherent FY2026 Q1 Release', sourceUrl: 'https://www.coherent.com/content/dam/coherent/site/en/documents/investors/financial-releases/2026/november-5/earnings-release-fy26-q1.pdf' },
  { id: 'SC-09', segment: '半导体设备', oldStatus2024: '扩产中', currentStatus: '景气上行', supplyScore: 1.5, priceMomentum: 1, latestMetric: 'ASML Q1销售88亿欧元、毛利率53%；2026收入指引360亿至400亿欧元', period: '2026 Q1', evidenceType: '公司披露', confidence: '高', leadingIndicator: '订单、客户扩产与交付节奏', reversalSignal: '订单动能转弱或客户CAPEX下修', sourceTitle: 'ASML Q1 2026 Results', sourceUrl: 'https://www.asml.com/en/news/press-releases/2026/q1-2026-financial-results' },
  { id: 'SC-10', segment: '数据中心电力', oldStatus2024: '终极瓶颈', currentStatus: '结构性紧约束', supplyScore: 2, priceMomentum: 1, latestMetric: 'IEA将AI与数据中心列为2026-2030先进经济体电力需求增长的重要驱动', period: '2026-2030 outlook', evidenceType: '官方机构', confidence: '高', leadingIndicator: '并网排队、PPA与变压器交期', reversalSignal: '电网接入周期明显缩短或项目取消', sourceTitle: 'IEA Electricity 2026 Demand', sourceUrl: 'https://www.iea.org/reports/electricity-2026/demand' },
]
```

- [ ] **Step 4: 增加数据测试脚本并运行**

```json
"scripts": {
  "test:data": "node --test tests/*.test.mjs"
}
```

Run: `npm run test:data`

Expected: 2 tests PASS。

- [ ] **Step 5: 提交快照数据**

```bash
git add src/data.ts tests/supply-cycle-2026.test.mjs package.json
git commit -m "feat: add auditable 2026 supply cycle snapshot"
```

## Task 2: 将 W3 当前周期表接入快照来源

**Files:**
- Modify: `src/data.ts:1-12,455-635`
- Modify: `src/App.tsx:635-830`
- Modify: `tests/supply-cycle-2026.test.mjs`

- [ ] **Step 1: 扩展测试，约束 W3 的更新时间、10 个环节和历史案例**

```js
import { supplyCycleAsOf, supplyCycleSnapshot2026, weeks } from '../src/data.ts'

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
```

- [ ] **Step 2: 运行测试，确认缺少 `updatedAt`、`sources` 和 10 行数据**

Run: `npm run test:data`

Expected: FAIL，W3 Day 15 仍是 2024 Q4 的 5 行快照。

- [ ] **Step 3: 扩展 `DayContent` 并由快照生成 W3 当前表**

```ts
export interface DaySource {
  title: string
  url: string
  evidenceType: SupplyEvidenceType
  confidence: SupplyCycleSnapshotItem['confidence']
}

export interface DayContent {
  // existing fields stay unchanged
  updatedAt?: string
  sources?: DaySource[]
}

const currentSupplyRows = supplyCycleSnapshot2026.map((item) => [
  item.segment,
  item.currentStatus,
  item.priceMomentum > 1 ? '↑↑' : item.priceMomentum > 0 ? '↑' : '→',
  item.latestMetric,
  item.period,
  item.leadingIndicator,
  item.reversalSignal,
])

const currentSupplySources: DaySource[] = supplyCycleSnapshot2026.map((item) => ({
  title: item.sourceTitle,
  url: item.sourceUrl,
  evidenceType: item.evidenceType,
  confidence: item.confidence,
}))
```

将 Day 15 的第二张表替换为：

```ts
updatedAt: supplyCycleAsOf,
sources: currentSupplySources,
tables: [
  // 第一张周期理论表保持不变
  {
    headers: ['环节', '截至2026-06-20的周期位置', '价格动量', '最新指标', '数据周期', '领先指标', '反转信号'],
    rows: currentSupplyRows,
  },
],
```

Day 15 的结论改为事实和推断分层：

```ts
keyInsights: [
  '事实：GPU、CoWoS、HBM与先进逻辑仍处紧约束；标准DRAM和NAND在2026 Q2预测中显著涨价。',
  '事实：成熟制程利用率恢复至79%，状态从2024年的产能过剩转为复苏/趋平衡。',
  '推断：光模块需求较强，但缺少统一利用率与ASP口径，置信度低于其他环节。',
],
```

- [ ] **Step 4: 在 `DayCard` 统一渲染更新时间和来源**

在时长标签下增加：

```tsx
{day.updatedAt && (
  <div style={{ marginTop: 12, fontSize: 12, color: weekColor }}>
    数据截至 {day.updatedAt}
  </div>
)}
```

在关键洞察之后、投资轮动之前增加：

```tsx
{day.sources && day.sources.length > 0 && (
  <div style={{ marginBottom: 20 }}>
    <h4 style={{ fontSize: 14, fontWeight: 500, color: weekColor, marginBottom: 12 }}>
      数据来源与证据等级
    </h4>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 8 }}>
      {day.sources.map((source) => (
        <a key={`${source.title}-${source.evidenceType}`} href={source.url} target="_blank" rel="noreferrer" style={{ color: '#FFFFFF', border: '1px solid #242424', padding: 12, textDecoration: 'none' }}>
          <div style={{ color: weekColor, fontSize: 12 }}>{source.evidenceType} · 置信度{source.confidence}</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>{source.title}</div>
        </a>
      ))}
    </div>
  </div>
)}
```

- [ ] **Step 5: 运行数据测试与构建**

Run: `npm run test:data && npm run build`

Expected: 数据测试全部 PASS，Vite build exit 0。

- [ ] **Step 6: 提交 W3 接入**

```bash
git add src/data.ts src/App.tsx tests/supply-cycle-2026.test.mjs
git commit -m "feat: show sourced 2026 cycle data in week three"
```

## Task 3: 同步 W1、财报区与速查表

**Files:**
- Modify: `src/data.ts:20-270,859-954`
- Modify: `src/components/FinReportSection.tsx:300-660`
- Modify: `tests/supply-cycle-2026.test.mjs`

- [ ] **Step 1: 增加当前口径与历史边界测试**

```js
test('current learning tables use 2026 facts while historical case remains', () => {
  const serialized = JSON.stringify(weeks)
  assert.match(serialized, /NAND Flash.*严重紧缺/)
  assert.match(serialized, /标准DRAM.*严重紧缺/)
  assert.match(serialized, /成熟制程.*复苏\/趋平衡/)
  assert.doesNotMatch(serialized, /2024年Q4周期位置/)

  const history = weeks.find((week) => week.week === 3)?.days.find((day) => day.day === 19)
  assert.ok(JSON.stringify(history).includes('当前水平（2024）'))
})
```

- [ ] **Step 2: 运行测试，确认当前表仍含 2024 旧判断**

Run: `npm run test:data`

Expected: FAIL，匹配到 `2024年Q4周期位置` 或缺少三项新状态。

- [ ] **Step 3: 定点同步 W1、Day 20、财报当前结论和速查表**

具体替换规则：

- W1 Day 1：用 FY2027 Q1 收入与供需结论替换 2024 CAPEX/旧 GPU 份额作为当前证据；不再声称“80% CAPEX 用于 GPU”。
- W1 Day 2：将“3-4万片/月、英伟达包走80%、利用率100%”改为“TSMC称大尺寸CoWoS仍是主流供给，精确利用率未披露”。
- W1 Day 3：用 SK hynix 2026 Q1 收入、72%营业利润率和 HBM4/长期协议指标替换 2024 转产比例与旧份额表。
- W1 Day 4：保留 800G→1.6T 技术路线，当前状态改为“需求强/披露不足”，明确缺少统一利用率与 ASP。
- W1 Day 5：将先进制程改为“紧缺”，成熟制程改为“UMC利用率79%，复苏/趋平衡”；设备改为 ASML 2026 Q1 销售与指引。
- W1 Day 6：保留技术功率示例，将当前结论锚定 IEA 2026-2030 电力需求展望。
- W1 Day 7 与 W3 Day 20：覆盖全部 10 个快照环节，不再用 2024 份额冒充当前利润集中度。
- `finReportData.tables[2]`：把“上升期(当前?)”改为“结构性紧约束（截至2026-06-20）”，将事实与策略建议分开。
- `quickRefData`：删除 `3-4万片/月（2024）` 当前速查项，增加 `+70%至+75%` NAND Q2预测、`79%` UMC利用率和 `€360亿至€400亿` ASML 2026指引。

历史案例 `实战案例：2024 Q1 英伟达财报的三层验证` 与 Day 19 `当前水平（2024）` 原样保留。

- [ ] **Step 4: 运行数据测试、构建和定向 lint**

Run: `npm run test:data`

Expected: PASS。

Run: `npm run build`

Expected: PASS。

Run: `npx eslint src/App.tsx src/components/FinReportSection.tsx`

Expected: 不增加 error；允许记录 `FinReportSection.tsx` 既有 ref cleanup warning。

- [ ] **Step 5: 提交学习内容同步**

```bash
git add src/data.ts src/components/FinReportSection.tsx tests/supply-cycle-2026.test.mjs
git commit -m "feat: align learning content with 2026 supply facts"
```

## Task 4: 清理图解中的当前旧口径

**Files:**
- Create: `tests/current-copy.test.mjs`
- Modify: `src/components/SvgDiagram.tsx:166-610`
- Modify: `src/components/ExplodedDiagram.tsx:280-455`
- Modify: `src/components/RealProductExploded.tsx:430-840`

- [ ] **Step 1: 写入视觉文案回归测试**

```js
// tests/current-copy.test.mjs
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const visualFiles = [
  'src/components/SvgDiagram.tsx',
  'src/components/ExplodedDiagram.tsx',
  'src/components/RealProductExploded.tsx',
]

test('visual components do not present stale estimates as current facts', async () => {
  const source = (await Promise.all(visualFiles.map((file) => readFile(file, 'utf8')))).join('\n')
  assert.doesNotMatch(source, /产能咽喉\s*[|·:]\s*3-4万片\/月/)
  assert.doesNotMatch(source, /CoWoS产能利用率100%/)
  assert.doesNotMatch(source, /英伟达包走80%\+/)
  assert.match(source, /精确利用率未披露/)
  assert.match(source, /UMC利用率79%/)
  assert.match(source, /需求强.*披露不足/)
})
```

- [ ] **Step 2: 运行测试，确认旧图解文案触发失败**

Run: `npm run test:data`

Expected: FAIL，至少匹配 `3-4万片/月`、`CoWoS产能利用率100%` 或 `英伟达包走80%+`。

- [ ] **Step 3: 按统一口径定点替换图解文案**

统一采用以下展示文本：

```ts
const currentVisualCopy = {
  gpu: 'FY2027 Q1收入$816亿 | YoY +85%',
  cowos: '大尺寸CoWoS仍是主流供给 | 精确利用率未披露',
  hbm: 'SK hynix Q1营业利润率72% | HBM需求强',
  optical: '1.6T持续导入 | 需求强但披露不足',
  advancedLogic: '先进逻辑需求超过供给 | 约束延续至2026年后',
  matureNode: 'UMC利用率79% | 复苏/趋平衡',
  equipment: 'ASML Q1销售€88亿 | 2026指引€360亿-€400亿',
  power: 'IEA：2026-2030先进经济体电力需求重要驱动',
}
```

不实际新增上述共享常量；分别在三个图解文件的相应节点使用完全一致的文本，保持现有组件边界并避免无关重构。

- [ ] **Step 4: 运行文案测试与构建**

Run: `npm run test:data && npm run build`

Expected: 所有测试 PASS，build exit 0。

- [ ] **Step 5: 提交图解同步**

```bash
git add src/components/SvgDiagram.tsx src/components/ExplodedDiagram.tsx src/components/RealProductExploded.tsx tests/current-copy.test.mjs
git commit -m "fix: remove stale current metrics from diagrams"
```

## Task 5: 全量审计、视觉验证与发布准备

**Files:**
- Modify if required: only files already listed in Tasks 1-4

- [ ] **Step 1: 审计残留年份和旧口径**

Run:

```bash
rg -n "2024|2025|3-4万片/月|英伟达包走80%|CoWoS产能利用率100%|NAND Flash|标准DRAM|成熟制程" src
```

Expected:

- `2024` 仅存在于明确的历史案例、历史基线或字段名 `oldStatus2024`。
- 不再存在把 `3-4万片/月`、`英伟达包走80%+`、`CoWoS产能利用率100%` 当作当前事实的展示。
- NAND、标准 DRAM、成熟制程的当前展示分别为严重紧缺、严重紧缺、复苏/趋平衡。

- [ ] **Step 2: 运行完整自动验证**

Run: `npm run test:data`

Expected: 全部测试 PASS。

Run: `npm run build`

Expected: PASS；允许保留现有 bundle size warning。

Run: `npm run lint`

Expected: 与实施前基线比较不得增加错误。实施前基线为 138 errors、2 warnings；若未修复无关旧问题，结果应不高于该基线。

- [ ] **Step 3: 启动本地预览并验证页面**

Run: `npm run dev -- --host 127.0.0.1`

在浏览器检查：

1. W1 图解不再显示被废弃的当前估算。
2. W3 Day 15 显示“数据截至 2026-06-20”、10 个环节、10 个来源链接。
3. 证据类型和置信度在窄屏下自动换行，无横向页面溢出。
4. 财报区不把策略建议写成事实结论。
5. Day 19 和 2024 Q1 财报案例仍保留明确年份。

- [ ] **Step 4: 检查最终差异并提交必要修正**

Run: `git status --short && git diff --check && git log --oneline -5`

Expected: 无未预期文件；`git diff --check` 无空白错误。

若视觉验证产生必要修正：

```bash
git add src/data.ts src/App.tsx src/components/FinReportSection.tsx src/components/SvgDiagram.tsx src/components/ExplodedDiagram.tsx src/components/RealProductExploded.tsx tests package.json
git commit -m "fix: finalize 2026 supply cycle presentation"
```

- [ ] **Step 5: 等待用户授权后推送**

本计划的实现阶段只创建本地提交。推送 `main` 属于外部写入，执行前再次向用户确认。
