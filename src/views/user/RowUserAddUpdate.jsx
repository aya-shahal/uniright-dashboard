import React from "react";

// reactstrap misc
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Label,
    FormGroup,
    Row,
    Col
} from "reactstrap";
import RequestEngine from "../../core/RequestEngine"
import CoreEngine from "../../core/CoreEngine";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";
import FormRow from "../../components/Row/FormRow";
import { AvForm } from 'availity-reactstrap-validation';
import Select from "react-select";

import ImageUpload from "../../components/CustomUpload/ImageUpload";
import Checkboxrow from "../../components/Checkbox/Checkboxrow";
import {Utilites} from "../../core/Utilites";
import strings from "../../core/translate";


export default class RowUserAddUpdate extends CoreEngine {
    constructor(props) {
        super(props);

        this.state = {
            btnloading: false,
            managertypelist:[],
            full_name: "",
            email:"",
            phone:"",
            username:"",
            isLoading:true,
            isactivated:false,
            _id : ""
        };
        this.engine = new RequestEngine();
    }



    componentDidMount() {
        const edit = this.props.location.data

        if (edit){
            this.setState({
                ...edit,

            });


        }


        Utilites.setTimeout(()=>{
            this.setState({
                isLoading:false
            })
        },1000)

    }





    handleValidSubmit = () => {



        this.engine.saveUserMobile(this.state,(response) => {
            console.log(response.status);
            if(response.status === 200){
                this.props.history.push('/admin/user');
            }
            this.setState({
                btnloading: false
            })
        });







    };




    render() {
        // taking all the states
        const {
            full_name,
            username,
            phone,
            email,
            country,
            isLoading,
            isactivated,
            btnloading,_id} = this.state;

        if (isLoading) {
            return this.renderProgress()
        }
        return (
            <>
                <div className="content english">
                    <Row>
                        <Col md="12">
                            <AvForm  onValidSubmit={() =>this.handleValidSubmit()} className="form-horizontal" id="TypeValidation">
                                <Card>
                                    <CardHeader>
                                        <CardTitle tag="h4">{!_id && "Add"} {_id && "Edit"}</CardTitle>
                                    </CardHeader>
                                    <CardBody>



                                       <FormRow label="full name" required={false} name="full_name" data={full_name} changeInput={this.changeInput.bind(this)} />
                                        <FormRow label="phone"  name="phone" data={phone} changeInput={this.changeInput.bind(this)} />
                                        <FormRow label="email"   name="email" data={email} changeInput={this.changeInput.bind(this)} />
                                        <Checkboxrow label="Activated" name="isactivated" data={isactivated}  changeInput={this.changeInput.bind(this)} />




                                    </CardBody>
                                    <CardFooter className="text-center">
                                        <ButtonLoader color="primary" loading={btnloading}>{strings.save}</ButtonLoader>
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


