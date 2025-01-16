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
    Form,
    Input,
    Row,
    Col
} from "reactstrap";
import RequestEngine from "../../core/RequestEngine"
import CoreEngine from "../../core/CoreEngine";

import ImageUpload from "../../components/CustomUpload/ImageUpload";
import {Utilites} from "../../core/Utilites";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";
import strings from "../../core/translate";

export default class EditSettings extends CoreEngine {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            lessthan: "",
            morethan: "",
            documentx:"",
            loading : false,
        };
        this.engine = new RequestEngine();

        this.toppicture = ""
        this.middlepicture = ""
    }

    componentDidMount() {
        this.callPage()
    }

    callPage() {
        try{
            this.engine.getSettingsinfo((response) => {
                console.log(response.status);
                if(response.status === 200){

                    this.setState({
                        isLoading: false,
                        ...response.data.data
                    });
                }
            });
        }catch (e) {
            this.setState({
                isLoading: false
            });
        }


    }





    typeClick = () => {

        this.setState({
            loading: true
        })
        let data= {...this.state}

        this.engine.saveSettings(data,(response) => {
            console.log(response.status);

            this.setState({
                loading: false
            })

        });

    };

    render() {
        // taking all the states
        const {email,loading,isLoading,  lessthan,documentx,morethan}= this.state;

        if (isLoading) {
            return this.renderProgress()
        }
        return (
            <>
                <div className="content english">
                    <Row>
                        <Col md="12">
                            <Form className="form-horizontal" id="TypeValidation">
                                <Card>
                                    <CardHeader>
                                        <CardTitle tag="h4">Settings</CardTitle>
                                    </CardHeader>
                                    <CardBody>




                                        <Row>
                                            <Label sm="2">less than 15 KG</Label>
                                            <Col sm="7">
                                                <FormGroup >
                                                    <Input
                                                        name="lessthan"
                                                        type="text"
                                                        value = {lessthan}
                                                        onChange={e =>
                                                            this.changeInput(e, "lessthan")
                                                        }
                                                    />

                                                </FormGroup>
                                            </Col>
                                            <Col className="label-on-right" tag="label" sm="3">
                                                <code>required</code>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Label sm="2">more than 15 KG</Label>
                                            <Col sm="7">
                                                <FormGroup >
                                                    <Input
                                                        name="morethan"
                                                        type="text"
                                                        value = {morethan}
                                                        onChange={e =>
                                                            this.changeInput(e, "morethan")
                                                        }
                                                    />

                                                </FormGroup>
                                            </Col>
                                            <Col className="label-on-right" tag="label" sm="3">
                                                <code>required</code>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Label sm="2">DOCUMENT</Label>
                                            <Col sm="7">
                                                <FormGroup >
                                                    <Input
                                                        name="documentx"
                                                        type="text"
                                                        value = {documentx}
                                                        onChange={e =>
                                                            this.changeInput(e, "documentx")
                                                        }
                                                    />

                                                </FormGroup>
                                            </Col>
                                            <Col className="label-on-right" tag="label" sm="3">
                                                <code>required</code>
                                            </Col>
                                        </Row>











                                    </CardBody>
                                    <CardFooter className="text-center">
                                        <ButtonLoader color="primary" onClick={() =>
                                            this.typeClick()
                                        } loading={loading}>{strings.save}</ButtonLoader>

                                    </CardFooter>
                                </Card>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}


