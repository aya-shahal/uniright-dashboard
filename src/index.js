import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { ReactNotifications } from 'react-notifications-component'
import configureStore from "./core/redux/store";
import AuthLayout from "./layouts/Auth/Auth.jsx";
import AdminLayout from "./layouts/Admin/Admin.jsx";
import 'react-notifications-component/dist/theme.css'
import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/paper-dashboard.scss";
import "./assets/demo/demo.css";

const history = createBrowserHistory();

let isloggedin = sessionStorage.getItem('isloggedin');
let redirectionpath = "/admin/article";
if(!isloggedin || isloggedin === "false"){
    redirectionpath = "/auth/login";
}
ReactDOM.render(
    <Provider store={configureStore}>
      <ReactNotifications />
  <Router history={history}>
    <Switch>
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Redirect from="/" to={redirectionpath} />
    </Switch>
  </Router>
    </Provider>,
  document.getElementById("root")
);


// https://demos.creative-tim.com/paper-dashboard-pro-react/
