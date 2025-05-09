import React, { memo, useEffect } from "react";
import { Tilt } from "react-tilt";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { styles } from "../styles";
import { github, youtube } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utilities/motion";

const ProjectCard = memo(({ index, name, description, tags, image, link }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
    >
      <Tilt
        options={{ max: 45, scale: 1.05, speed: 450 }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] md:w-[400px] lg:w-[440px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img src={image} alt={name} className="w-full h-full object-cover rounded-2xl" />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            {name === "Neo's Enchanting Adventures" && (
              <div onClick={() => window.open(link, "_blank")} className="red-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:w-11 hover:h-11">
                <img src={youtube} alt="youtube" className="scale-[0.6] object-contain" />
              </div>
            )}
            <div onClick={() => window.open(link, "_blank")} className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:w-11 hover:h-11">
              <img src={github} alt="github" className="w-3/5 h-3/5 object-contain" />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[15px] ${tag.color}`}>~{tag.name}</p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
});

const Works = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  return (
    <>
      <motion.div ref={ref} initial="hidden" animate={controls} variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects</h2>
      </motion.div>
      <div className="w-full flex">
        <motion.p initial="hidden" animate={controls} variants={fadeIn("", "", 0.1, 1)} className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
          The following projects highlight my skills and experience through
          real-world examples of my work. Each project is briefly described. It
          reflects my ability to solve complex problems, work with diverse
          technologies, and manage projects effectively.
        </motion.p>
      </div>
      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "work");