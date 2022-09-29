import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const Home = () => (
   <Fragment>
    <Helmet><title>Quiz App - Home</title></Helmet>
        <div id="home">
            <section>
                <div>
                <FontAwesomeIcon icon={faCoffee} />
                </div>
                </section>
         
        </div>
       
   </Fragment>
  

    )


export default Home;