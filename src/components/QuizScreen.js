import React, { useState, useEffect } from 'react';
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
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  // State untuk modal custom
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalIcon, setModalIcon] = useState('');
  
  // State untuk sistem kunci level - ambil dari localStorage
  const [unlockedLevels, setUnlockedLevels] = useState(() => {
    const saved = localStorage.getItem('unlockedLevels');
    return saved ? JSON.parse(saved) : ['level1'];
  });
  const [completedLevels, setCompletedLevels] = useState(() => {
    const saved = localStorage.getItem('completedLevels');
    return saved ? JSON.parse(saved) : [];
  });

  // Simpan ke localStorage setiap kali ada perubahan
  useEffect(() => {
    localStorage.setItem('unlockedLevels', JSON.stringify(unlockedLevels));
  }, [unlockedLevels]);

  useEffect(() => {
    localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
  }, [completedLevels]);

  const currentLevel = selectedLevel ? levels.find(l => l.id === selectedLevel) : null;
  const currentQuestion = currentLevel?.questions[currentQuestionIndex];
  const isDragDropLevel = currentLevel?.type === 'drag-drop';
  const isLastQuestion = currentLevel && currentQuestionIndex === currentLevel.questions.length - 1;
  
  const dragQuestions = currentLevel?.questions || [];
  const currentDragItem = dragQuestions[currentQuestionIndex];

  // Fungsi untuk menampilkan modal custom
  const showCustomModal = (title, message, icon, isError = false) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalIcon(icon);
    setShowModal(true);
    
    if (!isError) {
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }
  };

  // Cek apakah level terkunci
  const isLevelLocked = (levelId) => {
    return !unlockedLevels.includes(levelId);
  };

  // Buka level berikutnya
  const unlockNextLevel = (currentLevelId) => {
    const currentIndex = levels.findIndex(l => l.id === currentLevelId);
    const nextLevel = levels[currentIndex + 1];
    if (nextLevel && !unlockedLevels.includes(nextLevel.id)) {
      setUnlockedLevels(prev => [...prev, nextLevel.id]);
      showCustomModal('🎉 Selamat! 🎉', `Level ${nextLevel.world} telah terbuka! Lanjutkan petualanganmu!`, '🔓');
    }
    if (!completedLevels.includes(currentLevelId)) {
      setCompletedLevels(prev => [...prev, currentLevelId]);
    }
  };

  // Handle pilih karakter
  const handleSelectCharacter = (characterId) => {
    soundManager.play('click');
    setSelectedCharacter(characterId);
    setQuizStep('selectLevel');
  };

  // Handle pilih level (cek kunci)
  const handleSelectLevel = (levelId) => {
    if (isLevelLocked(levelId)) {
      soundManager.play('wrong');
      showCustomModal('🔒 Level Terkunci', 'Selesaikan level sebelumnya terlebih dahulu untuk membuka level ini!', '🔒', true);
      return;
    }
    soundManager.play('click');
    setSelectedLevel(levelId);
    setQuizStep('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
    setDragAnswers({});
    setSelectedDragAnswer(null);
    setSelectedAnswer(null);
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
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  const handleBackToHome = () => {
    soundManager.play('click');
    onBack();
  };

  // Handle jawab soal biasa
  const handleAnswer = (selected) => {
    if (showFeedback) return;
    
    setSelectedAnswer(selected);
    const correct = selected === currentQuestion.jawaban;
    
    if (correct) {
      soundManager.play('correct');
      setScore(score + 10);
      setIsCorrect(true);
      setShowFeedback(true);
      
      setTimeout(() => {
        if (isLastQuestion) {
          unlockNextLevel(selectedLevel);
          setQuizStep('selectLevel');
          setSelectedLevel(null);
          setCurrentQuestionIndex(0);
          setShowFeedback(false);
          setIsCorrect(false);
          setSelectedAnswer(null);
          soundManager.play('complete');
          showCustomModal('🎉 Hebat! 🎉', `Kamu berhasil menyelesaikan ${currentLevel?.world}!`, '🏆');
        } else {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setShowFeedback(false);
          setIsCorrect(false);
          setSelectedAnswer(null);
        }
      }, 1500);
    } else {
      soundManager.play('wrong');
      setIsCorrect(false);
      setShowFeedback(true);
      
      setTimeout(() => {
        setShowFeedback(false);
      }, 1500);
    }
  };

  // Handle pilih jawaban drag drop
  const handleSelectDragNumber = (number) => {
    if (dragAnswers[currentDragItem?.id]) return;
    setSelectedDragAnswer(number);
  };

  // Handle submit jawaban drag drop
  const handleSubmitDragAnswer = () => {
    if (!selectedDragAnswer) {
      showCustomModal('⚠️ Peringatan', 'Pilih dulu angka jawabannya!', '⚠️', true);
      return;
    }
    
    const isAnswerCorrect = selectedDragAnswer === currentDragItem.jawaban;
    
    if (isAnswerCorrect) {
      soundManager.play('correct');
      setScore(prev => prev + 10);
      setIsCorrect(true);
      
      setDragAnswers(prev => ({
        ...prev,
        [currentDragItem.id]: { 
          answer: selectedDragAnswer, 
          isCorrect: true, 
          correctAnswer: currentDragItem.jawaban 
        }
      }));
      
      setShowFeedback(true);
      
      setTimeout(() => {
        if (isLastQuestion) {
          unlockNextLevel(selectedLevel);
          setQuizStep('selectLevel');
          setSelectedLevel(null);
          setCurrentQuestionIndex(0);
          setSelectedDragAnswer(null);
          setShowFeedback(false);
          setIsCorrect(false);
          soundManager.play('complete');
          showCustomModal('🎉 Hebat! 🎉', `Kamu berhasil menyelesaikan ${currentLevel?.world}!`, '🏆');
        } else {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedDragAnswer(null);
          setShowFeedback(false);
          setIsCorrect(false);
        }
      }, 1500);
    } else {
      soundManager.play('wrong');
      setIsCorrect(false);
      setShowFeedback(true);
      
      setTimeout(() => {
        setShowFeedback(false);
      }, 1500);
    }
  };

  // Reset semua progres
  const handleResetProgress = () => {
    soundManager.play('click');
    showCustomModal('⚠️ Reset Progres', 'Yakin ingin mereset semua progres? Level akan terkunci semua kecuali level 1.', '⚠️', true);
  };

  const confirmReset = () => {
    setUnlockedLevels(['level1']);
    setCompletedLevels([]);
    localStorage.setItem('unlockedLevels', JSON.stringify(['level1']));
    localStorage.setItem('completedLevels', JSON.stringify([]));
    setShowModal(false);
    showCustomModal('✅ Sukses!', 'Progres berhasil direset!', '✅');
  };

  const handlePlayAgain = () => {
    soundManager.play('click');
    setQuizStep('selectCharacter');
    setSelectedCharacter(null);
    setSelectedLevel(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setDragAnswers({});
    setSelectedDragAnswer(null);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setUnlockedLevels(['level1']);
    setCompletedLevels([]);
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
          
          <button className="btn-reset-progress" onClick={handleResetProgress}>
            🔄 Reset Semua Progres
          </button>
        </div>
        
        {showModal && (
          <div className="custom-modal-overlay" onClick={() => setShowModal(false)}>
            <div className="custom-modal">
              <div className="custom-modal-icon">{modalIcon}</div>
              <h3 className="custom-modal-title">{modalTitle}</h3>
              <p className="custom-modal-message">{modalMessage}</p>
              {modalTitle.includes('Reset') && (
                <div className="custom-modal-buttons">
                  <button className="modal-btn-cancel" onClick={() => setShowModal(false)}>Batal</button>
                  <button className="modal-btn-confirm" onClick={confirmReset}>Ya, Reset</button>
                </div>
              )}
              {!modalTitle.includes('Reset') && (
                <button className="modal-btn-close" onClick={() => setShowModal(false)}>OK</button>
              )}
            </div>
          </div>
        )}
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
            {levels.map(level => {
              const isLocked = isLevelLocked(level.id);
              const isCompleted = completedLevels.includes(level.id);
              
              return (
                <button
                  key={level.id}
                  className={`level-card ${isLocked ? 'level-locked' : ''} ${isCompleted ? 'level-completed' : ''}`}
                  onClick={() => handleSelectLevel(level.id)}
                  style={{ borderColor: level.color, opacity: isLocked ? 0.7 : 1 }}
                >
                  <div className="level-icon" style={{ background: isLocked ? '#999' : level.color }}>
                    {isLocked ? '🔒' : (isCompleted ? '✅' : level.icon)}
                  </div>
                  <div className="level-info-text">
                    <h3>{level.world}</h3>
                    <p>{level.description}</p>
                    {isLocked && <span className="locked-badge">🔒 Terkunci</span>}
                    {isCompleted && <span className="completed-badge">✅ Selesai</span>}
                    {!isLocked && !isCompleted && <span className="unlocked-badge">🔓 Tersedia</span>}
                  </div>
                  <div className="level-arrow" style={{ color: level.color }}>
                    {isLocked ? '🔒' : '→'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Render DRAG & DROP
  if (isDragDropLevel) {
    const isAnswered = dragAnswers[currentDragItem?.id] !== undefined;
    const userAnswerData = dragAnswers[currentDragItem?.id];
    const answeredCount = Object.keys(dragAnswers).length;

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

        {/* PROGRESS BAR KEREN */}
        <div className="progress-bar-container">
          <div className="progress-bar-wrapper">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${(answeredCount / dragQuestions.length) * 100}%` }}
            >
              <div className="progress-bar-glow"></div>
            </div>
          </div>
          <div className="progress-bar-text">
            <span className="progress-current">{answeredCount}</span>
            <span className="progress-sep">/</span>
            <span className="progress-total">{dragQuestions.length}</span>
            <span className="progress-label">Soal Selesai</span>
          </div>
        </div>

        <div className="character-status">
          <img 
            src={characters.find(c => c.id === selectedCharacter)?.image} 
            alt="Character"
            className="status-char-img"
          />
          <div className="level-badge">
            <span className="level-badge-icon">⭐</span>
            <span className="level-badge-text">Level {currentLevel?.name}</span>
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
                    : '❌ Salah! Coba lagi!'}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Render soal biasa (multiple choice) - DENGAN PROGRESS BAR KEREN
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

      {/* PROGRESS BAR KEREN */}
      <div className="progress-bar-container">
        <div className="progress-bar-wrapper">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${((currentQuestionIndex + 1) / currentLevel.questions.length) * 100}%` }}
          >
            <div className="progress-bar-glow"></div>
          </div>
        </div>
        <div className="progress-bar-text">
          <span className="progress-current">{currentQuestionIndex + 1}</span>
          <span className="progress-sep">/</span>
          <span className="progress-total">{currentLevel.questions.length}</span>
          <span className="progress-label">Soal</span>
        </div>
      </div>

      <div className="character-status">
        <img 
          src={characters.find(c => c.id === selectedCharacter)?.image} 
          alt="Character"
          className="status-char-img"
        />
        <div className="level-badge">
          <span className="level-badge-icon">⭐</span>
          <span className="level-badge-text">Level {currentLevel?.name}</span>
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
            {currentQuestion?.pilihan.map((option, idx) => {
              const isUserSelected = selectedAnswer === option;
              const isWrongSelected = showFeedback && !isCorrect && isUserSelected;
              const isCorrectSelected = showFeedback && isCorrect && isUserSelected;
              
              return (
                <button
                  key={idx}
                  className={`option-btn ${
                    isWrongSelected ? 'wrong-selected' : ''
                  } ${
                    isCorrectSelected ? 'correct-selected' : ''
                  }`}
                  onClick={() => handleAnswer(option)}
                  disabled={showFeedback}
                >
                  <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                  <span className="option-text">{option}</span>
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className={`feedback-popup ${isCorrect ? 'correct-popup' : 'wrong-popup'}`}>
              <img 
                src={isCorrect ? '/assets/images/feedback/correct-badge.png' : '/assets/images/feedback/wrong-badge.png'} 
                alt="Feedback"
                onError={(e) => e.target.style.display = 'none'}
              />
              <p>
                {isCorrect 
                  ? '✨ Benar! +10 Poin ✨' 
                  : '❌ Salah! Coba lagi!'}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal Custom */}
      {showModal && (
        <div className="custom-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="custom-modal">
            <div className="custom-modal-icon">{modalIcon}</div>
            <h3 className="custom-modal-title">{modalTitle}</h3>
            <p className="custom-modal-message">{modalMessage}</p>
            <button className="modal-btn-close" onClick={() => setShowModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;