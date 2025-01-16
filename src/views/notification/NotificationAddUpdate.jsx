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

import nationalityList from "../../components/Select/Nationality"
import Constants from "../../core/Constants";
import Checkboxrow from "../../components/Checkbox/Checkboxrow";
import {Utilites} from "../../core/Utilites";
import strings from "../../core/translate";

export default class NotificationAddUpdate extends CoreEngine {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            _id:"",

            student:"",
            studentlist:[],
            msg:"",
            msgkr:"",

            teacher:"",
            teacherlist:[],


            parent:"",
            parentlist:[],
            loading : false,
            alreadypiad:false,

        };
        this.pathname = "notification";
        this.engine = new RequestEngine();
    }



    componentDidMount() {
        const edit = this.props.location.data
        if (edit){
            this.setState({
                ...edit,
                student:edit.student && edit.student._id,
                parent:edit.parent && edit.parent._id,
                teacher:edit.teacher && edit.teacher._id,
            });
        }

        this.prepareData();
    }
    async prepareData(){
        let responseuni = await this.engine.getItemlistDirect("student");

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

        responseuni = await this.engine.getItemlistDirect("parent");

        if(responseuni){
            const data = responseuni.data.data;
            let parentlist = []
            data.map(p =>{
                parentlist.push( { value: p._id, label: p.fathername+" "+p.fatherfamily})
                }
            )

            this.setState({
                parentlist,
                isLoading:false
            });
        }


    }


    handleValidSubmit = async () => {

        this.setState({
            loading: true
        })

        let data  = {...this.state}
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
        const {loading,isLoading,
            note,
            studentlist  ,
            msg,
            msgkr,
            student,parent,parentlist,teacher,teacherlist,alreadypiad,
        }= this.state;

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
                                        <SelectRow label={strings.teacher}  name="teacher"  defaultValue={teacher}  data={teacherlist} changeInput={this.changeInput.bind(this)} />
                                        <SelectRow label={strings.parent}  name="parent"  defaultValue={parent}  data={parentlist} changeInput={this.changeInput.bind(this)} />

                                        <FormRow label={strings.message}  type={"textarea"} name="msg" data={msg} changeInput={this.changeInput.bind(this)} />


                                    </CardBody>

                                    {!alreadypiad && <CardFooter className="text-center">
                                        <ButtonLoader color="primary" loading={loading}>{strings.save}</ButtonLoader>
                                    </CardFooter>}
                                </Card>
                            </AvForm>

                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}


