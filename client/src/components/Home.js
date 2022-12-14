import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


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
                <div className="hof-container">
                   
                       <Link className="hof-buttons" id="hof-button" to="/hall-of-fame">Hall of Fame</Link>
                  
                </div>
                <h1>Quiz app</h1>
               
                </section>
            

        
   
       </div>
   </Fragment>
  

    )


export default Home;