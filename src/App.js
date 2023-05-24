import './App.css';
import Navbar from './Components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/Notes/NotesState';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Landing_Page from './Components/Landing_Page';
// import TestingContext from './Components/TestingContext';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Landing_Page />} />
            <Route exact path='/notes' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
