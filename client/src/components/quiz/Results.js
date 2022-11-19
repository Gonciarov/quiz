import React from 'react';

function Results({score, numberOfQuestions, correctAnswers, wrongAnswers}) {
  return (
       <div id="results" className="results">
      
       <h1>Your result: {Math.trunc(100 * correctAnswers / numberOfQuestions)}%</h1>
      
<p>Questions total: {numberOfQuestions}</p>
<p>Correct answers: {correctAnswers}</p>
<p>Wrong answers: {wrongAnswers}</p>
   </div>
  )
}

export default Results;
