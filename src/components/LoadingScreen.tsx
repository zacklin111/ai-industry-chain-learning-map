import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const SPINNER_TEXT_1 = "AI CHAIN · GPU · HBM · COWOS · TSMC · NVIDIA · ";
const SPINNER_TEXT_2 = "SUPPLY · DEMAND · PRICE · PROFIT · CYCLE · ";

function CircularSpinner({ text, size = 500, reverse = false, color = "#C3FF00" }: {
  text: string; size?: number; reverse?: boolean; color?: string;
}) {
  const chars = text.split('');
  const angleStep = (2 * Math.PI) / chars.length;

  return (
    <div style={{
      width: size,
      height: size,
      position: 'relative',
    }} className={reverse ? "spinner2" : "spinner1"}>
      {chars.map((char, i) => {
        const angle = reverse ? -(i * angleStep) : (i * angleStep);
        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              width: 20,
              height: size / 2,
              marginLeft: -10,
              transformOrigin: 'bottom center',
              transform: `rotate(${angle}rad)`,
              textAlign: 'center',
              fontFamily: "'Space Mono', monospace",
              fontSize: 15,
              fontWeight: 400,
              color,
              lineHeight: '1',
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [showButton, setShowButton] = useState(false);
  const [canClick, setCanClick] = useState(false);
  const cubeDataRef = useRef<{
    renderer: THREE.WebGLRenderer | null;
    mesh: THREE.Mesh | null;
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    raf: number | null;
    rotation: { speed1: number; speed2: number; rotation1: number; rotation2: number };
  }>({
    renderer: null, mesh: null, scene: null, camera: null, raf: null,
    rotation: { speed1: 0, speed2: 0, rotation1: 0, rotation2: 0 },
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, 1, 1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    const material = new THREE.MeshBasicMaterial({
      color: 0xC3FF00,
      wireframe: true,
      transparent: true,
      opacity: 0,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(0.85, 0.85, 0.85);
    scene.add(mesh);

    const data = cubeDataRef.current;
    data.renderer = renderer;
    data.mesh = mesh;
    data.scene = scene;
    data.camera = camera;

    // Animate
    const animate = () => {
      data.rotation.rotation1 += data.rotation.speed1 * 0.01;
      data.rotation.rotation2 += data.rotation.speed2 * 0.01;
      mesh.rotation.y = data.rotation.rotation1;
      mesh.rotation.x = data.rotation.rotation2;
      renderer.render(scene, camera);
      data.raf = requestAnimationFrame(animate);
    };
    data.raf = requestAnimationFrame(animate);

    // Intro timeline
    const tl = gsap.timeline();
    tl.to(material, { opacity: 1, duration: 0.8 })
      .to(mesh.scale, { x: 1, y: 1, z: 1, duration: 1, ease: "back.out(2)" }, 0.3)
      .to(data.rotation, { speed1: 1, duration: 1.2 }, 0.5)
      .to(data.rotation, { speed2: 0.5, duration: 1.2 }, 0.8);

    // Progress bar
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: "100%",
        duration: 2.5,
        ease: "power2.inOut",
        onComplete: () => {
          setShowButton(true);
          setTimeout(() => setCanClick(true), 300);
        },
      });
    }

    return () => {
      if (data.raf) cancelAnimationFrame(data.raf);
      tl.kill();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleEnter = useCallback(() => {
    if (!canClick) return;
    setCanClick(false);

    const data = cubeDataRef.current;
    if (!data.mesh || !data.renderer || !containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Speed up rotation
    tl.to(data.rotation, { speed1: 3, speed2: 3, duration: 0.6 })
      .to(data.rotation, { speed1: 5.5, speed2: 5.5, duration: 0.4 })
      .to(containerRef.current, { opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.2")
      .to(data.mesh.material, { opacity: 0, duration: 0.2 }, "-=0.3");
  }, [canClick, onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Cube + Spinner container */}
      <div style={{ position: 'relative', width: 500, height: 500 }}>
        {/* Three.js Cube */}
        <div
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
          }}
        />
        {/* Spinner Row 1 */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
          <CircularSpinner text={SPINNER_TEXT_1} size={480} color="#C3FF00" />
        </div>
        {/* Spinner Row 2 */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
          <div style={{ marginTop: 40 }}>
            <CircularSpinner text={SPINNER_TEXT_2} size={360} reverse color="#C3FF00" />
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute',
        bottom: 80,
        left: '10%',
        right: '10%',
        height: 2,
        background: '#1A1A1A',
      }}>
        <div
          ref={progressRef}
          style={{
            height: '100%',
            width: '0%',
            background: '#C3FF00',
          }}
        />
      </div>

      {/* Enter button */}
      <button
        onClick={handleEnter}
        style={{
          position: 'absolute',
          bottom: 120,
          left: '50%',
          transform: `translateX(-50%) ${showButton ? 'scale(1)' : 'scale(0.8)'}`,
          opacity: showButton ? 1 : 0,
          padding: '12px 48px',
          background: '#C3FF00',
          color: '#000000',
          border: 'none',
          fontFamily: "'Space Mono', monospace",
          fontSize: 14,
          letterSpacing: 3,
          cursor: canClick ? 'pointer' : 'default',
          transition: 'all 0.5s ease',
        }}
      >
        进入课程
      </button>

      {/* Loading label */}
      <div style={{
        position: 'absolute',
        bottom: 48,
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: "'Space Mono', monospace",
        fontSize: 11,
        color: '#7A7A7A',
        letterSpacing: 2,
      }}>
        AI CHAIN LEARNING SYSTEM
      </div>
    </div>
  );
}
