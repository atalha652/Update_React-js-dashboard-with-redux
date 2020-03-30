import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { RC_LOAD_LOGIN } from '../routers/RouteConstants';
import { colors } from '../../config/static_list';


var $ = window.$;

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogout: false
        }
    }

    componentDidMount() {
        // Toggle min sidebar class
        $('.sidebar-main-toggle').on('click', function (e) {
            e.preventDefault();

            $('body').toggleClass('sidebar-xs').removeClass('sidebar-mobile-main');
        });
        $('.sidebar-mobile-main-toggle').on('click', function (e) {
            e.preventDefault();
            $('body').toggleClass('sidebar-mobile-main').removeClass('sidebar-mobile-secondary sidebar-mobile-right');

            if ($('.sidebar-main').hasClass('sidebar-fullscreen')) {
                $('.sidebar-main').removeClass('sidebar-fullscreen');
            }
        });
        $('.sidebar-mobile-expand').on('click', function (e) {
            e.preventDefault();
            var $sidebar = $(this).parents('.sidebar'),
                sidebarFullscreenClass = 'sidebar-fullscreen'

            if (!$sidebar.hasClass(sidebarFullscreenClass)) {
                $sidebar.addClass(sidebarFullscreenClass);
            }
            else {
                $sidebar.removeClass(sidebarFullscreenClass);
            }
        });
    }

    logout() {

        localStorage.removeItem('user');
        this.props.history.push(RC_LOAD_LOGIN);
        this.setState({
            isLogout: true
        }, () => {
            console.log(this.state.isLogout)

        })

    }

    customization() {
    }

    viewProfile() {
        this.setState({
            isLogout: true
        }, () => {
            console.log(this.state.isLogout)
        })
    }

    render() {
        var user = this.props.activeUser;
        var picture = '';
        var name = "...";

        if (Object.keys(user).length) {
            var profilePicture = user["profile_picture"];
            var defaultProfilePicture = process.env.PUBLIC_URL + "/assets/images/avatar.png";

            let text = user.firstname || user.email
            const initials = text.charAt(0).toLowerCase();
            const style = {
                backgroundColor: colors[initials]
            }

            picture =
                <span className="btn rounded-round btn-icon btn-sm" style={style}>
                    <span className="letter-icon text-uppercase text-white">{initials}</span>
                </span>;

            if (typeof (profilePicture) !== "undefined" && profilePicture !== null && profilePicture !== '') {
                picture = <img src={profilePicture} onError={(e) => { e.target.onerror = null; e.target.src = defaultProfilePicture }} className="rounded-circle" alt="" />
            }
            name = user["firstname"];
        }


        return (
            // <!-- Main navbar -->
            <div className="navbar navbar-expand-md navbar-dark navbar-theme fixed-top">
                <div className="navbar-brand wmin-200 border_left_line c-nav-brand">
                    <a href="/" className="d-inline-block">
                        <div className="d-flex flex-row">
                            <div className="p-1">
                                <img src="" alt="" />
                            </div>
                            <div className="p-1">
                                <h5 style={{ color: 'black', fontSize: '19px' }}>Logo here</h5>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="d-md-none">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
                        <i className="icon-tree5"></i>
                    </button>
                    <button className="header-nav-link navbar-toggler sidebar-mobile-main-toggle" type="button">
                        <i className="icon-paragraph-justify3"></i>
                    </button>
                </div>

                <div className="collapse navbar-collapse c_navbar-collapse left_boder_line" id="navbar-mobile">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button href="#" className="header-nav-link navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block">
                                <i className="icon-paragraph-justify3"></i>
                            </button>
                        </li>
                    </ul>

                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown dropdown-user text-capitalize">
                            <button className="navbar-nav-link dropdown-toggle header-nav-link" data-toggle="dropdown">
                                {picture}
                                <span>{name}</span>
                            </button>

                            <div className="dropdown-menu dropdown-menu-right">
                                <button className="header-nav-link dropdown-item" onClick={this.viewProfile.bind(this)}><i className="fas fa-user side-menu_icon"></i> View Profile</button>
                                <div className="dropdown-divider"></div>
                                {/* <a className="dropdown-item" onClick={this.customization.bind(this)}><i className="icon-cog"></i> Customization</a> */}
                                <button className="header-nav-link dropdown-item" onClick={this.logout.bind(this)}><i className="icon-switch2"></i> Logout</button>

                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            // <!-- /main navbar -->
        );
    }
}

function mapStateToProps({ activeUser }) {
    return { activeUser }
}

export default connect(mapStateToProps)(withRouter(Header));
