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
      <div className={`${darkMode && 'dark'} container mx-auto`}>
        <Router>
          <div className='grid grid-cols-4 py-8'>
            <div className='bg-black text-white rounded-l-xl'>
              <Navbar darkMode={darkMode} handleDarkMode={handleDarkMode} />
            </div>

            <div className='col-span-3 py-12 px-8 bg-neutral-900 text-white rounded-e-xl'>
              <Routes>
                <Route exact path="/todo" element={<ToDos/>}/>
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
