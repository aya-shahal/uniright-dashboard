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
import Checkboxrow from "../../components/Checkbox/Checkboxrow";
import FormRow from "../../components/Row/FormRow"
import SelectRow from "../../components/Select/SelectRow"
import { AvForm } from 'availity-reactstrap-validation';
import Constants from "../../core/Constants";
import {Utilites} from "../../core/Utilites";
import strings from "../../core/translate";

export default class SchoolAddUpdate extends CoreEngine {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            name:"",
            namekr:"",
            link:"",
            _id:"",
            address:"",
            status:true,
            picture:"",
            loading : false,
            innerload:false
        };
        this.pathname = "university";
        this.engine = new RequestEngine();


        this.idFileBase64 = "";
        this.idFileBase64en = "";
    }

    componentDidMount() {


        const edit = this.props.location.data
        if (edit){
            debugger
            this.setState({
                ...edit,
                status:edit.status==1?true:false,
                fullpicture:edit.picture.length>1 ? Constants.serverlink+"/upload/"+edit.picture:"",
                innerload:true
            });
        }else{
            this.setState({
                innerload:true
            });
        }
    }



    handleValidSubmit = async () => {


        this.setState({
            loading: true
        })


        const {  _id,name,address,namekr}= this.state;

        const data = {
            picture:this.idFileBase64en,
            address:address,
            namekr:namekr,
            _id:_id,
            name:name,

        }


        const response = await this.engine.saveItem(this.pathname,data)

        if(response && response.status === 200){
            this.props.history.push('/admin/'+this.pathname);
        }
        this.setState({
            loading: false
        })

    };

    onChangePic(e) {
        // this.setState({picture:e.target.files[0]})


        Utilites.getFileBase64(e.target.files[0], (result) => {
            this.idFileBase64en = result;
        });
    }

    onChangePicar(e) {
        Utilites.getFileBase64(e.target.files[0], (result) => {
            this.idFileBase64 = result;
        });
    }
    render() {
        // taking all the states
        const {loading,isLoading,name, address,namekr }= this.state;

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
                                        <CardTitle tag="h4">Banner information</CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <FormRow  label={strings.title} name="name" data={name}  changeInput={this.changeInput.bind(this)}  />

                                        <FormRow  label={strings.address} name="address" data={address} type={"textarea"} changeInput={this.changeInput.bind(this)}  />

                                        <Row>
                                            <Label sm="2">{strings.image} </Label>
                                            <Col sm="5">
                                                <FormGroup >
                                                    <ImageUpload placeholder={this.state.fullpicture} labelupload="Select Image" onChange={(e) => this.onChangePic(e)}/>
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


