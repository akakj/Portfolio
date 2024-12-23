import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { consoleText } from "../utilities/consoleText";
import debounce from "lodash/debounce";

// Debounce function moved outside of useEffect
const handleResizeDebounced = debounce((setScreenHeight, setIsSmallScreenHeight) => {
  const height = window.innerHeight;
  setScreenHeight(height);
  setIsSmallScreenHeight(height <= 500); // Adjust threshold for small screens
}, 200); // Adjust debounce delay as needed

const Hero = () => {
  const [isSmallScreenHeight, setIsSmallScreenHeight] = useState(false);
  const [screenHeight, setScreenHeight] = useState(typeof window !== "undefined" ? window.innerHeight : 0);

  useEffect(() => {
    consoleText(["Anna"], "text", ["#a349fc"]);

    // Set initial state
    if (typeof window !== "undefined") {
      handleResizeDebounced(setScreenHeight, setIsSmallScreenHeight);

      // Add resize event listener
      window.addEventListener("resize", () => handleResizeDebounced(setScreenHeight, setIsSmallScreenHeight));

      // Cleanup listener on unmount
      return () => window.removeEventListener("resize", () => handleResizeDebounced(setScreenHeight, setIsSmallScreenHeight));
    }
  }, []);

  // Calculate dynamic bottom position based on screen height
  const bottomPosition =
    screenHeight <= 500 
      ? "bottom-10" 
      : screenHeight <= 1080 
        ? "bottom-20" 
        : "bottom-32";

  return (
    <section className="relative w-full h-screen mx-auto flex flex-col items-center justify-center">
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#a349fc]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span id="text" className="text-white inline-block"></span>
            <span
              id="console"
              className="inline-block text-white align-middle ml-2"
            >
              &#95;
            </span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I focus on web and game development
            <br className="sm:block hidden" /> and user interfaces{" "}
            <br className="sm:block hidden" />
            while also diving deeper into cloud technologies
          </p>
        </div>
      </div>

      {/* ComputersCanvas section */}
      <div className="relative w-full h-full">
        <ComputersCanvas isSmallScreenHeight={isSmallScreenHeight} />
      </div>

      {/* Adjusted Bottom Element */}
      <div
        className={`absolute ${bottomPosition} sm:bottom-10 w-full flex justify-center items-center`}
      >
        <a href="#about" aria-label="Scroll to About Section">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-white flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-white mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
