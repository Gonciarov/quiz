import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Play from './components/quiz/Play';
import Instructions from './components/quiz/Instructions';


function App() {
  return (
    <Router>
      <Routes>

<Route path="/" exact element={<Home/>}/>
<Route path="/play/instructions" exact element={<Instructions/>}/>
<Route path="/play/quiz" exact element={<Play/>}/>

</Routes></Router>
 
  );
}

export default App;
