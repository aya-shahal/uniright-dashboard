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
import strings from "../../core/translate";

 class UserList extends CoreEngine {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
        };
        this.engine = new RequestEngine();
    }

    componentDidMount() {

        const {manager} = this.props
        console.log("manager",manager)
        this.callPage(manager)
    }


     async handleViewBenExport() {
         await  this.engine.exportCSV("user","/export");
     }

     handleDelete(valueid) {
         console.log(valueid);
         this.props.loadingAction(true)
         const {manager} = this.props
         if(manager){
             this.engine.deleteManager(valueid,(response) => {
                 console.log(response.status);
                 if(response.status === 200){
                     this.handlePage(manager);
                 }
                 this.props.loadingAction(false)
             });
         }else{
             this.engine.deleteUser(valueid,(response) => {
                 console.log(response.status);
                 if(response.status === 200){
                     this.handlePage(manager);
                 }
                 this.props.loadingAction(false)
             });
         }


     }


     handleEdit(index,dataid) {
         const data = this.state.dataSource[index].data
         const {manager} = this.props
         if(manager){
             this.props.history.push({
                 pathname:'/admin/manager/edit/'+dataid,
                 data
             });
         }else{
             this.props.history.push({
                 pathname:'/admin/user/edit/'+dataid,
                 data
             });
         }
     }


     handleActions(index,item) {

         const {manager} = this.props
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
                 Actions
             </DropdownToggle>
             <DropdownMenu>

                 <DropdownItem variant="danger" eventKey="1" onClick={() => this.handleDelete(item._id)}>{item.deleted && "Restore"} {!item.deleted && "Delete"}</DropdownItem>


             </DropdownMenu>
         </UncontrolledDropdown>)
     }


     toggelVerified(dataid) {
         const {manager} = this.props
         this.engine.toggleuserstatus(dataid._id,manager,(response) => {
             console.log(response.status);
             if(response.status === 200){
                 //this.iniload();
                 //window.location.reload()
                 this.componentDidMount()
             }
         });
     }
     checkstatus(item) {
        if(!item.isactivated){

             return ("Unverified")

        }else if(item.isactivated){

            return ("Verified")
        }

     }



     callPage(manager) {
        this.engine.getUsers(manager,(response) => {
            console.log(response.status);
            if(response.status === 200){
                this.setState({
                    isLoading: false,
                    dataSource: response.data.data.map((item, key) => {
                        return {
                            id: key,
                            data:item,
                            code: item.full_name,
                            name: item.full_name ,
                            email: item.email ,
                            type: item.managertype && item.managertype.name,
                            status: this.checkstatus(item) ,
                            raw_status: this.checkstatus(item),
                            subscribetype : item.subscribetype && item.subscribetype,
                           username:item.username,
                            phone: item.phone,
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
        });
    }

    handlePage(manager) {
        this.props.loadingAction(true);
        this.callPage(manager)
    }


     handleAdd() {

         const {manager} = this.props

         if(manager){
             this.props.history.push('/admin/manager/add');
         }else{
             this.props.history.push('/admin/user/add');
         }

     }
     filterRawText(filter, row) {
         // Pivoted rows won't contain the column.
         //  If that's the case, we set the to true (allowing us to only filter on the current column)
         let rowValue = row[filter.id];
         if (!rowValue) {
             return true;
         }
         const index = row._index


         rowValue =  this.state.dataSource[index]["raw_"+filter.id]
         if(!rowValue){
             return;
         }
         const filterValue = filter.value;
         //const filterValue = filter.value.filterValue || "";
         //const filterType = filter.value.filterType;

         const filterType = "contains";
         switch (filterType) {
             case "contains":
                 return rowValue.toLowerCase().indexOf(filterValue.toLowerCase()) > -1;
             case "starts-with":
                 return rowValue.startsWith(filterValue);
             case "ends-with":
                 return rowValue.endsWith(filterValue);
             case "matches":
                 return rowValue === filterValue;
             case "greater-than":
                 return rowValue > filterValue;
             case "less-than":
                 return rowValue < filterValue;
             default:
                 return true;
         }
     }


     render() {

        const {dataSource,isLoading} = this.state;
        const {manager} = this.props
     //   if (isLoading) {
       //     return this.renderProgress()
       // }

        let columns = [

            {
                Header: strings.fullname,
                accessor: "code",
                className: "boldmin"
            },
            {
                Header: strings.name,
                accessor: "name"
            },
            {
                Header: strings.email,
                accessor: "email",
                // width: 150
            },

            {
                Header: strings.created,
                accessor: "created"
            },
            {
                Header: strings.actions,
                accessor: "actions",
                sortable: false,
                filterable: false
            }
        ]


         if (!manager){
            // columns.splice(1,1)   // hide managertype
            // columns.splice(2,1)
             columns.splice(3,1)
         }else{
             columns.splice(0,1) ;
             columns.splice(1,1)   // h
            // columns.splice(3,1)   // hide subscriber type
         }


        return (
            <>

                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>

                                <CardHeader>
                                    <CardTitle tag="h4" className="pull-left"> List</CardTitle>
                                    {manager && <Button color="primary" className="pull-right" onClick={() =>
                                        this.handleAdd()
                                    }>
                                        {strings.add}
                                    </Button>}


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
export default connect(null, mapDispatchToProps)(UserList);
