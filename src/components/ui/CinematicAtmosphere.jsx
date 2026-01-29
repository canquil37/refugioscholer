import React, { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

// Respeta reduced motion
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function Dust({ count = 1600, speed = 0.035 }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 10; // x
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;  // y
      arr[i * 3 + 2] = -Math.random() * 8;         // z
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * speed;
    ref.current.rotation.x += delta * (speed * 0.35);

    const t = state.clock.elapsedTime;
    ref.current.position.x = Math.sin(t * 0.15) * 0.12;
    ref.current.position.y = Math.cos(t * 0.12) * 0.10;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        size={0.012}
        sizeAttenuation
        depthWrite={false}
        opacity={0.55}
        color="#34d399" // emerald-400
      />
    </Points>
  );
}

function LightVeil() {
  const mesh = useRef();

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.z = Math.sin(t * 0.1) * 0.05;
    mesh.current.position.x = Math.sin(t * 0.12) * 0.18;
    mesh.current.position.y = Math.cos(t * 0.10) * 0.12;
  });

  return (
    <mesh ref={mesh} position={[0, 0, -2]}>
      <planeGeometry args={[8, 5]} />
      <meshBasicMaterial transparent opacity={0.18} color="#10b981" />
    </mesh>
  );
}

export default function CinematicAtmosphere({
  className = "",
  disabled = false,
}) {
  const reduced = usePrefersReducedMotion();

  // Degradación simple: si reduced motion o disabled → no renderiza WebGL
  if (disabled || reduced) return null;

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 2.6], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.6} />
        <Dust />
        <LightVeil />
      </Canvas>
    </div>
  );
}
