import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Play from './components/Play'
import QuizInstructions from './components/quiz/QuizInstructions';


function App() {
  return (
    <Router>
      <Routes>

<Route path="/" exact element={<Home/>}/>
<Route path="/play/quiz" exact element={<Play/>}/>
<Route path="/play/instructions" exact element={<QuizInstructions/>}/>
     </Routes>
</Router>
 

 
  );
}

export default App;
