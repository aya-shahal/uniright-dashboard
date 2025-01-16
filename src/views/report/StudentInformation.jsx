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
import {CSVLink} from "react-csv";
import {connect} from "react-redux";
import loadingAction from "../../core/redux/actions/loadingAction";
import ReactTable from "react-table";
import strings from "../../core/translate";

class StudentInformation extends CoreEngine {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            csvData:[]
        };
        this.pathname = "student";
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



     renderPendingPayment() {

        let p1 = Math.floor((Math.random() * 3000) + 1000);
        let p2 = Math.floor((Math.random() * 2000) + 500);
        return (<div>
            Payment 1 Amount: <b>{p1}</b> <br/>
            Payment 1 Date: 04-05-2023 <br/>
            Payment 2 Amount: <b>{p2}</b> <br/>
            Payment 2 Date: 06-07-2023 <br/>
            </div>)
    }



    async callPage() {

        const response = await  this.engine.getItem(this.pathname);


        let csvData = []
        response.data.data.map(item=>{

            let p1 = Math.floor((Math.random() * 3000) + 1000);
            let p2 = Math.floor((Math.random() * 2000) + 500);
            csvData.push({
                nationality: item.nationality ,
                studentphone:"+964"+Math.floor((Math.random() * 9999999) + 888888),
                title: item.fname+" "+item.lname ,
                classx:item.classx && (item.classx.name+" / "+item.classx.section),
                matier:Math.floor((Math.random() * 20) + 10),
                pending1amount:"Payment 1 Amount: "+p1,
                pending1date:"Date: 04-05-2023 ",
                pending2amount:"Payment 2 Amount: "+p2,
                pending2date:"Date: 07-06-2023 ",
                recivedpayment: Math.floor((Math.random() * 5000) + 2000),
                created:this.renderDate(item.createdAt),
            })

        });

        if(response && response.status === 200){
            this.setState({
                    isLoading: false,
                    csvData:csvData,
                    dataSource: response.data.data.map((item, key) => {
                        return {
                            id: key,
                            data:item,
                            nationality: item.nationality ,
                            studentphone:"+964"+Math.floor((Math.random() * 9999999) + 888888),
                            title: item.fname+" "+item.lname ,
                            classx:item.classx && (item.classx.name+" / "+item.classx.section),
                            matier:Math.floor((Math.random() * 20) + 10),
                            pendingpayment: this.renderPendingPayment(),
                            recivedpayment: Math.floor((Math.random() * 5000) + 2000),
                            img: item.fullpicture && item.fullpicture.length>1 ? <img key={key}  src={item.fullpicture} className={"imgsponser"} />:"-" ,
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




    render() {
        const {dataSource,isLoading} = this.state;

        let columns = [
            {
                Header: "Profile Picture",
                accessor: "img",
                sortable: false,
                filterable: false
            },
            {
                Header: "name",
                accessor: "title"
            },
            {
                Header: "Pending payment",
                accessor: "pendingpayment"
            },
            {
                Header: "Received payment",
                accessor: "recivedpayment"
            },

            {
                Header: "class",
                accessor: "classx"
            },
            {
                Header: "Total Matier",
                accessor: "matier"
            },



            {
                Header: "Created",
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
                                    <CSVLink filename={"export"} className="pull-right" data={this.state.csvData}>Export </CSVLink>

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
export default connect(null, mapDispatchToProps)(StudentInformation);
