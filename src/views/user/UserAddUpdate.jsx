import React from "react";

// reactstrap misc
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Label,
    FormGroup,
    Row,
    Col
} from "reactstrap";
import RequestEngine from "../../core/RequestEngine"
import CoreEngine from "../../core/CoreEngine";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";
import FormRow from "../../components/Row/FormRow";
import { AvForm } from 'availity-reactstrap-validation';
import Select from "react-select";

import ImageUpload from "../../components/CustomUpload/ImageUpload";
import strings from "../../core/translate";


export default class UserAddUpdate extends CoreEngine {
    constructor(props) {
        super(props);

        this.state = {
            btnloading: false,
            managertypelist:[],
            full_name: "",
            fullpicture:"",
            uniqueid:"",
            email:"",
            phone:"",
            password: "",
            username:"",
            comments:"",
            managertype:"",
            first_name:"",
            last_name:"",
            birthday:"",
            picture:"",
            gender:"",
            status:"",
            newpassword:"",
            _id : ""
        };
        this.engine = new RequestEngine();
    }



    componentDidMount() {
        const edit = this.props.location.data

        if (edit){
            this.setState({
                ...edit,
                managertype:edit.managertype && edit.managertype._id,
            });


        }

        this.prepareData()
    }

    async prepareData(){
        let responseuni = await this.engine.getItemlistDirect("managertype");
        if(responseuni){
            const data = responseuni.data.data;
            let managertypelist = []
            data.map(p =>
                managertypelist.push( { value: p._id, label: p.name })
            )

            this.setState({
                managertypelist: managertypelist
            });
        }
    }



    handleValidSubmit = () => {



            this.engine.saveUserManager(this.state,(response) => {
                console.log(response.status);
                if(response.status === 200){
                    this.props.history.push('/admin/manager');
                }
                this.setState({
                    btnloading: false
                })
            });



    };


    onChangePic(e) {
        this.setState({picture:e.target.files[0]})
    }
    renderSubscribedinfo(){

        return (<>
            <FormRow label="First name" name="first_name" data={this.state.first_name} changeInput={this.changeInput.bind(this)} />
            <FormRow label="Last name" name="last_name" data={this.state.last_name} changeInput={this.changeInput.bind(this)} />
            <FormRow label="Birthday" type="date" required={false} name="birthday" data={this.state.birthday} changeInput={this.changeInput.bind(this)} />
            <Row>
                <Label sm="2">Picture ID</Label>
                <Col sm="7">
                    <FormGroup >
                        <ImageUpload placeholder={this.state.fullpicture} labelupload="Select Picture" onChange={(e) => this.onChangePic(e)}/>
                    </FormGroup>
                </Col>

            </Row>

        </>)
    }

    renderManagerinfo(){


        return (<>
           <Row>
                <Label sm="2">{strings.type}</Label>
                <Col sm="7">
                    <FormGroup>


                        <Select
                            className="react-select primary"
                            classNamePrefix="react-select"
                            name="managertype"
                            isMulti ={false}
                            isSearchable ={false}
                            value={this.state.managertypelist.find(v => v.value === this.state.managertype)}
                            onChange={data =>
                                this.setState({ managertype: data.value })
                            }
                            options={this.state.managertypelist}
                            placeholder="Please select "
                        />
                    </FormGroup>
                </Col>
            </Row>
            <FormRow label={strings.fullname} name="full_name" data={this.state.full_name} changeInput={this.changeInput.bind(this)} />


        </>)
    }
    render() {
        // taking all the states
        const {    managertypelist,
            full_name,
            password,
            username,
            comments,
            phone,
            first_name,
            last_name,
            birthday,
            picture,
            gender,
            status,
            managertype,
            newpassword,
            btnloading,_id} = this.state;
        const {normaluser} = this.props
        const edit = this.props.location.data
        return (
            <>
                <div className="content english">
                    <Row>
                        <Col md="12">
                            <AvForm  onValidSubmit={() =>this.handleValidSubmit()} className="form-horizontal" id="TypeValidation">
                                <Card>
                                    <CardHeader>
                                        <CardTitle tag="h4">{!_id && "Add"} {_id && "Edit"}</CardTitle>
                                    </CardHeader>
                                    <CardBody>

                                        {!normaluser && this.renderManagerinfo()}


                                        <FormRow label={strings.phone} required={false}  name="phone" data={phone} changeInput={this.changeInput.bind(this)} />
                                        <FormRow label={strings.username}  name="username" data={username} changeInput={this.changeInput.bind(this)} />
                                        <FormRow label={strings.password}  name="password" data={password} changeInput={this.changeInput.bind(this)} />


                                        <FormRow required={false} label={strings.comment} type="textarea" name="comments" data={comments} changeInput={this.changeInput.bind(this)} />


                                    </CardBody>
                                    <CardFooter className="text-center">
                                        <ButtonLoader color="primary" loading={btnloading}>{strings.save}</ButtonLoader>
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


