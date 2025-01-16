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

export default class BookAddUpdate extends CoreEngine {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            name:"",
            link:"",
            _id:"",
            status:true,
            fullpicturear:"",
            picturear:"",
            fullpicture:"",
            fullpicture2:"",
            description:"",
            picture:"",

            loading : false,
            innerload:false
        };
        this.pathname = "book";
        this.engine = new RequestEngine();


        this.idFileBase64 = "";
        this.idFileBase64book = "";
    }

    componentDidMount() {


        const edit = this.props.location.data
        if (edit){
            debugger
            this.setState({
                ...edit,
                status:edit.status==1?true:false,
                fullpicture:edit.picture.length>1 ? Constants.serverlink+"/upload/"+edit.picture:"",
                fullpicture2:edit.book.length>1 ? Constants.serverlink+"/upload/"+edit.book:"",
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


        const {  _id,name,description }= this.state;

        const data = {
            picture:this.idFileBase64,
            book:this.idFileBase64book,
            _id:_id,
            name:name,
            description:description
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
        Utilites.getFileBase64(e.target.files[0], (result) => {
            this.idFileBase64 = result;
        });
    }

    onChangePicBook(e) {
        Utilites.getFileBase64(e.target.files[0], (result) => {
            this.idFileBase64book = result;
        });
    }
    render() {
        // taking all the states
        const {loading,isLoading,name,description }= this.state;

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
                                        <CardTitle tag="h4"> information</CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <FormRow required={false} label={strings.title} name="name" data={name}  changeInput={this.changeInput.bind(this)}  />

                                        <FormRow required={false} type={"textarea"} label={strings.text} name="description" data={description}  changeInput={this.changeInput.bind(this)}  />

                                        <Row>
                                            <Label sm="2">{strings.picture}  </Label>
                                            <Col sm="5">
                                                <FormGroup >
                                                    <ImageUpload  placeholder={this.state.fullpicture} labelupload="Select Image" onChange={(e) => this.onChangePic(e)}/>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Label sm="2">{strings.pdf}   </Label>
                                            <Col sm="5">
                                                <FormGroup >
                                                    <ImageUpload  placeholder={this.state.fullpicture2} isfile={true} labelupload="Select Book" onChange={(e) => this.onChangePicBook(e)}/>
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


