import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDivide, faLightbulb, faClock } from '@fortawesome/free-solid-svg-icons';
import questions from '../../questions';
import M from 'materialize-css';
import isEmpty from '../../utils/isEmpty';


class Play extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            questions,
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: 'ff',
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
        const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
        this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
    }

    displayQuestions = (
        questions = this.state.questions, 
        currentQuestion, 
        nextQuestion, 
        previousQuestion) => {
            let {currentQuestionIndex} = this.state;
            if (!isEmpty(this.state.questions)) {
                questions = this.state.questions;
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
    alert('Correct answer!')
    this.setState(prevState => ({
        score: prevState.score +1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
    }))
  }

  wrongAnswer = () => {
    alert('Wrong answer!')
    this.setState(prevState => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions
    }))
  }

    addCount = () => {
        this.setState({
            counter: 5
        })
    }

   render() {
       
       const { currentQuestion } = this.state;
       console.log(currentQuestion)
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
                    <button>Previous</button>
                    <button>Next</button>
                    <button>Quit</button>
                </div>
                </div>
        </Fragment>
       );
   };
};

export default Play;