import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Custom WebGL detector
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

// Particle field that reacts to mouse movements
function InteractiveParticles() {
  const pointsRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate random points
  const count = 300;
  const positions = useRef(
    new Float32Array(
      Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 12)
    )
  );

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Slow rotation
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;

      // Parallax offset based on mouse
      const targetX = mouse.current.x * 0.4;
      const targetY = mouse.current.y * 0.4;
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, targetX, 0.05);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, targetY, 0.05);
    }
  });

  return (
    <Points ref={pointsRef} positions={positions.current} stride={3}>
      <PointMaterial
        transparent
        color="#00E5FF"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function Background3D() {
  const isWebGLAvailable = useWebGLDetect();

  if (!isWebGLAvailable) {
    // Elegant CSS particle fallback
    return (
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#0B1120] cyber-bg-dots">
        <div className="absolute inset-0 bg-radial-gradient-glow opacity-30"></div>
        {/* Floating circles using CSS animations */}
        <div className="absolute top-[20%] left-[15%] w-24 h-24 rounded-full bg-[#00E5FF]/10 blur-xl animate-float-slow"></div>
        <div className="absolute top-[60%] right-[10%] w-36 h-36 rounded-full bg-[#8B5CF6]/10 blur-2xl animate-float-medium"></div>
        <div className="absolute bottom-[10%] left-[30%] w-20 h-20 rounded-full bg-[#00FF88]/5 blur-lg animate-float-fast"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#0B1120]">
      {/* Glow backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#00E5FF]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#8B5CF6]/5 blur-[150px] pointer-events-none" />

      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00E5FF" />
        <pointLight position={[-10, -10, -10]} intensity={1.0} color="#8B5CF6" />
        
        <Suspense fallback={null}>
          <InteractiveParticles />
        </Suspense>
      </Canvas>
    </div>
  );
}
