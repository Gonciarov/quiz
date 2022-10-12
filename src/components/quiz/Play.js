import React, {Fragment, Component} from 'react';
import {Helmet} from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faDivide, faLightbulb, faClock } from '@fortawesome/free-solid-svg-icons';


class Play extends React.Component {
    // constructor (props) {
    //     super(props);
    //     this.state = {
    //         counter: 0
    //     }
    // };

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
            <p><FontAwesomeIcon icon={faDivide} />2</p>
        
            <p><FontAwesomeIcon  icon={faLightbulb} /></p>
            </div>
            <div>
                <p><span><FontAwesomeIcon icon={faClock}></FontAwesomeIcon></span> 2:15</p>
                <p><span>1 of 15</span></p>
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