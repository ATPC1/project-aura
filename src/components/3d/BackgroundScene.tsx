"use client";

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

function FloatingSpheres() {
  const groupRef = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.2, 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, mouse.x * 0.2, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Primary Glowing Pink/Gold Sphere */}
      <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.5}>
        <Sphere args={[1.8, 64, 64]} position={[4, 1.5, -5]}>
          <MeshDistortMaterial
            color="#ff80b0"
            attach="material"
            distort={0.35}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.45}
          />
        </Sphere>
      </Float>

      {/* Secondary Fuchsia/Purple Sphere */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Sphere args={[1.3, 64, 64]} position={[-4.5, -2, -6]}>
          <MeshDistortMaterial
            color="#f687b3"
            attach="material"
            distort={0.4}
            speed={1.8}
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={0.35}
          />
        </Sphere>
      </Float>

      {/* Gold Accent Sphere */}
      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.2}>
        <Sphere args={[0.9, 32, 32]} position={[2.5, -3.5, -3]}>
          <MeshDistortMaterial
            color="#fbbf24"
            attach="material"
            distort={0.25}
            speed={2.5}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.4}
          />
        </Sphere>
      </Float>
    </group>
  );
}

function FallingPetals({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = isMobile ? 180 : 500; // Abundant petals across the whole screen!
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const petals = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 40,
      y: Math.random() * 35 - 12,
      z: (Math.random() - 0.5) * 25,
      speedY: 0.025 + Math.random() * 0.045,
      speedX: (Math.random() - 0.5) * 0.025,
      rotX: Math.random() * Math.PI,
      rotY: Math.random() * Math.PI,
      rotZ: Math.random() * Math.PI,
      rotSpeedX: (Math.random() - 0.5) * 0.05,
      rotSpeedY: (Math.random() - 0.5) * 0.05,
      scale: 1.0 + Math.random() * 1.4,
    }));
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    petals.forEach((petal, i) => {
      petal.y -= petal.speedY;
      petal.x += petal.speedX + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.02;
      
      // Reset to top when falling below screen
      if (petal.y < -15) {
        petal.y = 18;
        petal.x = (Math.random() - 0.5) * 40;
      }
      petal.rotX += petal.rotSpeedX;
      petal.rotY += petal.rotSpeedY;

      dummy.position.set(petal.x, petal.y, petal.z);
      dummy.rotation.set(petal.rotX, petal.rotY, petal.rotZ);
      dummy.scale.set(petal.scale, petal.scale * 1.4, petal.scale);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <circleGeometry args={[0.32, 6]} />
      <meshStandardMaterial
        color="#e11d48"
        roughness={0.15}
        metalness={0.25}
        side={THREE.DoubleSide}
        transparent
        opacity={0.95}
      />
    </instancedMesh>
  );
}

function AuraDust({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const count = isMobile ? 1200 : 3500; // Optimized dust count for mobile!

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 40;
      pos[i + 1] = (Math.random() - 0.5) * 40;
      pos[i + 2] = (Math.random() - 0.5) * 25;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#f43f5e"
        size={0.07}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function BackgroundScene() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 640);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        dpr={isMobile ? [1, 1.25] : [1, 2]}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 10]} intensity={1.8} color="#f9a8d4" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#fbbf24" />
        <FloatingSpheres />
        <FallingPetals isMobile={isMobile} />
        <AuraDust isMobile={isMobile} />
      </Canvas>
    </div>
  );
}

