import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Fragment, useState } from 'react';
import { Navbar } from './components/Navbar';
import { ToDos } from './components/ToDos'
import { Done } from './components/Done'
import { Deleted } from './components/Deleted'

function App() {

  const [darkMode, setDarkMode] = useState(true);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Fragment>
      <div className={`${darkMode && 'dark'}`}>
        <Router>
          <div className='grid grid-cols-1 lg:grid-cols-4'>
            <div className='bg-blue-900 dark:bg-black text-white order-2 lg:order-1'>
              <Navbar darkMode={darkMode} handleDarkMode={handleDarkMode} />
            </div>

            <div className='bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white order-1 lg:order-2 lg:col-span-3 px-8'>
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
