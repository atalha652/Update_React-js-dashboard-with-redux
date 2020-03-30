import React, {Component, Fragment} from 'react';
import Pagination from "react-js-pagination";
import _ from 'lodash';

/**
 * tableHeader : { Col_name: {label: "", render: T/F, className: ""}}
 */

class TableRenderer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            skip: 0,
            size: 1,
            tableHeaders: this.props.tableHeaders,
            RenderTableHeaders:[],
            usePagination: this.props.usePagination,
            showSno: this.props.showSno,
            SnoColName : "Sno",
            tableData: this.props.tableData,
            defaultValue: this.props.defaultValue
        }

        this.UpdateTableHeaders = this.UpdateTableHeaders.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.onLimitChange = this.onLimitChange.bind(this);

    }

    componentDidMount() {
        var tableHeaders = {[this.state.SnoColName]: {'label': this.state.SnoColName, 'className':"text-nowrap small-col", 'render': this.state.showSno}, ...this.state.tableHeaders}
        var size = (this.state.usePagination)? this.state.size: this.state.tableData.length;

        this.setState({tableHeaders, size},()=>{
            this.UpdateTableHeaders()
        })
    }

    componentWillReceivePropss(newProps) {
        var skip = 0;
        var activePage =  1;
        var size = (this.state.usePagination)? this.state.size: this.state.tableData.length;
        var {tableHeaders, usePagination, tableData, showSno} = newProps;

        this.setState({tableHeaders, usePagination, tableData, showSno, skip, size, activePage}, ()=>{
            this.UpdateTableHeaders();
        })
    }


    /**
     * Remove nonRender Table Headers
     * Update Sno Column if needed
     */
    UpdateTableHeaders() {
        var RenderTableHeaders = {};
        var tableHeaders = this.state.tableHeaders;
        tableHeaders[this.state.SnoColName]['render'] = this.state.showSno;

        _.map(tableHeaders, (header, key)=> {
            if (header.render) {
                header['className'] = 
                    (!header.className || header.className === "")?'text-nowrap text-capitalize':header.className;
                header['label'] = 
                    (!header.label || header.label === "")?key: header.label;
                
                RenderTableHeaders[key] = header;
            }
        });
        this.setState({RenderTableHeaders})
    }

	handlePageChange(pageNumber) {
        const skip = pageNumber * this.state.size - this.state.size;
        this.setState({ activePage: pageNumber, skip }, ()=> {this.renderDataInRows()});
	}

    onLimitChange(selected) {
        const skip = 0;
        const size = Number(selected.value);
        this.setState({ activePage: 1, skip, size }, ()=>{this.renderDataInRows()});
    }

    renderDataInRows() {
        var keys = Object.keys(this.state.RenderTableHeaders)
        var __html = [];

        for(var idx=this.state.skip; idx<(this.state.skip+this.state.size); idx++) {
            var __data = this.state.tableData[idx];
            var __inner_col = [];
            if (this.state.showSno) {
                __data[this.state.SnoColName] = idx+1;
            }

            // eslint-disable-next-line no-loop-func
            keys.forEach((key, index)=> {
                if (this.state.RenderTableHeaders[key]['render']) {
                    if (!(key in __data)) {
                        __data[key] = this.state.defaultValue;
                    }
                    __inner_col.push(
                        <td key={`${key}-${index}`} className={this.state.RenderTableHeaders[key]['className']}>{__data[key]}</td>
                    )
                }
            })
            __html.push(<tr key={idx}>{__inner_col}</tr>)
        }
        return __html
    }

    __render_simple_table() {
        var __table = <div className="table-responsive mt-4">
                        <table className="table table-hover">
                            <thead className="">
                                <tr>
                                {
                                    _.map(this.state.RenderTableHeaders, (head, name) => {
                                        return <th key={name} className={head.className}>{head.label}</th>
                                    })
                                }
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderDataInRows()}
                            </tbody>
                        </table>
                    </div>

        return __table;
    }

    __render_pagination_table() {
        var __table = [];
        __table.push(this.__render_simple_table())

        __table.push(
            <div  key="table" className="row c-mt10">
                <div className="col-sm-12 col-md-6">
                    <div className="records-info" role="status" aria-live="polite">
                        {`Showing ${this.state.skip+1} to ${(this.state.tableData.length-this.state.skip>this.state.size)?this.state.skip+this.state.size:this.state.tableData.length} of ${this.state.tableData.length} records`}
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 pagination-parent c-mt5r">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.size}
                        totalItemsCount={this.state.tableData.length}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                        itemClass={"page-item"}
                        linkClass={"page-link"}
                        prevPageText={"prev"}
                        nextPageText={"next"}
                        innerClass={"pagination"}
                        activeClass={"active"}
                    />
                </div>
            </div>            
        )
        return __table
    }

    render() {

        return (
            <Fragment>
            {
                (this.state.tableData && this.state.tableData.length)?
                    (this.state.usePagination)?
                    this.__render_pagination_table():
                    this.__render_simple_table()
                :"No Data Found"
            }
            </Fragment>
        )
    }

}

export default TableRenderer

TableRenderer.defaultProps = {
    usePagination: false,
    showSno: false,
    tableHeaders: {},
    tableData: [],
    defaultValue: "N/A"
}