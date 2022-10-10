import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import { Link } from 'react-router-dom';




class Play extends React.component {
    constructor (props) {
        super();
        this.state = {
            counter: 0
        }
    };


   render() {
       return (
   <Fragment>
    <Helmet><title>Quiz App - Instructions</title></Helmet>
        <div id="instructions">      
   <h1>Counter: {this.state.counter}</h1>
            <Link className='back-button' to="/">Back</Link>
       </div>
   </Fragment>
       );
   };
};

export default Play;