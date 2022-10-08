import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Less from '../../src/Less.png';


const Home = () => (
   <Fragment>
    <Helmet><title>Quiz App - Home</title></Helmet>
        <div id="home">
            
            <section>
                <div id="coffee-container">
                <FontAwesomeIcon className="coffee" icon={faCoffee} />
                </div>
                <div className="play-button-container">
                  
                        <Link className='play-button' to="/play/instructions">Play</Link>

                </div>
                <div className="auth-container">
                   
                       <Link className="auth-buttons" id="login-button" to="/login">Login</Link>
                       <Link className="auth-buttons" id="register-button" to="/register">Register</Link>
                  
                </div>
                <h1>Quiz app</h1>
                <img src = {Less}></img>
               
                </section>
            

        
   
       </div>
   </Fragment>
  

    )


export default Home;