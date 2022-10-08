import React, {Component} from "react";

class Play extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            counter: 0
        }
    }

    increaseCount = () => {
        this.setState({
            counter: 5
        })
    }
    render () {
        return (
            <div>
                <h1>Counter: {this.state.counter}</h1>
                <button onClick={this.increaseCount}>Click</button>
            </div>
        )
    }
}

export default Play;