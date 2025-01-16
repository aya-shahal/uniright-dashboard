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

export default class BannerAddUpdate extends CoreEngine {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            name:"",
            subtitle:"",
            namear:"",
            subtitlear:"",
            link:"",
            _id:"",
            status:true,
            fullpicturear:"",
            picturear:"",
            fullpicture:"",
            picture:"",
            formobile:"web",
            orderx:"0",
            loading : false,
            innerload:false
        };
        this.pathname = "banner";
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
                fullpicturear:edit.picturear && edit.picturear.length>1 ? Constants.serverlink+"/upload/"+edit.picturear:"",
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


        const {  _id,name,link,subtitle,formobile,    namear,
            subtitlear,status,orderx }= this.state;

        const data = {
            picture:this.idFileBase64en,
            picturear:this.idFileBase64,
            _id:_id,
            name:name,
            namear:namear,
            subtitlear:subtitlear,
            link:link,
            subtitle:subtitle,
            formobile:formobile,
            status:status,
            orderx:orderx
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
        const {loading,isLoading,innerload, formobile,  orderx,link, namear,status }= this.state;

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
                                        <CardTitle tag="h4"></CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                       <FormRow required={false} label={strings.order} name="orderx" data={orderx.toString()} type={"number"} changeInput={this.changeInput.bind(this)}  />

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


