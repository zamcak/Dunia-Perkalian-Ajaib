import React, { useState } from 'react';
import soundManager from './SoundManager';
import { characters, levels } from '../data/quiz';
import '../styles/QuizScreen.css';

const QuizScreen = ({ onBack }) => {
  // State untuk flow quiz
  const [quizStep, setQuizStep] = useState('selectCharacter');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [dragAnswers, setDragAnswers] = useState({});
  const [selectedDragAnswer, setSelectedDragAnswer] = useState(null);

  const currentLevel = selectedLevel ? levels.find(l => l.id === selectedLevel) : null;
  const currentQuestion = currentLevel?.questions[currentQuestionIndex];
  const isDragDropLevel = currentLevel?.type === 'drag-drop';
  const isLastQuestion = currentLevel && currentQuestionIndex === currentLevel.questions.length - 1;
  
  // Untuk drag drop, ambil soal berdasarkan index
  const dragQuestions = currentLevel?.questions || [];
  const currentDragItem = dragQuestions[currentQuestionIndex];

  // Handle pilih karakter
  const handleSelectCharacter = (characterId) => {
    soundManager.play('click');
    setSelectedCharacter(characterId);
    setQuizStep('selectLevel');
  };

  // Handle pilih level
  const handleSelectLevel = (levelId) => {
    soundManager.play('click');
    setSelectedLevel(levelId);
    setQuizStep('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
    setDragAnswers({});
    setSelectedDragAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  // Handle back
  const handleBackToLevelSelect = () => {
    soundManager.play('click');
    setQuizStep('selectLevel');
    setSelectedLevel(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setDragAnswers({});
    setSelectedDragAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  const handleBackToHome = () => {
    soundManager.play('click');
    onBack();
  };

  // Handle jawab soal biasa (multiple choice)
  const handleAnswer = (selected) => {
    if (showFeedback) return;
    
    const correct = selected === currentQuestion.jawaban;
    
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
      if (isLastQuestion) {
        setQuizStep('result');
        soundManager.play('complete');
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowFeedback(false);
      }
    }, 1500);
  };

  // Handle pilih jawaban drag drop (pakai klik)
  const handleSelectDragNumber = (number) => {
    if (dragAnswers[currentDragItem?.id]) return;
    setSelectedDragAnswer(number);
  };

  // Handle submit jawaban drag drop
  const handleSubmitDragAnswer = () => {
    if (!selectedDragAnswer) {
      alert('Pilih dulu angka jawabannya!');
      return;
    }
    
    const isAnswerCorrect = selectedDragAnswer === currentDragItem.jawaban;
    
    if (isAnswerCorrect) {
      soundManager.play('correct');
      setScore(prev => prev + 10);
      setIsCorrect(true);
    } else {
      soundManager.play('wrong');
      setIsCorrect(false);
    }
    
    // Simpan jawaban
    setDragAnswers(prev => ({
      ...prev,
      [currentDragItem.id]: { 
        answer: selectedDragAnswer, 
        isCorrect: isAnswerCorrect, 
        correctAnswer: currentDragItem.jawaban 
      }
    }));
    
    setShowFeedback(true);
    
    setTimeout(() => {
      if (isLastQuestion) {
        setQuizStep('result');
        soundManager.play('complete');
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedDragAnswer(null);
        setShowFeedback(false);
      }
    }, 1500);
  };

  // ========== PERBAIKAN: RESTART DARI AWAL ==========
  const handleRestart = () => {
    soundManager.play('click');
    // Reset ALL state ke awal
    setQuizStep('selectCharacter');  // Balik ke pilih karakter
    setSelectedCharacter(null);
    setSelectedLevel(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setDragAnswers({});
    setSelectedDragAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  // ========== MAIN LAGI DARI AWAL (untuk tombol di result) ==========
  const handlePlayAgain = () => {
    soundManager.play('click');
    // Reset ke pilih karakter, bukan ke result lagi
    setQuizStep('selectCharacter');
    setSelectedCharacter(null);
    setSelectedLevel(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setDragAnswers({});
    setSelectedDragAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  const calculateMaxScore = () => {
    if (selectedLevel && currentLevel) {
      return currentLevel.questions.length * 10;
    }
    return 0;
  };

  // Render pilih karakter
  if (quizStep === 'selectCharacter') {
    return (
      <div className="quiz-screen">
        <img src="/assets/images/bg/bggame.png" alt="Background" className="game-bg" />
        <div className="screen-header">
          <button className="btn-home" onClick={onBack}>
            <img src="/assets/images/buttons/btn-home.png" alt="Home" />
          </button>
          <h2 className="screen-title">🎮 Pilih Karakter</h2>
          <div className="placeholder"></div>
        </div>

        <div className="character-select-container">
          <div className="quest-title">
            <span className="quest-icon">⚔️</span>
            <h3>Petualangan Perkalian Ceria</h3>
            <p>Siapa yang akan menemani perjalananmu?</p>
          </div>
          
          <div className="characters-grid">
            {characters.map(char => (
              <button
                key={char.id}
                className="character-card"
                onClick={() => handleSelectCharacter(char.id)}
              >
                <div className="character-img-wrapper" style={{ background: char.color + '20' }}>
                  <img src={char.image} alt={char.name} className="character-img" />
                </div>
                <h3>{char.name}</h3>
                <div className="select-btn" style={{ background: char.color }}>
                  Pilih
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render pilih level
  if (quizStep === 'selectLevel') {
    return (
      <div className="quiz-screen">
        <img src="/assets/images/bg/bggame.png" alt="Background" className="game-bg" />
        <div className="screen-header">
          <button className="btn-home" onClick={() => setQuizStep('selectCharacter')}>
            <img src="/assets/images/buttons/btn-back.png" alt="Back" />
          </button>
          <h2 className="screen-title">🌍 Pilih Dunia Petualangan</h2>
          <div className="placeholder"></div>
        </div>

        <div className="level-select-container">
          <div className="selected-character-info">
            <img 
              src={characters.find(c => c.id === selectedCharacter)?.image} 
              alt="Character"
              className="selected-char-img"
            />
            <span>Petualang {characters.find(c => c.id === selectedCharacter)?.name}</span>
          </div>

          <div className="levels-grid">
            {levels.map(level => (
              <button
                key={level.id}
                className="level-card"
                onClick={() => handleSelectLevel(level.id)}
                style={{ borderColor: level.color }}
              >
                <div className="level-icon" style={{ background: level.color }}>
                  {level.icon}
                </div>
                <div className="level-info-text">
                  <h3>{level.world}</h3>
                  <p>{level.description}</p>
                  {level.type === 'drag-drop' && <span className="drag-badge">✨ Pilih Angka ✨</span>}
                </div>
                <div className="level-arrow" style={{ color: level.color }}>→</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render hasil akhir
  if (quizStep === 'result') {
    const maxScore = calculateMaxScore();
    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
    
    let gradeMessage = '';
    let gradeEmoji = '';
    if (percentage >= 80) {
      gradeMessage = 'Hebat! Kamu Juara Perkalian!';
      gradeEmoji = '🏆🎉';
    } else if (percentage >= 60) {
      gradeMessage = 'Bagus! Terus Berlatih!';
      gradeEmoji = '🎖️📚';
    } else {
      gradeMessage = 'Semangat! Coba Lagi Petualanganmu!';
      gradeEmoji = '💪🌟';
    }

    return (
      <div className="quiz-screen">
        <img src="/assets/images/bg/bggame.png" alt="Background" className="game-bg" />
        <div className="screen-header">
          <button className="btn-home" onClick={handleBackToHome}>
            <img src="/assets/images/buttons/btn-home.png" alt="Home" />
          </button>
          <h2 className="screen-title">🏆 Hasil Petualangan</h2>
          <div className="placeholder"></div>
        </div>

        <div className="result-container">
          <div className="result-emoji">{gradeEmoji}</div>
          <h3>{gradeMessage}</h3>
          
          <div className="final-score-container">
            <div className="final-score">{score}</div>
            <div className="max-score">/ {maxScore}</div>
          </div>
          
          <div className="percentage-circle">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" strokeWidth="8"/>
              <circle 
                cx="50" cy="50" r="45" fill="none" 
                stroke="url(#gradient)" strokeWidth="8"
                strokeDasharray={`${percentage * 2.83} 283`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
              </defs>
            </svg>
            <div className="percentage-text">{Math.round(percentage)}%</div>
          </div>

          <div className="result-stats">
            <div className="stat-item">
              <span>✅ Jawaban Benar</span>
              <strong>{score / 10}</strong>
            </div>
            <div className="stat-item">
              <span>❌ Jawaban Salah</span>
              <strong>{(maxScore / 10) - (score / 10)}</strong>
            </div>
          </div>

          <div className="result-buttons">
            {/* PERBAIKAN: Tombol Main Lagi panggil handlePlayAgain, bukan handleRestart */}
            <button className="btn-play-again" onClick={handlePlayAgain}>
              🔄 Main Lagi dari Awal
            </button>
            <button className="btn-back-home" onClick={handleBackToHome}>
              🏠 Kembali ke Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render DRAG & DROP - TAMPIL 1 SOAL PER 1
  if (isDragDropLevel) {
    const isAnswered = dragAnswers[currentDragItem?.id] !== undefined;
    const userAnswerData = dragAnswers[currentDragItem?.id];

    return (
      <div className="quiz-screen">
        <img src={currentLevel?.bg || "/assets/images/bg/bggame.png"} alt="World" className="game-bg" />
        
        <div className="screen-header">
          <button className="btn-home" onClick={handleBackToLevelSelect}>
            <img src="/assets/images/buttons/btn-back.png" alt="Back" />
          </button>
          <div className="level-info">
            <span className="level-icon">{currentLevel?.icon}</span>
            <span className="level-name">{currentLevel?.world}</span>
          </div>
          <div className="score-badge">
            <img src="/assets/images/icons/star.png" alt="Star" />
            <span>{score}</span>
          </div>
        </div>

        <div className="character-status">
          <img 
            src={characters.find(c => c.id === selectedCharacter)?.image} 
            alt="Character"
            className="status-char-img"
          />
          <div className="progress-info-quiz">
            <div className="progress-bar-quiz">
              <div 
                className="progress-fill-quiz" 
                style={{ width: `${((currentQuestionIndex + 1) / dragQuestions.length) * 100}%` }}
              ></div>
            </div>
            <span>Soal {currentQuestionIndex + 1}/{dragQuestions.length}</span>
          </div>
        </div>

        <div className="drag-drop-container">
          {!isAnswered ? (
            <div className="drag-active-question">
              <div className="drag-question-card">
                <div className="drag-question-text">
                  <span className="drag-question-icon">🎯</span>
                  <h3>{currentDragItem?.soal}</h3>
                </div>
                {currentDragItem?.gambar && (
                  <img src={currentDragItem.gambar} alt="Soal" className="drag-soal-img" />
                )}
              </div>

              <div className="drag-options-container">
                <p className="drag-instruction">✨ Pilih angka yang tepat untuk menjawab soal di atas ✨</p>
                <div className="drag-numbers-grid">
                  {currentDragItem?.options.map((num) => (
                    <button
                      key={num}
                      className={`drag-number-btn ${selectedDragAnswer === num ? 'selected' : ''}`}
                      onClick={() => handleSelectDragNumber(num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                
                <button 
                  className="btn-submit-drag"
                  onClick={handleSubmitDragAnswer}
                  disabled={!selectedDragAnswer}
                >
                  ✨ Jawab ✨
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="drag-question-card">
                <div className="drag-question-text">
                  <span className="drag-question-icon">🎯</span>
                  <h3>{currentDragItem?.soal}</h3>
                </div>
                {currentDragItem?.gambar && (
                  <img src={currentDragItem.gambar} alt="Soal" className="drag-soal-img" />
                )}
              </div>
              
              <div className={`feedback-overlay ${userAnswerData?.isCorrect ? 'correct-feedback' : 'wrong-feedback'}`}>
                <img 
                  src={userAnswerData?.isCorrect ? '/assets/images/feedback/correct-badge.png' : '/assets/images/feedback/wrong-badge.png'} 
                  alt={userAnswerData?.isCorrect ? 'Benar' : 'Salah'}
                  className="feedback-img"
                  onError={(e) => e.target.style.display = 'none'}
                />
                <p>
                  {userAnswerData?.isCorrect 
                    ? '✅ Benar! +10 Poin' 
                    : `❌ Salah! Jawaban: ${userAnswerData?.correctAnswer}`}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Render soal biasa (multiple choice: Hutan, Kebun, Pasar)
  return (
    <div className="quiz-screen">
      <img src={currentLevel?.bg || "/assets/images/bg/bggame.png"} alt="World" className="game-bg" />
      
      <div className="screen-header">
        <button className="btn-home" onClick={handleBackToLevelSelect}>
          <img src="/assets/images/buttons/btn-back.png" alt="Back" />
        </button>
        <div className="level-info">
          <span className="level-icon">{currentLevel?.icon}</span>
          <span className="level-name">{currentLevel?.world}</span>
        </div>
        <div className="score-badge">
          <img src="/assets/images/icons/star.png" alt="Star" />
          <span>{score}</span>
        </div>
      </div>

      <div className="character-status">
        <img 
          src={characters.find(c => c.id === selectedCharacter)?.image} 
          alt="Character"
          className="status-char-img"
        />
        <div className="progress-info-quiz">
          <div className="progress-bar-quiz">
            <div 
              className="progress-fill-quiz" 
              style={{ width: `${((currentQuestionIndex + 1) / currentLevel.questions.length) * 100}%` }}
            ></div>
          </div>
          <span>Soal {currentQuestionIndex + 1}/{currentLevel.questions.length}</span>
        </div>
      </div>

      <div className="quiz-content">
        <div className="question-card">
          <div className="question-header">
            {currentQuestion?.petunjuk && (
              <div className="petunjuk-box">
                <span className="petunjuk-icon">💡</span>
                <span className="petunjuk-text">{currentQuestion.petunjuk}</span>
              </div>
            )}
            <h3 className="question-text">{currentQuestion?.soal}</h3>
            {currentQuestion?.gambar && (
              <img src={currentQuestion.gambar} alt="Soal" className="soal-gambar" />
            )}
          </div>

          <div className="options-grid">
            {currentQuestion?.pilihan.map((option, idx) => (
              <button
                key={idx}
                className={`option-btn ${
                  showFeedback && option === currentQuestion.jawaban ? 'correct' : ''
                }`}
                onClick={() => handleAnswer(option)}
                disabled={showFeedback}
              >
                <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className={`feedback-popup ${isCorrect ? 'correct-popup' : 'wrong-popup'}`}>
              <img 
                src={isCorrect ? '/assets/images/feedback/correct-badge.png' : '/assets/images/feedback/wrong-badge.png'} 
                alt="Feedback"
                onError={(e) => e.target.style.display = 'none'}
              />
              <p>{isCorrect ? '✨ Benar! +10 Poin ✨' : `💔 Salah! Jawaban: ${currentQuestion?.jawaban}`}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;