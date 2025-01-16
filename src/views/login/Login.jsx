import React from "react";

// reactstrap misc
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row
} from "reactstrap";
import blacklogo from "../../assets/img/logo.jpeg";
import RequestEngine from "../../core/RequestEngine";
import CoreEngine from "../../core/CoreEngine";
import { HollowDotsSpinner } from 'react-epic-spinners'

class Login extends CoreEngine {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password:"",
            managertype : "",
            token : "",
            loading : false,
        };
        this.engine = new RequestEngine();
    }

    componentDidMount() {
    document.body.classList.toggle("login-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("login-page");
  }

    async login(){

        const {username,password} = this.state

       // this.props.history.push('/admin/dashboard');
       // return;

        try {
            this.setState({loading : true})

            const result = await this.engine.login(username,password)

            if(result.status === 200){

                const managertype = result.data.data.managertype.trim().toLowerCase();
                const token = result.data.data.token;

                sessionStorage.setItem('managertype', managertype);
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('isloggedin', true);

                console.log("managertype",managertype)

                if(managertype=="accounting"){
                    this.props.history.push('/admin/fees');
                }else if(managertype=="nurse"){
                    this.props.history.push('/admin/health');
                }else if(managertype=="supervisor"){
                    this.props.history.push('/admin/agenda');
                }else{
                    this.props.history.push('/admin/student');
                }


            }else{
                alert("Wrong login info  ")
                this.setState({password:""})
            }
        }catch (e) {
            alert("Wrong login info  ")
            this.setState({password:"",loading:false})
        }

        this.setState({loading : false})
    }
  render() {
        const {username,password,loading} = this.state
    return (
      <div className="login-page">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4" md="6">
              <Form action="" className="form" method="">
                <Card className="card-login">
                  <CardHeader>
                    <CardHeader>
                      <div className="logo-img">
                          <img src={blacklogo} alt="react-logo" className="innerLogo" />
                      </div>

                    </CardHeader>
                  </CardHeader>
                  <CardBody>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Username" value={username} onChange={e =>
                          this.changeInput(e, "username")
                      } type="text" />
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-key-25" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        autoComplete="off"
                        value={password}
                        onChange={e =>
                            this.changeInput(e, "password")
                        }
                      />
                    </InputGroup>
                    <br />

                  </CardBody>
                  <CardFooter>
                      {loading && <div className="logo-img">
                      <HollowDotsSpinner color="#51BCDA"  animationDelay={50} />
                      </div>}
                      {!loading && <Button
                      block

                      className="btn-round mb-3"
                      style={{background:"#409DBA"}}
                      onClick={() => this.login()}
                    >
                          Login
                    </Button>}
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Row>
        </Container>
        <div
          className="full-page-background"
          style={{
            backgroundImage: `url(${require("../../assets/img/bg/david-marcu.jpg")})`
            //  backgroundImage: `url(${require("assets/img/bg/why-was-bitcoin-invented-1024x640.jpg")})`

          }}
        />
      </div>
    );
  }
}

export default Login;
