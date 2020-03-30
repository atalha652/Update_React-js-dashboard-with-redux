import React from 'react';
import { Link } from 'react-router-dom'


const Footer = () => {
		return(
            // <!-- Footer -->
            <div className="navbar navbar-expand-lg navbar-light">
                <div className="text-center d-lg-none w-100">
                    <button type="button" className="navbar-toggler dropdown-toggle" data-toggle="collapse" data-target="#navbar-footer">
                        <i className="icon-unfold mr-2"></i>
                        Footer
                    </button>
                </div>
        
                <div className="navbar-collapse collapse" id="navbar-footer">
                    <span className="navbar-text">
                        &copy; 2019
                    </span>
                    <ul className="navbar-nav ml-auto">
						<li className="nav-item" title="Software Help">
                            <Link to={"#"} target="_blank" className="navbar-nav-link font-weight-semibold">
                                <span className="text-pink-400"><i className="icon-question7 font-16"></i> Help</span>
                            </Link>
                        </li>
					</ul>
                </div>
            </div>
            // <!-- /footer -->
		);
};

export default Footer;