import React from "react";

// reactstrap misc
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import CoreEngine from "../core/CoreEngine";
import RequestEngine from "../core/RequestEngine";


class Dashboard extends CoreEngine {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            usercount : 0,
            techniciancount : 0,
            categoriescount : 0,

            technicianlist : [],
            userlist : []
        };
    }


    componentDidMount() {
        this.engine = new RequestEngine();
        this.callPage()
    }

    callPage() {
        this.engine.getdashboard((response) => {
            console.log(response.status);
            if(response.status === 200){
                this.setState({
                    isLoading: false,
                    usercount : response.data.data.usercount,
                    techniciancount : response.data.data.techniciancount,
                    categoriescount :response.data.data.categoriescount,

                    technicianlist : response.data.data.technicianlist,
                    userlist : response.data.data.userlist,
                });
            }
        });
    }


    viewservice(){
        this.props.history.push('/admin/program');
    }
    viewsponsor(){
        this.props.history.push('/admin/sponsor');
    }
    viewbenef(){
        this.props.history.push('/admin/benef');
    }

    viewuser(){
        //this.props.history.push('/admin/user');
    }
  render() {

      const {
          usercount ,
          techniciancount ,
          categoriescount ,

          technicianlist ,
          userlist ,isLoading} = this.state;
      if (isLoading) {
          return this.renderProgress()
      }
    return (
      <>
          <div className="content english">
          <Row>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="3" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-single-02 text-warning" />
                      </div>
                    </Col>
                    <Col md="9" xs="7">
                      <div className="numbers">
                        <p className="card-category">Users</p>
                        <CardTitle tag="p">{usercount}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                  <CardFooter>
                      <hr />

                  </CardFooter>

              </Card>
            </Col>


            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="3" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-paper text-success" />
                      </div>
                    </Col>
                    <Col md="9" xs="7">
                      <div className="numbers">
                        <p className="card-category">Technician</p>
                        <CardTitle tag="p">{techniciancount}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />

                </CardFooter>
              </Card>
            </Col>


              <Col lg="3" md="6" sm="6">
                  <Card className="card-stats">
                      <CardBody>
                          <Row>
                              <Col md="3" xs="5">
                                  <div className="icon-big text-center icon-warning">
                                      <i className="nc-icon nc-paper text-success" />
                                  </div>
                              </Col>
                              <Col md="9" xs="7">
                                  <div className="numbers">
                                      <p className="card-category">Categories</p>
                                      <CardTitle tag="p">{categoriescount}</CardTitle>
                                      <p />
                                  </div>
                              </Col>
                          </Row>
                      </CardBody>
                      <CardFooter>
                          <hr />

                      </CardFooter>
                  </Card>
              </Col>
          </Row>

            <Row>
                <Col md="6">
                    <Card className="card-tasks">
                        <CardHeader>
                            <CardTitle tag="h4">User</CardTitle>
                            <h5 className="card-category">new user..</h5>
                        </CardHeader>
                        <CardBody>
                            <div className="table-full-width table-responsive">
                                <Table>
                                    <thead className="text-primary">
                                    <tr>
                                        <th >Name</th>
                                        <th >Email</th>
                                        <th  >Joined</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {userlist && userlist.map((item, index) => {
                                        return (
                                            <tr>
                                                <td >
                                                    {item.username}
                                                </td>

                                                <td >
                                                    {item.email}
                                                </td>
                                                <td className="td-actions ">
                                                    {this.renderDate(item.createdAt)}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <hr />

                        </CardFooter>
                    </Card>
                </Col>

                <Col md="6">
                    <Card className="card-tasks">
                        <CardHeader>
                            <CardTitle tag="h4">New Technician</CardTitle>
                            <h5 className="card-category">new Technician..</h5>
                        </CardHeader>
                        <CardBody>
                            <div className="table-full-width table-responsive">
                                <Table>
                                    <thead className="text-primary">
                                    <tr>
                                        <th >Name</th>
                                        <th >Email</th>
                                        <th  >Created</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {technicianlist.map((item, index) => {
                                        return (
                                            <tr>
                                                <td >
                                                    {item.name}
                                                </td>

                                                <td >
                                                    {item.email}
                                                </td>
                                                <td className="td-actions ">
                                                    {this.renderDate(item.createdAt)}
                                                </td>
                                            </tr>
                                        )
                                    })}


                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <hr />

                        </CardFooter>
                    </Card>
                </Col>

            </Row>


        </div>
      </>
    );
  }
}

export default Dashboard;
