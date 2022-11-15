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
            console.log(questions);
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
                    answer
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
      console.log(e.target.innerHTML)
      console.log(this.state)
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

    addCount = () => {
        this.setState({
            counter: 5
        })
    }

   render() {
       
       const { currentQuestion } = this.state;
       return (
        <Fragment>
            <Helmet><title>Quiz Page</title></Helmet>
                <div className="questions" data-testid="questions">
                    <div className="lifeline-container">
                    <p><FontAwesomeIcon icon={faDivide} />
                    <span className="lifeline">2</span></p>
                
                    <p><FontAwesomeIcon  icon={faLightbulb} /></p>
                    </div>
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