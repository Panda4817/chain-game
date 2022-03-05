import React, {useState} from 'react';
import Footer from './components/Footer/Footer';
import Grid from './components/Grid/Grid';
import Navbar from './components/Navbar/Navbar';
import HelpModal from './components/HelpModal/HelpModal';
import {MIN_GRID} from './constants/gameConstants';
import StatsModal from './components/StatsModal/StatsModal';

console.log("Enjoy playing Chain-Agent! Do not cheat!")

const App = () => {
  
  const [longestChain, setLongestChain] = useState(() => {
    const longestChainString = localStorage.getItem('longestChain');
    return JSON.parse(longestChainString) ?? 0;
  })
  const [biggestGrid, setbiggestGrid] = useState(() => {
      const biggestGridString = localStorage.getItem('biggestGrid');
      return JSON.parse(biggestGridString) ?? MIN_GRID - 1;
  })

  const [scores, setScores] = useState(() => {
    const scoresString = localStorage.getItem('scores');
    return new Map(JSON.parse(scoresString));
  })


  return (

  <>
    <Navbar />
    <HelpModal />
    <StatsModal scores={scores} />
    <Grid 
      longestChain={longestChain}
      setLongestChain={setLongestChain}
      biggestGrid={biggestGrid}
      setbiggestGrid={setbiggestGrid}
      scores={scores}
      setScores={setScores}
    />
    <Footer />
    
  </>
)}

export default App;
