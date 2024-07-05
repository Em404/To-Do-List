import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ToDos } from './components/ToDos'
import { Done } from './components/Done'
import { Deleted } from './components/Deleted'

function App() {

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('dark-mode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : true;
  });

  // Set dark mode state to localStorage
  useEffect(() => {
    localStorage.setItem('dark-mode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Fragment>
      <div className={`${darkMode && 'dark'}`}>
        <Router>
          <div className='grid grid-cols-1 lg:grid-cols-4 
          bg-gradient-to-b lg:bg-gradient-to-l
          from-neutral-50 from-30% via-purple-800 via-80% to-purple-950 to-100%
          dark:from-neutral-950 dark:from-30% dark:via-purple-950 dark:via-80% dark:to-purple-800 dark:to-100%
          h-screen lg:h-full'>
            <div className='text-white order-2 lg:order-1 h-[10vh] lg:h-screen'>
              <Navbar darkMode={darkMode} handleDarkMode={handleDarkMode} />
            </div>

            <div className='text-white order-1 lg:order-2 lg:col-span-3 h-[90vh] lg:h-screen'>
              <Routes>
                <Route exact path="/" element={<ToDos/>}/>
                <Route exact path="/done" element={<Done/>}/>
                <Route exact path="/deleted" element={<Deleted/>}/>
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </Fragment>
  );
}

export default App;
