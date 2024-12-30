import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import BackgroundMusic from './components/BackgroundMusic';
import { About, Contact, Hero, Navbar, Tech, Works, Certifications, StarsCanvas } from "./components";

const App = () => {
  
  useEffect(() => {
    const originalConsoleWarn = console.warn;
    console.warn = (message, ...args) => {
      if (message.includes("Too many active WebGL contexts")) {
        alert("WARNING: Due to your device/browser limited capabilities, some textures may be displayed incorrectly.");
      }
      originalConsoleWarn(message, ...args);
    };

    return () => {
      console.warn = originalConsoleWarn;
    };
  }, []);
  
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <BackgroundMusic />
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Tech />
        <Certifications />
        <Works />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
