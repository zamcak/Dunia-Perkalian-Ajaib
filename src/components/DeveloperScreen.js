import React from 'react';
import soundManager from './SoundManager';

const DeveloperScreen = ({ onBack }) => {
  const teamMembers = [
    { name: "Aulia Luthfi Dewi Pramesta", nim: "Q200250022", role: "Lead Developer", icon: "👩‍💻", color: "#667eea" },
    { name: "Ari Qudriyati", nim: "Q200250015", role: "UI/UX Designer", icon: "🎨", color: "#f093fb" },
    { name: "Erwin Ardianzah", nim: "Q200250018", role: "Game Developer", icon: "🎮", color: "#4facfe" },
    { name: "Rusnilawati, Ph.D", nim: "", role: "Supervisor", icon: "👩‍🏫", color: "#43e97b" },
    { name: "Dr. Yulia Maftuhah Hidayati, M.Pd", nim: "", role: "Academic Advisor", icon: "📚", color: "#fa709a" }
  ];

  return (
    <div className="developer-screen">
      <img src="/assets/images/bg/bggame.png" alt="Background" className="game-bg" />
      
      <div className="screen-header">
        <button className="btn-home" onClick={onBack}>
          <img src="/assets/images/buttons/btn-home.png" alt="Home" />
        </button>
        <h2 className="screen-title">👨‍💻 Tentang Pengembang</h2>
        <div className="placeholder"></div>
      </div>

      <div className="developer-content">
        <img src="/assets/images/icons/character.png" alt="Developer" className="dev-img" />
        
        <div className="dev-info">
          <h3>Dunia Perkalian Ajaib</h3>
          <p className="dev-desc">
            Aplikasi pembelajaran matematika interaktif yang dibuat untuk 
            membantu siswa memahami konsep matematika dengan cara yang menyenangkan.
          </p>
        </div>

        {/* TIM SECTION - VERSION KEREN */}
        <div className="dev-team">
          <h4>
            <span className="team-icon">👥</span>
            Tim Pengembang
            <span className="team-icon">🚀</span>
          </h4>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card" style={{ borderLeftColor: member.color }}>
                <div className="team-avatar" style={{ background: member.color }}>
                  {member.icon}
                </div>
                <div className="team-info">
                  <div className="team-name">{member.name}</div>
                  {member.nim && <div className="team-nim">{member.nim}</div>}
                  <div className="team-role" style={{ color: member.color }}>{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dev-contact">
        
        </div>
      </div>
    </div>
  );
};

export default DeveloperScreen;