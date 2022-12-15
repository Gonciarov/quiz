import React, { Component, Fragment } from 'react'

export default class Hof extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fetched: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/hall-of-fame')
        .then(response => response.json())
        .then(data => this.setState({fetched: data}))
    }
  render() {
    const {fetched} = this.state
 
    return (
        <div className="hof">
        
        </div>
   
    )

  }
}
