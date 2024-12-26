import { useState, useRef, Suspense, useMemo, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = memo((props) => {
  const ref = useRef();
  const rotationSpeed = useRef({ x: 0, y: 0 });

  const sphere = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    random.inSphere(positions, { radius: 1.2 });
    return positions;
  }, []);

  useFrame((state, delta) => {
    rotationSpeed.current.x = delta / 10;
    rotationSpeed.current.y = delta / 15;
    
    ref.current.rotation.x -= rotationSpeed.current.x;
    ref.current.rotation.y -= rotationSpeed.current.y;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
});

const StarsCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1], fov: 60 }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;