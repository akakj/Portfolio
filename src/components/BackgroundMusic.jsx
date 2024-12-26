import React, { useState, useRef, useEffect } from "react";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import backgroundMusic from '../assets/music.mp3';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Get stored preference
    const musicPreference = localStorage.getItem('musicEnabled');
    if (musicPreference === 'true') {
      handlePlay();
    }
  }, []);

  const handlePlay = () => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            localStorage.setItem('musicEnabled', 'true');
          })
          .catch((error) => {
            console.log("Playback failed:", error);
          });
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
        localStorage.setItem('musicEnabled', 'false');
      }
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        onClick={handlePlay}
        className="bg-tertiary p-3 rounded-full shadow-lg hover:bg-secondary transition-all"
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? (
          <HiVolumeUp className="w-6 h-6 text-white" />
        ) : (
          <HiVolumeOff className="w-6 h-6 text-white" />
        )}
      </button>
      <audio ref={audioRef} loop>
        <source src={backgroundMusic} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default BackgroundMusic;