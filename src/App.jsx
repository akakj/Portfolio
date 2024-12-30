import { BrowserRouter } from "react-router-dom";

import BackgroundMusic from './components/BackgroundMusic';

import {
  About,
  Contact,
  Hero,
  Navbar,
  Tech,
  Works,
  Certifications,
  StarsCanvas,
} from "./components";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <BrowserRouter>
    <ErrorBoundary>
      <div className="relative z-0 bg-primary">
        <BackgroundMusic />
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Tech />
        <Certifications/>
        <Works />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;