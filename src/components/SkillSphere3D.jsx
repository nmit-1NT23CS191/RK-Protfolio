import React, { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const SKILLS = [
  'Python', 'Java', 'JavaScript', 'HTML/CSS',
  'AWS', 'GCP', 'Docker', 'Jenkins',
  'SonarQube', 'Trivy', 'Terraform',
  'Machine Learning', 'NLP', 'EDA',
  'SQL', 'MongoDB', 'React', 'Three.js',
  'CI/CD', 'DevOps', 'Git', 'Linux',
];

const COLORS = ['#00E5FF', '#8B5CF6', '#00FF88', '#FF6B6B', '#FFA500', '#FF69B4'];

function SkillTag({ text, position, color, speed }) {
  const groupRef = useRef();
  const initialPos = useMemo(() => new THREE.Vector3(...position), [position]);
  const [opacity, setOpacity] = useState(0.8);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime() * speed;

    // Orbit around center
    const x = initialPos.x * Math.cos(t) - initialPos.z * Math.sin(t);
    const z = initialPos.x * Math.sin(t) + initialPos.z * Math.cos(t);
    const y = initialPos.y + Math.sin(t * 0.7) * 0.1;

    groupRef.current.position.set(x, y, z);

    // Depth-based fade
    const depth = (z + 2.5) / 5;
    setOpacity(0.3 + depth * 0.7);
  });

  return (
    <group ref={groupRef} position={position}>
      <Html
        center
        distanceFactor={6}
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            color,
            opacity,
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textShadow: `0 0 8px ${color}40`,
            transition: 'opacity 0.15s ease',
          }}
        >
          {text}
        </span>
      </Html>
    </group>
  );
}

function SkillSphere() {
  const tags = useMemo(() => {
    const count = SKILLS.length;
    const radius = 2;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    return SKILLS.map((skill, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;

      const x = Math.cos(theta) * radiusAtY * radius;
      const z = Math.sin(theta) * radiusAtY * radius;

      return {
        text: skill,
        position: [x, y * radius, z],
        color: COLORS[i % COLORS.length],
        speed: 0.12 + (i % 5) * 0.03,
      };
    });
  }, []);

  return (
    <group>
      {tags.map((tag, idx) => (
        <SkillTag key={idx} {...tag} />
      ))}
    </group>
  );
}

// WebGL Detector
function useWebGLDetect() {
  const [hasWebGL, setHasWebGL] = useState(true);
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);
  return hasWebGL;
}

export default function SkillSphere3D() {
  const isWebGLAvailable = useWebGLDetect();

  if (!isWebGLAvailable) return null;

  return (
    <div className="w-full h-[320px] md:h-[400px] relative rounded-3xl overflow-hidden mb-12">
      {/* Radial glow behind sphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.08)_0%,rgba(139,92,246,0.04)_40%,transparent_70%)] pointer-events-none z-0" />

      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <SkillSphere />
        </Suspense>
      </Canvas>
    </div>
  );
}
