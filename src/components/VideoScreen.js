import React, { useState } from 'react';
import soundManager from './SoundManager';
import { videoList } from '../data/materiData';

const VideoScreen = ({ onBack }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

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
          <button className="btn-back-video" onClick={() => setSelectedVideo(null)}>
            <img src="/assets/images/buttons/btn-back.png" alt="Back" />
            <span>Kembali</span>
          </button>
          <div className="video-wrapper">
            <iframe
              src={selectedVideo.url}
              title={selectedVideo.judul}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
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