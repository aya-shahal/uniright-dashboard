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

export default class FeesTypeAddUpdate extends CoreEngine {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            _id:"",
            title  :"",
            titlekr:"",
            classx:"",
            classxlist:[],
            amount:"",
            loading : false,

        };
        this.pathname = "feestype";
        this.engine = new RequestEngine();
    }

    componentDidMount() {


        const edit = this.props.location.data
        if (edit){
            this.setState({
                ...edit,
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
        const {loading,isLoading,classxlist,classx,
            title,titlekr,
            amount}= this.state;

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
                                        <SelectRow label={strings.class}  name="classx"  defaultValue={classx}  data={classxlist} changeInput={this.changeInput.bind(this)} />
                                        <FormRow label={strings.title}  name="title" data={title} changeInput={this.changeInput.bind(this)} />

                                        <FormRow label={strings.amount} type={"number"} name="amount" data={amount.toString()} changeInput={this.changeInput.bind(this)} />
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


