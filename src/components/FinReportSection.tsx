import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { finReportData } from '../data';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   FinReportSection - 财报实战
   总分总结构：
   1. 总（概览总结）
   2. 分（详细表格）
   3. 总（总结回顾）
   ============================================================ */

export default function FinReportSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const titleEl = titleRef.current;
    if (titleEl) {
      gsap.fromTo(titleEl,
        { yPercent: 50, opacity: 0 },
        {
          yPercent: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: titleEl, start: "top 90%", end: "top 40%", scrub: 1 },
        }
      );
    }

    const anims = sectionRef.current.querySelectorAll('.fin-anim');
    anims.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (sectionRef.current?.contains(st.trigger as Element)) st.kill();
      });
    };
  }, []);

  const accentColor = "#FF9500";

  return (
    <section
      id="finreport"
      ref={sectionRef}
      style={{
        background: '#000000',
        padding: '120px 5vw 80px',
        position: 'relative',
      }}
    >
      {/* Background image */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 500,
        backgroundImage: 'url(/images/fin-report-dashboard.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.05,
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), transparent)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div ref={titleRef} style={{ marginBottom: 64, opacity: 0 }}>
          <div style={{
            fontFamily: "'Bungee', cursive",
            fontSize: 'clamp(48px, 10vw, 140px)',
            lineHeight: 0.9,
            color: 'transparent',
            WebkitTextStroke: `2.5px ${accentColor}`,
            marginBottom: 16,
          }}>
            FIN REPORT
          </div>
          <h2 style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: 8,
          }}>
            {finReportData.title}：{finReportData.subtitle}
          </h2>
          <p style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontSize: 16,
            color: '#7A7A7A',
            maxWidth: 700,
          }}>
            {finReportData.coreInsight}
          </p>
        </div>

        {/* ====================== 第一部分：总（概览总结） ====================== */}

        {/* Three-layer verification overview */}
        <div className="fin-anim" style={{ marginBottom: 48 }}>
          <h3 style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 13,
            color: accentColor,
            letterSpacing: 3,
            textTransform: 'uppercase',
            marginBottom: 20,
          }}>
            核心框架：三层验证法
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
          }}>
            {[
              { layer: '第一层', name: '收入增长', color: '#C3FF00', desc: '收入增速、指引变化、客户集中度', check: '增速>50%=强劲; <20%=危险' },
              { layer: '第二层', name: '毛利率', color: '#00D4FF', desc: '毛利率变化、定价权、成本传导', check: '>70%=定价权 intact; <65%=警惕' },
              { layer: '第三层', name: '库存/CAPEX', color: accentColor, desc: '库存周转、CAPEX计划、FCF健康度', check: '库存下降=供不应求; FCF>20%=健康' },
            ].map((item, i) => (
              <div key={i} style={{
                background: '#111111',
                border: `1px solid ${item.color}30`,
                padding: 24,
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 11,
                  color: item.color,
                  letterSpacing: 2,
                  marginBottom: 8,
                }}>
                  {item.layer}
                </div>
                <div style={{
                  fontFamily: "'Noto Sans SC', sans-serif",
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginBottom: 8,
                }}>
                  {item.name}
                </div>
                <div style={{
                  fontSize: 13,
                  color: '#7A7A7A',
                  lineHeight: 1.5,
                  marginBottom: 8,
                }}>
                  {item.desc}
                </div>
                <div style={{
                  fontSize: 11,
                  color: item.color,
                  opacity: 0.8,
                  background: 'rgba(0,0,0,0.3)',
                  padding: '4px 8px',
                }}>
                  {item.check}
                </div>
              </div>
            ))}
          </div>
          <p style={{
            marginTop: 20,
            fontSize: 14,
            color: '#7A7A7A',
            fontStyle: 'italic',
            textAlign: 'center',
          }}>
            {finReportData.keyInsights[3]}
          </p>
        </div>

        {/* Key Insights - summary */}
        <div className="fin-anim" style={{ marginBottom: 64 }}>
          <h3 style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 13,
            color: accentColor,
            letterSpacing: 3,
            textTransform: 'uppercase',
            marginBottom: 20,
          }}>
            核心认知
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {finReportData.keyInsights.slice(0, 2).map((insight, i) => (
              <div key={i} style={{
                borderLeft: `3px solid ${accentColor}`,
                background: `${accentColor}08`,
                padding: '14px 18px',
              }}>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: '#FFFFFF' }}>{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ====================== 第二部分：分（详细表格） ====================== */}

        {/* Divider */}
        <div className="fin-anim" style={{ marginBottom: 48, textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 13,
            color: accentColor,
            letterSpacing: 4,
          }}>
            —— 详细内容 ——
          </div>
        </div>

        {/* Table 1: Company Financial Data */}
        <div className="fin-anim" style={{ marginBottom: 64 }}>
          <h3 style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: 20,
          }}>
            各公司财报看哪些数据？
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  {finReportData.tables[0].headers.map((h, i) => (
                    <th key={i} style={{ color: accentColor, minWidth: i === 0 ? 120 : 200 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {finReportData.tables[0].rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{
                        fontSize: 13,
                        lineHeight: 1.6,
                        color: ci === 0 ? accentColor : '#FFFFFF',
                        fontWeight: ci === 0 ? 500 : 400,
                      }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2: Financial Formulas */}
        <div className="fin-anim" style={{ marginBottom: 64 }}>
          <h3 style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: 20,
          }}>
            财报核心公式与计算逻辑
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  {finReportData.tables[1].headers.map((h, i) => (
                    <th key={i} style={{ color: accentColor, minWidth: i === 0 ? 220 : 250 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {finReportData.tables[1].rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{
                        fontSize: 13,
                        lineHeight: 1.6,
                        color: ci === 0 ? accentColor : '#FFFFFF',
                        fontWeight: ci === 0 ? 500 : 400,
                      }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 3: Cycle Position Signals */}
        <div className="fin-anim" style={{ marginBottom: 64 }}>
          <h3 style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: 20,
          }}>
            周期位置与财报信号的对应关系
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  {finReportData.tables[2].headers.map((h, i) => (
                    <th key={i} style={{ color: accentColor, minWidth: 140 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {finReportData.tables[2].rows.map((row, ri) => (
                  <tr key={ri} style={{
                    background: ri === 0 ? 'rgba(195,255,0,0.05)' : undefined,
                  }}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{
                        fontSize: 13,
                        lineHeight: 1.6,
                        color: ci === 0 ? (ri === 0 ? '#C3FF00' : ri === 1 ? '#FF9500' : ri === 2 ? '#FF4444' : '#00D4FF') : '#FFFFFF',
                        fontWeight: ci === 0 ? 600 : 400,
                      }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Case Study */}
        {finReportData.cases.map((caseItem, ci) => (
          <div key={ci} className="fin-anim" style={{ marginBottom: 64 }}>
            <h3 style={{
              fontFamily: "'Noto Sans SC', sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: 20,
            }}>
              {caseItem.title}
            </h3>
            <div style={{
              background: '#111111',
              border: '1px solid #1A1A1A',
              padding: '28px 32px',
            }}>
              {caseItem.steps.map((step, si) => (
                <div key={si} style={{
                  display: 'flex',
                  gap: 16,
                  marginBottom: si < caseItem.steps.length - 1 ? 16 : 0,
                  paddingBottom: si < caseItem.steps.length - 1 ? 16 : 0,
                  borderBottom: si < caseItem.steps.length - 1 ? '1px solid #1A1A1A' : 'none',
                }}>
                  <div style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 12,
                    color: accentColor,
                    flexShrink: 0,
                    marginTop: 2,
                  }}>
                    L{si + 1}
                  </div>
                  <p style={{
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: '#FFFFFF',
                  }}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Danger Signals */}
        <div className="fin-anim" style={{ marginBottom: 64 }}>
          <h3 style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color: '#FF4444',
            marginBottom: 20,
          }}>
            危险信号组合：出现任意2个 = 周期拐点临近
          </h3>
          <div style={{
            borderLeft: '3px solid #FF4444',
            background: 'rgba(255,68,68,0.05)',
            padding: '20px 24px',
          }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {finReportData.keyInsights[2].split('：')[1].split('⑤').map((item, i) => {
                if (i === 0) {
                  const parts = item.split('④');
                  return parts.map((part, j) => (
                    <li key={`${i}-${j}`} style={{
                      fontSize: 14,
                      lineHeight: 1.8,
                      color: '#FFFFFF',
                      paddingLeft: 16,
                      position: 'relative',
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        top: 6,
                        width: 6,
                        height: 6,
                        background: '#FF4444',
                        borderRadius: 1,
                      }} />
                      {j === 0 ? '①②③④' : '⑤'}{part.trim()}
                    </li>
                  ));
                }
                return (
                  <li key={i} style={{
                    fontSize: 14,
                    lineHeight: 1.8,
                    color: '#FFFFFF',
                    paddingLeft: 16,
                    position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      top: 6,
                      width: 6,
                      height: 6,
                      background: '#FF4444',
                      borderRadius: 1,
                    }} />
                    ⑤{item.trim()}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Table 4: Tracking Calendar */}
        <div className="fin-anim" style={{ marginBottom: 64 }}>
          <h3 style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: 20,
          }}>
            财报跟踪日历与频率
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  {finReportData.tables[3].headers.map((h, i) => (
                    <th key={i} style={{ color: accentColor }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {finReportData.tables[3].rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci} style={{
                        fontSize: 13,
                        lineHeight: 1.6,
                        color: ci === 0 ? accentColor : '#FFFFFF',
                        fontWeight: ci === 0 ? 500 : 400,
                      }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ====================== 第三部分：总（总结回顾） ====================== */}

        <div className="fin-anim" style={{ marginBottom: 48, textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 13,
            color: accentColor,
            letterSpacing: 4,
          }}>
            —— 总结回顾 ——
          </div>
        </div>

        {/* Summary: Dashboard & Cycle Position - pure tables, no images */}
        <div className="fin-anim" style={{ marginBottom: 64 }}>
          <h3 style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: 20,
          }}>
            财报监控仪表盘：四层信号体系
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 12,
            marginBottom: 16,
          }}>
            {[
              { layer: '第一层', name: '收入增长信号', color: '#C3FF00', items: ['数据中心收入QoQ增速', '客户集中度变化', '新订单/backlog'], check: '增速>50%=强劲; 增速<20%=危险' },
              { layer: '第二层', name: '毛利率信号', color: '#00D4FF', items: ['毛利率变化趋势', '定价权信号', '成本传导顺畅度'], check: '>70%=定价权 intact; <65%=警惕' },
              { layer: '第三层', name: '库存/CAPEX信号', color: accentColor, items: ['库存周转天数', 'CAPEX/收入比', 'FCF转化率'], check: '库存下降=供不应求; FCF>20%=健康' },
              { layer: '第四层', name: '验证结论', color: '#A855F7', items: ['三层信号一致性', '周期位置判定', '投资策略调整'], check: '多层同向=强烈信号; 矛盾=周期转换' },
            ].map((item, i) => (
              <div key={i} style={{
                background: `${item.color}08`,
                border: `1px solid ${item.color}30`,
                padding: '14px 16px',
              }}>
                <div style={{ fontSize: 12, color: item.color, fontWeight: 600, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, background: item.color, borderRadius: 2 }} />
                  {item.layer}: {item.name}
                </div>
                {item.items.map((it, j) => (
                  <div key={j} style={{ fontSize: 11, color: '#AAAAAA', padding: '2px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 3, height: 3, background: item.color, opacity: 0.5 }} />
                    {it}
                  </div>
                ))}
                <div style={{ marginTop: 6, padding: '4px 6px', background: 'rgba(0,0,0,0.3)', fontSize: 10, color: item.color, opacity: 0.8 }}>
                  {item.check}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary: Cycle Position Table */}
        <div className="fin-anim" style={{ marginBottom: 64 }}>
          <h3 style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: 20,
          }}>
            财报数据周期定位：三层验证法
          </h3>
          <div style={{ overflowX: 'auto', marginBottom: 16 }}>
            <table className="data-table">
              <thead>
                <tr>
                  {['周期阶段', '收入信号', '毛利率信号', '库存/CAPEX信号', '投资策略'].map((h, i) => (
                    <th key={i} style={{ color: accentColor, minWidth: 140 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { stage: '上升期', color: '#C3FF00', revenue: '增速>50%', margin: '毛利率>70%', inventory: '库存下降/FCF>20%', strategy: '超配GPU/HBM/CoWoS' },
                  { stage: '顶部期', color: '#FF9500', revenue: '增速放缓>0%', margin: '毛利率持平', inventory: '库存周转开始上升', strategy: '减配高估值/增配现金' },
                  { stage: '下降期', color: '#FF4444', revenue: '增速<0%', margin: '毛利率收缩', inventory: '库存积压/CAPEX下修', strategy: '低配GPU/光模块' },
                  { stage: '底部期', color: '#00D4FF', revenue: '负增长降幅收窄', margin: '毛利率触底', inventory: '库存去化/FCF恢复', strategy: '布局设备商/存储' },
                ].map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontSize: 13, color: row.color, fontWeight: 600 }}>{row.stage}</td>
                    <td style={{ fontSize: 13, color: '#AAAAAA' }}>{row.revenue}</td>
                    <td style={{ fontSize: 13, color: '#AAAAAA' }}>{row.margin}</td>
                    <td style={{ fontSize: 13, color: '#AAAAAA' }}>{row.inventory}</td>
                    <td style={{ fontSize: 13, color: '#FFFFFF', fontWeight: 500 }}>{row.strategy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Final summary */}
        <div className="fin-anim" style={{
          border: `1px solid ${accentColor}20`,
          background: `${accentColor}05`,
          padding: '24px 32px',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 12,
            color: accentColor,
            letterSpacing: 2,
            marginBottom: 12,
          }}>
            总结
          </div>
          <p style={{
            fontSize: 14,
            color: '#FFFFFF',
            lineHeight: 1.8,
            maxWidth: 700,
            margin: '0 auto',
          }}>
            所有新闻、KOL观点、供应链传闻最终都要在财报数据中交叉验证。
            财报是判断周期位置的最可靠锚点。
            看财报时不是"看数字大小"，而是"看数字的变化方向和变化速度"。
            三层验证法：收入增长 → 毛利率 → 库存/CAPEX，多层同向时做出强烈判断，出现矛盾时周期正在转换。
          </p>
        </div>
      </div>
    </section>
  );
}
