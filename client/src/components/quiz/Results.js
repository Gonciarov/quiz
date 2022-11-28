import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';

function Results({score, numberOfQuestions, correctAnswers, wrongAnswers}) {
  let navigate = useNavigate();
  let result = Math.trunc(100 * correctAnswers / numberOfQuestions)

  function handleSubmit(e) {
  let name = prompt('What is your name?');
   const requestOptions = {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({result: result.toString() + '%', name: name})
   };
   fetch(`http://localhost:5000/save-result`, requestOptions);
   M.toast({
    html: 'Congrats! Saved to Hall of Fame!',
    classes: 'toast-saved',
    displayLength: 1500
});
   navigate('/play/instructions')
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
      <Link className='play-button' to="/play/instructions"><button id="resultsquit-button">Quit</button></Link>
      <button id="record" onClick={handleSubmit}>Save</button> 
  </div>
   
   </div>
  )
}

export default Results;
