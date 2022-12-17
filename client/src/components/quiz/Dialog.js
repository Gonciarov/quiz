import React, { Component } from 'react';
import M from 'materialize-css';
import withRouter from '../../utils/withRouter';

class Dialog extends Component {
   constructor(props) {
       super(props);
       this.state = {
           name: '',
           prisonNumber: ''
       }
   }
    handleNameChange = (e) => {
        document.getElementById("not-matching").style.visibility = "hidden"
        this.setState({name: e.target.value})
    }

    handlePrisonNumberChange = (e) => {
        document.getElementById("not-matching").style.visibility = "hidden"
        this.setState({prisonNumber: e.target.value})
    }

    handleSubmit = (e) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({quizName: this.props.quizName, result: this.props.result, name: this.state.name, prisonNumber: this.state.prisonNumber})
      };
    
      fetch(`http://localhost:5000/save-result`, requestOptions)
      .then((response) => response.json()).then((status) => {
        if (status["status"] !== 'ok') {
            document.getElementById("not-matching").innerHTML = status["status"]
            document.getElementById("not-matching").style.visibility = "visible"
            this.setState({name: '', prisonNumber: ''})
            document.getElementById('name').value = ''
            document.getElementById('prison-number').value = ''
        } else {
            M.toast({
                html: 'Congrats! Saved to Hall of Fame!',
                classes: 'toast-saved',
                displayLength: 1500
            });
            document.getElementById('results-button-container').style.display = "none";
            document.getElementById('results-button-container-after').style.display = "block";
            this.props.onClose();
    
        }
      });
}

    render() {
        let dialog = (
            <div className="dialog">
                <button className="dialog-close-button" onClick={this.props.onClose}>x</button>
                <div id="input-container">
                    <input id="name" type="text" onChange={this.handleNameChange} placeholder="name"></input>
                    <input id="prison-number" type="text" onChange={this.handlePrisonNumberChange} placeholder="prison number"></input>
                    <button id="confirm-save-button" onClick={this.handleSubmit}>Save</button>
                    <p id="not-matching">User with this prison number does not exist</p>
                    </div>
                <div>{this.props.children}</div>
            </div>
        );

        if (! this.props.isOpen) {
            dialog = null;
        }
        return (
            <div>
                {dialog}
            </div>
        );
    }
}

export default withRouter(Dialog);