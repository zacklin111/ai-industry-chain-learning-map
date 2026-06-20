export interface DayContent {
  day: number;
  title: string;
  coreInsight: string;
  duration: string;
  tables: { headers: string[]; rows: string[][] }[];
  keyInsights: string[];
  investmentRotation: string[];
  image?: string;
  updatedAt?: string;
  sources?: DaySource[];
}

export interface WeekData {
  week: number;
  title: string;
  subtitle: string;
  color: string;
  days: DayContent[];
}

export type SupplyEvidenceType =
  | '公司披露'
  | '公司业绩会披露'
  | '上游设备商披露'
  | '行业研究'
  | '公司产品披露+推断'
  | '官方机构'

export interface SupplyCycleSnapshotItem {
  id: string;
  segment: string;
  oldStatus2024: string;
  currentStatus: string;
  supplyScore: number;
  priceMomentum: number;
  latestMetric: string;
  period: string;
  evidenceType: SupplyEvidenceType;
  confidence: '高' | '中高' | '中低';
  leadingIndicator: string;
  reversalSignal: string;
  sourceTitle: string;
  sourceUrl: string;
}

export interface DaySource {
  title: string;
  url: string;
  evidenceType: SupplyEvidenceType;
  confidence: SupplyCycleSnapshotItem['confidence'];
}

export const supplyCycleAsOf = '2026-06-20';

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
];

const currentSupplyRows = supplyCycleSnapshot2026.map((item) => [
  item.segment,
  item.currentStatus,
  item.priceMomentum > 1 ? '↑↑' : item.priceMomentum > 0 ? '↑' : '→',
  item.latestMetric,
  item.period,
  item.leadingIndicator,
  item.reversalSignal,
]);

const currentSupplySources: DaySource[] = supplyCycleSnapshot2026.map((item) => ({
  title: item.sourceTitle,
  url: item.sourceUrl,
  evidenceType: item.evidenceType,
  confidence: item.confidence,
}));

const currentSupplyPanoramaRows = supplyCycleSnapshot2026.map((item) => [
  item.segment,
  item.currentStatus,
  item.priceMomentum > 1 ? '↑↑' : item.priceMomentum > 0 ? '↑' : '→',
  `${item.evidenceType} / 置信度${item.confidence}`,
  item.latestMetric,
  item.leadingIndicator,
  item.reversalSignal,
]);

export const weeks: WeekData[] = [
  {
    week: 1,
    title: "基础设施层",
    subtitle: "利润最确定的环节",
    color: "#C3FF00",
    days: [
      {
        day: 1,
        title: "GPU与算力芯片",
        coreInsight: "英伟达不是卖芯片，是卖\"算力货币\"",
        duration: "2小时",
        image: "/images/gpu-chip-diagram.jpg",
        tables: [
          {
            headers: ["维度", "关键事实"],
            rows: [
              ["需求端", "NVIDIA FY2027 Q1季度收入816亿美元，环比+20%、同比+85%，AI基础设施需求仍强"],
              ["供给端", "AI加速器/GPU仍处紧缺；以收入、指引、库存与交付节奏验证是否反转"],
              ["价格决定", "不是成本定价，是\'替代成本定价\'——用CPU集群达到同等算力的TCO是GPU的10倍"],
              ["瓶颈", "CoWoS产能（台积电）、HBM产能（SK海力士），而非芯片设计能力"],
            ],
          },
          {
            headers: ["层级", "技术核心", "供应链集中度", "瓶颈程度", "投资含义"],
            rows: [
              ["逻辑层(SM/TensorCore)", "英伟达微架构设计(Hopper/Blackwell)", "英伟达设计，台积电代工", "中等", "技术壁垒高，但代工厂决定产能上限"],
              ["互连层(NVLink/SerDes)", "英伟达自研，博通/Marvell替代方案", "英伟达90%+", "高", "捆绑销售，网络业务毛利率70%+"],
              ["存储接口层(HBM PHY)", "与HBM标准强绑定", "SK海力士/三星/美光", "高", "HBM产能直接决定GPU出货量"],
              ["封装层(CoWoS)", "台积电2.5D/3D封装技术", "大尺寸CoWoS仍为主流供给", "极高", "精确利用率未披露，跟踪扩产与设备到位"],
              ["HBM存储层", "TSV 3D堆叠技术", "SK hynix等三大厂商", "极高", "HBM需求强，跟踪HBM4量产与长期协议覆盖"],
              ["系统层(集群网络)", "InfiniBand vs以太网", "英伟达/Arista/博通", "中等", "光模块是\'卖水人\'，中国厂商占60%"],
            ],
          },
        ],
        keyInsights: [
          "H100不是一颗Die，而是一个\'系统级封装\'——1颗GPU Logic Die + 6颗HBM3E堆叠芯片 + 1层硅中介层 + 有机基板。整个封装面积接近光罩极限（~800mm²），良率高度依赖台积电CoWoS工艺。",
          "\'内存墙\'决定了HBM的不可替代性——AI训练80%时间花在数据搬运，HBM带宽>3TB/s是DDR5（50GB/s）的60倍。HBM堆叠层数（8→12→16）是性能提升的关键，TSV良率是海力士的核心壁垒。",
          "NVLink是英伟达的\'隐形护城河\'——H100之间900GB/s直连，远超PCIe 5.0（64GB/s）。买GPU必须买NVSwitch + InfiniBand，网络业务毛利70%+，客户锁定极强。",
          "CUDA生态是\'转换成本\'不是\'技术壁垒\'：迁移到AMD ROCm需要2-3年+500人团队，云厂商付得起但等不起。",
          "捆绑销售：买H100必须买NVLink+InfiniBand，英伟达网络业务毛利率70%+。",
          "AMD的机会窗口：MI300X在推理场景性价比好，但训练场景软件生态差距2年。",
        ],
        investmentRotation: [
          "英伟达财报超预期 → 验证GPU需求，再检查CoWoS扩产、HBM4量产、光模块出货和电力接入是否同步；该链条是推断路径，不等同于确定性建议",
          "B100/B200发布 → 直接受益：台积电（CoWoS-L升级）、海力士（HBM3E 12hi）；间接受益：光模块（1.6T需求）、电源/散热；受损：旧代H100库存贬值",
          "英伟达指引放缓 → 间接受损：先杀光模块（库存敏感），再杀服务器代工；AMD竞争加剧，应用层估值收缩",
          "台积电CoWoS扩产 → 直接受益：英伟达（出货量保障）、AMD（分到产能）；间接受益：设备商（ASML/Besi）、材料商；受损：日月光（备胎逻辑弱化）",
        ],
      },
      {
        day: 2,
        title: "先进封装与台积电",
        coreInsight: "CoWoS是AI芯片的\"产能咽喉\"，不是光刻机",
        duration: "2小时",
        image: "/images/tsmc-fab-exterior.jpg",
        tables: [
          {
            headers: ["维度", "关键事实"],
            rows: [
              ["CoWoS是什么", "把GPU芯片和HBM内存堆在同一块硅中介层上，用微凸块连接"],
              ["为什么瓶颈", "TSMC 2026 Q1称当前主流供给仍是大尺寸CoWoS；精确利用率未披露"],
              ["扩产验证", "跟踪先进封装扩产、设备到位和客户交期，不使用未披露利用率替代事实"],
              ["定价权", "台积电对英伟达有议价权（稀缺产能），但对苹果更弱（订单量大、替代性强）"],
            ],
          },
          {
            headers: ["维度", "先进制程(3nm/2nm)", "特色工艺+封装(CoWoS/SoIC)"],
            rows: [
              ["主要客户", "苹果独占", "英伟达/AMD/博通（AI芯片）"],
              ["用途", "手机SoC（A17/M3）", "AI GPU + HBM封装"],
              ["毛利率", "50-55%", "50%+（产能利用率100%）"],
              ["竞争格局", "三星追赶（良率差20-30%）", "日月光/Amkor为\'备胎\'（精度差一代）"],
            ],
          },
        ],
        keyInsights: [
          "CoWoS先进封装的核心在于硅中介层（Silicon Interposer），它提供了比有机基板更高的布线密度和信号完整性，是连接GPU Die和HBM的关键。",
          "一片12寸CoWoS晶圆封装约20-25颗H100（Die Size 814mm²）。",
          "CoWoS当前仍是紧约束环节，但公司未披露精确利用率，不能把供应链估算写成正式数据。",
          "反转验证：客户交期显著缩短，或公司正式披露产能利用率跌破90%。",
          "日月光/Amkor的CoWoS-like产能是\'备胎\'，技术精度差一代，只能做中低端。",
        ],
        investmentRotation: [
          "跟踪台积电法说会\'封装收入\'指引 → 如果下修，英伟达出货量必受影响",
          "CoWoS扩产设备到位 → 利好设备商（Besi/ASM Pacific）→ 英伟达出货量保障",
        ],
      },
      {
        day: 3,
        title: "HBM与存储",
        coreInsight: "HBM是\"算力芯片的燃料\"，价格由产能分配决定",
        duration: "2小时",
        tables: [
          {
            headers: ["维度", "关键事实"],
            rows: [
              ["HBM结构", "4-12层DRAM芯片垂直堆叠，用TSV（硅通孔）连接，与GPU一起封装"],
              ["需求状态", "SK hynix称AI高附加值内存需求强，HBM仍处紧缺"],
              ["最新财务", "SK hynix 2026 Q1收入52.5763万亿韩元，营业利润率72%"],
              ["领先指标", "HBM4量产与长期协议覆盖；反转看HBM ASP、库存与交期"],
            ],
          },
          {
            headers: ["厂商", "技术地位", "HBM3E进度", "市场份额", "关键客户"],
            rows: [
              ["SK海力士", "AI高附加值内存领先", "跟踪HBM4量产", "未采用非官方份额", "长期协议覆盖"],
              ["三星", "HBM供应商", "跟踪客户验证", "未采用非官方份额", "客户验证与良率"],
              ["美光", "HBM供应商", "跟踪量产节奏", "未采用非官方份额", "出货与ASP"],
            ],
          },
        ],
        keyInsights: [
          "供需传导链条：AI芯片需求爆发 → HBM需求暴增（每颗H100用6颗HBM3E） → DRAM产能转向HBM（设备切换需要6个月） → 标准DRAM供应减少 → DDR5涨价 → PC/手机成本上升，但AI服务器利润覆盖",
          "HBM堆叠层数（8→12→16）是性能提升的关键，TSV（硅通孔）良率是海力士的核心壁垒。",
          "DRAM产能转向HBM挤压标准内存供应，DDR5涨价传导至PC/手机端。",
        ],
        investmentRotation: [
          "HBM涨价 → 先涨SK海力士/三星/美光 → 再涨DDR5相关（模组厂如金士顿） → 最后涨NAND（替代效应）",
          "如果HBM技术迭代放缓（如HBM4延迟） → 利好现有产能持有者，利空设备商",
        ],
      },
      {
        day: 4,
        title: "网络与光模块",
        coreInsight: "网络是集群算力的\"血管\"，英伟达垄断正在被挑战",
        duration: "2小时",
        tables: [
          {
            headers: ["维度", "关键事实"],
            rows: [
              ["Scale-up网络", "GPU之间互联（NVLink/NVSwitch），英伟达专有，带宽900GB/s"],
              ["Scale-out网络", "服务器之间互联（InfiniBand/以太网），InfiniBand英伟达垄断，以太网开放"],
              ["超以太网联盟(UEC)", "博通/Intel/AMD/谷歌/Meta/微软联合，目标打破英伟达网络垄断"],
              ["光模块", "2026 H1 1.6T产品持续导入，但缺少行业统一利用率与ASP口径"],
            ],
          },
        ],
        keyInsights: [
          "光模块产业链：光芯片（II-VI/Coherent、Lumentum、源杰科技）→ 光器件（TOSA/ROSA）→ DSP电芯片（Marvell、Broadcom、Credo）→ 光模块封装（中际旭创、Coherent、光迅、新易盛）→ 交换机（Arista、Cisco、锐捷）→ 云厂商数据中心",
          "光模块是\'卖水人\'：无论用InfiniBand还是以太网，都需要光模块",
          "光模块需求强，但公开披露不足；应以1.6T认证与出货、DSP供应和ASP变化验证，而非沿用旧份额",
          "1.6T光模块单价是800G的2-2.5倍，但功耗也翻倍，CPO（共封装光学）是长期替代",
        ],
        investmentRotation: [
          "英伟达网络收入增速放缓 → 利好Arista（以太网交换机）、博通（Tomahawk芯片）、中际旭创（1.6T放量）",
          "光模块技术迭代（800G→1.6T） → 利好DSP/Marvell，利空落后封装厂",
        ],
      },
      {
        day: 5,
        title: "晶圆代工与设备",
        coreInsight: "台积电是\"印钞机\"，但ASML是\"印钞机的印钞机\"",
        duration: "2小时",
        image: "/images/market-cycle-chart.jpg",
        tables: [
          {
            headers: ["维度", "关键事实"],
            rows: [
              ["先进逻辑", "ASML称先进逻辑与内存需求持续超过供给，限制预计延续至2026年以后"],
              ["成熟制程", "UMC 2026 Q1利用率79%，晶圆出货量环比+2.7%，状态复苏/趋平衡"],
              ["ASML景气", "2026 Q1销售88亿欧元、毛利率53%，全年收入指引360亿至400亿欧元"],
              ["美国管制", "先进设备（EUV/部分DUV）对华出口禁运，中芯国际只能用DUV做多重曝光"],
              ["日本设备", "东京电子（刻蚀）、SCREEN（清洗）、Hitachi High-Tech（量测）——细分垄断"],
            ],
          },
        ],
        keyInsights: [
          "晶圆代工与设备产业链金字塔：ASML（EUV光刻机，全球唯一）→ 台积电/三星/Intel（晶圆代工）→ 芯片设计公司（英伟达/AMD/博通）→ 终端应用（云厂商/AI应用）",
          "事实：ASML 2026 Q1披露先进逻辑与内存需求强，设备景气上行；推断：订单动能转弱或客户CAPEX下修是反转信号",
          "设备周期滞后于芯片周期：芯片景气 → 扩产 → 设备订单（滞后6-12个月）",
        ],
        investmentRotation: [
          "ASML订单book-to-bill ratio >1 → 晶圆厂扩产积极 → 利好应用材料/Lam/KLA",
          "台积电资本开支下修 → 设备商股价先跌（订单取消风险）",
        ],
      },
      {
        day: 6,
        title: "数据中心与能源",
        coreInsight: "AI数据中心从\"地产逻辑\"转向\"能源逻辑\"",
        duration: "2小时",
        image: "/images/data-center-interior.jpg",
        tables: [
          {
            headers: ["维度", "关键事实"],
            rows: [
              ["功率密度", "传统机柜5-10kW，AI机柜50-100kW，风冷极限已到"],
              ["液冷渗透率", "2023年15% → 2027年预计60%+，冷板式为主，浸没式在超算"],
              ["电力瓶颈", "IEA将AI与数据中心列为2026-2030先进经济体电力需求增长的重要驱动"],
              ["核电签约", "微软与Three Mile Island（20年合约）、亚马逊买Talen Energy核电"],
            ],
          },
        ],
        keyInsights: [
          "产业链传导：云厂商（微软/谷歌/亚马逊）→ 数据中心运营商（Equinix/DLR/万国数据）→ 散热系统（Vertiv/英维克/施耐德）→ 电力设备（变压器/UPS/开关柜）→ 公用事业公司（核电/天然气/可再生能源）",
          "AI数据中心从\'地产逻辑\'转向\'能源逻辑\'——电力供应成为扩张的终极瓶颈。",
          "当前状态为结构性紧约束；领先指标是并网排队、PPA与变压器交期。",
        ],
        investmentRotation: [
          "云厂商CAPEX激增 → 先涨Vertiv（液冷+电源）、再涨电力设备、最后涨核电/天然气",
          "如果电力供应受限（如德州夏季限电） → 数据中心扩张放缓 → 杀英伟达/台积电预期",
        ],
      },
      {
        day: 7,
        title: "第一周整合：基础设施投资地图",
        coreInsight: "制作\"基础设施层投资地图\"与价格周期记忆表",
        duration: "3小时",
        image: "/images/supply-chain-network.jpg",
        tables: [
          {
            headers: ["环节", "供需状态", "价格动量", "证据等级", "最新指标", "领先指标", "反转信号"],
            rows: currentSupplyPanoramaRows,
          },
          {
            headers: ["新闻", "第一反应", "验证路径"],
            rows: [
              ['\"OpenAI融资$100亿\"', "估值是否过高？烧钱速度？", "收入/融资比、与Anthropic对比"],
              ['\"台积电亚利桑那厂良率达标\"', "成本是否仍高30%？", "台积电毛利率变化、客户接受度"],
              ['\"三星HBM3E通过英伟达验证\"', "海力士份额是否被侵蚀？", "三星HBM收入占比、价格变化"],
              ['\"某AI应用公司IPO\"', "是\'真AI\'还是\'套壳\'？", "自研模型？API成本占比？"],
            ],
          },
          {
            headers: ["数字", "含义", "投资意义"],
            rows: [
              ["90%", "英伟达数据中心GPU市占率", "垄断定价权，但反垄断风险"],
              ["$2-3亿", "ASML EUV光刻机单价", "设备商垄断，台积电成本刚性"],
              ["未披露", "TSMC CoWoS精确利用率", "避免以供应链估算冒充公司事实"],
              ["5-7倍", "HBM vs DDR5价格倍数", "存储厂利润弹性"],
              ["18个月", "半导体设备交付周期", "产能扩张的物理限制"],
              ["50-90%", "推理成本年降幅", "应用层利润压力"],
            ],
          },
        ],
        keyInsights: [
          "截至2026-06-20的结构性紧约束链条：GPU → CoWoS → HBM/先进逻辑 → 高速互连 → 数据中心电力；每个环节用其来源和反转信号独立验证",
          "投资条件反射：听到任何AI新闻，10秒内定位到产业链环节 → 5分钟内判断是验证还是证伪假设",
        ],
        investmentRotation: [],
      },
    ],
  },
  {
    week: 2,
    title: "模型层与应用层",
    subtitle: "利润最不确定但弹性最大的环节",
    color: "#00D4FF",
    days: [
      {
        day: 8,
        title: "基础大模型商业模式",
        coreInsight: "模型层是\'烧钱竞赛\'，护城河在稀释",
        duration: "2小时",
        image: "/images/neural-network-abstract.jpg",
        tables: [
          {
            headers: ["维度", "OpenAI", "Anthropic", "Google", "Meta", "中国"],
            rows: [
              ["核心", "2024年收入约40亿美元，但烧钱50-100亿，微软投资130亿占49%", "Google投资20亿+Amazon投资40亿，Claude系列，企业市场定位", "Gemini整合搜索/云/安卓，防御性投入，每年AI研发100亿+", "Llama开源，不直接收费，防御性投入保护广告业务", "百度文心、阿里通义、字节豆包、DeepSeek——跟随者，本土化"],
            ],
          },
        ],
        keyInsights: [
          "GPT-4 API：输入$30/1M tokens，输出$60/1M tokens",
          "推理成本：每年下降50-90%（模型效率提升+硬件降价）",
          "悖论：成本下降扩大市场，但也压缩利润空间",
          "开源正在侵蚀闭源定价权：Llama 3性能接近GPT-4，但免费 → 企业自托管成本是API的1/10",
          "数据飞轮是伪命题：模型训练数据是一次性的，不像搜索/推荐有实时数据反馈",
          "真正的护城河：分发渠道（微软Office/Copilot）、用户习惯（Google搜索）、生态锁定（苹果）",
        ],
        investmentRotation: [
          "OpenAI发布新模型 → 涨微软（渠道）→ 涨英伟达（训练需求）→ 杀应用公司（被替代风险）",
          "开源模型突破 → 杀OpenAI估值 → 涨云厂商（托管服务）→ 涨AMD/Intel（推理芯片）",
        ],
      },
      {
        day: 9,
        title: "云厂商AI战略",
        coreInsight: "云厂商是\'AI税的征收者\'，但ROI不确定",
        duration: "2小时",
        tables: [
          {
            headers: ["云厂商", "AI战略", "收入模式", "风险"],
            rows: [
              ["微软", "OpenAI独家云伙伴，Copilot全家桶", "Azure OpenAI服务、M365 Copilot（$30/用户/月）", "OpenAI关系、企业采纳速度"],
              ["Google", "自研Gemini，全栈整合", "GCP、Workspace、搜索广告", "反垄断、开源竞争"],
              ["AWS", "Bedrock（模型市场）、Trainium/Inferentia自研芯片", "模型托管、推理服务", "技术追赶、价格战"],
              ["Meta", "开源Llama，AI用于广告推荐", "广告效率提升（Reels/Threads）", "元宇宙拖累、监管"],
            ],
          },
        ],
        keyInsights: [
          "云厂商增加CAPEX（买GPU）→ 短期：利润承压，股价跌 → 中期：如果AI收入兑现，股价涨 → 长期：如果ROI不达预期，CAPEX削减，杀全产业链（2025年最大风险）",
          "微软：Azure AI收入增速、Copilot付费企业数、ARPU",
          "Google：GCP增速、Gemini API调用量、搜索广告CTR变化",
          "AWS：Bedrock收入、Trainium采用率、与Azure价格对比",
        ],
        investmentRotation: [
          "云厂商增加CAPEX → 短期利润承压股价跌（2024年Q1微软/Google财报后）",
          "如果AI收入兑现 → 股价涨（2024年Q3微软Azure AI增速33%）",
          "如果ROI不达预期 → CAPEX削减 → 杀全产业链（2025年最大风险）",
        ],
      },
      {
        day: 10,
        title: "企业级AI应用（B2B）",
        coreInsight: "B2B AI是\'效率工具\'，但变现慢于预期",
        duration: "2小时",
        tables: [
          {
            headers: ["领域", "代表公司", "商业模式", "瓶颈"],
            rows: [
              ["编程助手", "GitHub Copilot、Cursor、Claude Code、Replit", "$10-40/月订阅", "代码质量、安全合规、企业采购流程"],
              ["法律科技", "Harvey、CoCounsel、法大大", "SaaS订阅/按案件计费", "律师执业资格、责任认定、数据隐私"],
              ["医疗AI", "Tempus、PathAI、鹰瞳科技", "诊断服务/软件授权", "FDA审批、医保报销、医生接受度"],
              ["金融AI", "Kensho（被S&P收购）、BloombergGPT", "数据终端+AI功能", "监管合规、幻觉风险、客户信任"],
              ["工业设计", "Autodesk Fusion、Siemens NX、Synopsys AI", "软件授权+AI模块", "精度要求、行业know-how、替换成本"],
            ],
          },
        ],
        keyInsights: [
          "Copilot模式的问题：是\'维生素\'还是\'止痛药\'？大多数企业AI工具是\'锦上添花\'，非\'不可或缺\'",
          "垂直AI的护城河：专有数据（如Tempus的癌症基因组数据库）+ 行业workflow嵌入（如Harvey与律所DMS整合）",
          "定价困境：按用户收费（Seat-based）vs 按用量收费（Usage-based）vs 按效果收费（Outcome-based）——后者最难但最可持续",
        ],
        investmentRotation: [
          "英伟达发布新训练集群 → 涨Cursor/Replit（开发者工具）→ 涨法律/医疗垂直AI（模型能力解锁新场景）",
          "经济衰退担忧 → 先杀企业SaaS（采购冻结），再杀垂直AI（预算削减）",
        ],
      },
      {
        day: 11,
        title: "消费级AI应用（B2C）",
        coreInsight: "B2C AI是\'流量生意\'，但用户付费意愿低",
        duration: "2小时",
        tables: [
          {
            headers: ["领域", "代表产品", "用户量", "变现模式", "瓶颈"],
            rows: [
              ["AI搜索", "Perplexity、You.com、Arc Search", "Perplexity月活1000万+", "订阅+API", "用户习惯（Google垄断）、广告模式破坏"],
              ["内容创作", "Midjourney、Suno、Runway、Pika", "Midjourney 1500万+", "订阅", "版权、质量一致性、同质化"],
              ["AI陪伴", "Character.AI、Replika、Talkie", "Character.AI月活3000万+", "订阅+广告", "伦理、成瘾、内容安全、监管"],
              ["教育", "Khanmigo、Duolingo Max、作业帮", "Duolingo 8000万月活", "订阅", "效果验证、监管、家长接受度"],
            ],
          },
        ],
        keyInsights: [
          "Perplexity的悖论：回答直接给出，用户无需点击 → 广告模式失效 → 必须订阅，但订阅天花板低",
          "AI陪伴的\'暗面\'：用户与AI建立情感依赖，但内容安全（自残、极端言论）风险极高，监管可能突然收紧",
          "内容创作的\'版权雷\'：Suno生成音乐与训练数据相似度高，集体诉讼风险（如纽约时报诉OpenAI）",
        ],
        investmentRotation: [
          "大模型发布多模态能力 → 涨Runway/Pika（视频生成）→ 涨Adobe（防御性收购/整合）",
          "监管事件（如欧盟AI Act执行） → 杀Character.AI/Replika → 涨合规工具公司",
        ],
      },
      {
        day: 12,
        title: "AI Agent与下一代交互",
        coreInsight: "Agent是\'从工具到同事\'的跃迁，但当前可靠性不足",
        duration: "2小时",
        tables: [
          {
            headers: ["维度", "关键事实"],
            rows: [
              ["Agent定义", "能感知环境、规划任务、调用工具、执行行动、记忆反馈的AI系统"],
              ["架构", "ReAct（推理+行动）、Reflexion（自我反思）、多Agent协作"],
              ["代表产品", "AutoGPT（开源）、CrewAI、Dify、Coze（字节）、OpenAI Operator"],
              ["可靠性", "复杂任务成功率<<80%，距离商用（99%）还差很远"],
              ["成本", "推理步骤多，token消耗大，单次任务成本$0.5-5"],
            ],
          },
        ],
        keyInsights: [
          "产业链：基础模型（OpenAI/GPT-4）→ Agent框架（LangChain/LlamaIndex）→ 垂直Agent（法律/金融/医疗）→ 工具/API生态（浏览器、代码解释器、数据库、CRM）",
          "Agent成熟 → 模型层价值下降（被封装）→ 应用层价值上升（workflow替代）",
          "但当前阶段：Agent是\'概念炒作\'，2025-2026年可能有一批公司死亡（烧完融资，产品不成熟）",
        ],
        investmentRotation: [
          "Agent概念火热 → 涨框架公司（LangChain/LlamaIndex）→ 涨垂直Agent初创",
          "Agent产品化不及预期 → 概念退潮 → 杀高估值Agent公司",
        ],
      },
      {
        day: 13,
        title: "自动驾驶与机器人",
        coreInsight: "自动驾驶是\'AI的终极应用\'，但商业化比预期慢10年",
        duration: "2小时",
        image: "/images/robot-humanoid.jpg",
        tables: [
          {
            headers: ["领域", "现状", "代表公司", "瓶颈", "时间线"],
            rows: [
              ["L4 Robotaxi", "小规模运营，Waymo每周10万+单", "Waymo、百度萝卜快跑、小马智行", "长尾场景、成本、法规", "区域化盈利2026-2028"],
              ["L2++辅助驾驶", "主流方案，特斯拉FSD、华为ADS、小鹏XNGP", "Tesla、华为、蔚来、小鹏", "责任认定、用户过度信任、数据闭环", "标配化2025-2027"],
              ["人形机器人", "实验室/工厂试点，无规模化", "Tesla Optimus、Figure AI、Agility、波士顿动力", "成本$10万+、灵巧操作、能源密度", "工厂场景2027-2030，家庭2030+"],
              ["工业机器人", "AI视觉引导，柔性制造", "ABB、Fanuc、KUKA、汇川、埃斯顿", "精度、安全、集成复杂度", "稳步增长"],
            ],
          },
        ],
        keyInsights: [
          "产业链：AI芯片/算法（英伟达/地平线/华为）→ 传感器（激光雷达/摄像头/毫米波雷达）→ 执行器（电机/减速器/液压）→ 整车/机器人集成（Tesla/比亚迪/Figure/优必选）",
        ],
        investmentRotation: [
          "特斯拉AI Day发布Optimus进展 → 涨谐波减速器（绿的谐波）、力传感器（柯力传感）、无框力矩电机",
          "自动驾驶事故（如Uber 2018致死） → 杀全产业链 → 涨传统汽车零部件（安全回归）",
        ],
      },
      {
        day: 14,
        title: "第二周整合：模型应用投资地图",
        coreInsight: "建立模型层-应用层投资地图与新闻分析训练",
        duration: "3小时",
        tables: [
          {
            headers: ["新闻标题", "KOL分析", "专业见解"],
            rows: [
              ['\"OpenAI发布GPT-5\"', '\"AI要取代人类了\"', "训练成本多少？推理成本降多少？对微软Azure收入拉动？对英伟达H100需求是增量还是替代？"],
              ['\"英伟达股价暴跌10%\"', '\"泡沫破裂\"', "是业绩miss还是指引放缓？是GPU需求问题还是CoWoS产能问题？AMD是否受益？"],
              ['\"中国发布新AI芯片\"', '\"国产替代breakthrough\"', "制程节点？与H100性能差距？软件生态差距？能否流片？设备是否受限？"],
            ],
          },
        ],
        keyInsights: [
          "基础模型层 → 云厂商/企业应用/消费应用 → AI Agent/机器人（下一代交互入口）",
          "指标：模型能力、API价格、开源/闭源比例",
        ],
        investmentRotation: [],
      },
    ],
  },
  {
    week: 3,
    title: "供需关系、价格周期与板块轮动",
    subtitle: "读懂周期，把握节奏",
    color: "#FF6B35",
    days: [
      {
        day: 15,
        title: "半导体周期理论",
        coreInsight: "半导体是\'周期成长股\'，AI是超级周期中的子周期",
        duration: "2小时",
        image: "/images/market-cycle-chart.jpg",
        updatedAt: supplyCycleAsOf,
        sources: currentSupplySources,
        tables: [
          {
            headers: ["周期类型", "特征"],
            rows: [
              ["传统周期（2000-2019）", "需求上升（PC/手机）→ 产能不足→ 涨价→ 扩产（CAPEX增加）→ 产能过剩→ 降价→ 削减CAPEX→ 产能不足…"],
              ["AI超级周期（2023-？）", "AI训练需求（GPT-4/5）→ 算力芯片短缺→ 英伟达涨价→ 台积电/海力士扩产→ 产能爬坡（18个月滞后）→ AI推理需求爆发→ 边缘AI兴起→ 新瓶颈…"],
            ],
          },
          {
            headers: ["环节", "截至2026-06-20的周期位置", "价格动量", "最新指标", "数据周期", "领先指标", "反转信号"],
            rows: currentSupplyRows,
          },
        ],
        keyInsights: [
          "事实：GPU、CoWoS、HBM与先进逻辑仍处紧约束；标准DRAM和NAND在2026 Q2预测中显著涨价。",
          "事实：成熟制程利用率恢复至79%，状态从2024年的产能过剩转为复苏/趋平衡。",
          "推断：光模块需求较强，但缺少统一利用率与ASP口径，置信度低于其他环节。",
        ],
        investmentRotation: [
          "AI训练需求持续 → 算力芯片持续短缺 → 硬件层利润确定性高",
          "当推理需求超过训练 → 关注边缘AI、低功耗芯片、存储带宽新瓶颈",
        ],
      },
      {
        day: 16,
        title: "AI产业链价格传导机制",
        coreInsight: "价格从上游到下游的传导决定全产业链利润分配",
        duration: "2小时",
        tables: [
          {
            headers: ["传导环节", "结果"],
            rows: [
              ["英伟达GPU涨价（+20%）", "云厂商AI服务器成本上升"],
              ["云厂商选择：转嫁", "提高AI服务价格 → 企业客户接受度？→ AI应用公司成本上升 → 提价/压缩利润"],
              ["云厂商选择：压缩利润", "毛利率下降 → 股价承压"],
              ["云厂商不转嫁+削减CAPEX", "英伟达收入增速放缓 → 台积电CoWoS利用率下降 → 全产业链调整"],
            ],
          },
        ],
        keyInsights: [
          "关键观察点：微软Azure AI收入增速 vs GPU成本增速——如果收入增速>成本增速，周期继续；反之，危险",
          "英伟达数据中心收入增速 vs 云厂商CAPEX增速——如果前者>后者，说明库存积压或价格过高",
        ],
        investmentRotation: [
          "价格传导顺畅 → 全产业链景气",
          "价格传导受阻 → 某个环节挤压利润 → 该环节股价承压",
        ],
      },
      {
        day: 17,
        title: "板块轮动逻辑",
        coreInsight: "以英伟达财报为锚点，理解轮动顺序",
        duration: "2小时",
        tables: [
          {
            headers: ["时间节点", "轮动方向"],
            rows: [
              ["英伟达业绩超预期（财报前1周）", "直接受益：AMD（替代逻辑）、台积电（产能逻辑）、SK海力士（HBM逻辑）"],
              ["财报后1-2周", "间接受益：光模块（中际旭创）、服务器代工（工业富联）、液冷（Vertiv）"],
              ["财报后1个月", "应用层：如果英伟达说\'需求持续强劲\'，涨应用公司（估值扩张）"],
              ["如果英伟达指引放缓", "先杀光模块（库存周期敏感），再杀应用（估值收缩），最后杀AMD（竞争加剧）"],
            ],
          },
          {
            headers: ["加速因素", "减速因素"],
            rows: [
              ["新模型发布（GPT-5/Claude 4）", "宏观经济衰退（企业IT预算冻结）"],
              ["云厂商AI收入超预期", "地缘政治（台海/出口管制升级）"],
              ["开源模型突破（Llama 4）", "监管收紧（欧盟AI Act/美国州立法）"],
              ["英伟达新产品（B200/GB200）", "技术瓶颈（CoWoS扩产不及预期）"],
            ],
          },
        ],
        keyInsights: [
          "轮动核心逻辑：硬件确定性→应用弹性，上游传导到下游",
        ],
        investmentRotation: [],
      },
      {
        day: 18,
        title: "地缘政治与供应链重构",
        coreInsight: "地缘政治是AI投资的最大变量，但常被低估",
        duration: "2小时",
        tables: [
          {
            headers: ["事件", "影响", "受益方", "受损方"],
            rows: [
              ["美国对华GPU禁运（2022/2023）", "中国无法获得H100/A100", "华为昇腾、寒武纪、海光", "英伟达（中国市场收入占比20%→5%）"],
              ["台积电赴美建厂（亚利桑那）", "成本+30%，2025年量产", "美国设备商/材料商", "台积电毛利率、台湾供应链"],
              ["日本设备/材料管制（光刻胶/氟化氢）", "韩国三星/LG被迫国产化", "日本JSR/信越、韩国Soulbrain", "中国半导体厂（间接）"],
              ["欧盟芯片法案", "补贴Intel/台积电德国厂", "欧洲设备商（ASML德国厂）", "财政赤字、纳税人"],
            ],
          },
        ],
        keyInsights: [
          "中国\'平行生态\'评估：设计（华为昇腾910B≈A100，软件生态差距3-5年）→ 制造（中芯国际7nm，DUV多重曝光，效率低）→ 设备（北方华创28nm节点覆盖，EUV光源仍依赖进口）",
          "结论：3-5年内无法自主，但政策驱动下\'能用\'的替代方案会出现",
        ],
        investmentRotation: [
          "管制升级 → 中国AI芯片设计公司受益（华为昇腾、寒武纪）",
          "管制升级 → 英伟达中国收入下降 → 整体收入增速放缓风险",
        ],
      },
      {
        day: 19,
        title: "估值与泡沫识别",
        coreInsight: "学会识别泡沫信号，避免追高",
        duration: "2小时",
        tables: [
          {
            headers: ["环节", "估值锚", "当前水平（2024）", "历史中枢", "泡沫信号"],
            rows: [
              ["英伟达", "P/E、P/S、P/FCF", "P/E 60x", "30-40x", "P/E>80x且收入增速<<30%"],
              ["台积电", "P/E、EV/EBITDA", "P/E 25x", "15-20x", "资本回报率（ROIC）<<15%"],
              ["光模块", "P/E、PEG", "P/E 30-40x", "20-25x", "1.6T放量不及预期"],
              ["应用公司", "P/S、EV/用户", "P/S 20-50x", "10-15x", "用户增长停滞但估值扩张"],
              ["人形机器人", "无盈利，P/梦想", "N/A", "N/A", "任何量产延迟新闻"],
            ],
          },
        ],
        keyInsights: [
          "泡沫识别checklist：英伟达收入增速 > 云厂商CAPEX增速（持续2个季度=危险）",
          "应用公司融资额 > 收入额（烧钱速度超过变现速度）",
          "新进入者数量激增（如2023年200+家AI Agent公司）",
          "主流媒体开始报道\'AI改变一切\'（反向指标）",
        ],
        investmentRotation: [
          "估值过高+基本面转弱 → 减仓或回避",
          "估值合理+基本面改善 → 加仓",
        ],
      },
      {
        day: 20,
        title: "第三周整合：供需-价格-利润全景表",
        coreInsight: "制作\'供需-价格-利润\'全景表，建立全局视野",
        duration: "3小时",
        tables: [
          {
            headers: ["环节", "供需状态", "价格趋势", "证据等级", "最新指标", "领先指标", "反转信号"],
            rows: currentSupplyPanoramaRows,
          },
        ],
        keyInsights: [
          "全景表是投资决策的基础：先判断供需，再看价格趋势，最后评估利润集中度",
        ],
        investmentRotation: [],
      },
    ],
  },
  {
    week: 4,
    title: "整合、实战与持续跟踪",
    subtitle: "从认知到行动",
    color: "#A855F7",
    days: [
      {
        day: 21,
        title: "建立个人\'AI产业链仪表盘\'（上）",
        coreInsight: "建立每日必看指标体系",
        duration: "2小时",
        image: "/images/dashboard-analytics.jpg",
        tables: [
          {
            headers: ["类别", "指标"],
            rows: [
              ["宏观/需求", "云厂商CAPEX（季度，微软/谷歌/亚马逊/Meta）；英伟达数据中心收入（季度，增速、客户集中度）；AI模型发布（OpenAI/Anthropic/Google）"],
              ["供给/瓶颈", "台积电CoWoS产能利用率（法说会/供应链）；SK海力士HBM产能分配（DRAMeXchange）；ASML订单book-to-bill（季度）；光模块出货量（LightCounting/Omdia）"],
              ["价格/周期", "GPU二手市场价格（eBay/经销商）；HBM3E合约价（DRAMeXchange）；存储现货价（DDR5/NAND）；晶圆代工报价（台积电/联电）"],
              ["政策/地缘", "美国BIS出口管制更新；中国半导体补贴政策；欧盟AI Act执行进展；台海/中美关系动态"],
            ],
          },
          {
            headers: ["级别", "来源", "用途"],
            rows: [
              ["一手", "公司财报/业绩会、SEC filing、专利", "验证判断"],
              ["二手", "供应链调研（SemiAnalysis、TechInsights）、行业会议", "补充细节"],
              ["三手", "投行研报（Bernstein/Morgan Stanley/Goldman）、财经媒体", "了解市场共识"],
              ["四手", "KOL/Twitter/公众号", "反向指标（情绪）"],
            ],
          },
        ],
        keyInsights: [
          "信息源分级：一手验证、二手补充、三手了解共识、四手作为反向指标",
        ],
        investmentRotation: [],
      },
      {
        day: 22,
        title: "建立个人\'AI产业链仪表盘\'（下）",
        coreInsight: "建立每日/每周/每月跟踪节奏",
        duration: "2小时",
        tables: [
          {
            headers: ["频率", "内容"],
            rows: [
              ["每日", "GPU二手价、存储现货价、AI相关新闻、美股盘前异动"],
              ["每周", "供应链调研更新、行业KOL观点、技术论文/产品发布"],
              ["每月", "公司财报日历、产能利用率数据、订单book-to-bill"],
              ["每季", "重仓公司财报深度分析、产业链上下游验证、估值模型更新"],
            ],
          },
        ],
        keyInsights: [
          "仪表盘的核心不是信息数量，而是信息质量和验证链条",
        ],
        investmentRotation: [],
      },
      {
        day: 23,
        title: "案例复盘训练（上）",
        coreInsight: "通过历史案例训练判断能力",
        duration: "2小时",
        tables: [
          {
            headers: ["案例", "触发因素", "传导顺序", "训练要点"],
            rows: [
              ["案例1：2023年英伟达暴涨（$150→$500）", "ChatGPT爆发 → 云厂商抢购H100", "英伟达 → 台积电（CoWoS满产）→ SK海力士（HBM涨价）→ 光模块（800G需求）→ 服务器代工", "当时是否识别出CoWoS是瓶颈？是否提前布局海力士/光模块？"],
              ["案例2：2024年Q1英伟达回调（$950→$760）", "业绩超预期但指引\'仅\'符合预期，市场担忧饱和", "B100延迟（CoWoS-L产能不足）、H20中国版需求不确定", "是买入机会还是周期顶点？如何验证？"],
            ],
          },
        ],
        keyInsights: [
          "复盘的核心不是预测准确，而是识别当时的信息盲区和判断框架缺陷",
        ],
        investmentRotation: [],
      },
      {
        day: 24,
        title: "案例复盘训练（下）",
        coreInsight: "通过分化案例理解选股逻辑",
        duration: "2小时",
        tables: [
          {
            headers: ["案例", "结果", "关键差异"],
            rows: [
              ["案例3：2024年光模块分化（中际旭创 vs 新易盛）", "中际旭创：800G放量，1.6T领先，股价涨300%；新易盛：800G跟进慢，1.6T未验证，股价涨100%后回落", "技术迭代速度、客户认证（谷歌/英伟达）、DSP芯片供应"],
            ],
          },
        ],
        keyInsights: [
          "同板块内的分化比板块间的轮动更能体现研究深度",
          "技术迭代速度是硬件公司的核心竞争力",
        ],
        investmentRotation: [],
      },
      {
        day: 25,
        title: "模拟投资决策：场景1",
        coreInsight: "2025年Q1假设情景下的配置逻辑",
        duration: "2小时",
        tables: [
          {
            headers: ["假设条件", "分析维度"],
            rows: [
              ["英伟达B200量产顺利，但云厂商CAPEX增速从50%降至30%", "CAPEX增速放缓但仍在增长 → GPU需求仍有支撑但斜率放缓 → 关注台积电封装收入指引是否下修"],
              ["OpenAI发布GPT-5，但训练成本$10亿，推理成本未降", "模型能力突破利好训练需求，但推理成本未降限制应用爆发 → 利好训练硬件，利空应用公司盈利"],
              ["美国大选后对华芯片管制升级，华为昇腾910C发布", "管制升级利好国产替代，但910C性能与软件生态仍是关键 → 关注华为产业链，同时评估英伟达中国收入影响"],
            ],
          },
        ],
        keyInsights: [
          "模拟投资的核心是写出配置逻辑：超配/标配/低配哪些环节？为什么？",
        ],
        investmentRotation: [],
      },
      {
        day: 26,
        title: "模拟投资决策：场景2",
        coreInsight: "2026年长期假设情景下的配置调整",
        duration: "2小时",
        tables: [
          {
            headers: ["假设条件", "分析维度"],
            rows: [
              ["开源模型（Llama 4/Mistral Large）性能=GPT-4，推理成本为1/100", "开源模型性能追平+成本大幅下降 → 闭源模型定价权崩塌 → 利好云厂商（托管服务）→ 利好推理芯片（AMD/Intel/自研）→ 利空英伟达训练需求"],
              ["人形机器人（Optimus Gen 2）工厂场景量产，成本$5万", "人形机器人量产突破 → 关注执行器产业链（减速器、力传感器、无框力矩电机）→ 但商业模式仍需验证"],
              ["核聚变（Commonwealth Fusion）首次实现Q>1", "能源终极瓶颈解除 → 数据中心扩张限制解除 → 利好全产业链 → 但商业化发电仍需10年+"],
            ],
          },
        ],
        keyInsights: [
          "长期情景分析关注结构性变化，而非短期价格波动",
        ],
        investmentRotation: [],
      },
      {
        day: 27,
        title: "建立\'条件反射\'清单（上）",
        coreInsight: "看到新闻 → 第一反应 → 验证路径",
        duration: "2小时",
        tables: [
          {
            headers: ["新闻", "第一反应", "验证路径"],
            rows: [
              ['\"OpenAI融资$100亿\"', "估值是否过高？烧钱速度？", "收入/融资比、与Anthropic对比"],
              ['\"台积电亚利桑那厂良率达标\"', "成本是否仍高30%？", "台积电毛利率变化、客户接受度"],
              ['\"三星HBM3E通过英伟达验证\"', "海力士份额是否被侵蚀？", "三星HBM收入占比、价格变化"],
            ],
          },
        ],
        keyInsights: [
          "条件反射训练目标：10秒内定位产业链环节，5分钟内判断验证/证伪",
        ],
        investmentRotation: [],
      },
      {
        day: 28,
        title: "建立\'条件反射\'清单（下）",
        coreInsight: "面对KOL观点，找出逻辑漏洞或信息盲区",
        duration: "2小时",
        tables: [
          {
            headers: ["新闻", "第一反应", "验证路径"],
            rows: [
              ['\"某AI应用公司IPO\"', "是\'真AI\'还是\'套壳\'？", "自研模型？API成本占比？客户集中度？"],
              ['\"中国发布新光刻机\"', "制程节点？光源类型？", "波长、NA、套刻精度、与ASML差距代数"],
            ],
          },
        ],
        keyInsights: [
          "面对任何KOL观点，能找出其逻辑漏洞或信息盲区",
        ],
        investmentRotation: [],
      },
      {
        day: 29,
        title: "最终整合：投资手册框架",
        coreInsight: "制作你的\'AI产业链投资手册\'（不超过10页）",
        duration: "3小时",
        tables: [
          {
            headers: ["页码", "内容"],
            rows: [
              ["第1页", "产业链全景图（三层架构+关键企业）"],
              ["第2页", "利润分配金字塔（谁赚走钱）"],
              ["第3页", "当前供需状态表（紧缺/平衡/过剩）"],
              ["第4页", "价格周期位置（上升/顶部/下降/底部）"],
              ["第5页", "板块轮动顺序（以英伟达为锚）"],
              ["第6页", "地缘政治风险矩阵（概率/影响）"],
              ["第7页", "估值锚与泡沫信号"],
              ["第8页", "个人监控仪表盘（每日/每周/每月指标）"],
              ["第9页", "条件反射清单（新闻→判断→验证）"],
              ["第10页", "2025-2026年情景假设与配置方案"],
            ],
          },
        ],
        keyInsights: [
          "手册的核心是建立\'供需-价格-利润\'的条件反射，而不是记住技术细节",
        ],
        investmentRotation: [],
      },
      {
        day: 30,
        title: "毕业：三项能力检验",
        coreInsight: "完成一个月后，你应该能够",
        duration: "3小时",
        tables: [
          {
            headers: ["能力", "标准"],
            rows: [
              ["新闻定位", "听到任何AI新闻，10秒内定位到产业链环节"],
              ["财报判断", "看到任何财报，5分钟内判断是验证还是证伪你的假设"],
              ["观点辨析", "面对任何KOL观点，能找出其逻辑漏洞或信息盲区"],
            ],
          },
        ],
        keyInsights: [
          "30天学习的终点不是记住知识，而是建立直觉和分析框架",
        ],
        investmentRotation: [],
      },
    ],
  },
];

// ---- Financial Report Section (Week 1 Extension) ----
export interface FinReportSection {
  title: string;
  subtitle: string;
  coreInsight: string;
  tables: { headers: string[]; rows: string[][] }[];
  keyInsights: string[];
  cases: { title: string; steps: string[] }[];
}

export const finReportData: FinReportSection = {
  title: "财报实战",
  subtitle: "数据如何指引周期判断",
  coreInsight: "财报是\'供需-价格-利润\'的唯一量化验证",
  tables: [
    {
      headers: ["公司", "必看数据", "周期意义", "危险阈值"],
      rows: [
        ["英伟达", "数据中心收入QoQ增速、毛利率变化、库存周转天数、FCF", "收入增速>50%=强劲上升；毛利率>70%=定价权intact；库存下降=供不应求", "收入增速<20%；毛利率<65%；库存周转>150天"],
        ["台积电", "CoWoS收入占比、资本开支计划、3nm/CoWoS产能利用率、ROIC", "CoWoS占比>15%=AI依赖高；CAPEX增长=扩产积极；利用率>90%=满产", "CoWoS占比下修；CAPEX同比下降；利用率<80%"],
        ["SK海力士", "HBM收入占比、HBM毛利率、DRAM→HBM转产比例、整体毛利率", "HBM占比>40%=转型成功；HBM毛利>60%=供不应求；转产比例上升=供给紧张", "HBM占比停滞；毛利率<50%；转产比例下降"],
        ["中际旭创", "800G出货量、1.6T认证进度、ASP、应收账款周转天数", "800G放量=需求确认；1.6T认证通过=领先；ASP上升=无价格战", "出货量环比下降；ASP连续2季下降；应收>90天"],
        ["ASML", "EUV订单book-to-bill、中国大陆收入占比、High-NA EUV进度、订单交付周期", "book-to-bill>1=扩产积极；大陆占比下降=管制影响；周期缩短=需求旺", "book-to-bill<0.8；大陆占比>20%；周期延长"],
        ["云厂商(微软/谷歌/AWS)", "AI相关收入增速、CAPEX绝对值+增速、AI收入/CAPEX比值、经营利润率变化", "AI收入>30%=需求旺；CAPEX增速>30%=投入大；比值>1=ROI健康", "AI收入增速放缓；CAPEX增速<10%；利润率大幅下滑"],
      ],
    },
    {
      headers: ["公式/指标", "计算方法", "周期判断逻辑"],
      rows: [
        ["英伟达收入增速 vs 云厂商CAPEX增速", "英伟达数据中心QoQ% ÷ 云厂商CAPEX QoQ%", ">1且持续2季=英伟达在涨价或抢占份额；<1且持续2季=库存积压或价格过高"],
        ["台积电CoWoS依赖度", "CoWoS收入 ÷ 总收入 × 100%", ">15%且上升=AI是核心驱动力；<10%或下降=AI需求不及预期"],
        ["HBM转型进度", "HBM收入 ÷ DRAM总收入 × 100%", ">40%=转型成功，HBM紧俏；<25%=HBM需求不足或良率问题"],
        ["CAPEX/收入比", "资本开支 ÷ 总收入 × 100%", "<35%=理性扩张，可持续；>50%=军备竞赛，ROI压力大"],
        ["FCF转化率", "自由现金流 ÷ 收入 × 100%", ">20%=健康商业模式；<0%=烧钱换增长，不可持续"],
        ["库存周转天数", "平均库存 ÷ 日均销售成本", "连续下降=供不应求（上升期）；连续上升=库存积压（下行风险）"],
      ],
    },
    {
      headers: ["周期阶段", "收入信号", "毛利率信号", "库存/CAPEX信号", "投资策略"],
      rows: [
        ["结构性紧约束（截至2026-06-20）", "GPU、HBM、先进逻辑需求强；不同环节证据强弱不一", "HBM供应商利润强；CoWoS精确利用率未披露", "跟踪库存、交期、CAPEX、PPA与设备订单", "事实用于定位周期；配置动作需结合估值和风险承受能力"],
        ["顶部期", "收入增速放缓但>0%；指引\'符合预期\'而非\'超预期\'", "毛利率高位持平或微降", "库存周转开始上升；CAPEX增速>收入增速", "减配高估值标的；增配现金/设备商"],
        ["下降期", "收入增速<0%；连续2季负增长", "毛利率收缩；竞争加剧", "库存积压；CAPEX下修；FCF转负", "低配GPU/光模块；关注设备商(滞后跌)"],
        ["底部期", "收入连续2-3季负增长但降幅收窄", "毛利率触底(历史低位)", "库存去化完成；CAPEX降至低位；FCF恢复", "布局下一周期；超配设备商/存储(最先受益)"],
      ],
    },
    {
      headers: ["频率", "跟踪对象", "数据源", "用时"],
      rows: [
        ["每季度", "英伟达/台积电/SK海力士/AMD/ASML财报", "公司IR网站 / SEC Filing", "2-3小时/季"],
        ["每季度", "微软/谷歌/亚马逊/Meta财报(CAPEX部分)", "公司IR网站", "1小时/季"],
        ["每月", "光模块出货量(LightCounting / Omdia)", "行业报告 / 券商调研", "30分钟"],
        ["每月", "存储现货价格(DRAMeXchange)", "DRAMeXchange / 集邦咨询", "15分钟"],
        ["每周", "GPU二手市场价格(eBay)", "eBay / 经销商报价", "10分钟"],
        ["事件驱动", "美国BIS出口管制更新", "Federal Register / 券商解读", "即时"],
        ["事件驱动", "台积电法说会 / ASML投资者日", "公司官网直播 / 纪要", "2小时"],
      ],
    },
  ],
  keyInsights: [
    "所有新闻、KOL观点、供应链传闻最终都要在财报数据中交叉验证。财报是判断周期位置的最可靠锚点。",
    "看财报时不是\'看数字大小\'，而是\'看数字的变化方向和变化速度\'。",
    "危险信号组合（出现任意2个=周期拐点临近）：①英伟达库存周转天数连续2季上升 ②台积电法说会下修CoWoS收入指引 ③ASML新订单book-to-bill < 0.8 ④云厂商CAPEX增速 < AI收入增速 ⑤光模块ASP连续2季下降",
    "三层验证法：第一层（收入增长）→ 第二层（毛利率）→ 第三层（库存/CAPEX）。只有当多层信号同向时，才做出强烈判断。出现矛盾信号时，说明周期正在转换。",
  ],
  cases: [
    {
      title: "实战案例：2024 Q1 英伟达财报的三层验证",
      steps: [
        "第一层（收入增长）：数据中心收入$226亿（+427% YoY），连续4季加速增长。云厂商CAPEX合计+35% YoY，需求端确认强劲。",
        "第二层（毛利率）：毛利率78.4%（同比+12pp），说明涨价+规模效应+无竞争压力。HBM成本传导顺畅，定价权intact。",
        "第三层（库存/CAPEX）：库存周转天数128天（-15天QoQ），供不应求。CAPEX/收入=14%，理性扩张。FCF $115亿，健康模式。",
        "三层验证结果：三层全部通过，判定为\'强劲上升期\'。投资决策：超配GPU/CoWoS/HBM链条，标配光模块，回避PC/手机DRAM。",
      ],
    },
  ],
};

// ---- Quick Reference ----
export interface QuickRefItem {
  number: string;
  meaning: string;
  significance: string;
}

export const quickRefData: QuickRefItem[] = [
  { number: "$816亿", meaning: "NVIDIA FY2027 Q1季度收入", significance: "环比+20%、同比+85%，验证AI基础设施需求" },
  { number: "72%", meaning: "SK hynix 2026 Q1营业利润率", significance: "AI高附加值内存需求强" },
  { number: "+70%至+75%", meaning: "TrendForce 2026 Q2 NAND合约价预测", significance: "由2024供过于求反转为严重紧缺" },
  { number: "+58%至+63%", meaning: "TrendForce 2026 Q2一般型DRAM合约价预测", significance: "标准DRAM处于严重紧缺" },
  { number: "79%", meaning: "UMC 2026 Q1产能利用率", significance: "成熟制程复苏/趋平衡" },
  { number: "€360亿至€400亿", meaning: "ASML 2026收入指引", significance: "半导体设备景气上行" },
  { number: "$30/月", meaning: "GitHub Copilot定价", significance: "AI应用付费天花板参考" },
  { number: "$10亿", meaning: "GPT-4训练成本估算", significance: "模型层资本壁垒" },
  { number: "100MW", meaning: "10万卡集群功耗", significance: "电力是终极瓶颈" },
  { number: "18个月", meaning: "半导体设备交付周期", significance: "产能扩张的物理限制" },
  { number: "50-90%", meaning: "推理成本年降幅", significance: "应用层利润压力" },
  { number: "20万亿", meaning: "GPT-5可能参数规模", significance: "Scaling Law是否触顶？" },
];
