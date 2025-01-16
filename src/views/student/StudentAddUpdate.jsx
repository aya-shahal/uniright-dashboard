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
  Col,
} from "reactstrap";
import RequestEngine from "../../core/RequestEngine";
import CoreEngine from "../../core/CoreEngine";

import ImageUpload from "../../components/CustomUpload/ImageUpload";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";

import FormRow from "../../components/Row/FormRow";
import SelectRow from "../../components/Select/SelectRow";
import { AvForm } from "availity-reactstrap-validation";

import { Utilites } from "../../core/Utilites";
import strings from "../../core/translate";

export default class StudentAddUpdate extends CoreEngine {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      _id: "",
      address: "",
      fname: "",
      lname: "",
      studentid: "",

      fnamekr: "",
      lnamekr: "",
      username: "",

      sex: "",
      nationality: "",
      registrationrecord: "",
      birthlocation: "",
      dateofbirth: "",
      studentphone: "",
      blood: "",
      registredat: "",
      email: "",
      password: "",

      major: "",
      parent: "",
      parentlist: [],
      certificate: "",
      certificatelist: [],
      picture: "",
      fullpicture: "",
      note: "",
      loading: false,
    };
    this.pathname = "student";
    this.engine = new RequestEngine();
    this.sidepicture = "";
  }

  componentDidMount() {
    const edit = this.props.location.data;
    if (edit) {
      this.setState({
        ...edit,
        classx: edit.classx && edit.classx.id,
        storycategory: edit.storycategory && edit.storycategory.id,
      });
    }
    this.prepareData();
  }

  async prepareData() {
    let responseuni = await this.engine.getItemlistDirect("certificate");
    if (responseuni) {
      const data = responseuni.data.data;
      let certificatelist = [];
      data.map((p) => {
        certificatelist.push({ value: p._id, label: p.name });
      });
      this.setState({
        certificatelist,
      });
    }

    responseuni = await this.engine.getItemlistDirect("parent");
    if (responseuni) {
      const data = responseuni.data.data;
      let parentlist = [];
      data.map((p) => {
        parentlist.push({
          value: p._id,
          label: p.fathername + " " + p.fatherfamily,
        });
      });
      this.setState({
        parentlist,
      });
    }
  }

  handleValidSubmit = async () => {
    this.setState({
      loading: true,
    });

    let data = { ...this.state };
    data.sidepicture = this.sidepicture;
    const response = await this.engine.saveItem(this.pathname, data);

    if (response && response.status === 200) {
      this.props.history.push("/admin/" + this.pathname);
    }
    this.setState({
      loading: false,
    });
  };

  render() {
    // taking all the states
    const {
      loading,
      isLoading,
      studentid,
      note,
      address,
      major,
      parent,
      username,
      fname,
      lname,
      certificatelist,
      certificate,
      sex,
      nationality,
      registrationrecord,
      birthlocation,
      dateofbirth,
      studentphone,
      blood,
      registredat,
      email,
      classxlist,
      classx,
      password,
    } = this.state;

    if (isLoading) {
      return this.renderProgress();
    }
    return (
      <>
        <div className="content english">
          <h4></h4>
          <Row>
            <Col md="12">
              <AvForm
                onValidSubmit={() => this.handleValidSubmit()}
                className="form-horizontal"
                id="TypeValidation"
              >
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">{strings.information}</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <SelectRow
                      label={"major"}
                      name="certificate"
                      defaultValue={certificate}
                      data={certificatelist}
                      changeInput={this.changeInput.bind(this)}
                    />

                    <FormRow
                      label={strings.studentid}
                      name="studentid"
                      data={studentid}
                      changeInput={this.changeInput.bind(this)}
                    />

                    <FormRow
                      label={strings.firstname}
                      name="fname"
                      data={fname}
                      changeInput={this.changeInput.bind(this)}
                    />
                    <FormRow
                      label={strings.lastname}
                      name="lname"
                      data={lname}
                      changeInput={this.changeInput.bind(this)}
                    />

                    <FormRow
                      label={strings.address}
                      type={"textarea"}
                      name="address"
                      data={address}
                      changeInput={this.changeInput.bind(this)}
                    />

                    <SelectRow
                      label={strings.sex}
                      name="sex"
                      defaultValue={sex}
                      data={this.createSelectValue(["male", "female"])}
                      changeInput={this.changeInput.bind(this)}
                    />
                    <FormRow
                      label={strings.nationality}
                      required={false}
                      name="nationality"
                      data={nationality}
                      changeInput={this.changeInput.bind(this)}
                    />

                    <FormRow
                      label={strings.registration}
                      required={false}
                      name="registrationrecord"
                      data={registrationrecord}
                      changeInput={this.changeInput.bind(this)}
                    />
                    <FormRow
                      label={strings.dob}
                      required={false}
                      type={"date"}
                      name="dateofbirth"
                      data={dateofbirth}
                      changeInput={this.changeInput.bind(this)}
                    />
                    <FormRow
                      label={strings.phone}
                      required={false}
                      name="studentphone"
                      data={studentphone}
                      changeInput={this.changeInput.bind(this)}
                    />

                    <SelectRow
                      label={strings.blood}
                      name="blood"
                      defaultValue={blood}
                      data={this.createSelectValue([
                        "a+",
                        "a-",
                        "b+",
                        "b-",
                        "ab+",
                        "ab-",
                        "o+",
                        "o-",
                      ])}
                      changeInput={this.changeInput.bind(this)}
                    />
                    <FormRow
                      label={strings.registred}
                      required={false}
                      type={"date"}
                      name="registredat"
                      data={registredat}
                      changeInput={this.changeInput.bind(this)}
                    />

                    <FormRow
                      label={strings.email}
                      required={false}
                      type={"email"}
                      name="email"
                      data={email}
                      changeInput={this.changeInput.bind(this)}
                    />
                    <FormRow
                      label={strings.username}
                      name="username"
                      data={username}
                      changeInput={this.changeInput.bind(this)}
                    />
                    <FormRow
                      label={strings.password}
                      name="password"
                      data={password}
                      changeInput={this.changeInput.bind(this)}
                    />
                    <FormRow
                      label={strings.note}
                      type={"textarea"}
                      name="note"
                      data={note}
                      changeInput={this.changeInput.bind(this)}
                    />
                   

                    <Row>
                      <Label sm="2">{strings.picture} </Label>
                      <Col sm="5">
                        <FormGroup>
                          <ImageUpload
                            placeholder={this.state.fullpicture}
                            labelupload="Select Image"
                            onChange={(e) => {
                              Utilites.getFileBase64(
                                e.target.files[0],
                                (result) => {
                                  this.sidepicture = result;
                                }
                              );
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>

                  <CardFooter className="text-center">
                    <ButtonLoader color="primary" loading={loading}>
                      {strings.save}
                    </ButtonLoader>
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
