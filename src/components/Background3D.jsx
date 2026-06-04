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

// Custom 3D React Logo Mesh
function ReactLogoMesh(props) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      {/* Central Nucleus */}
      <mesh>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshBasicMaterial color="#00E5FF" />
      </mesh>
      
      {/* Orbit 1 */}
      <mesh rotation={[0, 0, 0]} scale={[1, 0.35, 0.05]}>
        <torusGeometry args={[0.5, 0.03, 8, 48]} />
        <meshBasicMaterial color="#00E5FF" wireframe />
      </mesh>
      
      {/* Orbit 2 */}
      <mesh rotation={[0, 0, Math.PI / 3]} scale={[1, 0.35, 0.05]}>
        <torusGeometry args={[0.5, 0.03, 8, 48]} />
        <meshBasicMaterial color="#00E5FF" wireframe />
      </mesh>
      
      {/* Orbit 3 */}
      <mesh rotation={[0, 0, -Math.PI / 3]} scale={[1, 0.35, 0.05]}>
        <torusGeometry args={[0.5, 0.03, 8, 48]} />
        <meshBasicMaterial color="#00E5FF" wireframe />
      </mesh>
    </group>
  );
}

// Volumetric 3D Cloud Mesh
function CloudMesh(props) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
      groupRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      {/* Left bubble */}
      <mesh position={[-0.3, 0, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#8B5CF6" transparent opacity={0.65} roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Center bubble */}
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#8B5CF6" transparent opacity={0.65} roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Right bubble */}
      <mesh position={[0.3, 0, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#8B5CF6" transparent opacity={0.65} roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Bottom filler */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.5, 0.15, 0.4]} />
        <meshStandardMaterial color="#8B5CF6" transparent opacity={0.65} roughness={0.1} metalness={0.8} />
      </mesh>
    </group>
  );
}

// Cybersecurity Shield Mesh (Octahedron with inner core)
function ShieldMesh(props) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.45;
      groupRef.current.rotation.x += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      {/* Outer Cage */}
      <mesh>
        <octahedronGeometry args={[0.45, 1]} />
        <meshBasicMaterial color="#00FF88" wireframe />
      </mesh>
      {/* Core */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#00FF88" />
      </mesh>
    </group>
  );
}

// Pythonic Floating Mesh (Double toruses locked together)
function PythonMesh(props) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
      groupRef.current.rotation.z += delta * 0.25;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      <mesh position={[0, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.22, 0.08, 12, 24, Math.PI * 1.5]} />
        <meshStandardMaterial color="#00E5FF" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, Math.PI]}>
        <torusGeometry args={[0.22, 0.08, 12, 24, Math.PI * 1.5]} />
        <meshStandardMaterial color="#8B5CF6" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
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
          
          {/* Antigravity floating 3D assets */}
          <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2} floatingRange={[-0.4, 0.4]}>
            <ReactLogoMesh position={[-2.2, 1.5, -1]} scale={[0.8, 0.8, 0.8]} />
          </Float>
          
          <Float speed={2.0} rotationIntensity={1.2} floatIntensity={1.5} floatingRange={[-0.3, 0.3]}>
            <CloudMesh position={[2.5, 1.8, -1.2]} scale={[0.9, 0.9, 0.9]} />
          </Float>
          
          <Float speed={3.0} rotationIntensity={1.8} floatIntensity={2.5} floatingRange={[-0.5, 0.5]}>
            <ShieldMesh position={[-2.8, -1.8, -0.5]} scale={[0.8, 0.8, 0.8]} />
          </Float>
          
          <Float speed={2.2} rotationIntensity={1.4} floatIntensity={1.8} floatingRange={[-0.4, 0.4]}>
            <PythonMesh position={[2.4, -1.5, -0.8]} scale={[0.9, 0.9, 0.9]} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
