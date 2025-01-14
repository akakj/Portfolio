import React, { Suspense, useEffect, useState, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = memo(({ isMobile }) => {
  const { scene } = useGLTF("./desktop_pc/scene.gltf");
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);  // Declare screenHeight state

  useEffect(() => {
    const handleResize = () => setScreenHeight(window.innerHeight);  // Fix reference issue

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      scene.traverse((object) => {
        if (object.material) object.material.dispose();
        if (object.geometry) object.geometry.dispose();
      });
    };
  }, [scene]);

  const position = screenHeight <= 600
    ? [0, -4.5, -2]
    : isMobile
    ? [0, -3.5, -2.2]
    : [0, -3.5, -1.75];

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 100, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={32} />
      <primitive
        object={scene}
        scale={isMobile ? 0.7 : 0.75}
        position={position}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
});

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      onCreated={({ gl }) => {
        gl.dispose();
      }}
      onContextLost={(event) => {
        event.preventDefault();
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
