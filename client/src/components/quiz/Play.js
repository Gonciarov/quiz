import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDivide, faLightbulb, faClock, faSpinner } from '@fortawesome/free-solid-svg-icons';
import M from 'materialize-css';
import isEmpty from '../../utils/isEmpty';
import withRouter from '../../utils/withRouter';
import Results from './Results';

class Play extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            quizName: this.props.params.name,
            prisonNumber: this.props.params.prisonNumber,
            questions: [],
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            currentOptions: [],
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hints: 5,
            fiftyFifty: 2,
            usedFiftyFifty: false,
            optionsButtonDisabled: false,
            previousRandomNumbers: [],
            time: {},
            isOpen: false
        }
        this.interval = null
    };

    

    componentDidMount () {
        
        fetch(`http://localhost:5000/quizzes/${this.props.params.name}`)
        .then((response) => response.json())
        .then((data) => this.setState(({questions: data}), () => {
            this.displayQuestions(
                this.state.questions, 
                this.state.currentQuestion,
                this.state.nextQuestion,
                this.state.previousQuestion)
            })) 
        .then(this.startTimer());
       
    }

    componentWillUnmount(){
        clearInterval(this.interval);
      }

    componentDidUpdate() {
       
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
                let currentOptions = this.shuffleArray(currentQuestion.options);
                this.setState({
                    currentQuestion,
                    previousQuestion,
                    numberOfQuestions,
                    currentOptions,
                    answer,
                    previousRandomNumbers: [],
                    optionsButtonDisabled: false,
                }, () => {
                    if (this.state.numberOfAnsweredQuestions < this.state.questions.length) {
                        setTimeout(this.showQuestions, 500);
                        this.showOptions();
                        this.enableHints();
                        if (this.state.usedFiftyFifty === false) {
                            this.showFiftyFifty();
                        }
                    } else {
                        this.displayResults()
                    }

                })
            }
        };



showQuestions = () => {
    document.getElementById("loading").style.display = "none";
    document.getElementById("questions").style.display = "block";
}     

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

  handleContinueClick = (e) => {
   if(e.target.parentElement.id === "comment-correct") {
       this.correctAnswer()
   } else {
       this.wrongAnswer()
   }

   let options = Array.from(document.querySelectorAll('.option'));
   options.forEach((option) => {
       option.classList.remove('correct');
       option.classList.remove('incorrect');
       option.classList.remove('other-option');
   })
   document.getElementById('comment-correct').style.display = 'none';
   document.getElementById('comment-incorrect').style.display = 'none';
   this.setState({optionsButtonDisabled: true})
  }

  correctAnswer = () => {
    if (this.state.numberOfAnsweredQuestions < this.state.questions.length) {
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
                this.displayResults()
            })
        } else {
        this.displayQuestions(
            this.state.questions, 
            this.state.currentQuestion,
            this.state.nextQuestion,
            this.state.previousQuestion)
        }
    })
  } else {
    this.displayResults();
  }}

  wrongAnswer = () => {
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
                this.displayResults("Time out!")
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

  showOptions = () => {
      const options = Array.from(document.querySelectorAll('.option'));
      options.forEach((option => {
          option.style.display = "block"
      }))
  }

  showFiftyFifty = () => {
    document.getElementById('fifty-fifty').style.display = "block";
    document.getElementById('lifeline-hints').style.display = "block";
    document.getElementById('replace').style.display = "none";
}

disableHints = () => {
    document.getElementById("fifty-fifty").classList.add("mute")
    document.getElementById("lifeline-hints").classList.add("mute")
}

enableHints = () => {
    document.getElementById("fifty-fifty").classList.remove("mute")
    document.getElementById("lifeline-hints").classList.remove("mute")
}
  
handleHints = () => {
    document.getElementById('fifty-fifty').style.display = "none";
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

 shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return(array)
}



handleFiftyFifty = () => {
  
    document.getElementById('replace').style.display = "block";
    if (!this.state.usedFiftyFifty) {
        let options = Array.from(document.querySelectorAll('.option'))
        options = this.shuffleArray(options)
       
        let badIndexes = [];
        options.forEach((option, index)=> {
            if (option.innerHTML.toLowerCase() !== this.state.answer.toLowerCase()) {
                badIndexes.push(index)
            }
        });
        badIndexes = this.shuffleArray(badIndexes);
        document.getElementById('fifty-fifty').style.display = "none";
    for (let i = 0; i<badIndexes.length -1; i++) {
        options[badIndexes[i]].style.display = "none";
        }
    }
    this.setState({usedFiftyFifty: true});
}

startTimer = () => {
    const countDownTime = Date.now() + 188000;
    this.interval = setInterval(() => {
        const now = new Date();
        const distance = countDownTime - now;
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (distance < 0) {
            clearInterval(this.interval);
            this.setState({
                time: {
                    minutes: 0,
                    seconds: 0
                }
            }, () => {
                this.displayResults()
            })
        } else {
            console.log(seconds.toString().length)
            if (seconds.toString().length === 1) {
                seconds = '0' + seconds
            }
            this.setState({
                time: {
                    minutes,
                    seconds
                }
            })
        }
    }, 1000);
}

displayResults = () => {
    document.getElementById("questions").innerHTML =  document.getElementById("results").innerHTML;
    document.getElementById("results-button-container").style.display = "inline-block";
  
}

handleOptionClick = (e) => {
    if (this.state.optionsButtonDisabled) {
        return
    } else {
       this.disableHints();
        this.setState({optionsButtonDisabled: true});
        let options = Array.from(document.querySelectorAll('.option'));
        if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
            M.toast({
                html: 'Correct answer!',
                classes: 'toast-valid',
                displayLength: 500
            });
            document.getElementById("comment-correct").style.display = "block";
            e.target.classList.add("correct");
            options.forEach((option) => {
                if (option.innerHTML.toLowerCase() !== this.state.answer.toLowerCase()) {
                    option.classList.add("other-option")
                }
            })
        } else {
            M.toast({
                html: 'Wrong answer!',
                classes: 'toast-invalid',
                displayLength: 500
            });
            options.forEach((option) => {
                if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                option.classList.add("correct");
                e.target.classList.add("incorrect");
                document.getElementById("comment-incorrect").style.display = "block" 
            } else if (option !== e.target){
                option.classList.add("other-option");
            }
        })}
    }}

    handleDialogClose = () => {
        this.setState({isOpen: false})
    }

    openDialog = (e) => {
        this.setState({isOpen: true})
    }

   render() {

       const { currentOptions, currentQuestion, hints, time, numberOfQuestions, currentQuestionIndex } = this.state;
       return (
        <Fragment>
            <Helmet><title>Quiz Page</title></Helmet>
    
            <div>
                <div id="loading"><h3>Loading...</h3>
                <FontAwesomeIcon icon={faSpinner} className="spin" /></div>
                <div id="questions" className="questions" data-testid="questions">
                    <div className="lifeline-container">
                    <div><p id="fifty-fifty" onClick={this.handleFiftyFifty} className="lifeline-fifty-fifty"><FontAwesomeIcon icon={faDivide} />
                        
                    </p><p id="replace">.</p></div>
                    <p></p>
                
       <div><p id="lifeline-hints" className="lifeline-hints" onClick={this.handleHints}><FontAwesomeIcon  icon={faLightbulb} /><span className="lifeline">{hints}</span></p>
                    </div></div>
                    <div>
                        <p><span className="right"><FontAwesomeIcon icon={faClock}></FontAwesomeIcon>{time.minutes}:{time.seconds}</span></p>
       <p><span className="left">{currentQuestionIndex + 1} of {numberOfQuestions}</span></p>
                    </div>
        <div id="question-with-answers">
       <textarea readOnly value={currentQuestion.question}></textarea>
             
                    <div data-testid="options-container" className="options-container">
                    {currentOptions.map((option, index) => 
                         <p onClick={this.handleOptionClick} 
                         key={index} 
                         data-testid="option" 
                         className="option"
                         >{option}</p>
                        )}
                        </div>
                    </div>
               
              
                 <div id="comment-container">
                    
                 
                    <div id="comment-correct">
                        <p>{currentQuestion.commentForCorrect}</p>
                        <button className="continue-button" onClick={this.handleContinueClick}>Continue</button>
                    </div>
                    <div id="comment-incorrect">
                        <p>{currentQuestion.commentForIncorrect}</p>
                        <button className="continue-button" onClick={this.handleContinueClick}>Continue</button>
                    </div>
                </div>
                <div className="button-container">
                <button id="quit-button" data-testid="quit-button" onClick={this.handleQuitClick}>Quit</button>
                        </div>
                
                    
                </div>
                
                <Results
                    quizName={this.state.quizName}
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