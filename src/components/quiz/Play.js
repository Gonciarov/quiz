import React, {Fragment, Component} from 'react';
import {Helmet} from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube } from '@fortawesome/free-solid-svg-icons';



class Play extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            counter: 0
        }
    };

    addCount = () => {
        this.setState({
            counter: 5
        })
    }

   render() {
       return (
   <Fragment>
    <Helmet><title>Quiz Page</title></Helmet>
        <div className="questions">
            <div className="lifeline-container">
            <FontAwesomeIcon className="cube" icon={faCube} />
            </div>
            <h3>Google was founded in what year?</h3>
            <div className="options-container">
                <p className = "option">1997</p>
                <p className = "option">1998</p>
                <p className = "option">1999</p>
                <p className = "option">2000</p>
            </div>
        </div>
        <div className="button-container">
            <button>Previous</button>
            <button>Next</button>
            <button>Quit</button>
        </div>
       
   </Fragment>
       );
   };
};

export default Play;