import React, { Component, Fragment } from 'react'
import withRouter from '../utils/withRouter';

 class Hof extends Component {

    constructor(props) {
        super(props);
        this.state = {
          quizTitles: [],
          results: {},
          students: {}
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/hall-of-fame')
          .then(response => response.json())
          .then(data => this.setState({results: data}))
        .then(
        fetch(`http://localhost:5000/titles`)
          .then((response) => response.json())
          .then((data) => this.setState({quizTitles: JSON.parse(data)}))
        )
        .then(
          fetch(`http://localhost:5000/students-list`)
          .then((response) => response.json())
          .then((data) => this.setState({students: data.students}))
          )
    }

    handleQuitClick = () => { 
          this.props.navigate('/')
  }


  render() {
    const {quizTitles, results, students} = this.state
    console.log(quizTitles[0])
   
    return (
      <Fragment>
        <div className="hof">
         {quizTitles.map((title, index) => (
         
         Object.keys(results[title.id]).length !== 0 ?
            <div className="hof-quiz-title">
            <h4>{title.name}</h4>
            {Object.keys(results[title.id]).map((key) => (
              <p>{students[key]}: {results[title.id][key]}%</p>
            ))}
          </div> : <p></p>
         ))}
            <div className="button-container">
                <button id="quit-button" data-testid="quit-button" onClick={this.handleQuitClick}>Quit</button>
            </div>
        </div>
        </Fragment>
    )
  }
}

export default withRouter(Hof);