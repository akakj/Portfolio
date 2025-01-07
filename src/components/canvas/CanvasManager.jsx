import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import CanvasLoader from "../Loader";
import { BallCanvas, ComputersCanvas, EarthCanvas, StarsCanvas } from "./index";

const CanvasManager = ({ activeScene, icon }) => {
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef();
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    const handleMediaQueryChange = (event) => setIsMobile(event.matches);
    const handleResize = () => setScreenHeight(window.innerHeight);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    window.addEventListener("resize", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      window.removeEventListener("resize", handleResize);
      
      // Cleanup WebGL context
      if (canvasRef.current) {
        const gl = canvasRef.current.getContext("webgl");
        if (gl) {
          gl.getExtension('WEBGL_lose_context')?.loseContext();
        }
      }
    };
  }, []);

  const sceneComponents = {
    ball: () => <Ball icon={icon} />,
    computer: () => <Computer isMobile={isMobile} screenHeight={screenHeight} />,
    earth: () => <Earth />,
    stars: () => <Stars />
  };

  const sceneConfigs = {
    ball: {
      camera: { position: [0, 0, 5], fov: 45 }
    },
    computer: {
      camera: { position: [20, 3, 5], fov: 25 }
    },
    earth: {
      camera: { position: [-4, 3, 6], fov: 45 }
    },
    stars: {
      camera: { position: [0, 0, 1], fov: 60 }
    }
  };

  const Scene = sceneComponents[activeScene];
  const config = sceneConfigs[activeScene];

  if (!Scene) return null;

  return (
    <Canvas
      ref={canvasRef}
      shadows
      dpr={[1, 2]}
      gl={{
        powerPreference: "high-performance",
        antialias: false,
        stencil: false,
        depth: false
      }}
      {...config}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Scene />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default CanvasManager;