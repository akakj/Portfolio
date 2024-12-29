import { useEffect, useState, useCallback, memo, useMemo } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { consoleText } from "../utilities/consoleText";
import debounce from "lodash/debounce";

const Hero = memo(() => {
  const [isSmallScreenHeight, setIsSmallScreenHeight] = useState(false);
  const [screenHeight, setScreenHeight] = useState(() => 
    typeof window !== "undefined" ? window.innerHeight : 0
  );

  const handleResize = useCallback(
    debounce(() => {
      const height = window.innerHeight;
      setScreenHeight(height);
      setIsSmallScreenHeight(height <= 600);
    }, 200),
    []
  );

  useEffect(() => {
    consoleText(["Anna"], "text", ["#a349fc"]);

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        handleResize.cancel();
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [handleResize]);

  const bottomPosition = useMemo(() => 
    screenHeight <= 500 
      ? "bottom-10" 
      : screenHeight <= 1080 
        ? "bottom-20" 
        : "bottom-32",
    [screenHeight]
  );

  return (
    <section className="relative w-full h-screen mx-auto flex flex-col items-center justify-center">
      <div
        className={`${styles.paddingX} absolute inset-0 ${
          isSmallScreenHeight ? 'top-[85px]' : 'top-[120px]'
        } max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#a349fc]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${
            isSmallScreenHeight ? styles.smallHeroHeadText : styles.heroHeadText
          } text-white`}>
            Hi, I'm <span id="text" className="text-white inline-block"></span>
            <span
              id="console"
              className="inline-block text-white align-middle ml-2"
            >
              &#95;
            </span>
          </h1>
          <p className={`${
            isSmallScreenHeight ? styles.smallHeroSubText : styles.heroSubText
          } mt-2 text-white-100`}>
            I focus on web and game development
            <br className="sm:block hidden" /> and user interfaces{" "}
            <br className="sm:block hidden" />
            while also diving deeper into cloud technologies
          </p>
        </div>
      </div>

      <div className="relative w-full h-full">
        <ComputersCanvas isSmallScreenHeight={isSmallScreenHeight} />
      </div>

      <div className={`absolute ${bottomPosition} w-full flex justify-center items-center`}>
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
});

export default Hero;