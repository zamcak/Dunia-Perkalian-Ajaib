import React, { useState } from 'react';
import soundManager from './SoundManager';
import { materiList } from '../data/materiData';
import '../styles/MateriScreen.css';

const MateriScreen = ({ onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const materi = materiList[currentIndex];

  const handleNext = () => {
    soundManager.play('click');
    if (currentIndex < materiList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    soundManager.play('click');
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="materi-screen">
      <img src="/assets/images/bg/bggame.png" alt="Background" className="game-bg" />
      
      <div className="screen-header">
        <button className="btn-home" onClick={onBack}>
          <img src="/assets/images/buttons/btn-home.png" alt="Home" />
        </button>
        <h2 className="screen-title">📖 Materi Belajar</h2>
        <div className="placeholder"></div>
      </div>

      <div className="materi-content">
        <div className="materi-card">
          <div className="materi-header">
            <h3>{materi.judul}</h3>
            {materi.gambarSoal && <img src={materi.gambarSoal} alt="Materi" className="materi-gambar" />}
          </div>

          <div className="materi-body">
            <p className="materi-deskripsi">{materi.deskripsi}</p>
            
            <div className="rumus-section">
              <h4>📐 Rumus:</h4>
              {materi.gambarRumus && <img src={materi.gambarRumus} alt="Rumus" className="rumus-gambar" />}
              <p className="rumus-text">{materi.rumus}</p>
            </div>

            <div className="contoh-section">
              <h4>✨ Contoh Soal:</h4>
              <div className="contoh-list">
                {materi.contoh.map((item, idx) => (
                  <div key={idx} className="contoh-item">
                    {item.gambar && <img src={item.gambar} alt="Contoh" className="contoh-gambar" />}
                    <p className="contoh-text"  dangerouslySetInnerHTML={{ __html: item.text }}></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="nav-buttons">
          <button 
            className="nav-btn prev" 
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <img src="/assets/images/buttons/btn-back.png" alt="Previous" />
          </button>
          
          <span className="page-indicator">
            {currentIndex + 1} / {materiList.length}
          </span>
          
          <button 
            className="nav-btn next" 
            onClick={handleNext}
            disabled={currentIndex === materiList.length - 1}
          >
            <img src="/assets/images/buttons/btn-next.png" alt="Next" />
          </button>
        </div>
      </div>
    </div>
  );
};



export default MateriScreen;