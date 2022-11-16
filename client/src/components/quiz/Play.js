import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDivide, faLightbulb, faClock } from '@fortawesome/free-solid-svg-icons';
import M from 'materialize-css';
import isEmpty from '../../utils/isEmpty';





class Play extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            questions: [],
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hints: 5,
            fiftyFifty: 2,
            usedFiftyFifty: false,
            previousRandomNumbers: [],
            time: {}
        }
    };

    

    componentDidMount () {
        fetch(`http://localhost:5000/test`)
        .then((response) => response.json())
        .then((questions) => this.setState(({questions: questions}), () => {
            this.displayQuestions(
                this.state.questions, 
                this.state.currentQuestion,
                this.state.nextQuestion,
                this.state.previousQuestion)
            })
        )}
    
    
    
    displayQuestions = (
        questions = this.state.questions, 
        currentQuestion, 
        nextQuestion, 
        previousQuestion) => {
            let {currentQuestionIndex} = this.state;
            if (!isEmpty(this.state.questions)) {
                
                currentQuestion = questions[currentQuestionIndex];
                nextQuestion = questions[currentQuestionIndex + 1];
                previousQuestion = questions[currentQuestionIndex - 1];
                const answer = currentQuestion.answer;
                this.setState({
                    currentQuestion,
                    nextQuestion,
                    previousQuestion,
                    answer,
                    usedFiftyFifty: false,
                    previousRandomNumbers: []
                }, () => {
                    this.showOptionsAndFiftyFifty()
                    
                })
            }
        };

handleNextClick = () => {
    if (this.state.nextQuestion !== undefined) {
        this.setState(prevState => ({
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }), () => {
            this.displayQuestions(
                this.state.state, 
                this.state.currentQuestion, 
                this.state.nextQuestion, 
                this.state.previousQuestion
            );
        })
    }
}

handlePreviousClick = () => {
    if (this.state.previousQuestion !== undefined) {
        this.setState(prevState => ({
            currentQuestionIndex: prevState.currentQuestionIndex - 1,
        }), () => {
            this.displayQuestions(
                this.state.state, 
                this.state.currentQuestion, 
                this.state.nextQuestion, 
                this.state.previousQuestion
            );
        })
    }
}

handleQuitClick = () => {
    if(window.confirm('Are you sure?')) {
        window.location.replace('/')
    }
}

handleButtonClick = (e) => {
    switch(e.target.id) {
        case "next-button":
            this.handleNextClick();
            break;
           
        case "previous-button":
            this.handlePreviousClick();
            break;

        case "quit-button":
            this.handleQuitClick();
            break;
            default:
                break;

    }
    
}

  handleOptionClick = (e) => {
   if(e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
       this.correctAnswer()
   } else {
       this.wrongAnswer()
   }
  }

  correctAnswer = () => {
    M.toast({
        html: 'Correct answer!',
        classes: 'toast-valid',
        displayLength: 1500
    });
    this.setState(prevState => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
    }), () => {
        this.displayQuestions(
            this.state.questions, 
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion)
    })
  }

  wrongAnswer = () => {
    M.toast({
        html: 'Wrong answer!',
        classes: 'toast-invalid',
        displayLength: 1500
    });

    this.setState(prevState => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
    }), () => {
        this.displayQuestions(
            this.state.questions, 
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion)
    })
  }

  showOptionsAndFiftyFifty = () => {
      const options = Array.from(document.querySelectorAll('.option'));
      options.forEach((option => {
          option.style.display = "block"
      }))
      this.showFiftyFifty();
  }

  showFiftyFifty = () => {
    document.getElementById('lifeline-area').style.display = "block";
    document.getElementById('lifeline-hints').style.display = "block";
    document.getElementById('replace').style.display = "none";
}
  
handleHints = () => {
    document.getElementById('lifeline-area').style.display = "none";
    if (this.state.hints > 0){
    const options = Array.from(document.querySelectorAll('.option'))
    let indexOfAnswer;
    options.forEach((option, index) => {
        if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            indexOfAnswer = index;
        }
    })
    while (true) {
        const randomNumber = Math.round(Math.random() * options.length);
        if (randomNumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)) {
            options.forEach((option, index) => {
                if (index === randomNumber) {
                    option.style.display = 'none';
                    this.setState((prevState) => ({
                        hints: prevState.hints - 1,
                        previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumber)
                    }));
                }
               
            });
            break;
        }
        if (this.state.previousRandomNumbers.length >=3) break;
    }
}
console.log(this.state.previousRandomNumbers)
}



handleFiftyFifty = () => {
    
    document.getElementById('lifeline-hints').style.display = "none";
    document.getElementById('replace').style.display = "block";
    if (!this.state.usedFiftyFifty) {
        const options = Array.from(document.querySelectorAll('.option'))
        let indexOfAnswer;
        let badIndexes = [];
        options.forEach((option, index)=> {
            if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                indexOfAnswer = index;
            } else {
                badIndexes.push(index)
            };
        });
        badIndexes = badIndexes.sort((a,b) => 0.5 -Math.random())
        console.log(badIndexes)
    document.getElementById('lifeline-area').style.display = "none";
    for (let i = 0; i<badIndexes.length -1; i++) {
        options[badIndexes[i]].style.display = "none"
        }
    
    
    }
}


   render() {
       
       const { currentQuestion, hints } = this.state;
       return (
        <Fragment>
            <Helmet><title>Quiz Page</title></Helmet>
                <div className="questions" data-testid="questions">
                    <div className="lifeline-container">
                    <div><p id="lifeline-area" onClick={this.handleFiftyFifty} className="lifeline-fifty-fifty"><FontAwesomeIcon icon={faDivide} />
                        2
                    </p><p id="replace">.</p></div>
                    <p></p>
                
       <div><p id="lifeline-hints" className="lifeline-hints" onClick={this.handleHints}><FontAwesomeIcon  icon={faLightbulb} /><span className="lifeline">{hints}</span></p>
                    </div></div>
                    <div>
                        <p><span className="right"><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> 2:15</span></p>
                        <p><span className="left">1 of 15</span></p>
                    </div>
       <h5>{currentQuestion.question}</h5>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className = "option">{currentQuestion.option1}</p>
                        <p onClick={this.handleOptionClick} className = "option">{currentQuestion.option2}</p>
                        <p onClick={this.handleOptionClick} className = "option">{currentQuestion.option3}</p>
                        <p onClick={this.handleOptionClick} className = "option">{currentQuestion.option4}</p>
                    </div>
                
                <div className="button-container">
                    <button id="previous-button" onClick={this.handleButtonClick}>Previous</button>
                    <button id="next-button" onClick={this.handleButtonClick}>Next</button>
                    <button id="quit-button" onClick={this.handleButtonClick}>Quit</button>
                </div>
                </div>
        </Fragment>
       );
   };
};

export default Play;