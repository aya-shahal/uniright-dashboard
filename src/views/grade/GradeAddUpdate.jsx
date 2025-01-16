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

export default class GradeAddUpdate extends CoreEngine {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            _id:"",
            score:"0",
            year:"",
            datex:"",
            time:"",
            matierlist:[],
            student:"",
            studentlist:[],
            loading : false,

            full_picture:"",
            picture:"",
        };
        this.pathname = "grade";
        this.engine = new RequestEngine();
        this.sidepicture = "";
        this.idFileBase64 = "";
    }
    onChangePic(e) {
        Utilites.getFileBase64(e.target.files[0], (result) => {
            this.idFileBase64 = result;
        });
    }

    componentDidMount() {
        const edit = this.props.location.data
        if (edit){
            this.setState({
                ...edit,
                matier:edit.matier && edit.matier.id,
                student:edit.student && edit.student.id
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

        responseuni = await this.engine.getItemlistDirect("student");
        if(responseuni){
            const data = responseuni.data.data;
            let studentlist = []
            data.map(p =>{
                studentlist.push( { value: p._id, label: p.fname+" "+p.lname})
                }
            )
            this.setState({
                studentlist
            });
        }
    }


    handleValidSubmit = async () => {

        this.setState({
            loading: true
        })

        let data  = {...this.state}

        data.picture = this.idFileBase64
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
        const {loading,isLoading, score,year,matier,student,studentlist,datex,time }= this.state;

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
                                        <SelectRow label={strings.student}  name="student"  defaultValue={student}  data={studentlist} changeInput={this.changeInput.bind(this)} />

                                        <FormRow label={"year"} name="year" data={year} changeInput={this.changeInput.bind(this)}  />


                                        <Row>
                                            <Label sm="2">Grades </Label>
                                            <Col sm="5">
                                                <FormGroup >
                                                    <ImageUpload placeholder={this.state.full_picture} labelupload="Select Sheet" isfile={true} onChange={(e) => this.onChangePic(e)}/>
                                                </FormGroup>
                                            </Col>
                                        </Row>

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


