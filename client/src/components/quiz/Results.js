import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import Dialog from './Dialog';

function Results({quizName, numberOfQuestions, correctAnswers, wrongAnswers}) {
  let [isOpen, setIsopen] = useState(false);
  let result = Math.trunc(100 * correctAnswers / numberOfQuestions)

  function handleDialogClose() {
    document.getElementById('results-button-container').classList.remove("mute");
    setIsopen(false);
}

  function openDialog(e) {
      document.getElementById('results-button-container').classList.add("mute");
      setIsopen(true);
  }

  function handleSubmit(e) {
   
  openDialog();
  
  }

  return (
    <div>
       <div id="results" className="results">
      
       <h1>Your result: {result}%</h1>
      
<p>Questions total: {numberOfQuestions}</p>
<p>Correct answers: {correctAnswers}</p>
<p>Wrong answers: {wrongAnswers}</p>


   </div>
   <div id="results-button-container">
      <Link className='play-button' to="/menu"><button id="resultsquit-button">Quit</button></Link>
      <button id="record" onClick={handleSubmit}>Save</button> 
  </div>
  
    <Dialog isOpen={isOpen} quizName={quizName} result={result} onClose={handleDialogClose}>
       
    </Dialog>
   </div>
  )
}

export default Results;
