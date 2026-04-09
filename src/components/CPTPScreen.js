import React from 'react';
import soundManager from './SoundManager';

const CPTPScreen = ({ onBack }) => {
  return (
    <div className="cptp-screen">
      <img src="/assets/images/bg/bggame.png" alt="Background" className="game-bg" />
      
      <div className="screen-header">
        <button className="btn-home" onClick={onBack}>
          <img src="/assets/images/buttons/btn-home.png" alt="Home" />
        </button>
        <h2 className="screen-title">📖 Capaian & Tujuan</h2>
        <div className="placeholder"></div>
      </div>

      <div className="cptp-content">
        <div className="cptp-card">
          <div className="cptp-icon">🎯</div>
          <h3>Capaian Pembelajaran</h3>
          <div className="cptp-text">
            <p>
              Pada akhir fase A, peserta didik menunjukkan pemahaman dan memiliki intuisi bilangan 
              (number sense) pada bilangan cacah sampai 100, mereka dapat membaca, menulis, 
              menentukan nilai tempat, membandingkan, mengurutkan, serta melakukan komposisi 
              (menyusun) dan dekomposisi (mengurai) bilangan.
            </p>
            <p>
              Peserta didik dapat melakukan operasi penjumlahan dan pengurangan menggunakan 
              benda-benda konkret yang banyaknya sampai 20.
            </p>
          </div>
        </div>

        <div className="cptp-card">
          <div className="cptp-icon">✨</div>
          <h3>Tujuan Pembelajaran</h3>
          <div className="cptp-list">
            <ul>
              <li>
                <span className="check">✓</span>
                Peserta didik mampu memahami konsep perkalian sebagai penjumlahan berulang dengan benar
              </li>
              <li>
                <span className="check">✓</span>
                Peserta didik mampu menyelesaikan soal perkalian sederhana menggunakan penjumlahan berulang dengan tepat
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPTPScreen;