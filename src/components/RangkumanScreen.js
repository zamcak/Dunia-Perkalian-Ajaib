import React from 'react';
import soundManager from './SoundManager';

const RangkumanScreen = ({ onBack }) => {
  return (
    <div className="rangkuman-screen">
      <img src="/assets/images/bg/bggame.png" alt="Background" className="game-bg" />
      
      <div className="screen-header">
        <button className="btn-home" onClick={onBack}>
          <img src="/assets/images/buttons/btn-home.png" alt="Home" />
        </button>
        <h2 className="screen-title">📝 Rangkuman</h2>
        <div className="placeholder"></div>
      </div>

      <div className="rangkuman-content">
        <div className="rangkuman-card">
          <div className="rangkuman-header">
            <div className="rangkuman-icon">🎉</div>
            <h3>Selamat! Kamu Hebat!</h3>
          </div>
          <div className="rangkuman-body">
            <div className="rangkuman-text">
              <p>
                Nah, bagaimana teman-teman setelah berpetualang? Seru kan menyelesaikan misi tentang perkalian? 
                Kita jadi tahu kalau penjumlahan berulang dengan bilangan yang sama itu artinya perkalian 
                dengan simbol <strong>"×"</strong>.
              </p>
              <p>
                Perkalian ini penting dalam kehidupan sehari-hari lho, seperti saat membeli banyak barang 
                dengan harga yang sama, jadi kita tidak perlu menghitung satu per satu, cukup dengan mengalikan 
                banyak barang dengan harganya.
              </p>
              <p className="closing-message">
                Sampai jumpa di petualangan belajar selanjutnya! <br />
                <strong>Tetap semangat dan terus belajar!</strong>
              </p>
            </div>
            
            <div className="rangkuman-emoji">
              <span>🚀</span>
              <span>📚</span>
              <span>⭐</span>
              <span>🎯</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangkumanScreen;