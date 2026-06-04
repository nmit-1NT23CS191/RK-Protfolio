import React, { useRef, useState, useEffect, Suspense } from 'react';
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

// 3D Rotating Profile Cube
function ProfileCube() {
  const meshRef = useRef();
  
  // Load profile photo texture
  const texture = useLoader(THREE.TextureLoader, profileImg);
  texture.minFilter = THREE.LinearFilter;

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle continuous rotation
      meshRef.current.rotation.y += delta * 0.45;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      {/* Width, Height, Depth */}
      <boxGeometry args={[1.5, 1.5, 0.18]} />
      
      {/* 6 materials for 6 faces: front face gets profile image, others get carbon-navy */}
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
    <div className="w-full h-full bg-black/10 rounded-2xl overflow-hidden cursor-pointer relative group">
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
          <ProfileCube />
        </Suspense>
      </Canvas>
    </div>
  );
}
