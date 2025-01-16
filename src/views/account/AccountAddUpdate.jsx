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

export default class AccountAddUpdate extends CoreEngine {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            _id:"",
            invoicedate:"",
            amount:"0",
            paymentamounttype:"full",
            accountype:"",
            paid:false,
            fullpicture:"",
            note:"",
            student:"",
            studentlist:[],
            qty:"1",
            paymenttype:"cash",
            feestype:"",
            picture: "",
            feestypelist:[],
            loading : false,
            alreadypiad:false,

        };
        this.pathname = "account";
        this.engine = new RequestEngine();
    }

    onChangePic(e) {
        this.setState({picture:e.target.files[0]})
    }

    componentDidMount() {
        const edit = this.props.location.data
        if (edit){
            this.setState({
                ...edit,
                student:edit.student && edit.student._id,
                feestype:edit.feestype && edit.feestype._id,
                alreadypiad:edit.paid,
                isLoading:false
            });
        }else{
            this.setState({
                isLoading : false,
            })
        }

        this.prepareData();
    }
    async prepareData(){
        let responseuni = await this.engine.getItemlistDirect("student");

        if(responseuni){
            const data = responseuni.data.data;
            let studentlist = []
            data.map(p =>{
                    studentlist.push( { value: p._id, label: p.fname+" "+p.lname})
                }
            )

            this.setState({
                studentlist
            });
        }

        responseuni = await this.engine.getItemlistDirect("feestype");

        if(responseuni){
            const data = responseuni.data.data;
            let feestypelist = []
            data.map(p =>{
                    feestypelist.push( { value: p._id, label: p.title})
                }
            )

            this.setState({
                feestypelist
            });
        }


    }


    handleValidSubmit = async () => {
        this.setState({
            loading: true
        })
        const {  invoicedate,_id,name,picture,amount,paid,qty,feestype,paymenttype,student,paymentamounttype }= this.state;



        const formData = new FormData();
        formData.append('_id',_id)
        formData.append('invoicedate',invoicedate)
        formData.append('name',name)
        formData.append('amount',amount)
        formData.append('picture',picture)
        formData.append('paymentamounttype',paymentamounttype)

        formData.append('paymenttype',paymenttype)
        formData.append('paid',paid)
        formData.append('qty',qty)
        formData.append('student',student)
        formData.append('feestype',feestype)

        const response = await this.engine.saveItemData(this.pathname,formData)

        if(response && response.status === 200){
            this.props.history.push('/admin/'+this.pathname);
        }
        this.setState({
            loading: false
        })

    };


    render() {
        // taking all the states
        const {loading,isLoading,student,
            note,
            paymentamounttype,accountype,  paymenttype  ,
            invoicedate,amount,
            qty,paid,feestype,feestypelist,alreadypiad,
            user}= this.state;

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

                                        <SelectRow label={strings.accounttype}  name="accountype"  defaultValue={accountype}  data={this.createSelectValue(['IN','OUT'])} changeInput={this.changeInput.bind(this)} />

                                        <SelectRow label={strings.paymenttype}  name="paymenttype"  defaultValue={paymenttype}  data={this.createSelectValue(['cash','card',"banktransfer","cheque"])} changeInput={this.changeInput.bind(this)} />
                                        <SelectRow label={strings.paymentamounttype}  name="paymentamounttype"  defaultValue={paymentamounttype}  data={this.createSelectValue(['full',"partial"])} changeInput={this.changeInput.bind(this)} />

                                        <FormRow label={strings.invoicedate}  name="invoicedate" type={"date"} data={invoicedate.toString()} changeInput={this.changeInput.bind(this)} />
                                        <FormRow label={strings.amount} type={"number"} name="amount" data={amount.toString()} changeInput={this.changeInput.bind(this)} />

                                        <FormRow label={strings.quantity} type={"number"} name="qty" data={qty.toString()} changeInput={this.changeInput.bind(this)} />
                                        <FormRow label={strings.note} required={false} type={"textarea"} name="note" data={note} changeInput={this.changeInput.bind(this)} />

                                        {paymenttype=="banktransfer" &&<Row>
                                            <Label sm="2">{strings.picture}</Label>
                                            <Col sm="5">
                                                <FormGroup >
                                                    <ImageUpload placeholder={this.state.fullpicture}  labelupload="Select file" onChange={(e) => this.onChangePic(e)}/>
                                                </FormGroup>
                                            </Col>
                                        </Row>}
                                        <Checkboxrow label={strings.paid} name="paid" data={paid}  changeInput={this.changeInput.bind(this)} />
                                    </CardBody>

                                    {!alreadypiad && <CardFooter className="text-center">
                                        <ButtonLoader color="primary" loading={loading}>{strings.save}</ButtonLoader>
                                    </CardFooter>}
                                </Card>
                            </AvForm>

                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}


