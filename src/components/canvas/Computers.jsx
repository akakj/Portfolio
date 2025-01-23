import React, { Suspense, useEffect, useState, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = memo(({ isMobile, isWebGLActive }) => {
  const { scene } = useGLTF("./desktop_pc/scene.gltf");
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setScreenHeight(window.innerHeight);

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
      {isWebGLActive ? (
        <primitive
          object={scene}
          scale={isMobile ? 0.7 : 0.75}
          position={position}
          rotation={[-0.01, -0.2, -0.1]}
        />
      ) : (
        <img
          src="./desktop_pc/spritesheet.png"
          alt="sprite sheet"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </mesh>
  );
});

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isWebGLActive, setIsWebGLActive] = useState(true); // Track WebGL context state

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

  useEffect(() => {
    const handleContextLost = (event) => {
      event.preventDefault(); // Prevent default handling of the context lost
      setIsWebGLActive(false); // Set WebGL to inactive and switch to sprite sheet
    };

    const canvas = document.querySelector("canvas");
    canvas.addEventListener("webglcontextlost", handleContextLost);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
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
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} isWebGLActive={isWebGLActive} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
