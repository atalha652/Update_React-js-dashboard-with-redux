import React, { Component } from 'react';
import Container from './components/common/application_container';


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container title="Home" >
                <h2>Hello</h2>
            </Container>
        );
    }

}

export default App
