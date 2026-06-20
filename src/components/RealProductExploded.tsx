import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   RealProductExploded v3 - 真实产品爆炸图
   核心改进：
   1. 不等宽层 - 模拟物理尺寸关系
   2. 引线标注系统 - 水平线+编号+文字
   3. 纵向视觉关联 - 发光通道连接各层
   4. 层与层之间有明确的空间关系
   ============================================================ */

interface ExplodedLayer {
  num: string;        // 编号: "①"
  image: string;      // 产品图片
  label: string;      // 中文名称
  sublabel: string;   // 英文/副标题
  metric?: string;    // 关键指标
  width: string;      // 层宽度 (%)
  leftOffset?: string; // 左侧偏移 (%) - 实现非居中
  type?: 'large' | 'medium' | 'small' | 'full'; // 视觉层级
}

interface RealProductExplodedProps {
  title: string;
  subtitle: string;
  figNumber: string;
  bgImage: string;
  layers: ExplodedLayer[];
  accentColor?: string;
  connections?: { from: number; to: number; label: string; color: string }[];
  infoBlocks?: { title: string; items: string[]; color?: string }[];
}

export default function RealProductExploded({
  title,
  subtitle,
  figNumber,
  bgImage,
  layers,
  accentColor = "#C3FF00",
  connections,
  infoBlocks,
}: RealProductExplodedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(containerRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
      scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
    });

    // Sequential explosion: layers separate from center outward
    const mid = Math.floor(layers.length / 2);
    layers.forEach((_, i) => {
      const el = layerRefs.current[i];
      if (!el) return;
      const distFromCenter = Math.abs(i - mid);
      gsap.fromTo(el,
        { opacity: 0, y: (i - mid) * 15 + 40, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7,
          delay: 0.1 + distFromCenter * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        }
      );
    });
  }, [layers.length]);

  // Determine max width for alignment
  const maxWidth = Math.max(...layers.map(l => parseInt(l.width)));

  return (
    <div
      ref={containerRef}
      style={{
        margin: '40px 0',
        opacity: 0,
        background: '#0A0A0A',
        border: `1px solid ${accentColor}12`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.6) 40%, rgba(10,10,10,0.88) 100%)' }} />

      {/* Corner accents */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 30, height: 30, borderTop: `2px solid ${accentColor}`, borderLeft: `2px solid ${accentColor}`, zIndex: 10 }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 30, height: 30, borderTop: `2px solid ${accentColor}`, borderRight: `2px solid ${accentColor}`, zIndex: 10 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 30, height: 30, borderBottom: `2px solid ${accentColor}`, borderLeft: `2px solid ${accentColor}`, zIndex: 10 }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 30, height: 30, borderBottom: `2px solid ${accentColor}`, borderRight: `2px solid ${accentColor}`, zIndex: 10 }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '28px 0 24px' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 28, padding: '0 16px' }}>
          <div style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: 'clamp(16px, 3vw, 22px)', fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>
            {title}
          </div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: accentColor, letterSpacing: 2 }}>
            {figNumber} · {subtitle}
          </div>
        </div>

        {/* Info blocks: Total (summary first) */}
        {infoBlocks && infoBlocks.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(infoBlocks.length, 2)}, 1fr)`, gap: 10, margin: '0 16px 24px', padding: '16px', background: 'rgba(0,0,0,0.3)', border: `1px solid ${accentColor}10` }}>
            {infoBlocks.map((block, i) => (
              <div key={i} style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${(block.color || accentColor)}18`, padding: '12px 14px' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: block.color || accentColor, marginBottom: 6 }}>{block.title}</div>
                {block.items.map((item, j) => (
                  <div key={j} style={{ fontSize: 11, color: '#AAA', padding: '2px 0', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                    <span style={{ width: 4, height: 4, background: (block.color || accentColor), borderRadius: '50%', marginTop: 5, flexShrink: 0, opacity: 0.7 }} />
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Exploded layers: Details (分) */}
        <div style={{ position: 'relative', padding: '0 16px' }}>
          {/* Vertical connection channel (glowing center spine) */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 2,
            transform: 'translateX(-50%)',
            background: `linear-gradient(180deg, transparent 0%, ${accentColor}15 20%, ${accentColor}25 50%, ${accentColor}15 80%, transparent 100%)`,
            zIndex: 0,
          }} />

          {layers.map((layer, i) => {
            const leftOffset = layer.leftOffset || `${(maxWidth - parseInt(layer.width)) / 2}%`;
            return (
              <div
                key={i}
                ref={el => { if (el) layerRefs.current[i] = el; }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  marginBottom: i < layers.length - 1 ? 10 : 0,
                  opacity: 0,
                  zIndex: 1,
                }}
              >
                {/* Layer image container - variable width, offset */}
                <div style={{
                  width: layer.width,
                  marginLeft: leftOffset,
                  position: 'relative',
                  flexShrink: 0,
                }}>
                  {/* Glow shadow underneath */}
                  <div style={{
                    position: 'absolute',
                    bottom: -4,
                    left: '10%',
                    right: '10%',
                    height: 8,
                    background: `radial-gradient(ellipse, ${accentColor}20 0%, transparent 70%)`,
                    filter: 'blur(4px)',
                  }} />

                  {/* The product image */}
                  <img
                    src={layer.image}
                    alt={layer.label}
                    style={{
                      width: '100%',
                      display: 'block',
                      filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.7))',
                    }}
                  />

                  {/* Inter-layer connector dots */}
                  {i < layers.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      bottom: -14,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                    }}>
                      <div style={{ width: 3, height: 3, borderRadius: '50%', background: `${accentColor}50` }} />
                      <div style={{ width: 2, height: 4, background: `linear-gradient(to bottom, ${accentColor}30, transparent)` }} />
                    </div>
                  )}
                </div>

                {/* Spacer */}
                <div style={{ flex: 1, minWidth: 12 }} />

                {/* Leader line + Annotation */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0,
                  flexShrink: 0,
                  position: 'relative',
                }}>
                  {/* Horizontal line from image to number */}
                  <div style={{
                    width: 20 + (layers.length - i) * 3,
                    height: 1,
                    background: `linear-gradient(to right, ${accentColor}40, ${accentColor})`,
                  }} />

                  {/* Number circle */}
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: `0 0 8px ${accentColor}60`,
                  }}>
                    <span style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 12,
                      color: '#000',
                      fontWeight: 700,
                    }}>
                      {layer.num.replace(/[^0-9]/g, '')}
                    </span>
                  </div>

                  {/* Extended line */}
                  <div style={{ width: 10, height: 1, background: accentColor }} />

                  {/* Label block */}
                  <div style={{
                    minWidth: 110,
                    maxWidth: 160,
                  }}>
                    <div style={{
                      fontFamily: "'Noto Sans SC', sans-serif",
                      fontSize: 13,
                      color: '#FFFFFF',
                      fontWeight: 600,
                      lineHeight: 1.3,
                    }}>
                      {layer.label}
                    </div>
                    <div style={{
                      fontSize: 10,
                      color: '#888',
                      marginTop: 1,
                      lineHeight: 1.3,
                    }}>
                      {layer.sublabel}
                    </div>
                    {layer.metric && (
                      <div style={{
                        fontSize: 10,
                        color: accentColor,
                        fontFamily: "'Space Mono', monospace",
                        marginTop: 2,
                      }}>
                        {layer.metric}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Connection flow arrows (optional) */}
        {connections && connections.length > 0 && (
          <div style={{ margin: '16px 24px 0', padding: '12px 16px', background: 'rgba(0,0,0,0.4)', border: `1px solid ${accentColor}15` }}>
            <div style={{ fontSize: 11, color: accentColor, fontWeight: 600, marginBottom: 8, letterSpacing: 1 }}>
              信号/数据流向
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {connections.map((conn, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 11, color: '#AAA' }}>层{conn.from + 1}</span>
                  <span style={{ fontSize: 12, color: conn.color }}>→</span>
                  <span style={{ fontSize: 11, color: '#AAA' }}>层{conn.to + 1}</span>
                  <span style={{ fontSize: 10, color: conn.color, marginLeft: 2 }}>({conn.label})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total: summary recap at bottom */}
        {infoBlocks && infoBlocks.length > 0 && (
          <div style={{ margin: '20px 16px 0', padding: '16px', background: 'rgba(0,0,0,0.3)', border: `1px solid ${accentColor}10` }}>
            <div style={{ fontSize: 11, color: accentColor, fontWeight: 600, marginBottom: 10, letterSpacing: 1, textAlign: 'center' }}>
              —— 总结回顾 ——
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(infoBlocks.length, 2)}, 1fr)`, gap: 10 }}>
              {infoBlocks.map((block, i) => (
                <div key={i} style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${(block.color || accentColor)}18`, padding: '12px 14px' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: block.color || accentColor, marginBottom: 6 }}>{block.title}</div>
                  {block.items.map((item, j) => (
                    <div key={j} style={{ fontSize: 11, color: '#AAA', padding: '2px 0', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                      <span style={{ width: 4, height: 4, background: (block.color || accentColor), borderRadius: '50%', marginTop: 5, flexShrink: 0, opacity: 0.7 }} />
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   Day 1: GPU H100 - 严格按参考图的8层结构
   不等宽层 + 引线标注 + 物理位置关系
   ============================================================ */
export function GpuProductExplodedView() {
  return (
    <RealProductExploded
      title="GPU 产品爆炸图"
      subtitle="以 H100 为例 · 数据中心 GPU 封装结构"
      figNumber="图1-1"
      bgImage="/images/bg-gpu-layers.jpg"
      accentColor="#C3FF00"
      layers={[
        {
          num: "⑦",
          image: "/images/parts/gpu-cooler.png",
          label: "散热系统",
          sublabel: "Cooler Master / AVC / 富士通",
          metric: "双风扇+均热板 | TDP 700W",
          width: "72%",
          leftOffset: "8%",
          type: "large",
        },
        {
          num: "①",
          image: "/images/parts/gpu-die.png",
          label: "GPU 计算核心",
          sublabel: "NVIDIA(90%+) / AMD(~8%) / Intel",
          metric: "814mm² | 800亿晶体管 | 4N",
          width: "38%",
          leftOffset: "18%",
          type: "large",
        },
        {
          num: "②",
          image: "/images/parts/hbm-stacks.png",
          label: "HBM 高带宽内存",
          sublabel: "SK海力士(50%) / 三星(40%) / 美光(10%)",
          metric: "80GB | 带宽 >3TB/s",
          width: "58%",
          leftOffset: "8%",
          type: "medium",
        },
        {
          num: "③",
          image: "/images/parts/silicon-interposer.png",
          label: "CoWoS 先进封装",
          sublabel: "台积电(垄断90%+) / 日月光(备胎)",
          metric: "台积电核心工艺",
          width: "62%",
          leftOffset: "6%",
          type: "full",
        },
        {
          num: "④",
          image: "/images/parts/silicon-interposer.png",
          label: "硅中介层",
          sublabel: "台积电核心工艺 / 设备商: Besi / ASMPT",
          metric: "布线密度 10× 有机基板",
          width: "65%",
          leftOffset: "5%",
          type: "full",
        },
        {
          num: "⑤",
          image: "/images/parts/pcb-board.png",
          label: "封装基板",
          sublabel: "景硕 / 欣兴电子 / 揖斐电(IBIDEN)",
          metric: "供电/信号 | 连接主板",
          width: "70%",
          leftOffset: "3%",
          type: "full",
        },
        {
          num: "⑥",
          image: "/images/parts/pcb-board.png",
          label: "供电模组 VRM",
          sublabel: "英飞凌(Infineon) / MPS / 瑞萨",
          metric: "多相供电 | 稳压模块",
          width: "50%",
          leftOffset: "12%",
          type: "small",
        },
        {
          num: "⑧",
          image: "/images/parts/pcb-board.png",
          label: "NVLink / PCIe 接口",
          sublabel: "NVIDIA(NVLink垄断) / Broadcom(PCIe)",
          metric: "900GB/s | 互联带宽",
          width: "68%",
          leftOffset: "4%",
          type: "full",
        },
      ]}
      connections={[
        { from: 0, to: 1, label: "热量传导", color: "#FF4444" },
        { from: 1, to: 2, label: "HBM直连", color: "#C3FF00" },
        { from: 1, to: 3, label: "信号互联", color: "#00D4FF" },
        { from: 3, to: 4, label: "TSV通道", color: "#A855F7" },
        { from: 4, to: 5, label: "基板走线", color: "#FF9500" },
        { from: 5, to: 6, label: "供电", color: "#FF6B35" },
        { from: 5, to: 7, label: "数据总线", color: "#00D4FF" },
      ]}
      infoBlocks={[
        { title: "核心认知", color: "#C3FF00", items: ["H100不是一颗Die，是系统级封装(SiP)", "内存墙决定HBM不可替代性(>3TB/s)", "NVLink是隐形护城河(900GB/s)", "6颗HBM3E环绕GPU核心布置"] },
        { title: "当前供需验证", color: "#FF9500", items: ["NVIDIA FY2027 Q1收入$816亿，YoY +85%", "CoWoS紧缺但精确利用率未披露", "HBM需求强，跟踪HBM4量产", "事实用于定位周期，不等同确定性建议"] },
      ]}
    />
  );
}

/* ============================================================
   Day 2: CoWoS - 不等宽层 + 真实结构关系
   ============================================================ */
export function CoWoSProductExplodedView() {
  return (
    <RealProductExploded
      title="CoWoS 先进封装爆炸图"
      subtitle="2.5D封装核心 · 硅中介层(Silicon Interposer)"
      figNumber="图2-1"
      bgImage="/images/bg-cowos.jpg"
      accentColor="#00D4FF"
      layers={[
        {
          num: "⑤",
          image: "/images/parts/heat-spreader.png",
          label: "散热盖",
          sublabel: "散热器厂商 / 均热板供应商",
          width: "68%",
          leftOffset: "10%",
          type: "large",
        },
        {
          num: "①",
          image: "/images/parts/gpu-die.png",
          label: "GPU Logic Die",
          sublabel: "NVIDIA / AMD",
          metric: "814mm² | 台积电4N",
          width: "35%",
          leftOffset: "18%",
          type: "large",
        },
        {
          num: "②",
          image: "/images/parts/hbm-stacks.png",
          label: "HBM3E 堆叠内存",
          sublabel: "SK海力士(主供) / 三星(追赶) / 美光",
          metric: "80GB总容量",
          width: "60%",
          leftOffset: "6%",
          type: "medium",
        },
        {
          num: "③",
          image: "/images/parts/silicon-interposer.png",
          label: "硅中介层",
          sublabel: "Silicon Interposer",
          metric: "台积电核心壁垒 | 10×布线密度",
          width: "65%",
          leftOffset: "5%",
          type: "full",
        },
        {
          num: "④",
          image: "/images/parts/pcb-board.png",
          label: "有机基板 + PCB",
          sublabel: "景硕 / 欣兴电子 / 揖斐电(IBIDEN)",
          metric: "连接PCB载板 → 服务器主板",
          width: "72%",
          leftOffset: "2%",
          type: "full",
        },
      ]}
      connections={[
        { from: 0, to: 1, label: "散热", color: "#FF4444" },
        { from: 1, to: 2, label: "HBM总线", color: "#C3FF00" },
        { from: 1, to: 3, label: "信号", color: "#00D4FF" },
        { from: 2, to: 3, label: "TSV", color: "#A855F7" },
        { from: 3, to: 4, label: "BGA焊球", color: "#FF9500" },
      ]}
      infoBlocks={[
        { title: "为什么是瓶颈", color: "#FF4444", items: ["大尺寸CoWoS仍是主流供给", "精确利用率未披露", "跟踪扩产与设备到位", "反转看客户交期"] },
        { title: "证据口径", color: "#00D4FF", items: ["TSMC 2026 Q1业绩会", "当前状态: 紧缺", "证据置信度: 中高", "不以供应链估算冒充事实"] },
      ]}
    />
  );
}

/* ============================================================
   Day 3: HBM - 不等宽 + 堆叠关系
   ============================================================ */
export function HbmProductExplodedView() {
  return (
    <RealProductExploded
      title="HBM 高带宽内存爆炸图"
      subtitle={'3D TSV堆叠 · "算力芯片的燃料"'}
      figNumber="图3-1"
      bgImage="/images/bg-hbm.jpg"
      accentColor="#A855F7"
      layers={[
        {
          num: "③",
          image: "/images/parts/hbm-stacks.png",
          label: "HBM3E 12层堆叠",
          sublabel: "SK海力士(领先) / 三星 / 美光",
          metric: "带宽 1.2TB/s | 24-36GB/颗",
          width: "55%",
          leftOffset: "12%",
          type: "medium",
        },
        {
          num: "②",
          image: "/images/parts/gpu-die.png",
          label: "Base Die (逻辑层)",
          sublabel: "SK海力士(Base Die集成)",
          metric: "连接GPU的接口控制器",
          width: "42%",
          leftOffset: "16%",
          type: "medium",
        },
        {
          num: "①",
          image: "/images/parts/silicon-interposer.png",
          label: "硅中介层",
          sublabel: "设备商: Besi / TEL / Lam Research",
          metric: "微凸块(μBump)连接",
          width: "60%",
          leftOffset: "7%",
          type: "full",
        },
      ]}
      connections={[
        { from: 0, to: 1, label: "TSV", color: "#A855F7" },
        { from: 1, to: 2, label: "μBump", color: "#C3FF00" },
      ]}
      infoBlocks={[
        { title: "供应链传导", color: "#A855F7", items: ["AI芯片需求 → HBM需求暴增", "每颗H100用6颗HBM3E", "DRAM转HBM(设备切换6个月)", "标准DRAM减少 → DDR5涨价"] },
        { title: "三巨头格局", color: "#C3FF00", items: ["SK海力士 ~50% 技术领先", "三星 ~40% 追赶中", "美光 ~10% 第三", "TSV良率是核心壁垒"] },
      ]}
    />
  );
}

/* ============================================================
   Day 4: Optical Module - 不等宽 + 网络层级关系
   ============================================================ */
export function OpticalProductExplodedView() {
  return (
    <RealProductExploded
      title="光模块产业链爆炸图"
      subtitle="Scale-up vs Scale-out · 网络是集群算力的血管"
      figNumber="图4-1"
      bgImage="/images/bg-optical.jpg"
      accentColor="#00D4FF"
      layers={[
        {
          num: "①",
          image: "/images/parts/network-switch.png",
          label: "交换机层",
          sublabel: "Arista(以太网龙头) / Cisco / 锐捷",
          metric: "400-800G端口",
          width: "70%",
          leftOffset: "5%",
          type: "large",
        },
        {
          num: "②",
          image: "/images/parts/optical-module.png",
          label: "光模块层 · 卖水人",
          sublabel: "中际旭创(60%+) / Coherent / 新易盛",
          metric: "800G→1.6T→3.2T",
          width: "58%",
          leftOffset: "10%",
          type: "medium",
        },
        {
          num: "③",
          image: "/images/parts/gpu-die.png",
          label: "光电芯片层",
          sublabel: "光芯片: II-VI/Lumentum / 源杰 | DSP: Marvell",
          metric: "II-VI/Lumentum | Marvell",
          width: "40%",
          leftOffset: "17%",
          type: "small",
        },
      ]}
      connections={[
        { from: 0, to: 1, label: "光纤", color: "#00D4FF" },
        { from: 1, to: 2, label: "电信号", color: "#C3FF00" },
      ]}
      infoBlocks={[
        { title: "Scale-up (GPU互联)", color: "#C3FF00", items: ["协议: NVLink/NVSwitch", "带宽: 900GB/s", "拥有者: 英伟达(垄断)", "竞争: UEC联盟"] },
        { title: "Scale-out (服务器互联)", color: "#00D4FF", items: ["协议: InfiniBand/以太网", "带宽: 400-800Gbps", "光模块必用(无论IB或以太网)", "中国厂商占60%+(全球份额)"] },
      ]}
    />
  );
}

/* ============================================================
   Day 5: Foundry Pyramid - 不等宽 + 金字塔层级
   ============================================================ */
export function FoundryProductExplodedView() {
  return (
    <RealProductExploded
      title="晶圆代工与设备产业链爆炸图"
      subtitle="ASML位于金字塔顶端 · 设备商卖水人逻辑"
      figNumber="图5-1"
      bgImage="/images/bg-fab.jpg"
      accentColor="#FF9500"
      layers={[
        {
          num: "①",
          image: "/images/parts/silicon-wafer.png",
          label: "ASML · EUV光刻机",
          sublabel: "ASML(100%垄断) | 订单排到2027",
          metric: "单价$2-3亿 | 订单排到2027",
          width: "48%",
          leftOffset: "18%",
          type: "small",
        },
        {
          num: "②",
          image: "/images/parts/silicon-interposer.png",
          label: "设备商 · 细分垄断",
          sublabel: "TEL(刻蚀) / KLA(量测) / Lam(沉积) / AMAT",
          metric: "设备周期滞后芯片6-12个月",
          width: "58%",
          leftOffset: "12%",
          type: "medium",
        },
        {
          num: "③",
          image: "/images/parts/gpu-die.png",
          label: "晶圆代工 · 台积电",
          sublabel: "台积电(60%份额) / 三星(追赶) / Intel",
          metric: "台积电60%份额 | 毛利率55%",
          width: "42%",
          leftOffset: "16%",
          type: "medium",
        },
      ]}
      connections={[
        { from: 0, to: 1, label: "设备依赖", color: "#FF9500" },
        { from: 1, to: 2, label: "产能支撑", color: "#C3FF00" },
      ]}
      infoBlocks={[
        { title: "设备商卖水人逻辑", color: "#FF9500", items: ["无论台积电/三星/Intel谁赢", "都需要ASML的EUV设备", "设备周期滞后芯片6-12个月", "ASML订单book-to-bill>1=扩产"] },
        { title: "制程分化", color: "#C3FF00", items: ["先进逻辑需求超过供给", "成熟制程复苏/趋平衡", "UMC利用率79%", "CoWoS精确利用率未披露"] },
      ]}
    />
  );
}

/* ============================================================
   Day 6: Data Center - 不等宽 + 能源传导链
   ============================================================ */
export function DataCenterProductExplodedView() {
  return (
    <RealProductExploded
      title="数据中心与能源产业链爆炸图"
      subtitle={'从「地产逻辑」转向「能源逻辑」'}
      figNumber="图6-1"
      bgImage="/images/bg-datacenter.jpg"
      accentColor="#00D4FF"
      layers={[
        {
          num: "①",
          image: "/images/parts/server-rack.png",
          label: "数据中心 · GPU服务器",
          sublabel: "超微(Supermicro) / 戴尔 / 联想 / 浪潮",
          metric: "AI机柜50-100kW(传统5-10kW)",
          width: "68%",
          leftOffset: "6%",
          type: "large",
        },
        {
          num: "②",
          image: "/images/parts/vapor-chamber.png",
          label: "散热系统 · 液冷",
          sublabel: "Vertiv(液冷龙头) / 英维克 / 施耐德",
          metric: "液冷渗透率15%→60%(2027)",
          width: "55%",
          leftOffset: "12%",
          type: "medium",
        },
        {
          num: "③",
          image: "/images/parts/pcb-board.png",
          label: "电力设备 + 能源",
          sublabel: "施耐德 / 台达 / 艾默生 | 核电: Constellation",
          metric: "微软签20年核电合约",
          width: "62%",
          leftOffset: "8%",
          type: "full",
        },
      ]}
      connections={[
        { from: 0, to: 1, label: "热量", color: "#FF4444" },
        { from: 0, to: 2, label: "电力需求", color: "#FF9500" },
        { from: 1, to: 2, label: "冷却用电", color: "#00D4FF" },
      ]}
      infoBlocks={[
        { title: "功率密度演进", color: "#FF4444", items: ["传统机柜: 5-10 kW", "AI机柜: 50-100 kW(10倍)", "10万卡集群: 100 MW", "电力是终极瓶颈"] },
        { title: "投资传导链", color: "#00D4FF", items: ["CAPEX激增 → 先涨Vertiv(液冷)", "再涨电力设备", "最后涨核电/天然气", "电力受限 → 杀全链预期"] },
      ]}
    />
  );
}

/* ============================================================
   Day 7: Full Investment Map - 不等宽 + 投资传导链
   ============================================================ */
export function FullMapProductExplodedView() {
  return (
    <RealProductExploded
      title="AI基础设施层投资地图"
      subtitle="从需求端到供给端的完整链条"
      figNumber="图7-1"
      bgImage="/images/bg-fullmap.jpg"
      accentColor="#C3FF00"
      layers={[
        {
          num: "①",
          image: "/images/parts/server-rack.png",
          label: "需求端 · 云厂商 CAPEX",
          sublabel: "MSFT / GOOG / AMZN / META",
          metric: "NVIDIA FY2027 Q1收入$816亿",
          width: "68%",
          leftOffset: "6%",
          type: "large",
        },
        {
          num: "②",
          image: "/images/parts/gpu-die.png",
          label: "GPU · 当前紧缺",
          sublabel: "NVIDIA / AMD / 自研加速器",
          metric: "收入、指引与交付节奏验证",
          width: "38%",
          leftOffset: "16%",
          type: "large",
        },
        {
          num: "③",
          image: "/images/parts/silicon-interposer.png",
          label: "CoWoS · 台积电产能咽喉",
          sublabel: "大尺寸CoWoS仍是主流供给",
          metric: "精确利用率未披露",
          width: "58%",
          leftOffset: "9%",
          type: "medium",
        },
        {
          num: "④",
          image: "/images/parts/hbm-stacks.png",
          label: "HBM · SK海力士50%",
          sublabel: "SK海力士(50%) / 三星(40%) / 美光(10%)",
          metric: "每颗H100用6颗HBM3E",
          width: "52%",
          leftOffset: "11%",
          type: "medium",
        },
        {
          num: "⑤",
          image: "/images/parts/optical-module.png",
          label: "光模块 · 需求强",
          sublabel: "1.6T产品持续导入",
          metric: "统一利用率与ASP披露不足",
          width: "48%",
          leftOffset: "13%",
          type: "medium",
        },
        {
          num: "⑥",
          image: "/images/parts/gpu-cooler.png",
          label: "数据中心/能源 · 终极瓶颈",
          sublabel: "Equinix / Vertiv / Constellation(核电)",
          metric: "液冷15%→60% | 核电20年",
          width: "65%",
          leftOffset: "7%",
          type: "large",
        },
      ]}
      connections={[
        { from: 0, to: 1, label: "CAPEX", color: "#C3FF00" },
        { from: 1, to: 2, label: "封装需求", color: "#00D4FF" },
        { from: 1, to: 3, label: "HBM需求", color: "#A855F7" },
        { from: 2, to: 4, label: "网络互联", color: "#FF9500" },
        { from: 1, to: 5, label: "电力/散热", color: "#FF4444" },
      ]}
      infoBlocks={[
        { title: "核心链条", color: "#C3FF00", items: ["云厂商CAPEX → GPU(英伟达)", "→ CoWoS(台积电) → HBM(海力士)", "→ 光模块(中际旭创) → 数据中心/能源"] },
        { title: "投资条件反射", color: "#FF9500", items: ["听到AI新闻 → 10秒内定位产业链环节", "5分钟内判断验证/证伪", "先判断供需 → 再看价格 → 最后利润"] },
      ]}
    />
  );
}

/* ============================================================
   FinReport: Dashboard Exploded View
   ============================================================ */
export function FinDashboardProductExplodedView() {
  return (
    <RealProductExploded
      title="AI产业链财报监控仪表盘"
      subtitle="四层信号体系 · 从数据到决策"
      figNumber="图8-1"
      bgImage="/images/bg-fin-dashboard.jpg"
      accentColor="#FF9500"
      layers={[
        {
          num: "①",
          image: "/images/parts/network-switch.png",
          label: "【第一层】收入增长信号",
          sublabel: "跟踪: NVDA / TSM / SK海力士 / 中际旭创",
          metric: "增速>50%=强劲 | <20%=危险",
          width: "68%",
          leftOffset: "6%",
          type: "large",
        },
        {
          num: "②",
          image: "/images/parts/gpu-die.png",
          label: "【第二层】毛利率信号",
          sublabel: "英伟达毛利率>70% = 定价权 intact",
          metric: ">70%=定价权 intact | <65%=警惕",
          width: "55%",
          leftOffset: "11%",
          type: "medium",
        },
        {
          num: "③",
          image: "/images/parts/hbm-stacks.png",
          label: "【第三层】库存/CAPEX信号",
          sublabel: "台积电CoWoS利用率 / ASML book-to-bill",
          metric: "库存下降=供不应求 | FCF>20%=健康",
          width: "50%",
          leftOffset: "13%",
          type: "medium",
        },
        {
          num: "④",
          image: "/images/parts/silicon-interposer.png",
          label: "【第四层】验证结论",
          sublabel: "综合判断 → 超配/标配/低配决策",
          metric: "多层同向=强烈信号 | 矛盾=周期转换",
          width: "62%",
          leftOffset: "8%",
          type: "full",
        },
      ]}
      connections={[
        { from: 0, to: 1, label: "验证", color: "#FF9500" },
        { from: 1, to: 2, label: "验证", color: "#C3FF00" },
        { from: 2, to: 3, label: "综合", color: "#00D4FF" },
      ]}
      infoBlocks={[
        { title: "核心原则", color: "#FF9500", items: ["所有新闻/KOL观点最终都要在财报中验证", "财报是唯一可靠的锚点", "看变化方向/速度，而非绝对数字"] },
        { title: "三层验证法", color: "#C3FF00", items: ["第一层(收入增长) → 第二层(毛利率) → 第三层(库存/CAPEX)", "多层同向 = 强烈判断", "矛盾信号 = 周期正在转换"] },
      ]}
    />
  );
}

/* ============================================================
   FinReport: Cycle Position Exploded View
   ============================================================ */
export function FinCycleProductExplodedView() {
  return (
    <RealProductExploded
      title="财报数据周期定位"
      subtitle="三层验证法 · 周期阶段与财报信号对应"
      figNumber="图8-2"
      bgImage="/images/bg-fin-cycle.jpg"
      accentColor="#FF9500"
      layers={[
        {
          num: "①",
          image: "/images/parts/server-rack.png",
          label: "上升期 · 当前?",
          sublabel: "NVDA收入QoQ+50% / TSM CoWoS满产",
          metric: "超配GPU/HBM/CoWoS",
          width: "65%",
          leftOffset: "7%",
          type: "large",
        },
        {
          num: "②",
          image: "/images/parts/silicon-wafer.png",
          label: "顶部期 · 拐点预警",
          sublabel: "指引符合预期(非超预期) / 库存周转↑",
          metric: "减配高估值，增配现金",
          width: "55%",
          leftOffset: "11%",
          type: "medium",
        },
        {
          num: "③",
          image: "/images/parts/optical-module.png",
          label: "下降期 · 避险",
          sublabel: "连续2季负增长 / CAPEX下修 / FCF转负",
          metric: "低配GPU/光模块",
          width: "48%",
          leftOffset: "14%",
          type: "medium",
        },
        {
          num: "④",
          image: "/images/parts/pcb-board.png",
          label: "底部期 · 布局",
          sublabel: "CAPEX降至低位 / 先行者开始备货",
          metric: "布局设备商/存储(最先受益)",
          width: "58%",
          leftOffset: "10%",
          type: "full",
        },
      ]}
      connections={[
        { from: 0, to: 1, label: "过热", color: "#FF9500" },
        { from: 1, to: 2, label: "衰退", color: "#FF4444" },
        { from: 2, to: 3, label: "触底", color: "#00D4FF" },
      ]}
      infoBlocks={[
        { title: "三层验证法", color: "#FF9500", items: ["第一层(收入增长) → 第二层(毛利率) → 第三层(库存/CAPEX)", "多层同向 = 强烈判断", "矛盾信号 = 周期正在转换"] },
        { title: "危险信号组合", color: "#FF4444", items: ["①库存周转连续2季上升", "②台积电下修CoWoS指引", "③ASML book-to-bill<0.8", "④CAPEX增速<AI收入增速", "⑤光模块ASP连续2季下降"] },
      ]}
    />
  );
}
