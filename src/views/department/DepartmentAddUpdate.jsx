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

export default class DepartmentAddUpdate extends CoreEngine {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            _id:"",
            name:"",
            loading : false,
            graduatetype:"graduate",
            description:"",
            full_picture:"",
            picture:"",
        };
        this.pathname = "department";
        this.engine = new RequestEngine();
        this.sidepicture = "";
        this.idFileBase64 = "";
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

    onChangePic(e) {
        Utilites.getFileBase64(e.target.files[0], (result) => {
            this.idFileBase64 = result;
        });
    }

    render() {
        // taking all the states
        const {loading,isLoading,  name,description,
            graduatetype, }= this.state;

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
                                        <FormRow label={strings.title} name="name" data={name} changeInput={this.changeInput.bind(this)}  />

                                        <SelectRow label={"graduate type"}  name="graduatetype"  defaultValue={graduatetype}  data={this.createSelectValue(['graduate','under graduate'])} changeInput={this.changeInput.bind(this)} />

                                        <FormRow required={false} type={"textarea"} label={"description"} name="description" data={description}  changeInput={this.changeInput.bind(this)}  />


                                        <Row>
                                            <Label sm="2">Sheet </Label>
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


