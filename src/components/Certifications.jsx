import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { certifications } from "../constants";
import { fadeIn, textVariant } from "../utilities/motion";
import { SectionWrapper } from "../hoc";

const CertificateCard = ({ index, image, title }) => {
  return (
    <motion.div variants={fadeIn("right", "spring", index * 0.5, 0.75)}>
      <div class="-inset-0.5 bg-pink-600 rounded-lg"></div>
      <Tilt
        options={{
          max: 30,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-3xl sm:w-[300px] md:w-[370px] lg:w-[410px] w-full shadow-card border-4 border-transparent gold-glow"
      >
        <div className="flex justify-center items-center w-full h-[230px]">
          <img
            src={image}
            alt={title}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </Tilt>
    </motion.div>
  );
};

const Certifications = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2
          className={`md:text-[55px] sm:text-[45px] xs:text-[35px] text-[25px] ${styles.sectionHeadText}`}
        >
          Certifications
        </h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Certificates I have earned from the official AWS and Microsoft certification programs, showcasing my foundational knowledge of cloud services and platforms.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {certifications.map((certification, index) => (
          <CertificateCard
            key={`certification-${index}`}
            index={index}
            {...certification}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Certifications, "");
