import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';

import QuizInstructions from './components/quiz/QuizInstructions';


function App() {
  return (
    <Router>
      <Routes>

<Route path="/" exact element={<Home/>}/>
<Route path="/play/instructions" exact element={<QuizInstructions/>}/>


 
  );
}

export default App;
