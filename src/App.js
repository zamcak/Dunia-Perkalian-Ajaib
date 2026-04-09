import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import MateriScreen from './components/MateriScreen';
import QuizScreen from './components/QuizScreen';
import VideoScreen from './components/VideoScreen';
import RangkumanScreen from './components/RangkumanScreen';
import DeveloperScreen from './components/DeveloperScreen';
import CPTPScreen from './components/CPTPScreen';
import './styles/global.css';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('home');

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  switch (currentScreen) {
    case 'home':
      return <HomeScreen onNavigate={setCurrentScreen} />;
    case 'materi':
      return <MateriScreen onBack={() => setCurrentScreen('home')} />;
    case 'quiz':
      return <QuizScreen onBack={() => setCurrentScreen('home')} />;
    case 'video':
      return <VideoScreen onBack={() => setCurrentScreen('home')} />;
    case 'rangkuman':
      return <RangkumanScreen onBack={() => setCurrentScreen('home')} />;
    case 'developer':
      return <DeveloperScreen onBack={() => setCurrentScreen('home')} />;
    case 'cptp':
        return <CPTPScreen onBack={() => setCurrentScreen('home')} />;
    default:
      return <HomeScreen onNavigate={setCurrentScreen} />;
  }
};

export default App;