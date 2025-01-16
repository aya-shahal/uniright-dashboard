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

import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";

import FormRow from "../../components/Row/FormRow"
import SelectRow from "../../components/Select/SelectRow"
import { AvForm } from 'availity-reactstrap-validation';

import DynamicForm from "./DynamicForm";
import strings from "../../core/translate";
import {Utilites} from "../../core/Utilites";

export default class FormAddUpdate extends CoreEngine {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            _id:"",
            name  :"",
            namekr:"",
            matierlist:[],
            matier:"",
            attributelist:[],
            inputlist:[],
            loading : false,

        };
        this.pathname = "form";
        this.engine = new RequestEngine();
    }

    componentDidMount() {
        const edit = this.props.location.data
        if (edit){
            this.setState({
                ...edit,
                matier:edit.matier && edit.matier._id,
                isLoading:false
            });
        }else{
            this.setState({
                isLoading : false
            })
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

        let data  = {...this.state}

        data.answers=data.answerslist;
        const response = await this.engine.saveItem(this.pathname,data)

        if(response && response.status === 200){
            Utilites.showSucessMessage(strings.msgsaved)
            this.props.history.push('/admin/'+this.pathname);
        }
        this.setState({
            loading: false
        })

    };


    fillAttribute(data){
        this.setState({
            inputlist:data
        })
    }

    render() {
        // taking all the states
        const {loading,isLoading,inputlist,name,attributelist,namekr,matier,matierlist}= this.state;

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

                                        <SelectRow label={strings.matier}  name="matier"  defaultValue={matier}  data={matierlist} changeInput={this.changeInput.bind(this)} />
                                        <FormRow label={strings.name}  name="name"  data={name} changeInput={this.changeInput.bind(this)} />

                                        <DynamicForm fillAttribute={this.fillAttribute.bind(this)} colx={attributelist} initialdata={inputlist}/>

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


