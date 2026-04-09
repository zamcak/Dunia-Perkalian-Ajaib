import React from 'react';
import soundManager from './SoundManager';
import '../styles/HomeScreen.css'; // Import CSS

const HomeScreen = ({ onNavigate }) => {
  const handleClick = (screen) => {
    soundManager.play('click');
    onNavigate(screen);
  };

  const handleExit = () => {
    soundManager.play('click');
    try {
        // Opsi 1: Coba close langsung (jarang berhasil)
        window.close();
        
        // Opsi 2: Redirect ke halaman kosong (pasti berhasil)
        setTimeout(() => {
          window.location.href = 'about:blank';
        }, 100);
      } catch (e) {
        // Opsi 3: Fallback redirect
        window.location.href = 'about:blank';
      }
  };

  // Menu items - pakai 1 gambar untuk semua button
  const menuItems = [
    {
      id: 'materi',
      title: 'MATERI',
    },
    {
      id: 'quiz',
      title: 'QUIZ',
    },
    {
      id: 'video',
      title: 'VIDEO',
    },
    {
      id: 'rangkuman',
      title: 'RANGKUMAN',
    },
    {
      id: 'developer',
      title: 'PENGEMBANG',
    },
      {
      id: 'cptp',
      title: 'CP & TP',
    }
  ];

  return (
    <div className="home-screen">
      {/* Background Image */}
      <img src="/assets/images/bg/home-bg.png" alt="Background" className="home-bg" />
      
      {/* Overlay gelap agar teks terbaca */}
      <div className="home-overlay"></div>

      {/* Header Section */}
      <div className="home-header">
        <div className="character-wrapper">
          <img 
            src="/assets/images/icons/character.png" 
            alt="Character" 
            className="home-character"
          />
        </div>
        <h1 className="welcome-text">Dunia Perkalian Ajaib</h1>
        <p className="welcome-sub">Belajar Matematika Jadi Seru!</p>
        
       
      </div>

      {/* Menu Grid - 1 gambar untuk semua button */}
      <div className="menu-grid">
        {menuItems.map((item) => (
          <button 
            key={item.id}
            className="menu-btn"
            onClick={() => handleClick(item.id)}
          >
            <img 
              src="/assets/images/buttons/btnmaster.png" 
              alt={item.title}
              className="btn-custom-image"
            />
            <span className="btn-title">{item.title}</span>
          </button>
        ))}
      </div>

      {/* Tombol Keluar */}
      <div className="home-footer">
        <button className="btn-exit" onClick={handleExit}>
          🚪 Keluar Aplikasi
        </button>
      </div>      
    </div>
  );
};

export default HomeScreen;