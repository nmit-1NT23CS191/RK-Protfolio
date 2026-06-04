import React, { useRef, useState, useEffect, Suspense, useCallback } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import profileImg from '../assets/profile.jpg';

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

// 3D Rotating Profile Card with mouse-tracking parallax
function ProfileCard({ mouseX, mouseY }) {
  const meshRef = useRef();
  const targetRotation = useRef({ x: 0, y: 0 });

  // Load profile photo texture
  const texture = useLoader(THREE.TextureLoader, profileImg);
  texture.minFilter = THREE.LinearFilter;

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Calculate target rotation from mouse position
    // mouseX and mouseY are normalized -1 to 1
    const isHovering = mouseX.current !== 0 || mouseY.current !== 0;

    if (isHovering) {
      // Interactive: tilt toward cursor
      targetRotation.current.y = mouseX.current * 0.6;
      targetRotation.current.x = -mouseY.current * 0.4;
    } else {
      // Idle: gentle continuous rotation
      targetRotation.current.y += delta * 0.45;
      targetRotation.current.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.15;
    }

    // Smooth interpolation (lerp) for buttery motion
    meshRef.current.rotation.y += (targetRotation.current.y - meshRef.current.rotation.y) * (isHovering ? 0.08 : 0.05);
    meshRef.current.rotation.x += (targetRotation.current.x - meshRef.current.rotation.x) * (isHovering ? 0.08 : 0.05);
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      {/* Width, Height, Depth */}
      <boxGeometry args={[1.5, 1.5, 0.18]} />
      
      {/* 6 materials for 6 faces: front & back get profile image, others get carbon-navy */}
      <meshStandardMaterial attach="material-0" color="#0B1120" roughness={0.4} metalness={0.8} /> {/* Right */}
      <meshStandardMaterial attach="material-1" color="#0B1120" roughness={0.4} metalness={0.8} /> {/* Left */}
      <meshStandardMaterial attach="material-2" color="#0B1120" roughness={0.4} metalness={0.8} /> {/* Top */}
      <meshStandardMaterial attach="material-3" color="#0B1120" roughness={0.4} metalness={0.8} /> {/* Bottom */}
      <meshStandardMaterial attach="material-4" map={texture} roughness={0.3} metalness={0.1} />  {/* Front */}
      <meshStandardMaterial attach="material-5" map={texture} roughness={0.3} metalness={0.1} />  {/* Back */}
    </mesh>
  );
}

export default function Profile3D() {
  const isWebGLAvailable = useWebGLDetect();
  const containerRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Normalize mouse position to -1...1
    mouseX.current = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseY.current = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Reset — card returns to idle auto-rotate
    mouseX.current = 0;
    mouseY.current = 0;
  }, []);

  if (!isWebGLAvailable) {
    return (
      <img
        src={profileImg}
        alt="Ravikiran M S"
        className="w-full h-full object-cover rounded-2xl"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full bg-black/10 rounded-2xl overflow-hidden cursor-pointer relative group"
    >
      {/* Holographic scanner effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-cyan/10 to-transparent w-full h-full pointer-events-none animate-pulse z-10" />

      <Canvas camera={{ position: [0, 0, 2.3], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 2, 2]} intensity={1.5} color="#00E5FF" />
        <directionalLight position={[-2, -2, 2]} intensity={1.0} color="#8B5CF6" />
        
        <Suspense fallback={
          <mesh>
            <boxGeometry args={[1.5, 1.5, 0.18]} />
            <meshBasicMaterial color="#0B1120" wireframe />
          </mesh>
        }>
          <ProfileCard mouseX={mouseX} mouseY={mouseY} />
        </Suspense>
      </Canvas>
    </div>
  );
}
