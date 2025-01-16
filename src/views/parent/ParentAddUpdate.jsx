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

export default class ParentAddUpdate extends CoreEngine {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            fathername:"",
            username:"",


            fatherfamily:"",
            mothername:"",
            motherfamily:"",


            fatherfamilykr:"",
            mothernamekr:"",
            motherfamilykr:"",


            fatherphone:"",
            motherphone:"",
            email:"",
            password:"",
            _id:"",
            loading : false,
        };
        this.pathname = "parent";
        this.engine = new RequestEngine();

        this.sidepicture = "";
    }

    componentDidMount() {


        const edit = this.props.location.data
        if (edit){
            this.setState({
                ...edit,
            });
        }

    }




    handleValidSubmit = async () => {


        this.setState({
            loading: true
        })


        let data = {...this.state}

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
        const {loading,isLoading,   fathername,
            fatherfamily,
            mothername,
            motherfamily,


            fathernamekr,
            fatherfamilykr,
            mothernamekr,
            motherfamilykr,


            fatherphone,
            motherphone,username,
            email,
            password }= this.state;

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
                                        <FormRow label={strings.father} required={false} name="fathername" data={fathername}   changeInput={this.changeInput.bind(this)} />
                                        <FormRow label={strings.family} name="fatherfamily" data={fatherfamily}   changeInput={this.changeInput.bind(this)} />
                                        <FormRow label={strings.stringsmotherfamiliy} name="mothername" data={mothername}   changeInput={this.changeInput.bind(this)} />





                                        <FormRow required={false} label={strings.fatherphone} name="fatherphone" data={fatherphone}   changeInput={this.changeInput.bind(this)} />
                                        <FormRow required={false} label={strings.motherphone} name="motherphone" data={motherphone}   changeInput={this.changeInput.bind(this)} />
                                        <FormRow label={strings.email} required={false} name="email" data={email}  type={"email"}  changeInput={this.changeInput.bind(this)} />
                                        <FormRow label={strings.username} name="username" data={username}   changeInput={this.changeInput.bind(this)} />

                                         <FormRow label={strings.password} name="password" data={password}   changeInput={this.changeInput.bind(this)} />


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


