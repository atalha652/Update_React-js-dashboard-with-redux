import React, { Component } from 'react';
import SideMenu from '../sidemenu/index';
import { withRouter } from 'react-router-dom';
import { isNonEmptyList } from '../../actions/validator';
import Footer from './footer';
import Header from './header';


/**
 * Props
 * ===============
 *      showLoader:       T/F depend upon loading page
 *      PageActions:      Right-Side Tab Details of current page AKA actions
 *      tabs:             Left-Side Tab Details of current page
 * 
 * 
 *  Page Action structure: 
 * ===============
 *  {
 * ----------------
 *      __name:           Name of Action
 *      __className:      Left side icon className
 *      __render:         Either render or not
 *      __uri:            URL :: where to re-route current page
 *      __uri_extra:      URL :: extra props along with the re-route URL
 *  }
 * 
 * 
 * 
 * TAB structure: 
 * ===============
 *  {
 * ----------------
 *      __name:           Name of Tab
 *      __className:      Left side icon className
 *      __render:         Either render or not
 *      __component:      Get content of that tab from tab function
 *  }
 */


class Container extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isGettingData: false,
            showLoader: this.props.showLoader,
            PageActions: this.props.PageActions,
            selectedTab: "",
            tabs: this.props.tabs,
            content: null
        }

        this.update_container_content = this.update_container_content.bind(this);
        this.onTabClick = this.onTabClick.bind(this);
        this.__render_tabs = this.__render_tabs.bind(this);
    }

    componentDidMount() {
        /* 
        * if there is any tab:
        *       1 - Make the first Tab as a default selected tab
        *       2 - Load the content of that Tab
        * else:
        *       load the props childen as default content
        */
        this.update_container_content()
    }

    update_container_content() {
        if (isNonEmptyList(this.state.tabs)) {
            this.setState({
                selectedTab: this.state.tabs[0]['__name'],
                content: this.state.tabs[0]['__component']
            })
        }
        else {
            this.setState({
                content: this.props.children
            })
        }
    }

    componentWillReceiveProps(newProps) {
        var { showLoader, PageActions, tabs } = newProps;
        this.setState({ showLoader, PageActions, tabs }, () => {
            this.update_container_content()
        })
    }

    onTabClick(tab) {
        var isGettingData = true;
        this.setState({ isGettingData })

        var selectedTab = this.state.selectedTab;
        var content = this.state.content;

        this.state.tabs.map((T, idx) => {
            if (T['__name'] === tab['__name']) {
                selectedTab = T['__name'];
                content = T['__component']
            }
            return T
        })

        this.setState({ selectedTab, content })
    }

    __render_tabs() {
        /**
         *  Render Tabs
         *  1 - render tabs if there is any
         *  2 - render back button as tab if enforce 
         * */
        var __html = [];

        if (isNonEmptyList(this.state.tabs)) {
            __html.push(
                <ul key={'tabs'} className="nav navbar-nav">
                    {
                        this.state.tabs.map((T, idx) => {
                            if (T.__render === true) {
                                const c1 = "navbar-nav-link button-link"
                                const c2 = "navbar-nav-link button-link active"
                                return <li key={idx} className="nav-item cursor-pointer" onClick={this.onTabClick.bind(this, T)}>
                                    <button className={(this.state.selectedTab.toLowerCase() === T.__name.toLowerCase()) ? c2 : c1} data-toggle="tab">
                                        <i className={T.__className}></i>
                                        {T.__name}
                                    </button>
                                </li>
                            }
                            return ""
                        })
                    }
                </ul>
            )
        }

        if (isNonEmptyList(this.state.PageActions)) {
            __html.push(
                <ul key="actions" className="navbar-nav ml-lg-auto">
                    {
                        this.state.PageActions.map((PA, idx) => {
                            if (PA.__render === true) {
                                var uriDic = PA.__uri_extra;
                                uriDic['pathname'] = PA.__uri;

                                return (
                                    <li key={idx} className="nav-item">
                                        <button
                                            onClick={() => {
                                                this.props.history.push(uriDic)
                                            }}
                                            className="navbar-nav-link button-link"
                                        >
                                            <i className={PA.__className}></i>
                                            {PA.__name}
                                        </button>
                                    </li>
                                )
                            }
                            return null
                        })
                    }
                </ul>
            )
        }

        return (
            <div className="navbar-collapse collapse" id="navbar-second">
                {__html}
            </div>
        );
    }

    render() {
        var loader = "";
        if (this.props.showLoader) {
            loader = <div className="loading-container-app">
                <span className="badge bg-warning-400 loading-content-app py-2 px-2 font-s-12">Loading...</span>
            </div>;
        }

        var __tabs = this.__render_tabs()

        return (
            <div className="virtual-body navbar-top-custom">
                {loader}
                <Header />
                <div className="page-content">
                    <SideMenu />
                    {/* <!-- Main content --> */}
                    <div className="content-wrapper rounded-2 ml-2 mr-2 mt-4" >
                        <nav aria-label="breadcrumb " style={{ background: '#9e9e9e42' }}>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item active ml-2" aria-current="page">{this.props.title}</li>
                            </ol>
                        </nav>
                        {/* /** render Toggle for Mobile view */}
                        {/* {
                            (isNonEmptyList(this.state.tabs) || (isNonEmptyList(this.state.PageActions)))?
                            <div className="navbar navbar-expand-lg navbar-light bg-light">
                                <div className="text-center d-lg-none w-100">
                                    <button type="button" className="navbar-toggler dropdown-toggle" data-toggle="collapse" data-target="#navbar-second">
                                        <i className="icon-menu7 mr-2"></i>
                                        Page Navigation
                                    </button>
                                </div>
                                { __tabs}
                            </div>
                            :""
                        } */}

                        {/* <!-- Content area --> */}
                        <div className="content">
                            {this.state.content}
                        </div>

                        {/* <Footer /> */}
                    </div>
                </div>
            </div>
        );
    }
};

export default withRouter(Container);

Container.defaultProps = {
    showLoader: false,
    PageActions: [],
    tabs: [],
}