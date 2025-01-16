import React from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Form,
    FormGroup,
    Input,
    Label,
    Table,
    Row,
    Col
} from "reactstrap";
import RequestEngine from "../../core/RequestEngine"
import CoreEngine from "../../core/CoreEngine";

import ImageUpload from "../../components/CustomUpload/ImageUpload";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";

import FormRow from "../../components/Row/FormRow"
import SelectRow from "../../components/Select/SelectRow"
import { AvForm } from 'availity-reactstrap-validation';


import {Utilites} from "../../core/Utilites";
import strings from "../../core/translate";

export default class ScheduleAddUpdate extends CoreEngine {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            _id:"",
            datex:"",
            eventkr:"",
            teachermatier:"",
            teachermatierlist:[],
            day:"",
            fromtime:"",
            totime:"",
            classx:"",
            classxlist:[],
            event:"",
            loading : false,
        };
        this.pathname = "schedule";
        this.engine = new RequestEngine();
        this.sidepicture = "";
    }

    componentDidMount() {
        const edit = this.props.location.data
        if (edit){
            this.setState({
                ...edit,
                classx:edit.classx && edit.classx.id,
                teachermatier:edit.teachermatier && edit.teachermatier.id
            });
        }

        this.prepareData()
    }

    async prepareData(){
        let responseuni = await this.engine.getItemlistDirect("classx");
        if(responseuni){
            const data = responseuni.data.data;
            let classxlist = []
            data.map(p =>{
                    classxlist.push( { value: p._id, label: p.name+" / "+p.section+" / "+p.lang})
                }
            )
            this.setState({
                classxlist
            });
        }

        responseuni = await this.engine.getItemlistDirect("teachermatier");
        if(responseuni){
            const data = responseuni.data.data;
            let teachermatierlist = []
            data.map(p =>{
                teachermatierlist.push( { value: p._id, label: p.matier.name+" / "+(p.teacher && p.teacher.fname)})
                }
            )
            this.setState({
                teachermatierlist
            });
        }


    }





    handleValidSubmit = async () => {

        this.setState({
            loading: true
        })

        let data  = {...this.state}
        data.sidepicture = this.sidepicture;
        const response = await this.engine.saveItem(this.pathname,data)

        if(response && response.status === 200){
            this.props.history.push('/admin/'+this.pathname);
        }
        this.setState({
            loading: false
        })

    };


    render() {
        // taking all the states
        const {loading,isLoading, teachermatier,teachermatierlist,day,fromtime,totime,classxlist,classx }= this.state;

        if (isLoading) {
            return this.renderProgress()
        }
        return (
            <>
                <div className="content english">

                    <h4></h4>
                    <Row>
                        <Col md="12">

                            <AvForm  onValidSubmit={() =>this.handleValidSubmit()} className="form-horizontal" id="TypeValidation">
                                <Card>
                                    <CardHeader>
                                        <CardTitle tag="h4">{strings.information}</CardTitle>
                                    </CardHeader>
                                    <CardBody>

                                        <SelectRow label={strings.class}  name="classx"  defaultValue={classx}  data={classxlist} changeInput={this.changeInput.bind(this)} />
                                        <SelectRow label={strings.matier}  name="teachermatier"  defaultValue={teachermatier}  data={teachermatierlist} changeInput={this.changeInput.bind(this)} />

                                        <SelectRow label={strings.day}  name="day"  defaultValue={day}  data={this.createSelectValue(["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"])} changeInput={this.changeInput.bind(this)} />

                                        <FormRow label={strings.fromtime} name="fromtime" type={"time"} data={fromtime} changeInput={this.changeInput.bind(this)}  />
                                        <FormRow label={strings.totime} name="totime" type={"time"} data={totime} changeInput={this.changeInput.bind(this)}  />



                                    </CardBody>

                                    <CardFooter className="text-center">
                                        <ButtonLoader color="primary" loading={loading}>{strings.save}</ButtonLoader>
                                    </CardFooter>
                                </Card>
                            </AvForm>

                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}


