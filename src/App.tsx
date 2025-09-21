import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CarAnalyzer } from './components/carAnaliz';
import Bars from './ui/bars';
import Userfront from '@userfront/core';

import ButtonAppBar from './ui/menu';
import MainPage from './components/MainPage';

Userfront.init('9ny7m4yn');

function App() {
  return (
    <>
      <Router>
        <ButtonAppBar />
        <MainPage />
      </Router>
    </>
  );
}

export default App;
