import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDivide, faLightbulb, faClock } from '@fortawesome/free-solid-svg-icons';
import M from 'materialize-css';
import isEmpty from '../../utils/isEmpty';
import withRouter from '../../utils/withRouter';
import classnames from 'classnames';
import Results from './Results'



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
            nextButtonDisabled: false,
            previousButtonDisabled: true,
            previousRandomNumbers: [],
            time: {minutes: 0, seconds: 0},
            completed: false
        }
        this.interval = null
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
        ).then(this.startTimer())
       
    }

    componentWillUnmount(){
        clearInterval(this.interval);
      }
    
    
    
    displayQuestions = (
        questions = this.state.questions, 
        currentQuestion, 
        nextQuestion, 
        previousQuestion) => {
            
            let {currentQuestionIndex} = this.state;
            if (!isEmpty(this.state.questions)) {
                let numberOfQuestions = questions.length;
                currentQuestion = questions[currentQuestionIndex];
                nextQuestion = questions[currentQuestionIndex + 1];
                previousQuestion = questions[currentQuestionIndex - 1];
                const answer = currentQuestion.answer;
                this.setState({
                    currentQuestion,
                    previousQuestion,
                    numberOfQuestions,
                    answer,
                    usedFiftyFifty: false,
                    previousRandomNumbers: []
                }, () => {
                    this.showOptionsAndFiftyFifty();
                    this.handleDisableButton()
                })
            }
        };

handleNextClick = () => {
    if (this.state.nextQuestion !== undefined) {
        if(this.state.currentQuestionIndex !== this.state.questions.length - 1) {
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
    } else {
        this.setState(prevState => ({
            currentQuestionIndex: prevState.currentQuestionIndex,
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
        this.props.navigate('/')
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
    let add;
    this.state.currentQuestionIndex !== this.state.questions.length - 1 ? add = 1 : add = 0;
    this.setState(prevState => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + add,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
    }), () => {
        if (this.state.numberOfAnsweredQuestions === this.state.questions.length) {
            clearInterval(this.interval);
            this.setState({
                time: {
                    minutes: 0,
                    seconds: 0
                }
            }, () => {
                this.endGame("Time out!")
            })
        } else {
        this.displayQuestions(
            this.state.questions, 
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion)
        }
    })
  }

  wrongAnswer = () => {
    M.toast({
        html: 'Wrong answer!',
        classes: 'toast-invalid',
        displayLength: 1500
    });
    let add;
    this.state.currentQuestionIndex !== this.state.questions.length - 1 ? add = 1 : add = 0;
    this.setState(prevState => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + add,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
    }), () => {
        if (this.state.numberOfAnsweredQuestions === this.state.questions.length) {
            clearInterval(this.interval);
            this.setState({
                time: {
                    minutes: 0,
                    seconds: 0
                }
            }, () => {
                this.endGame("Time out!")
            })
        } else {
        this.displayQuestions(
            this.state.questions, 
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion)
        }
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

}



handleFiftyFifty = () => {
    
    document.getElementById('lifeline-hints').style.display = "none";
    document.getElementById('replace').style.display = "block";
    if (!this.state.usedFiftyFifty) {
        const options = Array.from(document.querySelectorAll('.option'))
       
        let badIndexes = [];
        options.forEach((option, index)=> {
            if (option.innerHTML.toLowerCase() !== this.state.answer.toLowerCase()) {
                badIndexes.push(index)
            }
        });
        badIndexes = badIndexes.sort((a,b) => 0.5 -Math.random())
    document.getElementById('lifeline-area').style.display = "none";
    for (let i = 0; i<badIndexes.length -1; i++) {
        options[badIndexes[i]].style.display = "none"
        }
    
    
    }
}

startTimer = () => {
    const countDownTime = Date.now() + 182000;
    this.interval = setInterval(() => {
        const now = new Date();
        const distance = countDownTime - now;
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (distance < 0 || this.completed === true) {
            clearInterval(this.interval);
            this.setState({
                time: {
                    minutes: 0,
                    seconds: 0
                }
            }, () => {
                this.endGame("Time out!")
            })
        } else {
            this.setState({
                time: {
                    minutes,
                    seconds
                }
            })
        }
    }, 1000);
}

handleDisableButton = () => {
    if (this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0) {    
        this.setState(
            {
                previousButtonDisabled: true
            }
        )
    } else {
        this.setState(
            {
                previousButtonDisabled: false
            }
        )
    }
    if (this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions) {    
        this.setState(
            {
                nextButtonDisabled: true
            }
        )
    } else {
        this.setState(
            {
                nextButtonDisabled: false
            }
        )
    }
}

displayResults = () => {
    document.getElementById("questions").style.display = "none";
    document.getElementById("results").style.display = "block";
}

endGame = (message) => {
    this.setState({completed: true})
    setTimeout(() => {
        this.displayResults();
    }, 1000)
}

   render() {
       
       const { currentQuestion, hints, time, numberOfQuestions, currentQuestionIndex } = this.state;
       return (
        <Fragment>
            <Helmet><title>Quiz Page</title></Helmet>
            <div>
                <div id="questions" className="questions" data-testid="questions">
                    <div className="lifeline-container">
                    <div><p id="lifeline-area" onClick={this.handleFiftyFifty} className="lifeline-fifty-fifty"><FontAwesomeIcon icon={faDivide} />
                        2
                    </p><p id="replace">.</p></div>
                    <p></p>
                
       <div><p id="lifeline-hints" className="lifeline-hints" onClick={this.handleHints}><FontAwesomeIcon  icon={faLightbulb} /><span className="lifeline">{hints}</span></p>
                    </div></div>
                    <div>
                        <p><span className="right"><FontAwesomeIcon icon={faClock}></FontAwesomeIcon>{time.minutes}:{time.seconds}</span></p>
       <p><span className="left">{currentQuestionIndex + 1} of {numberOfQuestions}</span></p>
                    </div>
       <h5>{currentQuestion.question}</h5>
                    <div className="options-container">
                        <p onClick={this.handleOptionClick} className = "option">{currentQuestion.option1}</p>
                        <p onClick={this.handleOptionClick} className = "option">{currentQuestion.option2}</p>
                        <p onClick={this.handleOptionClick} className = "option">{currentQuestion.option3}</p>
                        <p onClick={this.handleOptionClick} className = "option">{currentQuestion.option4}</p>
                    </div>
                
                <div className="button-container">
                    <button 
                        id="previous-button" 
                        className={classnames('', {'disable':this.state.previousButtonDisabled })}
                        onClick={this.handleButtonClick}>
                        Previous
                        </button>
                    <button 
                        id="next-button" 
                        className={classnames('', {'disable':this.state.nextButtonDisabled })}
                        onClick={this.handleButtonClick}>
                        Next
                        </button>
                    <button id="quit-button" onClick={this.handleButtonClick}>Quit</button>
                </div>
                </div>
                <Results 
                    completed={this.state.completed}
                    seconds = {time.seconds}
                    score={this.state.score}
                    numberOfQuestions={this.state.numberOfQuestions}
                    correctAnswers={this.state.correctAnswers}
                    wrongAnswers={this.state.wrongAnswers}
                />
                </div>
        </Fragment>
       );
   };
};

export default withRouter(Play);