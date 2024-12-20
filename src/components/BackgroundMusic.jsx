import React from "react";
import backgroundMusic from '../assets/music.mp3';

const BackgroundMusic = () => {
    return (
      <audio autoPlay loop>
        <source src={backgroundMusic} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    );
  };
  
  export default BackgroundMusic;