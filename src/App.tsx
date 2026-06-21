import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import LoadingScreen from './components/LoadingScreen';
import CircularSpinner from './components/CircularSpinner';
import FinReportSection from './components/FinReportSection';
import {
  OpticalProductExplodedView,
  FoundryProductExplodedView,
  DataCenterProductExplodedView,
  FullMapProductExplodedView,
} from './components/RealProductExploded';
import {
  GpuProductExplodedView,
  CoWoSProductExplodedView,
  HbmProductExplodedView,
} from './components/RealProductExploded';
import { weeks, quickRefData } from './data';

gsap.registerPlugin(ScrollTrigger);

// ---- Navbar ----
function Navbar({ activeWeek, onNavClick }: { activeWeek: number; onNavClick: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const donateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close donate popup when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (donateRef.current && !donateRef.current.contains(e.target as Node)) {
        setDonateOpen(false);
      }
    };
    if (donateOpen) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [donateOpen]);

  const links = [
    { label: 'W1 基础设施', id: 'week1' },
    { label: '财报实战', id: 'finreport' },
    { label: 'W2 模型应用', id: 'week2' },
    { label: 'W3 供需周期', id: 'week3' },
    { label: 'W4 实战整合', id: 'week4' },
    { label: '速查手册', id: 'quickref' },
  ];

  return (
    <nav
      className="no-print"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5vw',
        background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        transition: 'all 0.4s ease',
        borderBottom: scrolled ? '1px solid #1A1A1A' : '1px solid transparent',
      }}
    >
      <div
        style={{
          fontFamily: "'Bungee', cursive",
          fontSize: 20,
          color: '#C3FF00',
          cursor: 'pointer',
          letterSpacing: 1,
        }}
        onClick={() => onNavClick('hero')}
      >
        AI CHAIN
      </div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="hidden md:flex">
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => onNavClick(link.id)}
            className="nav-link"
            style={{
              background: 'none',
              border: 'none',
              color: (link.id.startsWith('week') ? activeWeek === parseInt(link.id.replace(/\D/g, '')) : false) ? '#C3FF00' : '#7A7A7A',
              fontFamily: "'Noto Sans SC', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              padding: '4px 0',
            }}
          >
            {link.label}
          </button>
        ))}

        {/* Donate Button */}
        <div
          ref={donateRef}
          style={{ position: 'relative' }}
          onMouseLeave={() => setDonateOpen(false)}
        >
          <button
            onMouseEnter={() => setDonateOpen(true)}
            style={{
              background: 'none',
              border: '1px solid #C3FF0040',
              color: '#C3FF00',
              fontFamily: "'Noto Sans SC', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              padding: '4px 14px',
              borderRadius: 2,
              transition: 'all 0.3s ease',
              letterSpacing: 1,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#C3FF0015';
              e.currentTarget.style.borderColor = '#C3FF0080';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'none';
              e.currentTarget.style.borderColor = '#C3FF0040';
            }}
          >
            打赏
          </button>

          {/* QR Code Popup */}
          <div
            onMouseEnter={() => setDonateOpen(true)}
            style={{
              position: 'absolute',
              top: 'calc(100% + 12px)',
              right: 0,
              width: 200,
              background: '#FFFFFF',
              borderRadius: 8,
              padding: 10,
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              opacity: donateOpen ? 1 : 0,
              transform: donateOpen ? 'translateY(0)' : 'translateY(-8px)',
              pointerEvents: donateOpen ? 'auto' : 'none',
              transition: 'all 0.3s ease',
              zIndex: 2000,
            }}
          >
            {/* Arrow */}
            <div style={{
              position: 'absolute',
              top: -6,
              right: 20,
              width: 12,
              height: 12,
              background: '#FFFFFF',
              transform: 'rotate(45deg)',
            }} />
            <img
              src="/images/donate-qr.jpg"
              alt="打赏二维码"
              style={{
                width: '100%',
                display: 'block',
                borderRadius: 4,
              }}
            />
            <div style={{
              textAlign: 'center',
              fontSize: 12,
              color: '#666',
              marginTop: 8,
              fontFamily: "'Noto Sans SC', sans-serif",
            }}>
              打赏一杯咖啡
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ---- Week Bar ----
function WeekBar({ activeWeek, onWeekClick }: { activeWeek: number; onWeekClick: (w: number) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const introEl = document.getElementById('intro');
      if (introEl) {
        const rect = introEl.getBoundingClientRect();
        setVisible(rect.bottom < 64);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    { week: 1, label: 'W1 基础设施层', color: '#C3FF00' },
    { week: 2, label: 'W2 模型应用层', color: '#00D4FF' },
    { week: 3, label: 'W3 供需周期', color: '#FF6B35' },
    { week: 4, label: 'W4 实战整合', color: '#A855F7' },
  ];

  return (
    <div
      className="no-print"
      style={{
        position: 'fixed',
        top: 64,
        left: 0,
        right: 0,
        height: 48,
        background: 'rgba(0,0,0,0.9)',
        borderBottom: '1px solid #1A1A1A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        zIndex: 999,
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.4s ease',
        backdropFilter: 'blur(8px)',
        overflowX: 'auto',
        padding: '0 20px',
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.week}
          className={`week-tab week-tab-w${tab.week} ${activeWeek === tab.week ? 'active' : ''}`}
          onClick={() => onWeekClick(tab.week)}
          style={{
            background: 'none',
            border: 'none',
            color: activeWeek === tab.week ? tab.color : '#7A7A7A',
            fontFamily: "'Noto Sans SC', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ---- Hero Section ----
function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll('.hero-char');
    gsap.fromTo(chars,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.04,
        ease: "power2.out", delay: 0.3,
      }
    );
  }, []);

  const titleChars = "AI产业链".split('');
  const subChars = "学习地图".split('');

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '0 5vw',
      }}
    >
      {/* Background network image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/images/supply-chain-network.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.06,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 1400,
      }}>
        {/* Left: Title */}
        <div ref={titleRef} style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(48px, 10vw, 140px)',
            lineHeight: 1.1,
            color: 'transparent',
            WebkitTextStroke: '2.5px #C3FF00',
            marginBottom: 8,
          }}>
            {titleChars.map((c, i) => (
              <span key={i} className="hero-char" style={{ display: 'inline-block' }}>{c}</span>
            ))}
          </div>
          <div style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(32px, 6vw, 80px)',
            lineHeight: 1.15,
            color: 'transparent',
            WebkitTextStroke: '2px #C3FF00',
          }}>
            {subChars.map((c, i) => (
              <span key={i} className="hero-char" style={{ display: 'inline-block' }}>{c}</span>
            ))}
          </div>
          <div style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontSize: 18,
            color: '#7A7A7A',
            marginTop: 24,
            fontWeight: 300,
            letterSpacing: 1,
          }}>
            30天高密度学习路径 · 建立供需-价格-利润直觉
          </div>
        </div>

        {/* Right: Spinner */}
        <div className="hidden lg:block" style={{ marginLeft: 60 }}>
          <div style={{ position: 'relative', width: 380, height: 380 }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <CircularSpinner text="SUPPLY · DEMAND · PRICE · PROFIT · CYCLE · ROTATION · " size={360} color="#C3FF00" duration={100} />
            </div>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <CircularSpinner text="GPU · HBM · TSMC · NVIDIA · COWOS · ASML · " size={260} reverse color="#C3FF00" duration={80} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        animation: 'pulse-down 2s ease infinite',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A7A7A" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          color: '#7A7A7A',
          marginTop: 4,
          letterSpacing: 1,
        }}>
          向下滚动
        </div>
      </div>
    </section>
  );
}

// ---- Intro Section ----
function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll('.intro-anim');
    els.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    });
  }, []);

  const cards = [
    {
      title: "每个环节只问三个问题",
      body: "谁在买？谁在卖？价格由什么决定？",
    },
    {
      title: "建立\"如果…会怎样\"的条件反射",
      body: "如果英伟达HBM断供，谁死谁活？如果台积电涨价20%，谁承受谁转嫁？",
    },
    {
      title: "用一张图+一张表记住每个环节",
      body: "拒绝长篇大论，精准掌握核心",
    },
  ];

  return (
    <section
      id="intro"
      ref={sectionRef}
      style={{
        background: '#0A0A0A',
        padding: '120px 5vw',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="intro-anim" style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 13,
          color: '#C3FF00',
          letterSpacing: 3,
          textTransform: 'uppercase',
          marginBottom: 16,
        }}>
          核心原则
        </div>
        <h2 className="intro-anim" style={{
          fontFamily: "'Noto Sans SC', sans-serif",
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 700,
          color: '#FFFFFF',
          lineHeight: 1.15,
          marginBottom: 16,
        }}>
          建立"供需-价格-利润"的直觉
        </h2>
        <p className="intro-anim" style={{
          fontFamily: "'Noto Sans SC', sans-serif",
          fontSize: 18,
          color: '#7A7A7A',
          marginBottom: 64,
        }}>
          不是工程师级的技术细节，而是投资人级的产业链认知
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {cards.map((card, i) => (
            <div
              key={i}
              className="intro-anim"
              style={{
                background: '#111111',
                border: '1px solid #1A1A1A',
                padding: 32,
              }}
            >
              <h4 style={{
                fontFamily: "'Noto Sans SC', sans-serif",
                fontSize: 18,
                fontWeight: 500,
                color: '#C3FF00',
                marginBottom: 12,
              }}>
                {card.title}
              </h4>
              <p style={{
                fontFamily: "'Noto Sans SC', sans-serif",
                fontSize: 14,
                color: '#FFFFFF',
                lineHeight: 1.7,
              }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Supply Chain Diagram (SVG) ----
function SupplyChainDiagram({ nodes, color = "#C3FF00" }: {
  nodes: { label: string; sub?: string }[];
  color?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;
    const rects = svgRef.current.querySelectorAll('.diagram-rect');
    const texts = svgRef.current.querySelectorAll('.diagram-text');
    const lines = svgRef.current.querySelectorAll('.diagram-line');

    gsap.fromTo(rects,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1, scale: 1, duration: 0.5, stagger: 0.1,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      }
    );
    gsap.fromTo(texts,
      { opacity: 0 },
      {
        opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.3,
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      }
    );
    gsap.fromTo(lines,
      { strokeDasharray: 200, strokeDashoffset: 200 },
      {
        strokeDashoffset: 0, duration: 0.8, stagger: 0.15, delay: 0.2,
        ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      }
    );
  }, [nodes, color]);

  const nodeWidth = 160;
  const nodeHeight = 60;
  const gap = 30;
  const totalWidth = nodes.length * nodeWidth + (nodes.length - 1) * gap;
  const startX = (800 - totalWidth) / 2;
  const centerY = 80;

  return (
    <div ref={containerRef} style={{ width: '100%', overflowX: 'auto', margin: '32px 0' }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 800 ${centerY + nodeHeight + 30}`}
        style={{ minWidth: 600, width: '100%', maxWidth: 800, margin: '0 auto', display: 'block' }}
      >
        {/* Connecting lines */}
        {nodes.slice(0, -1).map((_, i) => (
          <line
            key={`line-${i}`}
            className="diagram-line"
            x1={startX + (i + 1) * (nodeWidth + gap) - gap}
            y1={centerY + nodeHeight / 2}
            x2={startX + (i + 1) * (nodeWidth + gap)}
            y2={centerY + nodeHeight / 2}
            stroke={color}
            strokeWidth={2}
            opacity={0.5}
          />
        ))}
        {/* Arrow heads */}
        {nodes.slice(0, -1).map((_, i) => (
          <polygon
            key={`arrow-${i}`}
            points={`${startX + (i + 1) * (nodeWidth + gap) - 4},${centerY + nodeHeight / 2 - 4} ${startX + (i + 1) * (nodeWidth + gap) - 4},${centerY + nodeHeight / 2 + 4} ${startX + (i + 1) * (nodeWidth + gap) + 2},${centerY + nodeHeight / 2}`}
            fill={color}
            opacity={0.5}
          />
        ))}
        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={`node-${i}`}>
            <rect
              className="diagram-rect"
              x={startX + i * (nodeWidth + gap)}
              y={centerY}
              width={nodeWidth}
              height={nodeHeight}
              fill={color}
              rx={0}
            />
            <text
              className="diagram-text"
              x={startX + i * (nodeWidth + gap) + nodeWidth / 2}
              y={centerY + nodeHeight / 2 - 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#000000"
              fontFamily="'Noto Sans SC', sans-serif"
              fontSize={13}
              fontWeight={600}
            >
              {node.label}
            </text>
            {node.sub && (
              <text
                className="diagram-text"
                x={startX + i * (nodeWidth + gap) + nodeWidth / 2}
                y={centerY + nodeHeight / 2 + 16}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#000000"
                fontFamily="'Space Mono', monospace"
                fontSize={9}
                opacity={0.7}
              >
                {node.sub}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

// ---- Day Card ----
function DayCard({ day, weekColor }: { day: typeof weeks[0]['days'][0]; weekColor: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 85%", toggleActions: "play none none none" },
      }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      id={`day-${day.day}`}
      style={{
        marginBottom: 80,
        opacity: 0,
      }}
    >
      {/* Day meta */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 24,
        marginBottom: 32,
      }}>
        {/* Left column */}
        <div style={{ flex: '0 0 auto', minWidth: 200, maxWidth: 300 }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 12,
            color: weekColor,
            letterSpacing: 2,
            marginBottom: 8,
            textTransform: 'uppercase',
          }}>
            DAY {String(day.day).padStart(2, '0')}
          </div>
          <h3 style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontSize: 'clamp(22px, 3vw, 32px)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.25,
            marginBottom: 12,
          }}>
            {day.title}
          </h3>
          <p style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontSize: 15,
            fontStyle: 'italic',
            color: '#7A7A7A',
            marginBottom: 16,
            lineHeight: 1.6,
          }}>
            {day.coreInsight}
          </p>
          <span className="pill pill-accent" style={{ background: weekColor }}>
            {day.duration}
          </span>
          {day.updatedAt && (
            <div style={{ marginTop: 12, fontSize: 12, color: weekColor }}>
              数据截至 {day.updatedAt}
            </div>
          )}
        </div>

        {/* Right column - Content */}
        <div style={{ flex: 1, minWidth: 300 }}>
          {/* Image if present */}
          {day.image && (
            <div style={{
              marginBottom: 24,
              border: '1px solid #1A1A1A',
              overflow: 'hidden',
            }}>
              <img
                src={day.image}
                alt={day.title}
                style={{
                  width: '100%',
                  height: 220,
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          )}

          {/* Tables */}
          {day.tables.map((table, ti) => (
            <div key={ti} style={{ marginBottom: 24, overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    {table.headers.map((h, hi) => (
                      <th key={hi} style={{ color: weekColor }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {/* Key insights */}
          {day.keyInsights.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <h4 style={{
                fontFamily: "'Noto Sans SC', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: weekColor,
                marginBottom: 12,
                letterSpacing: 1,
              }}>
                关键洞察
              </h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {day.keyInsights.map((insight, ii) => (
                  <li key={ii} style={{
                    position: 'relative',
                    paddingLeft: 16,
                    marginBottom: 10,
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: '#FFFFFF',
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      top: 8,
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: weekColor,
                    }} />
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {day.sources && day.sources.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <h4 style={{
                fontFamily: "'Noto Sans SC', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: weekColor,
                marginBottom: 12,
              }}>
                数据来源与证据等级
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 8,
              }}>
                {day.sources.map((source) => (
                  <a
                    key={`${source.title}-${source.evidenceType}`}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: '#FFFFFF',
                      border: '1px solid #242424',
                      padding: 12,
                      textDecoration: 'none',
                    }}
                  >
                    <div style={{ color: weekColor, fontSize: 12 }}>
                      {source.evidenceType} · 置信度{source.confidence}
                    </div>
                    <div style={{ fontSize: 12, marginTop: 4 }}>{source.title}</div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Investment rotation */}
          {day.investmentRotation.length > 0 && (
            <div style={{
              borderLeft: `3px solid ${weekColor}`,
              background: `${weekColor}10`,
              padding: '16px 20px',
            }}>
              <h4 style={{
                fontFamily: "'Noto Sans SC', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: weekColor,
                marginBottom: 10,
                letterSpacing: 1,
              }}>
                投资轮动逻辑
              </h4>
              {day.investmentRotation.map((rot, ri) => (
                <p key={ri} style={{
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: '#FFFFFF',
                  marginBottom: 6,
                }}>
                  → {rot}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- Week Section ----
function WeekSection({ week }: { week: typeof weeks[0] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    gsap.fromTo(titleRef.current,
      { yPercent: 60, opacity: 0 },
      {
        yPercent: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 90%",
          end: "top 40%",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section
      id={`week${week.week}`}
      ref={sectionRef}
      style={{
        background: '#000000',
        padding: '120px 5vw 80px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Section Header */}
        <div ref={titleRef} style={{ marginBottom: 80, opacity: 0 }}>
          <div style={{
            fontFamily: "'Bungee', cursive",
            fontSize: 'clamp(60px, 12vw, 180px)',
            lineHeight: 0.9,
            color: 'transparent',
            WebkitTextStroke: `2.5px ${week.color}`,
            marginBottom: 8,
          }}>
            WEEK 0{week.week}
          </div>
          <h2 style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: 12,
          }}>
            {week.title}
          </h2>
          <p style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontSize: 20,
            color: week.color,
            fontWeight: 500,
          }}>
            {week.subtitle}
          </p>
        </div>

        {/* Supply chain diagram for Week 1 */}
        {week.week === 1 && (
          <SupplyChainDiagram
            color={week.color}
            nodes={[
              { label: "云厂商", sub: "CAPEX 2000亿+" },
              { label: "英伟达", sub: "GPU+网络" },
              { label: "台积电", sub: "CoWoS" },
              { label: "SK海力士", sub: "HBM" },
            ]}
          />
        )}

        {/* Week 2 hierarchy diagram */}
        {week.week === 2 && (
          <SupplyChainDiagram
            color={week.color}
            nodes={[
              { label: "基础模型", sub: "OpenAI/Google" },
              { label: "云厂商", sub: "Azure/GCP/AWS" },
              { label: "企业应用", sub: "Copilot/法律" },
              { label: "消费应用", sub: "搜索/创作" },
            ]}
          />
        )}

        {/* Day cards with diagrams for Week 1 */}
        {week.days.map((day) => (
          <div key={day.day}>
            <DayCard day={day} weekColor={week.color} />
            {/* Week 1 Real Product Exploded View diagrams */}
            {week.week === 1 && day.day === 1 && <GpuProductExplodedView />}
            {week.week === 1 && day.day === 2 && <CoWoSProductExplodedView />}
            {week.week === 1 && day.day === 3 && <HbmProductExplodedView />}
            {week.week === 1 && day.day === 4 && <OpticalProductExplodedView />}
            {week.week === 1 && day.day === 5 && <FoundryProductExplodedView />}
            {week.week === 1 && day.day === 6 && <DataCenterProductExplodedView />}
            {week.week === 1 && day.day === 7 && <FullMapProductExplodedView />}
          </div>
        ))}
      </div>
    </section>
  );
}

// ---- Quick Reference Section ----
function QuickReferenceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const rows = sectionRef.current.querySelectorAll('.qr-row');
    gsap.fromTo(rows,
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0, duration: 0.5, stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <section
      id="quickref"
      ref={sectionRef}
      style={{
        background: '#000000',
        padding: '120px 5vw',
        position: 'relative',
      }}
    >
      {/* Header image */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '40%',
        height: 400,
        backgroundImage: 'url(/images/ai-chip-closeup.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.08,
        maskImage: 'linear-gradient(to left, rgba(0,0,0,1), transparent)',
        WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1), transparent)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Title */}
        <div style={{ marginBottom: 64 }}>
          <div style={{
            fontFamily: "'Bungee', cursive",
            fontSize: 'clamp(48px, 10vw, 140px)',
            lineHeight: 0.9,
            color: 'transparent',
            WebkitTextStroke: '2.5px #C3FF00',
            marginBottom: 16,
          }}>
            QUICK REF
          </div>
          <h2 style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 700,
            color: '#FFFFFF',
          }}>
            关键数字记忆卡
          </h2>
        </div>

        {/* Reference rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {quickRefData.map((item, i) => (
            <div
              key={i}
              className="qr-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 32,
                padding: '28px 0',
                borderBottom: '1px solid #1A1A1A',
                background: i % 2 === 0 ? 'transparent' : '#0D0D0D',
                margin: '0 -24px',
                paddingLeft: 24,
                paddingRight: 24,
              }}
            >
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 400,
                color: '#C3FF00',
                minWidth: 140,
                flexShrink: 0,
                letterSpacing: -1,
              }}>
                {item.number}
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{
                  fontFamily: "'Noto Sans SC', sans-serif",
                  fontSize: 16,
                  fontWeight: 500,
                  color: '#FFFFFF',
                  marginBottom: 4,
                }}>
                  {item.meaning}
                </div>
                <div style={{
                  fontFamily: "'Noto Sans SC', sans-serif",
                  fontSize: 14,
                  color: '#7A7A7A',
                }}>
                  {item.significance}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Footer ----
function Footer() {
  return (
    <footer style={{
      background: '#000000',
      borderTop: '1px solid #1A1A1A',
      padding: '60px 5vw',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 32,
      }}>
        <div>
          <div style={{
            fontFamily: "'Bungee', cursive",
            fontSize: 24,
            color: '#C3FF00',
            marginBottom: 8,
          }}>
            AI CHAIN
          </div>
          <p style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontSize: 14,
            color: '#7A7A7A',
          }}>
            AI产业链投资人认知体系 · 30天高密度学习路径
          </p>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {['W1 基础设施', 'W2 模型应用', 'W3 供需周期', 'W4 实战整合', '速查手册'].map((label) => (
            <span key={label} style={{
              fontFamily: "'Noto Sans SC', sans-serif",
              fontSize: 13,
              color: '#7A7A7A',
            }}>
              {label}
            </span>
          ))}
        </div>
      </div>
      {/* Disclaimer & AI Attribution */}
      <div style={{
        maxWidth: 800,
        margin: '40px auto 0',
        padding: '20px 24px',
        border: '1px solid #2A2A2A',
        background: '#0D0D0D',
      }}>
        <div style={{
          fontSize: 11,
          color: '#555',
          lineHeight: 1.8,
          textAlign: 'center',
          fontFamily: "'Noto Sans SC', sans-serif",
        }}>
          <p style={{ marginBottom: 8 }}>
            <span style={{ color: '#FF4444', fontWeight: 600 }}>免责声明：</span>
            本网站内容仅供学习参考，不构成任何投资建议。投资有风险，入市需谨慎。过往表现不代表未来收益，读者应独立判断并承担投资风险。
          </p>
          <p>
            <span style={{ color: '#C3FF00', fontWeight: 600 }}>内容声明：</span>
            本网站所有内容均由 AI 生成，仅供参考学习使用。内容中的数据、观点和分析可能存在误差或过时，请以官方渠道和最新财报数据为准。
          </p>
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: 32,
        fontFamily: "'Space Mono', monospace",
        fontSize: 12,
        color: '#7A7A7A',
      }}>
        © 2026 AI Chain Learning System
      </div>
    </footer>
  );
}

// ---- Main App ----
export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeWeek, setActiveWeek] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      lerp: 0.05,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [loading]);

  // Set up scroll triggers for week sections
  useEffect(() => {
    if (loading) return;

    weeks.forEach((week) => {
      const el = document.getElementById(`week${week.week}`);
      if (el) {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveWeek(week.week),
          onEnterBack: () => setActiveWeek(week.week),
        });
      }
    });

    // Refresh ScrollTrigger after content loads
    ScrollTrigger.refresh();
  }, [loading]);

  const handleNavClick = useCallback((id: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(`#${id}`, { offset: -120 });
    }
  }, []);

  const handleWeekClick = useCallback((week: number) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(`#week${week}`, { offset: -120 });
    }
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <Navbar activeWeek={activeWeek} onNavClick={handleNavClick} />
        <WeekBar activeWeek={activeWeek} onWeekClick={handleWeekClick} />

        <main>
          <HeroSection />
          <IntroSection />

          {weeks.map((week) => (
            <div key={week.week}>
              <WeekSection week={week} />
              {week.week === 1 && <FinReportSection />}
            </div>
          ))}

          <QuickReferenceSection />
        </main>

        <Footer />
      </div>
    </>
  );
}
