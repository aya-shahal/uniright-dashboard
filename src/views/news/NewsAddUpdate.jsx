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

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import ImageUpload from "../../components/CustomUpload/ImageUpload";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";

import FormRow from "../../components/Row/FormRow"
import SelectRow from "../../components/Select/SelectRow"
import { AvForm } from 'availity-reactstrap-validation';


import {Utilites} from "../../core/Utilites";
import strings from "../../core/translate";

export default class NewsAddUpdate extends CoreEngine {
    constructor(props) {
        super(props);

        const html = '';
        const contentBlock = htmlToDraft(html);

        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
            isLoading: false,
            _id:"",
            name:"",
            classx:"",
            type:"general",
            namekr:"",
            textkr:"",
            classxlist:[],
            editorState : editorState,
            text:"",
            picture:"",
            fullpicture:"",
            loading : false,
        };
        this.pathname = "news";
        this.engine = new RequestEngine();
        this.sidepicture = "";


    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    componentDidMount() {
        const edit = this.props.location.data
        if (edit){

            const html = edit.text;
            const contentBlock = htmlToDraft(html);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({
                ...edit,
                editorState,
                storycategory:edit.storycategory && edit.storycategory.id,
                classx:edit.classx && edit.classx.id,

            });
        }
        this.prepareData()
    }

    async prepareData(){
        let responseuni = await this.engine.getItemlistDirect("classx");
        if(responseuni){
            const data = responseuni.data.data;
            let classxlist = []
            data.map(p =>{
                    classxlist.push( { value: p._id, label: p.name+" / "+p.section+" / "+p.lang})
                }
            )
            this.setState({
                classxlist
            });
        }
    }



    handleValidSubmit = async () => {

        this.setState({
            loading: true
        })

        let data  = {...this.state}
        data.sidepicture = this.sidepicture;

        data.text = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
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
        const {loading,isLoading, name,editorState,type,  }= this.state;

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

                                        <SelectRow label={strings.type}  name="type"  defaultValue={type}  data={this.createSelectValue(["general","alumni","events","news"])} changeInput={this.changeInput.bind(this)} />


                                        <FormRow label={strings.title} name="name" data={name} changeInput={this.changeInput.bind(this)}  />

                                        <Row>
                                            <Label sm="2">Description</Label>
                                            <Col sm="7" >
                                                <FormGroup   >
                                                    <Editor
                                                        editorState={editorState}
                                                        toolbarClassName="toolbarClassName"
                                                        wrapperClassName="wrapperClassName"
                                                        editorClassName="editorClassName"
                                                        onEditorStateChange={this.onEditorStateChange}
                                                    />

                                                </FormGroup>
                                            </Col>
                                            <Col className="label-on-right" tag="label" sm="3">
                                                <code>required</code>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Label sm="2">{strings.image}  </Label>
                                            <Col sm="5">
                                                <FormGroup >
                                                    <ImageUpload placeholder={this.state.fullpicture} labelupload="Select Image" onChange={(e) => {
                                                        Utilites.getFileBase64(e.target.files[0], (result) => {
                                                            this.sidepicture = result;
                                                        });
                                                    }}/>
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


