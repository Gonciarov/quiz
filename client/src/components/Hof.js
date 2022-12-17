import React, { Component, Fragment } from 'react'

export default class Hof extends Component {

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



  render() {
    const {quizTitles, results, students} = this.state
    console.log(students)
   
    return (

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
        </div>
    )
  }
}
