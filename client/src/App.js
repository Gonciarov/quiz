import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Play from './components/quiz/Play';
import Menu from './components/quiz/Menu';
import Start from './components/quiz/Start';
import Results from './components/quiz/Results';
import Hof from './components/Hof';


function App() {
  return (
    <Router>
      <Routes>

<Route path="/" exact element={<Home/>}/>
<Route path="/play/instructions" exact element={<Menu/>}/>
<Route path="/play/start" exact element={<Start/>}/>
<Route path="/results" exact element={<Results/>}/>
<Route path="/:name" element={<Play/>}/>
<Route path="/hall-of-fame" exact element={<Hof/>}/>
</Routes></Router>
 
  );
}

export default App;
