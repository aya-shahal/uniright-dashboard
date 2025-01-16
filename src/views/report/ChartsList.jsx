import React from "react";
import {Bar, Bubble, Line, Pie, Scatter} from 'react-chartjs-2';
import * as PropTypes from "prop-types";

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



export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Fees Collection & Expenses For March 2023',
            data: [10,23,55,3,10,55,70],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};


export const dataattendance = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Student Today Attendance',
            data: [100,105,90,86,110,85,95],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export const datapie = {
    labels: ['Income', 'Expense'],
    datasets: [
        {
            label: '',
            data: [2500, 1000],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
        },
    ],
};


function Chart(props) {
    return null;
}

Chart.propTypes = {
    data: PropTypes.shape({datasets: PropTypes.any, labels: PropTypes.arrayOf(PropTypes.string)}),
    type: PropTypes.string
};
class ChartsList extends CoreEngine {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
        };
        this.pathname = "attendance";
        this.engine = new RequestEngine();
    }













    render() {
        const {dataSource,isLoading} = this.state;



        return (
            <>

                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>

                                <CardHeader>
                                    <CardTitle tag="h4" className="pull-left">Fees Collection & Expenses For March 2023</CardTitle>

                                </CardHeader>
                                <CardBody>
                                    <Line options={options} data={data} />
                                </CardBody>
                                <CardHeader>
                                    <CardTitle tag="h4" className="pull-left">Student Attendance</CardTitle>

                                </CardHeader>

                                <CardBody>
                                    <Bar options={options} data={dataattendance} />
                                </CardBody>


                                <CardHeader>
                                    <CardTitle tag="h4" className="pull-left">Income vs Expense Pie</CardTitle>

                                </CardHeader>

                                <CardBody>
                                    <Pie data={datapie} />
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
export default connect(null, mapDispatchToProps)(ChartsList);
