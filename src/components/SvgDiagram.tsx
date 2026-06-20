import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SvgDiagramProps {
  bgImage: string;
  figNumber: string;
  caption: string;
  accentColor?: string;
  children: React.ReactNode;
}

export default function SvgDiagram({ bgImage, figNumber, caption, accentColor = "#C3FF00", children }: SvgDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        margin: '40px 0',
        opacity: 0,
        border: `1px solid ${accentColor}20`,
        background: '#0A0A0A',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15,
      }} />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.8) 100%)',
      }} />

      {/* Corner accents */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 30, height: 30, borderTop: `2px solid ${accentColor}`, borderLeft: `2px solid ${accentColor}`, zIndex: 3 }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 30, height: 30, borderTop: `2px solid ${accentColor}`, borderRight: `2px solid ${accentColor}`, zIndex: 3 }} />
      <div style={{ position: 'absolute', bottom: 44, left: 0, width: 30, height: 30, borderBottom: `2px solid ${accentColor}`, borderLeft: `2px solid ${accentColor}`, zIndex: 3 }} />
      <div style={{ position: 'absolute', bottom: 44, right: 0, width: 30, height: 30, borderBottom: `2px solid ${accentColor}`, borderRight: `2px solid ${accentColor}`, zIndex: 3 }} />

      {/* SVG content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '24px 16px 0' }}>
        {children}
      </div>

      {/* Caption bar */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        background: 'rgba(0,0,0,0.6)',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        borderTop: `1px solid ${accentColor}20`,
      }}>
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          color: accentColor,
          letterSpacing: 1,
          flexShrink: 0,
        }}>
          {figNumber}
        </span>
        <span style={{
          fontFamily: "'Noto Sans SC', sans-serif",
          fontSize: 13,
          color: '#7A7A7A',
        }}>
          {caption}
        </span>
      </div>
    </div>
  );
}

// ---- GPU Layer Stack Diagram (Day 1) ----
export function GpuLayerDiagram() {
  const layers = [
    { name: '系统层', sub: 'AI集群 / 服务器节点', color: '#1A2B4A', detail: 'GPU x8 → NVSwitch → PCIe/CXL → CPU/网卡/存储', h: 48 },
    { name: '封装层', sub: 'CoWoS 2.5D 先进封装', color: '#1A3A4A', detail: 'HBM3E(6颗) + GPU Logic Die → 硅中介层', h: 52 },
    { name: '晶圆层', sub: 'Die 内部架构', color: '#1A2A2A', detail: 'SM / Tensor Core / NVLink I/O / L2 Cache / SerDes / HBM PHY', h: 56 },
    { name: 'HBM存储层', sub: '高带宽内存 3D 堆叠', color: '#2A1A3A', detail: 'DRAM Die x12 → TSV硅通孔垂直连接 → Base Die', h: 52 },
    { name: '物理制造层', sub: '从沙子到芯片', color: '#2A2A2A', detail: '设计(英伟达) → 光罩 → 光刻(ASML EUV) → 刻蚀/沉积 → 量测 → 切割 → 封装(台积电)', h: 48 },
  ];

  return (
    <SvgDiagram bgImage="/images/bg-gpu-layers.jpg" figNumber="图1-1" caption="GPU构成分层结构图（以H100为例）——从晶体管到AI集群的完整技术栈">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '8px 12px' }}>
        {layers.map((layer, i) => (
          <div key={i} style={{
            background: `${layer.color}CC`,
            border: '1px solid rgba(195,255,0,0.15)',
            borderRadius: 2,
            padding: '10px 16px',
            position: 'relative',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: 14, fontWeight: 600, color: '#C3FF00' }}>
                【{layer.name}】{layer.sub}
              </span>
            </div>
            <div style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: 12, color: '#AAAAAA', lineHeight: 1.5 }}>
              {layer.detail}
            </div>
            {i < layers.length - 1 && (
              <div style={{ textAlign: 'center', marginTop: 2 }}>
                <span style={{ color: '#C3FF00', fontSize: 12 }}>▼</span>
              </div>
            )}
          </div>
        ))}
        {/* H100 specs bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 8,
          marginTop: 8,
          padding: '10px 12px',
          background: 'rgba(195,255,0,0.05)',
          border: '1px solid rgba(195,255,0,0.15)',
        }}>
          {[
            { label: 'Die Size', value: '814 mm²' },
            { label: '晶体管', value: '800亿' },
            { label: '制程', value: '台积电4N' },
            { label: 'HBM容量', value: '80 GB' },
            { label: '总带宽', value: '>3 TB/s' },
            { label: 'TDP', value: '700W' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: '#7A7A7A', marginBottom: 2 }}>{item.label}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: '#C3FF00', fontWeight: 700 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </SvgDiagram>
  );
}

// ---- CoWoS Cross-section Diagram (Day 2) ----
export function CoWoSDiagram() {
  return (
    <SvgDiagram bgImage="/images/bg-cowos.jpg" figNumber="图2-1" caption="CoWoS先进封装结构详解——2.5D封装的核心在于硅中介层（Silicon Interposer）">
      <div style={{ padding: '8px 12px' }}>
        {/* Cross-section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
          marginBottom: 16,
        }}>
          {/* Heat Spreader */}
          <div style={{ width: '80%', height: 16, background: '#3A3A3A', borderRadius: '2px 2px 0 0', textAlign: 'center', fontSize: 9, color: '#888', lineHeight: '16px' }}>
            散热盖 (Heat Spreader)
          </div>
          {/* HBM + GPU */}
          <div style={{ display: 'flex', gap: 4, width: '80%', justifyContent: 'center' }}>
            <div style={{ flex: 1, background: '#4A3080', padding: '6px 4px', textAlign: 'center', fontSize: 11, color: '#FFFFFF', border: '1px solid rgba(195,255,0,0.2)' }}>
              <div style={{ fontWeight: 600 }}>HBM3E</div>
              <div style={{ fontSize: 9, color: '#AAA' }}>堆叠内存</div>
            </div>
            <div style={{ flex: 2, background: '#2A4060', padding: '8px 4px', textAlign: 'center', fontSize: 12, color: '#FFFFFF', border: '1px solid rgba(195,255,0,0.2)' }}>
              <div style={{ fontWeight: 600, color: '#C3FF00' }}>GPU Logic Die</div>
              <div style={{ fontSize: 10, color: '#AAA' }}>H100 / B200 / MI300X</div>
              <div style={{ fontSize: 9, color: '#888', marginTop: 2 }}>Die Size: 814mm² | 台积电4N制程</div>
            </div>
            <div style={{ flex: 1, background: '#4A3080', padding: '6px 4px', textAlign: 'center', fontSize: 11, color: '#FFFFFF', border: '1px solid rgba(195,255,0,0.2)' }}>
              <div style={{ fontWeight: 600 }}>HBM3E</div>
              <div style={{ fontSize: 9, color: '#AAA' }}>堆叠内存</div>
            </div>
          </div>
          {/* Silicon Interposer */}
          <div style={{ width: '85%', height: 20, background: '#1A4A6A', textAlign: 'center', fontSize: 10, color: '#C3FF00', lineHeight: '20px', border: '1px solid rgba(195,255,0,0.3)', fontWeight: 600 }}>
            硅中介层 (Silicon Interposer) — 台积电核心工艺，布线密度是基板10倍
          </div>
          {/* Organic Substrate */}
          <div style={{ width: '90%', height: 18, background: '#3A3020', textAlign: 'center', fontSize: 10, color: '#AAAAAA', lineHeight: '18px', borderRadius: '0 0 2px 2px' }}>
            有机基板 (Organic Substrate) — 连接 PCB
          </div>
        </div>

        {/* Key numbers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 12px', border: '1px solid rgba(195,255,0,0.1)' }}>
            <div style={{ fontSize: 11, color: '#C3FF00', fontWeight: 600, marginBottom: 6 }}>为什么CoWoS是瓶颈</div>
            {['大尺寸CoWoS仍是主流供给', '精确利用率未披露', '跟踪先进封装扩产', '跟踪设备到位', '反转看客户交期'].map((item, i) => (
              <div key={i} style={{ fontSize: 12, color: '#AAAAAA', padding: '2px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 4, height: 4, background: '#C3FF00', borderRadius: '50%' }} />
                {item}
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 12px', border: '1px solid rgba(195,255,0,0.1)' }}>
            <div style={{ fontSize: 11, color: '#C3FF00', fontWeight: 600, marginBottom: 6 }}>经济账</div>
            {['公司业绩会披露', '数据周期: 2026 Q1', '当前状态: 紧缺', '证据置信度: 中高', '不以供应链估算冒充事实'].map((item, i) => (
              <div key={i} style={{ fontSize: 12, color: '#AAAAAA', padding: '2px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 4, height: 4, background: '#C3FF00', borderRadius: '50%' }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SvgDiagram>
  );
}

// ---- HBM Supply Chain Diagram (Day 3) ----
export function HbmSupplyDiagram() {
  return (
    <SvgDiagram bgImage="/images/bg-hbm.jpg" figNumber="图3-1" caption="HBM高带宽内存3D堆叠结构与供应链动态">
      <div style={{ padding: '8px 12px' }}>
        {/* 3D Stack */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: '#C3FF00', fontWeight: 600, marginBottom: 8, textAlign: 'center' }}>HBM 3D 堆叠结构</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              {['DRAM Die 12', 'DRAM Die 11', 'DRAM Die 10', '...', 'DRAM Die 2', 'DRAM Die 1'].map((die, i) => (
                <div key={i} style={{
                  width: '70%',
                  height: 20,
                  background: `rgba(138, 43, 227, ${0.4 + i * 0.05})`,
                  border: '1px solid rgba(195,255,0,0.15)',
                  textAlign: 'center',
                  fontSize: 10,
                  color: '#FFFFFF',
                  lineHeight: '20px',
                }}>
                  {die}
                </div>
              ))}
              <div style={{
                width: '70%',
                height: 24,
                background: '#4A3080',
                border: '1px solid #C3FF0040',
                textAlign: 'center',
                fontSize: 11,
                color: '#C3FF00',
                lineHeight: '24px',
                fontWeight: 600,
              }}>
                Base Die (Logic)
              </div>
            </div>
          </div>

          {/* Supply chain flow */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: '#C3FF00', fontWeight: 600, marginBottom: 8, textAlign: 'center' }}>HBM 供应链动态</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[
                { text: 'AI芯片需求爆发 (GPT-5/Claude 4训练)', color: '#8B2BE3' },
                { text: 'HBM需求暴增 (每颗H100用6颗HBM3E)', color: '#6A3FC0' },
                { text: 'DRAM产能转向HBM (设备切换需6个月)', color: '#4A50A0' },
                { text: '标准DRAM供应减少 → DDR5涨价', color: '#3060A0' },
                { text: 'PC/手机成本上升，但AI服务器利润覆盖', color: '#2070A0' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: '100%', background: `${step.color}40`, border: `1px solid ${step.color}60`, padding: '6px 8px', fontSize: 11, color: '#FFFFFF', borderRadius: 2 }}>
                    {step.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HBM3E specs */}
        <div style={{ background: 'rgba(195,255,0,0.05)', border: '1px solid rgba(195,255,0,0.15)', padding: '8px 12px', textAlign: 'center', marginBottom: 12, fontSize: 13, color: '#C3FF00', fontFamily: "'Space Mono', monospace" }}>
          HBM3E: 12层堆叠 | 带宽 1.2TB/s | 容量 24-36GB/颗 | TSV硅通孔垂直连接
        </div>

        {/* Three giants competition */}
        <div style={{ fontSize: 12, color: '#C3FF00', fontWeight: 600, marginBottom: 8 }}>HBM 三巨头竞争格局</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, marginBottom: 8 }}>
          {['厂商', '技术地位', 'HBM3E进度', '市场份额'].map((h, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '6px 4px', fontSize: 10, color: '#888', textAlign: 'center', fontWeight: 600 }}>{h}</div>
          ))}
          {['SK海力士', '技术领先', '率先量产', '~50%'].map((c, i) => (
            <div key={`sk-${i}`} style={{ background: 'rgba(195,255,0,0.08)', padding: '6px 4px', fontSize: 11, color: '#C3FF00', textAlign: 'center' }}>{c}</div>
          ))}
          {['三星', '追赶中', '验证中', '~40%'].map((c, i) => (
            <div key={`ss-${i}`} style={{ background: 'rgba(255,255,255,0.03)', padding: '6px 4px', fontSize: 11, color: '#AAAAAA', textAlign: 'center' }}>{c}</div>
          ))}
          {['美光', '第三', '追赶', '~10%'].map((c, i) => (
            <div key={`mc-${i}`} style={{ background: 'rgba(255,255,255,0.03)', padding: '6px 4px', fontSize: 11, color: '#AAAAAA', textAlign: 'center' }}>{c}</div>
          ))}
        </div>

        {/* Price comparison */}
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, background: 'rgba(255,100,0,0.08)', border: '1px solid rgba(255,100,0,0.2)', padding: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: '#FF6400' }}>HBM3E单价</div>
            <div style={{ fontSize: 14, color: '#FF6400', fontWeight: 700 }}>DDR5的5-7x</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(195,255,0,0.05)', border: '1px solid rgba(195,255,0,0.15)', padding: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: '#C3FF00' }}>毛利率</div>
            <div style={{ fontSize: 14, color: '#C3FF00', fontWeight: 700 }}>60%+</div>
          </div>
        </div>
      </div>
    </SvgDiagram>
  );
}

// ---- Optical Module & Network Diagram (Day 4) ----
export function OpticalNetworkDiagram() {
  return (
    <SvgDiagram bgImage="/images/bg-optical.jpg" figNumber="图4-1" caption="光模块产业链与Scale-up/Scale-out网络架构对比">
      <div style={{ padding: '8px 12px' }}>
        {/* Supply chain */}
        <div style={{ fontSize: 12, color: '#C3FF00', fontWeight: 600, marginBottom: 8 }}>光模块产业链</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 12, flexWrap: 'wrap' }}>
          {[
            { name: '光芯片', sub: 'II-VI/Lumentum/源杰', color: '#2A4060' },
            { name: '→', color: 'transparent' },
            { name: '光器件', sub: 'TOSA/ROSA', color: '#2A5060' },
            { name: '→', color: 'transparent' },
            { name: 'DSP电芯片', sub: 'Marvell/Broadcom', color: '#2A6060' },
            { name: '→', color: 'transparent' },
            { name: '光模块封装', sub: '中际旭创/光迅/新易盛', color: '#1A6A4A', highlight: true },
            { name: '→', color: 'transparent' },
            { name: '交换机', sub: 'Arista/Cisco', color: '#2A6040' },
            { name: '→', color: 'transparent' },
            { name: '云厂商DC', sub: '微软/谷歌/亚马逊', color: '#2A5040' },
          ].map((item, i) => (
            <div key={i} style={{
              background: item.color === 'transparent' ? 'transparent' : `${item.color}CC`,
              padding: item.color === 'transparent' ? '0' : '5px 8px',
              fontSize: 10,
              color: item.highlight ? '#C3FF00' : '#FFFFFF',
              border: item.highlight ? '1px solid #C3FF0040' : '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center',
              fontWeight: item.highlight ? 600 : 400,
            }}>
              <div>{item.name}</div>
              {item.sub && <div style={{ fontSize: 8, color: '#888' }}>{item.sub}</div>}
            </div>
          ))}
        </div>

        {/* Scale-up vs Scale-out */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div style={{ background: 'rgba(195,255,0,0.05)', border: '1px solid rgba(195,255,0,0.2)', padding: '10px 12px' }}>
            <div style={{ fontSize: 12, color: '#C3FF00', fontWeight: 600, marginBottom: 8 }}>Scale-up 网络 (GPU互联)</div>
            {[
              { label: '协议', value: 'NVLink / NVSwitch' },
              { label: '带宽', value: '900 GB/s' },
              { label: '拥有者', value: '英伟达 (垄断)' },
              { label: '范围', value: '机架内/相邻机架' },
              { label: '竞争', value: 'UEC联盟 (博通/Intel/AMD)' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, padding: '3px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color: '#888' }}>{item.label}</span>
                <span style={{ color: '#FFFFFF' }}>{item.value}</span>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.2)', padding: '10px 12px' }}>
            <div style={{ fontSize: 12, color: '#00D4FF', fontWeight: 600, marginBottom: 8 }}>Scale-out 网络 (服务器互联)</div>
            {[
              { label: '协议', value: 'InfiniBand / 以太网' },
              { label: '带宽', value: '400-800 Gbps' },
              { label: '拥有者', value: '英伟达(IB) / 开放(以太网)' },
              { label: '范围', value: '数据中心级' },
              { label: '竞争', value: '超以太网联盟 UEC' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, padding: '3px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ color: '#888' }}>{item.label}</span>
                <span style={{ color: '#FFFFFF' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Speed roadmap */}
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 11, color: '#888' }}>光模块速率演进:</div>
          {[
            { rate: '400G', year: '2023', color: '#888' },
            { rate: '800G', year: '2024', color: '#C3FF00' },
            { rate: '1.6T', year: '2025', color: '#00D4FF' },
            { rate: '3.2T', year: '2026-27', color: '#A855F7' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: item.color, fontWeight: 600 }}>{item.rate}</div>
              <div style={{ fontSize: 8, color: '#666' }}>{item.year}</div>
            </div>
          ))}
        </div>
      </div>
    </SvgDiagram>
  );
}

// ---- Foundry & Equipment Pyramid (Day 5) ----
export function FoundryPyramidDiagram() {
  return (
    <SvgDiagram bgImage="/images/bg-fab.jpg" figNumber="图5-1" caption="晶圆代工与设备产业链——ASML位于金字塔顶端">
      <div style={{ padding: '8px 12px' }}>
        {/* Pyramid */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginBottom: 16 }}>
          {/* Top - ASML */}
          <div style={{ width: '35%', background: '#C3FF0020', border: '1px solid #C3FF00', padding: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: '#C3FF00', fontWeight: 700 }}>ASML</div>
            <div style={{ fontSize: 10, color: '#AAA' }}>EUV光刻机全球唯一供应商</div>
            <div style={{ fontSize: 11, color: '#C3FF00', fontFamily: "'Space Mono', monospace" }}>单价 $2-3亿 | 订单排到2027</div>
          </div>
          {/* Level 2 - Equipment */}
          <div style={{ width: '55%', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', padding: '6px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#00D4FF', fontWeight: 600 }}>设备商</div>
            <div style={{ fontSize: 10, color: '#AAA' }}>东京电子(刻蚀) | SCREEN(清洗) | KLA(量测) | Lam Research(沉积)</div>
          </div>
          {/* Level 3 - Foundry */}
          <div style={{ width: '75%', background: 'rgba(195,255,0,0.06)', border: '1px solid rgba(195,255,0,0.2)', padding: '6px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#C3FF00', fontWeight: 600 }}>晶圆代工</div>
            <div style={{ fontSize: 10, color: '#AAA' }}>台积电(55%毛利率/3nm $2万+/片) | 三星 | Intel</div>
          </div>
          {/* Level 4 - Chip Design */}
          <div style={{ width: '90%', background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', padding: '6px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#A855F7', fontWeight: 600 }}>芯片设计</div>
            <div style={{ fontSize: 10, color: '#AAA' }}>英伟达 | AMD | 博通 | 苹果 | 高通 | 华为海思</div>
          </div>
          {/* Bottom - Terminal */}
          <div style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#FFFFFF', fontWeight: 600 }}>终端应用</div>
            <div style={{ fontSize: 10, color: '#AAA' }}>云厂商AI服务器 | 手机/PC | 汽车 | IoT</div>
          </div>
        </div>

        {/* Key insight */}
        <div style={{ background: 'rgba(195,255,0,0.05)', borderLeft: '3px solid #C3FF00', padding: '8px 12px', fontSize: 12, color: '#AAAAAA' }}>
          <span style={{ color: '#C3FF00', fontWeight: 600 }}>设备商"卖水人"逻辑：</span>无论台积电、三星、Intel谁赢，都需要ASML的设备。设备周期滞后芯片周期6-12个月。
        </div>
      </div>
    </SvgDiagram>
  );
}

// ---- Data Center & Energy Chain (Day 6) ----
export function DataCenterEnergyDiagram() {
  return (
    <SvgDiagram bgImage="/images/bg-datacenter.jpg" figNumber="图6-1" caption={'数据中心与能源产业链——从「地产逻辑」转向「能源逻辑」'}>
      <div style={{ padding: '8px 12px' }}>
        {/* Energy flow chain */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 16 }}>
          {[
            { name: '需求验证', sub: 'NVIDIA FY2027 Q1', metric: '收入$816亿 | YoY +85%', color: '#2A4A6A' },
            { name: '↓', sub: '', metric: '', color: 'transparent' },
            { name: '数据中心运营商', sub: 'Equinix/DLR/万国数据', metric: '机柜租金/托管费', color: '#2A5A5A' },
            { name: '↓', sub: '', metric: '', color: 'transparent' },
            { name: '散热系统', sub: 'Vertiv/英维克/施耐德', metric: '液冷渗透率 15%→60%', color: '#1A6A4A' },
            { name: '↓', sub: '', metric: '', color: 'transparent' },
            { name: '电力设备', sub: '变压器/UPS/开关柜', metric: 'AI机柜 50-100kW', color: '#3A6A2A' },
            { name: '↓', sub: '', metric: '', color: 'transparent' },
            { name: '公用事业公司', sub: '核电/天然气/可再生能源', metric: '微软签20年核电合约', color: '#5A5A2A' },
          ].map((item, i) => (
            <div key={i} style={{
              background: item.color === 'transparent' ? 'transparent' : `${item.color}CC`,
              padding: item.color === 'transparent' ? '2px' : '8px 12px',
              textAlign: item.color === 'transparent' ? 'center' : 'left',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              {item.color !== 'transparent' && (
                <>
                  <div>
                    <span style={{ fontSize: 13, color: '#C3FF00', fontWeight: 600 }}>{item.name}</span>
                    <span style={{ fontSize: 10, color: '#888', marginLeft: 8 }}>{item.sub}</span>
                  </div>
                  <span style={{ fontSize: 11, color: '#C3FF00', fontFamily: "'Space Mono', monospace" }}>{item.metric}</span>
                </>
              )}
              {item.color === 'transparent' && <span style={{ color: '#C3FF00', fontSize: 12 }}>↓</span>}
            </div>
          ))}
        </div>

        {/* Key metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            { label: '传统机柜功率', value: '5-10 kW', color: '#888' },
            { label: 'AI机柜功率', value: '50-100 kW', color: '#FF6B35' },
            { label: '10万卡集群功耗', value: '100 MW', color: '#FF4444' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', padding: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: '#666', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 16, color: item.color, fontWeight: 700, fontFamily: "'Space Mono', monospace" }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </SvgDiagram>
  );
}

// ---- Full Investment Map (Day 7) ----
export function FullInvestmentMapDiagram() {
  const chain = [
    { level: '需求端', items: ['AI基础设施收入'], detail: 'NVIDIA FY2027 Q1收入$816亿 | YoY +85%', color: '#2A4A6A' },
    { level: '→', items: [], detail: '', color: 'transparent' },
    { level: 'GPU+网络', items: ['NVIDIA','AMD/自研'], detail: '当前紧缺 | 收入与交付节奏验证', color: '#1A4A3A' },
    { level: '先进封装', items: ['台积电CoWoS'], detail: '紧缺 | 精确利用率未披露', color: '#2A4A4A' },
    { level: 'HBM存储', items: ['SK海力士','三星','美光'], detail: '紧缺 | HBM4量产验证', color: '#2A1A4A' },
    { level: '光模块/网络', items: ['1.6T高速互连'], detail: '需求强 | 披露不足', color: '#3A3A2A' },
    { level: '数据中心/能源', items: ['Vertiv','Equinix','核电'], detail: '地产逻辑→能源逻辑', color: '#4A2A2A' },
  ];

  const cycleData = [
    { segment: 'GPU', priceDriver: '英伟达定价权', supply: '紧缺', cycle: '高位震荡', indicator: '台积电CoWoS产能利用率' },
    { segment: 'HBM', priceDriver: 'DRAM转产比例', supply: '紧缺', cycle: '供不应求', indicator: 'SK海力士产能指引' },
    { segment: 'CoWoS', priceDriver: '台积电产能利用率', supply: '紧缺', cycle: '价格上升', indicator: '设备交付周期' },
    { segment: '光模块', priceDriver: '1.6T认证与出货', supply: '需求强', cycle: '披露不足', indicator: 'ASP与DSP供应' },
    { segment: '成熟制程', priceDriver: '产能利用率', supply: '趋平衡', cycle: 'UMC利用率79%', indicator: '利用率与22nm占比' },
  ];

  return (
    <SvgDiagram bgImage="/images/bg-fullmap.jpg" figNumber="图7-1" caption="AI基础设施层投资地图——从需求端到供给端的完整链条">
      <div style={{ padding: '8px 12px' }}>
        {/* Investment chain */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16, justifyContent: 'center' }}>
          {chain.map((item, i) => (
            <div key={i} style={{
              background: item.color === 'transparent' ? 'transparent' : `${item.color}CC`,
              padding: item.color === 'transparent' ? '4px 2px' : '8px 10px',
              border: item.color === 'transparent' ? 'none' : '1px solid rgba(195,255,0,0.15)',
              textAlign: 'center',
              minWidth: item.color === 'transparent' ? 20 : 90,
            }}>
              <div style={{ fontSize: 12, color: '#C3FF00', fontWeight: 600 }}>{item.level}</div>
              {item.items.map((it, j) => (
                <div key={j} style={{ fontSize: 10, color: '#FFFFFF' }}>{it}</div>
              ))}
              {item.detail && <div style={{ fontSize: 8, color: '#888', marginTop: 2 }}>{item.detail}</div>}
            </div>
          ))}
        </div>

        {/* Price cycle quick reference */}
        <div style={{ fontSize: 12, color: '#C3FF00', fontWeight: 600, marginBottom: 8 }}>第一周价格周期速查表</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10 }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                {['环节', '价格由什么决定', '供需状态', '当前周期', '领先指标'].map((h, i) => (
                  <th key={i} style={{ padding: '5px 6px', color: '#C3FF00', textAlign: 'left', fontWeight: 600, borderBottom: '1px solid rgba(195,255,0,0.2)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cycleData.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                  <td style={{ padding: '4px 6px', color: '#C3FF00', fontWeight: 600 }}>{row.segment}</td>
                  <td style={{ padding: '4px 6px', color: '#AAAAAA' }}>{row.priceDriver}</td>
                  <td style={{ padding: '4px 6px', color: row.supply === '紧缺' ? '#FF4444' : row.supply === '平衡' ? '#C3FF00' : '#00D4FF' }}>{row.supply}</td>
                  <td style={{ padding: '4px 6px', color: '#FFFFFF' }}>{row.cycle}</td>
                  <td style={{ padding: '4px 6px', color: '#888' }}>{row.indicator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SvgDiagram>
  );
}

// ---- Financial Dashboard (FinReport) ----
export function FinDashboardDiagram() {
  const layers = [
    { name: '收入增长层', color: '#C3FF00', items: ['数据中心收入QoQ增速', '客户集中度变化', '新订单/ backlog'], check: '增速>50%=强劲; 增速<20%=危险' },
    { name: '毛利率层', color: '#00D4FF', items: ['毛利率变化趋势', '定价权信号', '成本传导顺畅度'], check: '>70%=定价权 intact; <65%=警惕' },
    { name: '库存/CAPEX层', color: '#FF9500', items: ['库存周转天数', 'CAPEX/收入比', 'FCF转化率'], check: '库存下降=供不应求; FCF>20%=健康' },
    { name: '验证结论层', color: '#A855F7', items: ['三层信号一致性', '周期位置判定', '投资策略调整'], check: '多层同向=强烈信号; 矛盾=周期转换' },
  ];

  return (
    <SvgDiagram bgImage="/images/bg-fin-dashboard.jpg" figNumber="图8-1" caption="AI产业链财报监控仪表盘——四层信号体系" accentColor="#FF9500">
      <div style={{ padding: '8px 12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
          {layers.map((layer, i) => (
            <div key={i} style={{
              background: `${layer.color}08`,
              border: `1px solid ${layer.color}30`,
              padding: '10px 12px',
            }}>
              <div style={{ fontSize: 12, color: layer.color, fontWeight: 600, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, background: layer.color, borderRadius: 2 }} />
                {layer.name}
              </div>
              {layer.items.map((item, j) => (
                <div key={j} style={{ fontSize: 11, color: '#AAAAAA', padding: '2px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 3, height: 3, background: layer.color, opacity: 0.5 }} />
                  {item}
                </div>
              ))}
              <div style={{ marginTop: 6, padding: '4px 6px', background: 'rgba(0,0,0,0.3)', fontSize: 10, color: layer.color, opacity: 0.8 }}>
                {layer.check}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SvgDiagram>
  );
}

// ---- Financial Cycle Position (FinReport) ----
export function FinCyclePositionDiagram() {
  const stages = [
    { name: '上升期', color: '#C3FF00', revenue: '收入增速>50%', margin: '毛利率扩张>70%', inventory: '库存周转下降, CAPEX/收入<35%', strategy: '超配GPU/HBM/CoWoS' },
    { name: '顶部期', color: '#FF9500', revenue: '增速放缓但>0%', margin: '毛利率高位持平', inventory: '库存周转开始上升', strategy: '减配高估值, 增配现金' },
    { name: '下降期', color: '#FF4444', revenue: '收入增速<0%', margin: '毛利率收缩', inventory: '库存积压, CAPEX下修', strategy: '低配GPU/光模块' },
    { name: '底部期', color: '#00D4FF', revenue: '负增长但降幅收窄', margin: '毛利率触底', inventory: '库存去化, FCF恢复', strategy: '布局下一周期' },
  ];

  return (
    <SvgDiagram bgImage="/images/bg-fin-cycle.jpg" figNumber="图8-2" caption="财报数据周期定位实战——三层验证法" accentColor="#FF9500">
      <div style={{ padding: '8px 12px' }}>
        {/* Three layers */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
          {[
            { name: '第一层', sub: '收入增长', color: '#C3FF00', items: ['收入增速', '指引变化', '客户集中度'] },
            { name: '第二层', sub: '毛利率', color: '#00D4FF', items: ['毛利率趋势', '定价权', '成本传导'] },
            { name: '第三层', sub: '库存/CAPEX', color: '#FF9500', items: ['库存周转', 'CAPEX计划', 'FCF健康度'] },
          ].map((layer, i) => (
            <div key={i} style={{
              background: `${layer.color}10`,
              border: `1px solid ${layer.color}30`,
              padding: '10px 12px',
              textAlign: 'center',
              minWidth: 90,
            }}>
              <div style={{ fontSize: 10, color: layer.color, fontFamily: "'Space Mono', monospace", marginBottom: 4 }}>{layer.name}</div>
              <div style={{ fontSize: 13, color: '#FFFFFF', fontWeight: 600, marginBottom: 6 }}>{layer.sub}</div>
              {layer.items.map((item, j) => (
                <div key={j} style={{ fontSize: 10, color: '#888', padding: '1px 0' }}>{item}</div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ fontSize: 11, color: '#888', textAlign: 'center', marginBottom: 12, fontStyle: 'italic' }}>
          三层同向 → 强烈判断 | 出现矛盾 → 周期正在转换
        </div>

        {/* Cycle stages table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10 }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                {['周期阶段', '收入信号', '毛利率信号', '库存/CAPEX信号', '投资策略'].map((h, i) => (
                  <th key={i} style={{ padding: '5px 6px', color: '#FF9500', textAlign: 'left', fontWeight: 600, borderBottom: '1px solid rgba(255,149,0,0.2)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stages.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                  <td style={{ padding: '4px 6px', color: row.color, fontWeight: 600 }}>{row.name}</td>
                  <td style={{ padding: '4px 6px', color: '#AAAAAA' }}>{row.revenue}</td>
                  <td style={{ padding: '4px 6px', color: '#AAAAAA' }}>{row.margin}</td>
                  <td style={{ padding: '4px 6px', color: '#AAAAAA' }}>{row.inventory}</td>
                  <td style={{ padding: '4px 6px', color: '#FFFFFF', fontWeight: 500 }}>{row.strategy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SvgDiagram>
  );
}
