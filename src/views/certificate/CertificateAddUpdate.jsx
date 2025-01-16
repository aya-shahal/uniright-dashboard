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
import {Utilites} from "../../core/Utilites";



export default class CertificateAddUpdate extends CoreEngine {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            _id:"",
            name:"",
            namekr:"",
            loading : false,
            departmentlist:[],
            department:"",
            credits:"0",
            full_picture:"",
            picture:"",
            full_picture2:"",
            picture2:"",
        };
        this.pathname = "certificate";
        this.engine = new RequestEngine();


        this.idFileBase64 = "";
        this.idFileBase642 = "";
    }

    onChangePic(e) {
        Utilites.getFileBase64(e.target.files[0], (result) => {
            this.idFileBase64 = result;
        });
    }

    onChangePic2(e) {
        Utilites.getFileBase64(e.target.files[0], (result) => {
            this.idFileBase642 = result;
        });
    }

    componentDidMount() {
        const edit = this.props.location.data
        if (edit){
            this.setState({
                ...edit,

            });
        }

        this.prepareData();
    }

    async prepareData(){
        let responseuni = await this.engine.getItemlistDirect("department");

        if(responseuni){
            const data = responseuni.data.data;
            let departmentlist = []
            data.map(p =>{
                departmentlist.push( { value: p._id, label: p.name+" - "+p.graduatetype})
                }
            )

            this.setState({
                departmentlist
            });
        }



    }




    handleValidSubmit = async () => {

        this.setState({
            loading: true
        })

        let data  = {...this.state}

        data.picture = this.idFileBase64
        data.picture2 = this.idFileBase642
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
        const {loading,isLoading,      name,credits,
            departmentlist,department }= this.state;

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

                                        <SelectRow label={"academic"}  name="department"  defaultValue={department}  data={departmentlist} changeInput={this.changeInput.bind(this)} />

                                        <FormRow label={strings.name} name="name" data={name} changeInput={this.changeInput.bind(this)}  />

                                        <FormRow label={"credits"} name="credits" data={credits} changeInput={this.changeInput.bind(this)}  />


                                        <Row>
                                            <Label sm="2">Contract sheet  </Label>
                                            <Col sm="5">
                                                <FormGroup >
                                                    <ImageUpload placeholder={this.state.full_picture} labelupload="Select Sheet" isfile={true} onChange={(e) => this.onChangePic(e)}/>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Label sm="2">Course Description  </Label>
                                            <Col sm="5">
                                                <FormGroup >
                                                    <ImageUpload placeholder={this.state.full_picture2} labelupload="Select Sheet" isfile={true} onChange={(e) => this.onChangePic2(e)}/>
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


