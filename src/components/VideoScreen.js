import React, { useState, useRef } from 'react';
import soundManager from './SoundManager';
import { videoList } from '../data/materiData';
import '../styles/Video.css';

const VideoScreen = ({ onBack }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoContainerRef = useRef(null);

  // Fungsi untuk fullscreen
  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    
    if (!isFullscreen) {
      // Masuk fullscreen
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      } else if (videoContainerRef.current.webkitRequestFullscreen) {
        videoContainerRef.current.webkitRequestFullscreen();
      } else if (videoContainerRef.current.msRequestFullscreen) {
        videoContainerRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      // Keluar fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Listener untuk perubahan fullscreen
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="video-screen">
      <img src="/assets/images/bg/bggame.png" alt="Background" className="game-bg" />
      
      <div className="screen-header">
        <button className="btn-home" onClick={onBack}>
          <img src="/assets/images/buttons/btn-home.png" alt="Home" />
        </button>
        <h2 className="screen-title">📹 Video Pembelajaran</h2>
        <div className="placeholder"></div>
      </div>

      {!selectedVideo ? (
        <div className="video-list">
          {videoList.map(video => (
            <button 
              key={video.id} 
              className="video-card"
              onClick={() => {
                soundManager.play('click');
                setSelectedVideo(video);
              }}
            >
              <img src={video.thumbnail} alt={video.judul} className="video-thumb" />
              <div className="video-info">
                <h3>{video.judul}</h3>
                <p>⏱️ {video.durasi}</p>
                <p className="video-desc">{video.deskripsi}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="video-player">
          <div className="video-player-header">
            <button className="btn-back-video" onClick={() => setSelectedVideo(null)}>
              <img src="/assets/images/buttons/btn-back.png" alt="Back" />
              <span>Kembali</span>
            </button>
            <button className="btn-fullscreen" onClick={toggleFullscreen}>
              {isFullscreen ? '🗗 Keluar' : '🗖 Fullscreen'}
            </button>
          </div>
          
          <div 
            ref={videoContainerRef}
            className={`video-wrapper ${isFullscreen ? 'fullscreen-mode' : ''}`}
          >
            <iframe
              src={selectedVideo.url}
              title={selectedVideo.judul}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            {!isFullscreen && (
              <button className="video-fullscreen-btn" onClick={toggleFullscreen}>
                <span className="fullscreen-icon">🗖</span>
              </button>
            )}
          </div>
          
          <div className="video-detail">
            <h3>{selectedVideo.judul}</h3>
            <p>{selectedVideo.deskripsi}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoScreen;