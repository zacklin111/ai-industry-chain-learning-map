import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ImageDiagramProps {
  src: string;
  caption: string;
  figNumber?: string;
  accentColor?: string;
}

export default function ImageDiagram({ src, caption, figNumber, accentColor = "#C3FF00" }: ImageDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 30, scale: 0.98 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        margin: '32px 0',
        opacity: 0,
      }}
    >
      <div
        style={{
          position: 'relative',
          background: '#FFFFFF',
          border: `1px solid ${accentColor}20`,
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.boxShadow = `0 0 30px ${accentColor}15`;
          el.style.borderColor = `${accentColor}40`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.boxShadow = 'none';
          el.style.borderColor = `${accentColor}20`;
        }}
      >
        {/* Corner accents */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 30,
          height: 30,
          borderTop: `2px solid ${accentColor}`,
          borderLeft: `2px solid ${accentColor}`,
          zIndex: 2,
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 30,
          height: 30,
          borderTop: `2px solid ${accentColor}`,
          borderRight: `2px solid ${accentColor}`,
          zIndex: 2,
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 30,
          height: 30,
          borderBottom: `2px solid ${accentColor}`,
          borderLeft: `2px solid ${accentColor}`,
          zIndex: 2,
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 30,
          height: 30,
          borderBottom: `2px solid ${accentColor}`,
          borderRight: `2px solid ${accentColor}`,
          zIndex: 2,
        }} />

        {/* Image */}
        {!loaded && (
          <div style={{
            width: '100%',
            height: 300,
            background: '#1A1A1A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              color: '#7A7A7A',
            }}>
              LOADING...
            </div>
          </div>
        )}
        <img
          src={src}
          alt={caption}
          onLoad={() => setLoaded(true)}
          style={{
            width: '100%',
            display: 'block',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        />

        {/* Caption bar */}
        <div style={{
          background: '#000000',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          borderTop: `1px solid ${accentColor}30`,
        }}>
          {figNumber && (
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: accentColor,
              letterSpacing: 1,
              flexShrink: 0,
            }}>
              {figNumber}
            </span>
          )}
          <span style={{
            fontFamily: "'Noto Sans SC', sans-serif",
            fontSize: 13,
            color: '#7A7A7A',
          }}>
            {caption}
          </span>
        </div>
      </div>
    </div>
  );
}
