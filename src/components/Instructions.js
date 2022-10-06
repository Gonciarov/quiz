import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import { Link } from 'react-router-dom';




const Instructions = () => (
   <Fragment>
    <Helmet><title>Quiz App - Instructions</title></Helmet>
        <div id="instructions">      
            <h1>Some instructions</h1>
            <Link className='back-button' to="/">Back</Link>
       </div>
   </Fragment>
    )

export default Instructions;