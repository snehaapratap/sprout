import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import CameraScreen from './src/screens/CameraScreen';
import ResultScreen from './src/screens/ResultScreen';
import VictoryScreen from './src/screens/VictoryScreen';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [category, setCategory] = useState(null);
  const [foundItems, setFoundItems] = useState([]);
  const [lastResult, setLastResult] = useState(null);

  const handleSelectCategory = (cat) => {
    setCategory(cat);
    setFoundItems([]);
    setScreen('camera');
  };

  const handleResult = (result) => {
    setLastResult(result);
    if (result.match) {
      const newItems = [
        ...foundItems,
        { photo: result.photo, label: result.match.label },
      ];
      setFoundItems(newItems);
    }
    setScreen('result');
  };

  const handleContinue = () => {
    if (lastResult?.match && foundItems.length >= 5) {
      setScreen('victory');
    } else {
      setScreen('camera');
    }
  };

  const handlePlayAgain = () => {
    setCategory(null);
    setFoundItems([]);
    setLastResult(null);
    setScreen('home');
  };

  const handleBack = () => {
    setScreen('home');
    setCategory(null);
    setFoundItems([]);
  };

  return (
    <>
      <StatusBar style="auto" />
      {screen === 'home' && (
        <HomeScreen onSelectCategory={handleSelectCategory} />
      )}
      {screen === 'camera' && (
        <CameraScreen
          category={category}
          foundItems={foundItems}
          onResult={handleResult}
          onBack={handleBack}
        />
      )}
      {screen === 'result' && lastResult && (
        <ResultScreen
          category={category}
          photo={lastResult.photo}
          match={lastResult.match}
          foundCount={foundItems.length}
          onContinue={handleContinue}
        />
      )}
      {screen === 'victory' && (
        <VictoryScreen
          category={category}
          foundItems={foundItems}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </>
  );
}
