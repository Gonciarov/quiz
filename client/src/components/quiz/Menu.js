import React from 'react';
import { Link } from 'react-router-dom';


class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizTitles: []
        }
    }

    componentDidMount() {
        fetch(`http://localhost:5000/titles`)
        .then((response) => response.json())
        .then((data) => this.setState({quizTitles: JSON.parse(data)}))
    }

    render() {
        const {quizTitles} = this.state
        return (
            <div className="menu">
           {quizTitles.map((title, index) => (
                <Link className="menu-item" key={index} to={`/${title["id"]}`}>{title["name"]}</Link>
            ))}
            </div>
            
        )
    }
}

export default Menu;
