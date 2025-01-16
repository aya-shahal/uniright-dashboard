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

export default class SectionAddUpdate extends CoreEngine {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            _id:"",
            name:"",
            namrkr:"",
            department:"",
            departmentlist:[],
            loading : false,
        };
        this.pathname = "section";
        this.engine = new RequestEngine();
        this.sidepicture = "";
    }

    componentDidMount() {
        const edit = this.props.location.data
        if (edit){
            this.setState({
                ...edit,
                department:edit.department && edit.department.id
            });
        }
        this.prepareData()
    }

    async prepareData(){
        let responseuni = await this.engine.getItemlistDirect("department");
        if(responseuni){
            const data = responseuni.data.data;
            let departmentlist = []
            data.map(p =>{
                departmentlist.push( { value: p._id, label: p.name})
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
        const {loading,isLoading, departmentlist,eventkr,event,department,name,namekr }= this.state;

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

                                        <SelectRow label={strings.department}  name="department"  defaultValue={department}  data={departmentlist} changeInput={this.changeInput.bind(this)} />

                                        <FormRow label={strings.title} name="name" data={name} changeInput={this.changeInput.bind(this)}  />


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


