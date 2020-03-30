import React, {Component} from 'react';
import { withRouter, Link } from 'react-router-dom';
import Container from './application_container';

class Error404 extends Component {
    render() {
        return (
            <Container header="Access Denied">
				<div className="flex-fill">
					<div className="text-center mb-3">
						<h1 className="error-title error-title-ad">Access Denied</h1>
						<h5>Oops, you don't have permission to access this page!</h5>
					</div>

					<div className="row">
						<div className="col-xl-4 offset-xl-4 col-md-8 offset-md-2">
							<div className="row">
								<div className="col-sm-12">
									<Link to={"/"} className="btn btn-theme btn-block"><i className="icon-home4 mr-2"></i> Dashboard</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
            </Container>
        );
    }
}

export default withRouter(Error404);