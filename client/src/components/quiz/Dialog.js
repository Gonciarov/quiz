import React, { Component } from 'react';
import M from 'materialize-css';
import { useNavigate } from 'react-router-dom';

class Dialog extends Component {
   constructor(props) {
       super(props);
       this.state = {
           name: '',
           prisonNumber: ''
       }
   }
    handleNameChange = (e) => {
        this.setState({name: e.target.value})
        console.log(this.state.name)
    }

    handlePrisonNumberChange = (e) => {
        this.setState({prisonNumber: e.target.value})
    }

    handleSubmit = (e) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({result: this.props.result.toString() + '%', name: this.state.name, prisonNumber: this.state.prisonNumber})
      };
      console.log(this.state.name, this.state.prisonNumber)
      fetch(`http://localhost:5000/save-result`, requestOptions);
      M.toast({
       html: 'Congrats! Saved to Hall of Fame!',
       classes: 'toast-saved',
       displayLength: 1500
   });
   document.getElementById('results-button-container').style.display = "none";
   this.props.onClose();
}

    render() {
        let dialog = (
            <div className="dialog">
                <button className="dialog-close-button" onClick={this.props.onClose}>x</button>
                <div id="input-container">
                    <input type="text" onChange={this.handleNameChange} placeholder="name"></input>
                    <input type="text" onChange={this.handlePrisonNumberChange} placeholder="prison number"></input>
                    <button id="confirm-save-button" onClick={this.handleSubmit}>Save</button>
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

export default Dialog;