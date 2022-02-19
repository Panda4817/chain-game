import React from 'react';
import Footer from './components/Footer/Footer';
import Grid from './components/Grid/Grid';
import Navbar from './components/Navbar/Navbar';
import HelpModal from './components/HelpModal/HelpModal';

const App = () => {
  console.log("Enjoy playing Chain-Agent! Do not cheat!")
  return (

  <>
    <Navbar />
    <HelpModal />
    <Grid />
    <Footer />
    
  </>
)}

export default App;
