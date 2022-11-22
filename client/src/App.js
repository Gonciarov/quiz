import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Play from './components/quiz/Play';
import Menu from './components/quiz/Menu';
import Results from './components/quiz/Results';


function App() {
  return (
    <Router>
      <Routes>

<Route path="/" exact element={<Home/>}/>
<Route path="/play/instructions" exact element={<Menu/>}/>
{/* <Route path="/play/quiz" exact element={<Play/>}/> */}
<Route path="/results" exact element={<Results/>}/>
<Route path="/:name" element={<Play/>}/>
</Routes></Router>
 
  );
}

export default App;
