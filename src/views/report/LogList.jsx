import React from "react";

// reactstrap misc
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Button,
    Row,
    Col,
    DropdownItem,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle
} from "reactstrap";
import CoreEngine from "../../core/CoreEngine";
import RequestEngine from "../../core/RequestEngine"
import {connect} from "react-redux";
import loadingAction from "../../core/redux/actions/loadingAction";
import ReactTable from "react-table";
import Constants from "../../core/Constants";
import {CSVLink} from "react-csv";
import strings from "../../core/translate";

class LogList extends CoreEngine {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSourcep: [],
            dataSources: [],
            dataSourcet: [],
            csvData:[]
        };
        this.pathname = "logs";
        this.engine = new RequestEngine();
    }

    componentDidMount() {
        this.callPage()
    }


    async handleDelete(valueid) {
        this.props.loadingAction(true)
        const result = await this.engine.deleteItem(this.pathname,valueid)
        if(result){
            this.handlePage();
        }
        this.props.loadingAction(false)

    }


    handleEdit(index,dataid) {
        const data = this.state.dataSource[index].data

        this.props.history.push({
            pathname:'/admin/'+this.pathname+'/edit/'+dataid,
            data
        });

    }

    handleActions(index,item) {

        return (<UncontrolledDropdown>
            <DropdownToggle
                aria-expanded={false}
                aria-haspopup={true}
                caret
                className="btn-round btn-block"
                color="primary"
                data-toggle="dropdown"
                id="dropdownMenuButton"
                type="button"
            >
                {strings.actions}
            </DropdownToggle>
            <DropdownMenu>

                <DropdownItem  eventKey="2" onClick={() => this.handleEdit(index,item._id)}>{strings.edit}</DropdownItem>
                <DropdownItem variant="danger" eventKey="1" onClick={() => this.handleDelete(item._id)}>{strings.delete}</DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>)
    }






    async callPage() {
        const response = await  this.engine.getItem(this.pathname);
        let csvData = []
        response.data.data.map(item=>{
            csvData.push({
                text: item.text ,
                student:item.student ? item.student.fname+" "+item.student.lname:"adel karam",
                created:this.renderDate(item.createdAt),
            })

        });
        if(response && response.status === 200){
            this.setState({
                    isLoading: false,
                csvData,
                dataSources: response.data.data.map((item, key) => {

                        return {
                            id: key,
                            data:item,
                            text: item.text ,
                            student:item.student ? item.student.fname+" "+item.student.lname:"adel karam",
                            created:this.renderDate(item.createdAt),
                            actions: (
                                // we've added some custom button actions
                                this.handleActions(key,item)
                            )
                        };
                    }),

                }
            );
        }
        this.props.loadingAction(false);
    }

    handlePage() {
        this.props.loadingAction(true);
        this.callPage()
    }


    render() {
        const {dataSources,isLoading} = this.state;


        let columnss = [

            {
                Header: strings.student,
                accessor: "student"
            },
            {
                Header:strings.logmessage,
                accessor: "text"
            },

            {
                Header: strings.created,
                accessor: "created"
            }
        ]



        return (
            <>

                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>

                                <CardHeader>
                                    <CardTitle tag="h4" className="pull-left">{strings.log}</CardTitle>
                                    <CSVLink filename={"export"} className="pull-right" data={this.state.csvData}>{strings.export} </CSVLink>
                                </CardHeader>
                                <CardBody>
                                    <ReactTable
                                        previousText={strings.next}
                                        nextText={strings.previous}
                                        loadingText={strings.loading}
                                        //  noDataText={'No existen registros'}
                                        pageText={strings.page}
                                        data={dataSources}
                                        defaultFilterMethod={this.filterCaseInsensitive}
                                        filterable
                                        loading={isLoading}
                                        columns={columnss}
                                        defaultPageSize={10}
                                        showPaginationTop
                                        showPaginationBottom={false}
                                        className="-striped -highlight primary-pagination"
                                    />

                                </CardBody>

                            </Card>
                        </Col>
                    </Row>

                </div>
            </>
        );
    }
}



const mapDispatchToProps = dispatch => ({
    loadingAction: (payload) => dispatch(loadingAction(payload))
});
export default connect(null, mapDispatchToProps)(LogList);
