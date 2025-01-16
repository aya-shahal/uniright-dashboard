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

export default class HealthAddUpdate extends CoreEngine {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            _id:"",
            invoicedate:"",
            paymentamounttype:"full",
            paid:false,
            fullpicture:"",
            note:"",
            student:"",
            studentlist:[],
            qty:"1",
            paymenttype:"card",
            healthtype:"",
            picture: "",
            healthtypelist:[],
            loading : false,
            alreadypiad:false,

        };
        this.pathname = "health";
        this.engine = new RequestEngine();
    }

    onChangePic(e) {
        this.setState({picture:e.target.files[0]})
    }

    componentDidMount() {
        const edit = this.props.location.data
        if (edit){
            debugger
            this.setState({
                ...edit,
                student:edit.student && edit.student._id,
                healthtype:edit.healthtype && edit.healthtype._id,
                isLoading:false
            });
        }else{
            this.setState({
                isLoading : false,
            })
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

        responseuni = await this.engine.getItemlistDirect("healthtype");

        if(responseuni){
            const data = responseuni.data.data;
            let healthtypelist = []
            data.map(p =>{
                healthtypelist.push( { value: p._id, label: p.title})
                }
            )

            this.setState({
                healthtypelist
            });
        }


    }


    handleValidSubmit = async () => {
        this.setState({
            loading: true
        })
        const {  _id,note,healthtype,student }= this.state;



        const formData = new FormData();
        formData.append('_id',_id)
        formData.append('healthtype',healthtype)
        formData.append('note',note)

        formData.append('student',student)

        const response = await this.engine.saveItemData(this.pathname,formData)

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
            student,healthtype,healthtypelist,alreadypiad,
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


                                        <SelectRow label={strings.healthtype}  name="healthtype"  defaultValue={healthtype}  data={healthtypelist} changeInput={this.changeInput.bind(this)} />
                                       <FormRow label={strings.note} required={false} type={"textarea"} name="note" data={note} changeInput={this.changeInput.bind(this)} />

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


