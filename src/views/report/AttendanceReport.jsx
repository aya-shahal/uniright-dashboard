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
import strings from "../../core/translate";
import {CSVLink} from "react-csv";

class AttendanceReport extends CoreEngine {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            csvData:[]
        };
        this.pathname = "attendance";
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
                date: item.datex ,
                present: Math.floor((Math.random() * 40) + 20),
                absent: Math.floor((Math.random() * 10) + 1),
                year:"2023",
                student: item.student && item.student.fname ,


                created:this.renderDate(item.createdAt),
            })

        });
        if(response && response.status === 200){
            this.setState({
                    isLoading: false,
                csvData,
                    dataSource: response.data.data.map((item, key) => {
                        return {
                            id: key,
                            data:item,
                            date: item.datex ,
                            present: Math.floor((Math.random() * 40) + 20),
                            absent: Math.floor((Math.random() * 10) + 1),
                            year:"2023",
                            student: item.student && item.student.fname ,


                            created:this.renderDate(item.createdAt),
                            actions: (
                                // we've added some custom button actions
                                this.handleActions(key,item)
                            )
                        };
                    })
                }
            );
        }
        this.props.loadingAction(false);
    }

    handlePage() {
        this.props.loadingAction(true);
        this.callPage()
    }


    handleAdd() {
        this.props.history.push('/admin/'+this.pathname+'/add');
    }


    render() {
        const {dataSource,isLoading} = this.state;

        let columns = [

            {
                Header:strings.student,
                accessor: "student"
            },
            {
                Header: strings.presentcounter,
                accessor: "present"
            },
            {
                Header: strings.absentcounter,
                accessor: "absent"
            },

            {
                Header: strings.year,
                accessor: "year"
            },


            {
                Header: strings.created,
                accessor: "created"
            },

        ]


        return (
            <>

                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>

                                <CardHeader>
                                    <CardTitle tag="h4" className="pull-left">{strings.report}</CardTitle>
                                    <CSVLink filename={"export"} className="pull-right" data={this.state.csvData}>{strings.export} </CSVLink>

                                </CardHeader>
                                <CardBody>
                                    <ReactTable
                                        data={dataSource}
                                        defaultFilterMethod={this.filterCaseInsensitive}
                                        filterable
                                        loading={isLoading}
                                        columns={columns}
                                        defaultPageSize={10}
                                        showPaginationTop
                                        showPaginationBottom={false}
                                        /*
                                          You can choose between primary-pagination, info-pagination, success-pagination, warning-pagination, danger-pagination or none - which will make the pagination buttons gray
                                        */
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
export default connect(null, mapDispatchToProps)(AttendanceReport);
