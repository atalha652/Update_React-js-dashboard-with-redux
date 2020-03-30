import React, { Component } from 'react'
import { ACCOUNT_LISTING } from '../../config/rest_endpoints';
import { getUser } from '../../actions/session';
import { Notifications } from '../common/notification';
import axios from 'axios'
import CustomLoader from '../common/loader';

export class AccountTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            User: getUser(),
            isGetting: false,
            accountTable: [],
            message: ''
        }
        this.accountListing = this.accountListing.bind(this)
    }

    componentDidMount() {
        this.accountListing()
    }

    accountListing() {
        const { User, message } = this.state
        this.setState({
            isGetting: true
        })
        var headers = { "Authorization": "Bearer " + User.token };
        axios.get(`${ACCOUNT_LISTING}?page=1&search=&limit=10`, { headers }).then(res => {
            if (res) {
                var resp = res.data
                this.setState({
                    accountTable: resp.data,
                    message: resp.message,
                    isGetting: false
                })
                Notifications.notify(message, "success", "success");
            }
            else {
                this.setState({
                    isGetting: true
                })
                Notifications.notify("Fetch failed", "error", "errors");
            }
        })
    }

    __renderAccountTable() {
        const { accountTable } = this.state
        return accountTable.map((row, idx) => {
            return (
                <tr key={idx}>
                    <td>{row.usernumber}</td>
                    <td>{row.companyname}</td>
                    <td>{row.primaryuseremail}</td>
                    <td>{row.joindate}</td>
                    <td>{row.balance}</td>
                    <td>{row.session}</td>
                    <td>{row.cps}</td>
                    <td><span className="badge badge-danger">Suspended</span></td>
                    <td><i className="fa fa-edit mr-2"></i></td>
                </tr>
            )
        })
    }

    render() {
        const { isGetting } = this.state
        return (
            <div>

                <div className="card">
                    <div className="card-header header-elements-inline">
                        <h5 className="card-title">Basic datatable</h5>
                        <div className="header-elements">

                        </div>
                    </div>
                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper no-footer">
                        <div className="datatable-header">
                            <div id="DataTables_Table_0_filter" className="dataTables_filter">
                                <label><span>Filter:</span>
                                    <input type="search" className="" placeholder="Type to filter..." aria-controls="DataTables_Table_0" />
                                </label>
                            </div>
                        </div>
                        <div className="datatable-scroll">
                            <table className="table datatable-basic dataTable no-footer" id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                                <thead>
                                    <tr>
                                        <th>Account Number</th>
                                        <th>Company Name</th>
                                        <th>Primary User Email</th>
                                        <th>Join Date</th>
                                        <th>Balance</th>
                                        <th>Sessions</th>
                                        <th>CPS</th>
                                        <th>Status</th>
                                        <th>Actions</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {isGetting ? <CustomLoader /> : this.__renderAccountTable()}
                                </tbody>
                            </table>
                        </div>
                        <div className="datatable-footer">
                            <div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 10 of 15 entries</div>
                            <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountTable
