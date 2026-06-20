import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   ExplodedDiagram - 产品爆炸图风格的产业链可视化
   核心理念：用CSS 3D变换模拟产品爆炸图的垂直分层效果
   ============================================================ */

interface LayerData {
  label: string;      // 层名称
  sublabel?: string;  // 副标题
  items?: string[];   // 内部项目
  color: string;      // 主题色
  metric?: string;    // 关键指标
  width?: string;     // 层宽度 (百分比)
}

interface ExplodedDiagramProps {
  title: string;
  subtitle: string;
  figNumber: string;
  bgImage: string;
  layers: LayerData[];
  caption?: string;
  accentColor?: string;
  showConnectors?: boolean;
  infoBlocks?: { title: string; items: string[]; color?: string }[];
}

export default function ExplodedDiagram({
  title,
  subtitle,
  figNumber,
  bgImage,
  layers,
  caption,
  accentColor = "#C3FF00",
  showConnectors = true,
  infoBlocks,
}: ExplodedDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Entrance animation
    gsap.fromTo(containerRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
      scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
    });

    // Stagger layers with 3D effect
    layersRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, y: 60, rotateX: -15, scale: 0.95 },
        {
          opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.6,
          delay: 0.1 + i * 0.08, ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        }
      );
    });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        margin: '40px 0',
        opacity: 0,
        background: '#0A0A0A',
        border: `1px solid ${accentColor}15`,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
      }}
    >
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.85) 100%)' }} />

      {/* Corner accents */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 30, height: 30, borderTop: `2px solid ${accentColor}`, borderLeft: `2px solid ${accentColor}`, zIndex: 5 }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 30, height: 30, borderTop: `2px solid ${accentColor}`, borderRight: `2px solid ${accentColor}`, zIndex: 5 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '32px 24px 24px' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: 'clamp(18px, 3vw, 26px)', fontWeight: 700, color: '#FFFFFF', marginBottom: 6 }}>
            {title}
          </div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: accentColor, letterSpacing: 2 }}>
            {figNumber} · {subtitle}
          </div>
        </div>

        {/* Exploded layers stack */}
        <div style={{ perspective: 1200, perspectiveOrigin: '50% 30%' }}>
          {layers.map((layer, i) => (
            <div
              key={i}
              ref={el => { if (el) layersRef.current[i] = el; }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: i < layers.length - 1 ? 28 : 0,
                position: 'relative',
                opacity: 0,
              }}
            >
              {/* The Layer Card with 3D thickness */}
              <div style={{
                width: layer.width || '85%',
                position: 'relative',
                transformStyle: 'preserve-3d',
              }}>
                {/* 3D thickness bottom */}
                <div style={{
                  position: 'absolute',
                  bottom: -6,
                  left: 3,
                  right: -3,
                  height: 6,
                  background: `${layer.color}30`,
                  transform: 'rotateX(-70deg)',
                  transformOrigin: 'top',
                  borderRadius: '0 0 2px 2px',
                }} />
                {/* 3D thickness right */}
                <div style={{
                  position: 'absolute',
                  top: 3,
                  right: -6,
                  bottom: -6,
                  width: 6,
                  background: `${layer.color}20`,
                  transform: 'rotateY(70deg)',
                  transformOrigin: 'left',
                  borderRadius: '0 2px 2px 0',
                }} />
                {/* Main layer face */}
                <div style={{
                  background: `linear-gradient(135deg, ${layer.color}15 0%, ${layer.color}08 100%)`,
                  border: `1px solid ${layer.color}40`,
                  borderLeft: `3px solid ${layer.color}`,
                  padding: '14px 20px',
                  position: 'relative',
                  backdropFilter: 'blur(4px)',
                }}>
                  {/* Inner glow */}
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${layer.color}08 0%, transparent 60%)`, pointerEvents: 'none' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                    <div>
                      <div style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: 15, fontWeight: 600, color: layer.color, marginBottom: 2 }}>
                        {layer.label}
                      </div>
                      {layer.sublabel && (
                        <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>{layer.sublabel}</div>
                      )}
                      {layer.items && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                          {layer.items.map((item, j) => (
                            <span key={j} style={{ fontSize: 11, color: '#CCC', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 1 }}>
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {layer.metric && (
                      <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 16 }}>
                        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, color: layer.color, fontWeight: 700 }}>
                          {layer.metric}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Leader line + annotation on right */}
              {layer.label && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0,
                }}>
                  {/* Dot on layer edge */}
                  <div style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: layer.color,
                    boxShadow: `0 0 6px ${layer.color}`,
                    position: 'absolute',
                    right: -3,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 3,
                  }} />
                </div>
              )}

              {/* Connector line between layers */}
              {showConnectors && i < layers.length - 1 && (
                <div style={{
                  position: 'absolute',
                  bottom: -22,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}>
                  <div style={{ width: 1, height: 8, background: `linear-gradient(to bottom, ${layer.color}40, transparent)` }} />
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: `${accentColor}60`, boxShadow: `0 0 4px ${accentColor}40` }} />
                  <div style={{ width: 1, height: 8, background: `linear-gradient(to bottom, transparent, ${layers[i + 1]?.color || accentColor}40)` }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info blocks at bottom */}
        {infoBlocks && infoBlocks.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(infoBlocks.length, 2)}, 1fr)`, gap: 12, marginTop: 28, paddingTop: 20, borderTop: `1px solid ${accentColor}15` }}>
            {infoBlocks.map((block, i) => (
              <div key={i} style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${(block.color || accentColor)}20`, padding: '12px 14px' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: block.color || accentColor, marginBottom: 6 }}>{block.title}</div>
                {block.items.map((item, j) => (
                  <div key={j} style={{ fontSize: 11, color: '#AAA', padding: '2px 0', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                    <span style={{ width: 4, height: 4, background: (block.color || accentColor), borderRadius: '50%', marginTop: 5, flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Caption */}
        {caption && (
          <div style={{
            marginTop: 20,
            padding: '8px 0',
            borderTop: `1px solid ${accentColor}10`,
            fontFamily: "'Noto Sans SC', sans-serif",
            fontSize: 12,
            color: '#666',
            textAlign: 'center',
          }}>
            {caption}
          </div>
        )}
      </div>

      {/* Bottom corner accents */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 30, height: 30, borderBottom: `2px solid ${accentColor}`, borderLeft: `2px solid ${accentColor}`, zIndex: 5 }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 30, height: 30, borderBottom: `2px solid ${accentColor}`, borderRight: `2px solid ${accentColor}`, zIndex: 5 }} />
    </div>
  );
}

/* ============================================================
   Pre-built Diagrams for each Week 1 Day
   ============================================================ */

// Day 1: GPU Layer Stack (H100 Exploded View)
export function GpuExplodedView() {
  return (
    <ExplodedDiagram
      title="GPU 构成分层结构图"
      subtitle="以 H100 为例 · 从晶体管到 AI 集群"
      figNumber="图1-1"
      bgImage="/images/bg-gpu-layers.jpg"
      accentColor="#C3FF00"
      layers={[
        { label: "【系统层】AI 集群 / 服务器节点", sublabel: "GPU x8 → NVSwitch互联 → PCIe/CXL → CPU/网卡/存储", items: ["DGX H100整机功耗 10.2kW"], color: "#C3FF00", width: "90%", metric: "10.2kW" },
        { label: "【封装层】CoWoS 2.5D 先进封装", sublabel: "HBM3E(6颗) + GPU Logic Die → 硅中介层", items: ["台积电核心工艺", "布线密度是基板10倍"], color: "#00D4FF", width: "85%", metric: "$200-300/颗" },
        { label: "【晶圆层】Die 内部架构", sublabel: "SM / Tensor Core / NVLink I/O / L2 Cache / SerDes / HBM PHY", items: ["800亿晶体管", "台积电4N制程"], color: "#C3FF00", width: "80%", metric: "814mm²" },
        { label: "【HBM存储层】高带宽内存 3D 堆叠", sublabel: "DRAM Die x12 → TSV硅通孔垂直连接 → Base Die", items: ["带宽>3TB/s", "容量80GB"], color: "#A855F7", width: "75%", metric: "12层堆叠" },
        { label: "【物理制造层】从沙子到芯片", sublabel: "设计(英伟达) → 光罩 → 光刻(ASML EUV) → 刻蚀/沉积 → 量测 → 切割 → 封装(台积电)", items: ["Die Size 814mm²", "4N工艺"], color: "#FF9500", width: "70%", metric: "$25K-30K" },
      ]}
      infoBlocks={[
        { title: "核心认知", color: "#C3FF00", items: ["H100不是一颗Die，是系统级封装", "内存墙决定HBM不可替代性", "NVLink是隐形护城河(900GB/s)"] },
        { title: "投资含义", color: "#FF9500", items: ["技术壁垒高，但代工厂决定产能上限", "捆绑销售：网络业务毛利70%+", "HBM产能直接决定GPU出货量"] },
      ]}
    />
  );
}

// Day 2: CoWoS Exploded View
export function CoWoSExplodedView() {
  return (
    <ExplodedDiagram
      title="CoWoS 先进封装结构详解"
      subtitle="2.5D封装的核心 · 硅中介层(Silicon Interposer)"
      figNumber="图2-1"
      bgImage="/images/bg-cowos.jpg"
      accentColor="#00D4FF"
      layers={[
        { label: "散热盖 (Heat Spreader)", sublabel: "保护 + 散热", color: "#666", width: "90%", metric: "最上层" },
        { label: "HBM3E 堆叠内存", sublabel: "左右各3颗，共6颗HBM3E", items: ["12层堆叠", "TSV硅通孔"], color: "#A855F7", width: "80%", metric: "80GB" },
        { label: "GPU Logic Die (H100 / B200 / MI300X)", sublabel: "Die Size: 814mm² | 台积电4N制程", items: ["800亿晶体管", "SM + Tensor Core"], color: "#C3FF00", width: "75%", metric: "核心" },
        { label: "硅中介层 (Silicon Interposer)", sublabel: "台积电核心工艺，布线密度是基板10倍", items: ["微凸块(μBump)连接", "TSV垂直导通"], color: "#00D4FF", width: "85%", metric: "核心壁垒" },
        { label: "有机基板 (Organic Substrate)", sublabel: "连接 PCB 载板 → 服务器主板", color: "#888", width: "90%", metric: "底层" },
      ]}
      infoBlocks={[
        { title: "为什么是瓶颈", color: "#FF4444", items: ["台积电月产能: 3-4万片(2024)", "英伟达包走80%+", "设备交付周期: 18个月", "洁净室空间受限"] },
        { title: "经济账", color: "#00D4FF", items: ["一片12寸晶圆≈20-25颗H100", "封装成本: $200-300/颗", "台积电2024 CoWoS收入: $80-100亿", "毛利率: 50%+(远高于传统封装)"] },
      ]}
    />
  );
}

// Day 3: HBM Exploded View
export function HbmExplodedView() {
  return (
    <ExplodedDiagram
      title="HBM 高带宽内存结构与供应链"
      subtitle={'"算力芯片的燃料" · 3D TSV堆叠技术'}
      figNumber="图3-1"
      bgImage="/images/bg-hbm.jpg"
      accentColor="#A855F7"
      layers={[
        { label: "DRAM Die 12", sublabel: "顶层DRAM芯片", color: "#8B5CF6", width: "50%" },
        { label: "DRAM Die 8-11", sublabel: "堆叠层 · 通过TSV垂直连接", color: "#7C3AED", width: "55%" },
        { label: "DRAM Die 4-7", sublabel: "堆叠层 · TSV硅通孔贯穿", color: "#6D28D9", width: "60%" },
        { label: "DRAM Die 1-3", sublabel: "底层堆叠", color: "#5B21B6", width: "65%" },
        { label: "Base Die (Logic)", sublabel: "逻辑控制层 · 连接GPU", color: "#C3FF00", width: "70%", metric: "控制器" },
      ]}
      caption="HBM3E: 12层堆叠 | 带宽 1.2TB/s | 容量 24-36GB/颗 | TSV垂直连接"
      infoBlocks={[
        { title: "供应链传导链", color: "#A855F7", items: ["AI芯片需求爆发 → HBM需求暴增", "每颗H100用6颗HBM3E", "DRAM产能转向HBM(设备切换需6个月)", "标准DRAM供应减少 → DDR5涨价"] },
        { title: "三巨头竞争格局", color: "#C3FF00", items: ["SK海力士 ~50% 技术领先 率先量产", "三星 ~40% 追赶中 验证中", "美光 ~10% 第三 追赶"] },
      ]}
    />
  );
}

// Day 4: Optical Module Network Exploded View
export function OpticalExplodedView() {
  return (
    <ExplodedDiagram
      title="光模块产业链与网络架构"
      subtitle="Scale-up vs Scale-out · 网络是集群算力的血管"
      figNumber="图4-1"
      bgImage="/images/bg-optical.jpg"
      accentColor="#00D4FF"
      layers={[
        { label: "云厂商数据中心", sublabel: "微软 / 谷歌 / 亚马逊 / Meta", items: ["AI训练集群", "万卡规模"], color: "#C3FF00", width: "90%", metric: "需求端" },
        { label: "交换机层", sublabel: "Arista / Cisco / 锐捷 / 英伟达NVSwitch", items: ["Scale-out: 以太网", "Scale-up: NVSwitch"], color: "#00D4FF", width: "80%", metric: "400-800G" },
        { label: "光模块层", sublabel: "中际旭创 / Coherent / 光迅 / 新易盛", items: ["800G(2024)", "1.6T(2025)", "3.2T(2026-27)"], color: "#C3FF00", width: "75%", metric: "卖水人" },
        { label: "光电芯片层", sublabel: "光芯片 + DSP电芯片 + 驱动芯片", items: ["II-VI/Lumentum(光芯片)", "Marvell/Broadcom(DSP)"], color: "#A855F7", width: "70%", metric: "核心壁垒" },
      ]}
      infoBlocks={[
        { title: "Scale-up (GPU互联)", color: "#C3FF00", items: ["协议: NVLink/NVSwitch", "带宽: 900GB/s", "范围: 机架内/相邻机架", "拥有者: 英伟达(垄断)"] },
        { title: "Scale-out (服务器互联)", color: "#00D4FF", items: ["协议: InfiniBand/以太网", "带宽: 400-800Gbps", "范围: 数据中心级", "竞争: 超以太网联盟UEC"] },
      ]}
    />
  );
}

// Day 5: Foundry & Equipment Exploded View
export function FoundryExplodedView() {
  return (
    <ExplodedDiagram
      title="晶圆代工与设备产业链"
      subtitle="ASML位于金字塔顶端 · 设备商卖水人逻辑"
      figNumber="图5-1"
      bgImage="/images/bg-fab.jpg"
      accentColor="#FF9500"
      layers={[
        { label: "ASML · EUV光刻机", sublabel: "全球唯一供应商 · 单价$2-3亿 · 订单排到2027", items: ["EUV光源", "精密光学系统"], color: "#FF9500", width: "45%", metric: "顶端" },
        { label: "日本/美国设备商", sublabel: "东京电子(刻蚀) | SCREEN(清洗) | KLA(量测) | Lam(沉积)", items: ["细分垄断", "设备周期滞后芯片6-12月"], color: "#FF6B35", width: "60%" },
        { label: "晶圆代工厂", sublabel: "台积电(55%毛利率) | 三星 | Intel", items: ["3nm $2万+/片", "CoWoS先进封装"], color: "#C3FF00", width: "75%", metric: "台积电60%" },
        { label: "芯片设计公司", sublabel: "英伟达 | AMD | 博通 | 苹果 | 高通 | 海思", items: ["Fabless模式", "IP+架构设计"], color: "#00D4FF", width: "85%" },
        { label: "终端应用", sublabel: "云厂商AI服务器 | 手机/PC | 汽车 | IoT", color: "#888", width: "95%", metric: "需求端" },
      ]}
      caption="无论台积电、三星、Intel谁赢，都需要ASML的设备"
    />
  );
}

// Day 6: Data Center & Energy Exploded View
export function DataCenterExplodedView() {
  return (
    <ExplodedDiagram
      title="数据中心与能源产业链"
      subtitle={'从"地产逻辑"转向"能源逻辑"'}
      figNumber="图6-1"
      bgImage="/images/bg-datacenter.jpg"
      accentColor="#00D4FF"
      layers={[
        { label: "云厂商", sublabel: "微软 / 谷歌 / 亚马逊 / Meta", items: ["CAPEX 2000亿+"], color: "#C3FF00", width: "90%", metric: "$2000亿+" },
        { label: "数据中心运营商", sublabel: "Equinix / DLR / 万国数据", items: ["机柜租金/托管费"], color: "#00D4FF", width: "80%" },
        { label: "散热系统", sublabel: "Vertiv / 英维克 / 施耐德", items: ["液冷渗透率 15%→60%", "冷板式为主"], color: "#C3FF00", width: "75%", metric: "液冷" },
        { label: "电力设备", sublabel: "变压器 / UPS / 开关柜", items: ["AI机柜 50-100kW", "传统机柜 5-10kW"], color: "#FF9500", width: "70%", metric: "100MW" },
        { label: "公用事业公司", sublabel: "核电 / 天然气 / 可再生能源", items: ["微软签20年核电合约", "电网接入排队3-5年"], color: "#FF6B35", width: "85%", metric: "能源瓶颈" },
      ]}
      infoBlocks={[
        { title: "功率密度演进", color: "#FF4444", items: ["传统机柜: 5-10 kW", "AI机柜: 50-100 kW(10倍)", "10万卡集群: 100 MW", "电力是终极瓶颈"] },
        { title: "投资传导链", color: "#00D4FF", items: ["CAPEX激增 → 先涨Vertiv(液冷)", "再涨电力设备", "最后涨核电/天然气", "电力受限 → 杀全链预期"] },
      ]}
    />
  );
}

// Day 7: Full Investment Map Exploded View
export function FullMapExplodedView() {
  return (
    <ExplodedDiagram
      title="AI基础设施层投资地图"
      subtitle="从需求端到供给端的完整链条"
      figNumber="图7-1"
      bgImage="/images/bg-fullmap.jpg"
      accentColor="#C3FF00"
      layers={[
        { label: "需求端 · 云厂商 CAPEX", sublabel: "微软 / 谷歌 / 亚马逊 / Meta", items: ["2024合计超$2000亿", "80%用于购买GPU"], color: "#C3FF00", width: "90%", metric: "$2000亿+" },
        { label: "GPU + 网络 · 英伟达 90%+", sublabel: "算力货币 | CUDA生态壁垒 | NVLink捆绑", items: ["H100/B200/GB200", "网络业务毛利70%+"], color: "#C3FF00", width: "80%", metric: "垄断" },
        { label: "先进封装 · 台积电 CoWoS", sublabel: "产能咽喉 | 3-4万片/月 | 英伟达包走80%+", items: ["硅中介层核心工艺", "扩产需18个月"], color: "#00D4FF", width: "75%", metric: "瓶颈" },
        { label: "HBM 存储 · SK海力士 50%", sublabel: '"算力燃料" | 供不应求 | DRAM产能挤压', items: ["12层堆叠", "带宽>3TB/s"], color: "#A855F7", width: "70%", metric: "紧缺" },
        { label: "光模块 / 网络 · 中际旭创 60%", sublabel: "卖水人逻辑 | 800G→1.6T | 中国厂商占60%+", items: ["光芯片/DSP依赖进口", "CPO长期替代"], color: "#00D4FF", width: "78%", metric: "平衡" },
        { label: "数据中心 / 能源", sublabel: '"地产逻辑"→"能源逻辑" | 电力是终极瓶颈', items: ["液冷渗透率15%→60%", "核电签约20年"], color: "#FF9500", width: "85%", metric: "能源" },
      ]}
      caption="投资条件反射：听到任何AI新闻 → 10秒内定位产业链环节 → 5分钟内判断验证/证伪"
    />
  );
}

// FinReport: Dashboard Exploded View
export function FinDashboardExplodedView() {
  return (
    <ExplodedDiagram
      title="AI产业链财报监控仪表盘"
      subtitle="四层信号体系 · 从数据到决策"
      figNumber="图8-1"
      bgImage="/images/bg-fin-dashboard.jpg"
      accentColor="#FF9500"
      layers={[
        { label: "【第一层】收入增长信号", sublabel: "数据中心收入QoQ增速 / 客户集中度 / 新订单backlog", items: ["增速>50%=强劲", "增速<20%=危险", "指引变化趋势"], color: "#C3FF00", width: "90%", metric: ">50%" },
        { label: "【第二层】毛利率信号", sublabel: "毛利率变化趋势 / 定价权 / 成本传导顺畅度", items: [">70%=定价权 intact", "<65%=警惕", "连续2季下降=危险"], color: "#00D4FF", width: "80%", metric: ">70%" },
        { label: "【第三层】库存/CAPEX信号", sublabel: "库存周转天数 / CAPEX/收入比 / FCF转化率", items: ["库存下降=供不应求", "FCF>20%=健康", "CAPEX/收入<35%=理性"], color: "#FF9500", width: "75%", metric: "<35%" },
        { label: "【第四层】验证结论", sublabel: "三层信号一致性 / 周期位置判定 / 投资策略调整", items: ["多层同向=强烈信号", "出现矛盾=周期转换", "结合宏观/地缘政治验证"], color: "#A855F7", width: "85%", metric: "综合" },
      ]}
      caption="所有新闻、KOL观点最终都要在财报数据中交叉验证"
    />
  );
}

// FinReport: Cycle Position Exploded View
export function FinCycleExplodedView() {
  return (
    <ExplodedDiagram
      title="财报数据周期定位"
      subtitle="三层验证法 · 周期阶段与财报信号对应"
      figNumber="图8-2"
      bgImage="/images/bg-fin-cycle.jpg"
      accentColor="#FF9500"
      layers={[
        { label: "上升期 · 当前?", sublabel: "收入增速>50% | 毛利率扩张>70% | 库存周转下降", items: ["云厂商CAPEX +30%+", "CAPEX/收入<35%", "FCF为正"], color: "#C3FF00", width: "85%", metric: "超配GPU" },
        { label: "顶部期 · 拐点预警", sublabel: "增速放缓但>0% | 毛利率持平 | 库存周转开始上升", items: ["指引'符合预期'而非'超预期'", "CAPEX增速>收入增速"], color: "#FF9500", width: "75%", metric: "减配高估值" },
        { label: "下降期 · 避险", sublabel: "收入增速<0% | 毛利率收缩 | 库存积压CAPEX下修", items: ["连续2季负增长", "FCF转负", "价格战开始"], color: "#FF4444", width: "65%", metric: "低配GPU" },
        { label: "底部期 · 布局", sublabel: "负增长降幅收窄 | 毛利率触底 | 库存去化FCF恢复", items: ["连续2-3季负增长", "CAPEX降至低位", "先行者开始备货"], color: "#00D4FF", width: "80%", metric: "布局设备商" },
      ]}
      infoBlocks={[
        { title: "三层验证法", color: "#FF9500", items: ["第一层(收入增长) → 第二层(毛利率) → 第三层(库存/CAPEX)", "多层同向 = 强烈判断", "矛盾信号 = 周期正在转换"] },
        { title: "危险信号组合", color: "#FF4444", items: ["①库存周转连续2季上升", "②台积电下修CoWoS指引", "③ASML book-to-bill<0.8", "④CAPEX增速<AI收入增速", "⑤光模块ASP连续2季下降"] },
      ]}
    />
  );
}
