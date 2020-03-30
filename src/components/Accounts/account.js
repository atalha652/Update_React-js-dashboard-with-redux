import React, { Component } from 'react'
import Container from '../common/application_container'
import AccountTable from './accountTable';


export class Accounts extends Component {
    constructor(props) {
        super(props);

    }



    render() {
        return (
            <Container title="Accounts">
                <AccountTable />
            </Container>
        )
    }
}

export default Accounts
