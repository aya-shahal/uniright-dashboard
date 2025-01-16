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
    ListGroupItem,
    ListGroup,
    DropdownItem,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle
} from "reactstrap";
import TreeMenu from 'react-simple-tree-menu';

import '../../../node_modules/react-simple-tree-menu/dist/main.css';
import CoreEngine from "../../core/CoreEngine";
import RequestEngine from "../../core/RequestEngine"
import {connect} from "react-redux";
import logo from "assets/img/folder.png";
import file from "assets/img/file.png";
import loadingAction from "../../core/redux/actions/loadingAction";
import ReactTable from "react-table";
import Constants from "../../core/Constants";
import strings from "../../core/translate";



const DEFAULT_PADDING = 16;
const ICON_SIZE = 8;
const LEVEL_SPACE = 16;

// Icon example
const iconStyle = {
    verticalAlign: 'text-bottom',
    width: 30,
    marginRight: 5
};
const folderIcon = <img src={logo}  alt="-" style={iconStyle}></img>;
const fileIcon = <img src={file}  alt="-" style={iconStyle}></img>;

const ToggleIcon = ({ on }) => <span style={{ marginRight: 8 }}>{on ? '-' : '+'}</span>;


const treeData = [
    {
        key: '0',
        label: 'دليل الحسابات',
        nodes: [
            {
                key: '1',
                label: 'الميزانية',
                nodes: [],
            },
            {
                key: '2',
                label: 'الموجودات',
                nodes: [],
            },
            {
                key: '3',
                label: 'المطلوبات',
                nodes: [],
            },
            {
                key: '4',
                label: 'الاستخدامات',
                nodes: [],
            },
            {
                key: '5',
                label: 'الموارد',
                nodes: [],
            },
        ],
    },
];


const ListItem = ({
                      level = 0,
                      hasNodes,
                      isOpen,
                      label,
                      searchTerm,
                      openNodes,
                      toggleNode,
                      matchSearch,
                      focused,
                      isfolder,
                      ...props
                  }) => (
    <ListGroupItem
        {...props}
        style={{
            paddingLeft: DEFAULT_PADDING + ICON_SIZE + level * LEVEL_SPACE,
            cursor: 'pointer',
            boxShadow: focused ? '0px 0px 5px 0px #222' : 'none',
            zIndex: focused ? 999 : 'unset',
            position: 'relative',
        }}
    >
        {hasNodes && (
            <div
                style={{ display: 'inline-block' }}
                onClick={e => {
                    hasNodes && toggleNode && toggleNode();
                    e.stopPropagation();
                }}
            >
                <ToggleIcon on={isOpen} />
            </div>
        )}
        {isfolder ? folderIcon:fileIcon}
        {label}
    </ListGroupItem>
);
class AccountList extends CoreEngine {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            filterby:"",
        };
        this.pathname = "account";
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
                    invoicenumber:item.invoicenumber,
                    qty:item.qty,
                    student: item.student && item.student.fname+" "+item.student.lname ,
                    feestype: item.feestype && item.feestype.title ,
                    amount: item.feestype && item.feestype.amount+"  " ,
                    invoicedate:item.invoicedate,
                    paid:item.paid?"Yes":"No",
                    created:this.renderDate(item.createdAt),
                })

            });
            this.setState({
                    isLoading: false,
                    csvData,
                    dataSource: response.data.data.map((item, key) => {
                        return {
                            id: key,
                            data:item,
                            invoicenumber:item.invoicenumber,
                            student: item.student && item.student.fname+" "+item.student.lname ,
                            feestype: item.feestype && item.feestype.title ,
                            amount: item.feestype && item.feestype.amount+"  " ,
                            invoicedate:item.invoicedate,
                            paymentamounttype:item.paymentamounttype,
                            paid:item.paid?"Yes":"No",
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
                Header: strings.invoicenumber,
                accessor: "invoicenumber"
            },
            {
                Header: strings.invoicedate,
                accessor: "invoicedate"
            },

            {
                Header: strings.amount,
                accessor: "amount"
            },
            {
                Header: strings.paid,
                accessor: "paid"
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


        return (
            <>

                <div className="content">
                    <Row>
                        <Col md="4">
                            <Card>

                                <CardHeader>
                                    <CardTitle tag="h4" className="pull-left">{strings.account}</CardTitle>

                                </CardHeader>
                                <CardBody>

                                    <TreeMenu
                                        data={treeData}
                                        onClickItem={({ key, label, ...props }) => {
                                            //this.navigate(props.url); // user defined prop
                                            console.log(props.id)
                                            if(props.id && props.id=="0"){
                                                console.log("skip")
                                                return;
                                            }
                                            if(props.id?.toString().length>5){
                                                this.setState({
                                                    filterby : props.id
                                                })
                                            }

                                        }}
                                        initialActiveKey='first-level-node-1/second-level-node-1' // the path to the active node
                                        debounceTime={125}>
                                        {({ items }) => (
                                            <ListGroup>
                                                {items.map(({ reset, ...props }) => (
                                                    <ListItem {...props} />
                                                ))}
                                            </ListGroup>
                                        )}
                                    </TreeMenu>



                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="8">
                            <Card>

                                <CardHeader>
                                    <CardTitle tag="h4" className="pull-left"></CardTitle>
                                    <Button color="primary" className="pull-right" onClick={() =>
                                        this.handleAdd()
                                    }>
                                        {strings.add}
                                    </Button>
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
                                        defaultPageSize={40}
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
export default connect(null, mapDispatchToProps)(AccountList);
