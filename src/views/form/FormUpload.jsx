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
import { AvForm } from 'availity-reactstrap-validation';

import {Utilites} from "../../core/Utilites";
import SelectRow from "../../components/Select/SelectRow";
import strings from "../../core/translate";
import {string} from "prop-types";
import FormRow from "../../components/Row/FormRow";

export default class FormUpload extends CoreEngine {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            _id:"",
            type:"students",
            fullpicture:"",
            picture:"",
            loading : false,
            name  :"",
            namekr:"",
            matierlist:[],
            matier:"",
        };
        this.pathname = "uploaditemquiz";
        this.engine = new RequestEngine();


        this.idFileBase64 = "";
    }

    componentDidMount() {


        const edit = this.props.location.data
        if (edit){
            this.setState({
                ...edit
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

    }




    handleValidSubmit = async () => {



        this.setState({
            loading: true
        })



        const { picture,matier,name,namekr}= this.state;

        const formData = new FormData();
        formData.append('picture',picture)
        formData.append('matier',matier)
        formData.append('name',name)
        formData.append('namekr',namekr)





        const response = await this.engine.saveItemData(this.pathname,formData)

        if(response && response.status === 200){
            Utilites.showSucessMessage("Uploaded !")

            //  this.props.history.push('/admin/item');
        }
        this.setState({
            loading: false
        })

    };

    onChangePic(e) {
        this.setState({picture:e.target.files[0]})
    }

    onChangePicar(e) {
        Utilites.getFileBase64(e.target.files[0], (result) => {
            this.idFileBase64 = result;
        });
    }
    render() {
        // taking all the states
        const {loading,isLoading,type ,to ,matier,matierlist,name,namekr}= this.state;

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
                                        <CardTitle tag="h4"> {strings.information}</CardTitle>

                                        <span style={{color:"red"}}>max file size 5mb</span>
                                    </CardHeader>
                                    <CardBody>

                                        <SelectRow label={strings.matier}  name="matier"  defaultValue={matier}  data={matierlist} changeInput={this.changeInput.bind(this)} />
                                        <FormRow label={strings.name}  name="name"  data={name} changeInput={this.changeInput.bind(this)} />

                                        <Row>
                                            <Label sm="2">{strings.csv} </Label>
                                            <Col sm="5">
                                                <FormGroup >
                                                    <ImageUpload placeholder={this.state.fullpicture} labelupload="Select File" isfile={true} onChange={(e) => this.onChangePic(e)}/>
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


