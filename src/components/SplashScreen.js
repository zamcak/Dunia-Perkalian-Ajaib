import React, { useEffect, useState } from 'react';
import soundManager from './SoundManager';

const SplashScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Play background music
    soundManager.startBgMusic();
    
    // Simulasi loading
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onFinish(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <img 
        src="/assets/images/bg/splash-bg.png" 
        alt="Splash" 
        className="splash-bg"
      />
      <div className="splash-content">
        <img 
          src="/assets/images/icons/character.png" 
          alt="Character" 
          className="splash-character"
        />
        <h1 className="game-title-splash">Dunia Perkalian Ajaib</h1>
        <p className="game-tagline">Belajar Matematika Jadi Seru!</p>
        
        <div className="loading-bar">
          <div 
            className="loading-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="loading-text">Loading... {progress}%</p>
        
        <div className="credits">
          <small>© 2024 Math Quest Game</small>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;