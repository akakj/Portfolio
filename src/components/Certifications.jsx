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
      <Tilt
        options={{
          max: 30,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-3xl shadow-card border-4 border-transparent gold-glow flex flex-col items-center justify-between
          sm:w-[250px] sm:h-[350px] md:w-[300px] md:h-[400px] lg:w-[350px] lg:h-[450px] w-full h-auto"
      >
        <div className="w-full h-[70%] flex justify-center items-center">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-3 text-center">
          <h3 className="text-white text-[16px] md:text-[18px] lg:text-[20px] font-semibold">{title}</h3>
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
