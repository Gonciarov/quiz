import React, { Component, Fragment } from 'react'

export default class Hof extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/hall-of-fame')
        .then(response => response.json())
        .then(data => this.setState({results: data}))
        console.log(this.state.results)
    }

  render() {
    const {results} = this.state
    return (
        <div className="hof">
       {results.map((result, index) => (
        <div className="single-result" key={index}>
           <h2>{result["name"]}</h2>
           <p>{result["quiz"]}</p>
           <p>{result["result"]}</p>
           </div>
        ))}
        </div>
        
      
        
    )

  }
}
