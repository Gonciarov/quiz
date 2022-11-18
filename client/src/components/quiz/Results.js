import React, {Component, Fragment} from 'react';
import {Helmet} from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDivide, faLightbulb, faClock } from '@fortawesome/free-solid-svg-icons';
import questions from '../../questions.json';
import M from 'materialize-css';
import isEmpty from '../../utils/isEmpty';
import withRouter from '../../utils/withRouter';
import {useLocation} from 'react-router-dom';


class Results extends React.Component {

    
   render() {
       return(
    
<p>{this.props}</p>
       )};
};

export default Results;