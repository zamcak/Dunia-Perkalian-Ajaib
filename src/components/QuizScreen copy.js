import React, { useState, useEffect } from 'react';
import soundManager from './SoundManager';
import { materiList } from '../data/materiData';

const QuizScreen = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);
  
  // Kumpulkan semua soal dari semua materi
  const allQuestions = materiList.flatMap(materi => 
    materi.latihan.map(latihan => ({
      ...latihan,
      materiJudul: materi.judul,
      materiGambar: materi.gambarSoal
    }))
  );

  const currentQ = allQuestions[currentQuestion];

  const handleAnswer = (selected) => {
    if (showFeedback) return;
    
    setSelectedAnswer(selected);
    const correct = selected === currentQ.jawaban;
    
    if (correct) {
      soundManager.play('correct');
      setScore(score + 10);
      setIsCorrect(true);
    } else {
      soundManager.play('wrong');
      setIsCorrect(false);
    }
    
    setShowFeedback(true);
    
    setTimeout(() => {
      if (currentQuestion + 1 < allQuestions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setShowFeedback(false);
        setSelectedAnswer(null);
      } else {
        setQuizComplete(true);
        soundManager.play('complete');
      }
    }, 2000);
  };

  const handleRestart = () => {
    soundManager.play('click');
    setCurrentQuestion(0);
    setScore(0);
    setShowFeedback(false);
    setQuizComplete(false);
    setSelectedAnswer(null);
  };

  if (quizComplete) {
    const totalQuestions = allQuestions.length;
    const maxScore = totalQuestions * 10;
    const percentage = (score / maxScore) * 100;
    
    return (
      <div className="quiz-screen">
        <img src="/assets/images/bg/game-bg.jpg" alt="Background" className="game-bg" />
        
        <div className="screen-header">
          <button className="btn-home" onClick={onBack}>
            <img src="/assets/images/buttons/btn-home.png" alt="Home" />
          </button>
          <h2 className="screen-title">🏆 Hasil Quiz</h2>
          <div className="placeholder"></div>
        </div>

        <div className="result-container">
          <img src="/assets/images/icons/trophy.png" alt="Trophy" className="trophy-img" />
          <h3>Skor Kamu!</h3>
          <div className="final-score">{score}</div>
          <div className="max-score">/ {maxScore}</div>
          <div className="percentage">{Math.round(percentage)}%</div>
          
          <div className="result-stats">
            <div className="stat">
              <span>✅ Benar:</span>
              <strong>{score / 10}</strong>
            </div>
            <div className="stat">
              <span>❌ Salah:</span>
              <strong>{(totalQuestions - (score / 10))}</strong>
            </div>
          </div>
          
          <button className="btn-retry" onClick={handleRestart}>
            <img src="/assets/images/buttons/btn-retry.png" alt="Retry" />
            <span>Coba Lagi</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-screen">
      <img src="/assets/images/bg/game-bg.jpg" alt="Background" className="game-bg" />
      
      <div className="screen-header">
        <button className="btn-home" onClick={onBack}>
          <img src="/assets/images/buttons/btn-home.png" alt="Home" />
        </button>
        <h2 className="screen-title">❓ Quiz Matematika</h2>
        <div className="score-badge">
          <img src="/assets/images/icons/star.png" alt="Star" />
          <span>{score}</span>
        </div>
      </div>

      <div className="quiz-content">
        <div className="progress-info">
          <div className="progress-bar-quiz">
            <div 
              className="progress-fill-quiz" 
              style={{ width: `${((currentQuestion + 1) / allQuestions.length) * 100}%` }}
            ></div>
          </div>
          <span>Soal {currentQuestion + 1}/{allQuestions.length}</span>
        </div>

        <div className="question-card">
          <div className="question-header">
            <img src={currentQ.materiGambar} alt="Materi" className="question-gambar" />
            <h3 className="question-text">{currentQ.soal}</h3>
          </div>
          
          {currentQ.gambar && (
            <img src={currentQ.gambar} alt="Soal" className="soal-gambar" />
          )}

          <div className="options">
            {currentQ.pilihan.map((option, idx) => (
              <button
                key={idx}
                className={`option ${
                  selectedAnswer !== null
                    ? option === currentQ.jawaban
                      ? 'correct'
                      : selectedAnswer === option
                      ? 'wrong'
                      : ''
                    : ''
                }`}
                onClick={() => handleAnswer(option)}
                disabled={showFeedback}
              >
                <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                <span className="option-value">{option}</span>
              </button>
            ))}
          </div>
        </div>

        {showFeedback && (
          <div className={`feedback-overlay ${isCorrect ? 'correct-feedback' : 'wrong-feedback'}`}>
            <img 
              src={isCorrect ? '/assets/images/feedback/correct-badge.png' : '/assets/images/feedback/wrong-badge.png'} 
              alt={isCorrect ? 'Benar' : 'Salah'}
              className="feedback-img"
            />
            <p>{isCorrect ? '✅ Benar! +10 Poin' : `❌ Salah! Jawaban: ${currentQ.jawaban}`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizScreen;