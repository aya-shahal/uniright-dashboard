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

class ManagerTypeList extends CoreEngine {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            csvData:[]
        };
        this.pathname = "managertype";
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


        if(response && response.status === 200){

            let csvData = []
            response.data.data.map(item=>{
                csvData.push({
                    student: item.student && item.student.fname ,
                    matier: item.matier && item.matier.name ,
                    classx:item.classx && (item.classx.name+" / "+item.classx.section),
                    score: item.score ,
                    created:this.renderDate(item.createdAt),
                })

            });
            this.setState({
                    isLoading: false,
                    csvData:csvData,
                    dataSource: response.data.data.map((item, key) => {
                        return {
                            id: key,
                            data:item,
                            name: item.name ,
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
                Header: strings.title,
                accessor: "name"
            },

            {
                Header: strings.created,
                accessor: "created"
            },
            {
                Header:strings.actions,
                accessor: "actions",
                sortable: false,
                filterable: false
            }
        ]


        return (
            <>

                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>

                                <CardHeader>
                                           <CardTitle tag="h4" className="pull-left"></CardTitle>
                                    <Button color="primary" className="pull-right" onClick={() =>
                                        this.handleAdd()
                                    }>
                                        {strings.add}
                                    </Button>
                                    <br/>
                                    <CSVLink filename={"export"} className="pull-right" data={this.state.csvData}>{strings.export} </CSVLink>

                                </CardHeader>
                                <CardBody>
                                    <ReactTable
                                        previousText={strings.next}
                                        nextText={strings.previous}
                                        loadingText={strings.loading}
                                        //  noDataText={'No existen registros'}
                                        pageText={strings.page}
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
export default connect(null, mapDispatchToProps)(ManagerTypeList);
