import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Instructions from './components/Instructions';

function App() {
  return (
    <Router>
      <Routes>
<Route path="/" element={<Home/>}/>
<Route path="/play/instructions" element={<Instructions/>}/>
</Routes>
</Router>
 
  );
}

export default App;
