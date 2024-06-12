import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Fragment, useState } from 'react';
import { Navbar } from './components/Navbar';

function App() {

  const [darkMode, setDarkMode] = useState(true);
  const [clickedLink, setcliCkedLink] = useState(false);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Fragment>
      <div className={`${darkMode && 'dark'} container mx-auto`}>
        <Router>
          <div>
            <Navbar darkMode={darkMode} handleDarkMode={handleDarkMode}/>
          </div>
        </Router>
      </div>
    </Fragment>
  );
}

export default App;
