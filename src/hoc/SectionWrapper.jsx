import { motion } from "framer-motion";
import { styles } from "../styles";
import { staggerContainer } from "../utilities/motion";

const SectionWrapper = (Component, idName, maxWidth) =>
  
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} ${maxWidth} mx-auto relative z-0`}
      >
        <span className="hash-span" id={idName}>
            &nbsp;
        </span>
        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;