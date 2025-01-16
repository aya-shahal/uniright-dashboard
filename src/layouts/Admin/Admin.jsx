import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import routes from "../../routes.js";
import Breadcrumbs from "./Breadcrumbs";

import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import {connect} from "react-redux";

import CoreEngine from "../../core/CoreEngine";
import {resetMsg} from "../../core/redux/actions/showMsg";
let ps;

class Admin extends CoreEngine {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
      sidebarMini: false
    };
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel);
    }

  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            exact
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  handleActiveClick = color => {
    this.setState({ activeColor: color });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  handleMiniClick = () => {
    if (document.body.classList.contains("sidebar-mini")) {
      this.setState({ sidebarMini: false });
    } else {
      this.setState({ sidebarMini: true });
    }
    document.body.classList.toggle("sidebar-mini");
  };





  render() {


    if(this.props.showmsg && this.props.showmsg.type !==0 ){
        this.showalert(this.props.showmsg.msg,this.props.showmsg.type)
    }

    return (
      <div className="wrapper">
          <Loading
              show={this.props.progress.loading}
              color="red"
          />

        <Sidebar
          {...this.props}
          routes={routes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref="mainPanel">
          <AdminNavbar {...this.props} handleMiniClick={this.handleMiniClick} />
            <div className="breadmin"> <Breadcrumbs /></div>

          <Switch>{this.getRoutes(routes)}</Switch>
          {// we don't want the Footer to be rendered on full screen maps page
          this.props.location.pathname.indexOf("full-screen-map") !==
          -1 ? null : (
            <Footer fluid />
          )}
        </div>

      </div>
    );
  }
}


const mapStateToProps = state => ({

    ...state
});

const mapDispatchToProps = dispatch => ({
    resetMsg: () => dispatch(resetMsg()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
