import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const QuizInstructions = () => 
    (
        <Fragment>
            <Helmet>
                <title>Quiz Instructions - Quiz App</title>
            </Helmet>
            <div className="instructions container">
                    <h1>How to play the game</h1>
                    <span className="left"><Link to="/">Back</Link></span>
                <span className="right"><Link to="/play/quiz">Okay</Link></span>
                </div>
                
        </Fragment>
    );

export default QuizInstructions;
