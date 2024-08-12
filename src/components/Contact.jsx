import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utilities/motion";

import { github, linkedin } from "../assets";
const Contact = () => {
  const formRef = useRef();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // For displaying error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate form fields
    if (!form.name.trim()) {
      setError("Name field is required.");
      setLoading(false);
      return;
    }
    if (!form.email.trim()) {
      setError("Email field is required.");
      setLoading(false);
      return;
    }
    if (!form.message.trim()) {
      setError("Message field is required.");
      setLoading(false);
      return;
    }

    try {
      await emailjs.send(
        "service_03gc2sx",
        "template_8ugmrb9",
        {
          from_name: form.name,
          to_name: "Anna",
          from_email: form.email,
          to_email: "iamannakand@gmail.com",
          message: form.message,
        },
        "rh8R0IIewSJqgLWRx"
      );
      setLoading(false);
      alert("Thank you! I will get back to you as soon as possible!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setLoading(false);
      setError("Oh no! Something went wrong. Please try again!");
    }
  };

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl group"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              aria-label="Name"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              aria-label="Email"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows="8"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              aria-label="Message"
              required
            />
          </label>
          {error && <p className="text-red-500">{error}</p>}{" "}
          {/* Error message display */}
          <button
            type="submit"
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl hover:bg-[#4f029c]"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Sending" : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>

      <div className="absolute top-10 right-0 mt-4 mr-4 h-12 xs:w-15 w-40 justify-end flex">
        <motion.div variants={slideIn("right", "tween", 0.3, 1)}>
          <div
            onClick={() =>
              window.open("https://www.linkedin.com/in/anna-kandyba/", "_blank")
            }
            className="scale-[1.3] flex justify-center items-center cursor-pointer hover:w-12 hover:h-12 group"
          >
            <img
              src={linkedin}
              alt="linkedIn"
              className="w-12 h-12 object-contain"
            />
            <div className="absolute bottom-[-1.5rem] left-1/2 transform -translate-x-1/2 translate-y-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-tertiary text-[#a8f1ff] text-[10px] px-2 py-1 rounded-md">
            linkedin logo icon by Icons8
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
