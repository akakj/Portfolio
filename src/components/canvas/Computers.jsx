import React, { Suspense, useEffect, useState, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";
import ErrorBoundary from "../ErrorBoundary";

const Computers = memo(({ isMobile }) => {
  const { scene } = useGLTF("./desktop_pc/scene.gltf");

  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  
  useEffect(() => {
    const handleResize = () => setScreenHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  const [canRender, setCanRender] = useState(true);

  useEffect(() => {
    // Check WebGL capabilities
    const checkWebGLSupport = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        setCanRender(false);
        return;
      }

      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        if (renderer.toLowerCase().includes('mali') || 
            renderer.toLowerCase().includes('adreno 3') || 
            renderer.toLowerCase().includes('adreno 2')) {
          setCanRender(false);
        }
      }
    };

    // Check device type
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Run WebGL check
    checkWebGLSupport();

    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  if (!canRender) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-white text-[18px] text-center px-4">
          Sorry, cannot load this model due to your device capabilities
        </p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Canvas
        frameloop="demand"
        shadows
        dpr={[1, 2]}
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ 
          preserveDrawingBuffer: true,
          powerPreference: "low-power",
          failIfMajorPerformanceCaveat: true
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
    </ErrorBoundary>
  );
};

export default ComputersCanvas;
