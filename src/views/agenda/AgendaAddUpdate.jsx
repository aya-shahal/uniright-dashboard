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
import strings from "../../core/translate";


export default class AgendaAddUpdate extends CoreEngine {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            _id:"",
            datex:"",
            text:"",
            textkr:"",
            classx:"",
            time:"",
            classxlist:[],
            matier:"",
            matierlist:[],
            teacher:"",
            teacherlist:[],
            loading : false,
        };
        this.pathname = "agenda";
        this.engine = new RequestEngine();
        this.sidepicture = "";
    }

    componentDidMount() {
        const edit = this.props.location.data
        if (edit){
            this.setState({
                ...edit,
                teacher:edit.teacher && edit.teacher.id,
                matier:edit.matier && edit.matier.id
            });
        }
        this.prepareData()
    }

    async prepareData(){
        let responseuni = await this.engine.getItemlistDirect("matier");
        if(responseuni){
            const data = responseuni.data.data;
            let matierlist = []
            data.map(p =>{
                    matierlist.push( { value: p._id, label: p.name+" / "+(p.classx && p.classx.name)+" / "+(p.classx && p.classx.section)})
                }
            )
            this.setState({
                matierlist
            });
        }

        responseuni = await this.engine.getItemlistDirect("teacher");
        if(responseuni){
            const data = responseuni.data.data;
            let teacherlist = []
            data.map(p =>{
                    teacherlist.push( { value: p._id, label: p.fname+" "+p.lname})
                }
            )
            this.setState({
                teacherlist
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
        const {loading,isLoading, textkr,text,datex,time,classx,teacher,teacherlist,matier,matierlist }= this.state;

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

                                        <SelectRow label={strings.teacher}  name="teacher"  defaultValue={teacher}  data={teacherlist} changeInput={this.changeInput.bind(this)} />
                                        <SelectRow label={strings.matier}  name="matier"  defaultValue={matier}  data={matierlist} changeInput={this.changeInput.bind(this)} />

                                        <FormRow label={strings.date} type={"date"} name="datex" data={datex} changeInput={this.changeInput.bind(this)}  />
                                        <FormRow label={strings.time} type={"time"} name="time" data={time} changeInput={this.changeInput.bind(this)}  />
                                        <FormRow label={strings.text}  name="text" data={text} type={"textarea"} changeInput={this.changeInput.bind(this)}  />




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


