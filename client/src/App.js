import React, { Component } from "react";
import {
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
  withRouter,
} from "react-router-dom";
import { connect } from "react-redux";
//Authentication
import Home from "./components/home/Home";
import Register from "./components/login-register/Register";
import Login from "./components/login-register/Login";
import Logout from "./components/login-register/Logout";
//Manage Farmer
import ManagerFarmer from "./components/manager/farmer/manager-farmer";
//Order
import OrderCustomer from "./components/manager/order/order_customer";
import ManagerOrder from "./components/manager/order/manager_order";

import ListUser from "./components/manager/user/list_user";
import BusinessCooperation from "./components/manager/cooperative/business_cooperation";
import Search from "./components/profile/search_infor";
import Footer from "./components/navigation/footer/Footer";
import Profile from "./components/profile/Profile";
import DiaryManager from "./components/manager/diary/diary_manager";
import ManagerCooperative from "./components/manager/cooperative/cooperative-management";
import NotFound from "./components/NotFound";
import Header from "./components/navigation/header/Header";
import * as actions from "./trainRedux/action/authentication/actionAuth";

class App extends Component {
  componentDidMount() {
    this.props.checkUserLogin();
  }
  render() {
    let isLogin = this.props.isLogin;
    let role = this.props.role;
    let logButton;
    let showManage;
    let routes = (
      <Switch>
        <Route
          path="/login"
          component={() => (isLogin ? <Redirect to="/" /> : <Login />)}
        />
        <Route path="/register" component={Register} />
        <Route path="/" exact component={Home} />
        <Route path="/search/:dataQR" component={Search} />
        <Route component={NotFound} />
        <Redirect to="/" />
      </Switch>
    );

    if (isLogin === true && role === "customer") {
      routes = (
        <Switch>
          <Route
            path="/login"
            component={() => (isLogin ? <Redirect to="/" /> : <Login />)}
          />
          <Route path="/manager-farmer" component={ManagerFarmer} />
          <Route path="/order-customer" component={OrderCustomer} />
          <Route path="/business-cooperation" component={BusinessCooperation} />
          <Route path="/" exact component={Home} />
          <Route path="/logout" component={Logout} />
          <Route path="/profile" component={Profile} />
          <Route path="/diary-manager" component={DiaryManager} />
          <Route component={NotFound} />
          <Redirect to="/" />
        </Switch>
      );
    }
    if (isLogin === true && role === "admin") {
      routes = (
        <Switch>
          <Route
            path="/login"
            component={() => (isLogin ? <Redirect to="/" /> : <Login />)}
          />
          <Route path="/manager-order" component={ManagerOrder} />
          <Route path="/list-user" component={ListUser} />
          <Route path="/manager-cooperative" component={ManagerCooperative} />
          <Route path="/profile" component={Profile} />
          <Route path="/" exact component={Home} />
          <Route path="/logout" component={Logout} />
          <Route component={NotFound} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Header />
        {routes}
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.authReducer.currentUser,
    isLogin: state.authReducer.isLogin,
    display: state.authReducer.display,
    displayRegister: state.authReducer.displayRegister,
    role: state.authReducer.currentUser.role,
  };
};
const mapDispatchToProps = (dispatch) => ({
  checkUserLogin: () => dispatch(actions.checkUserLogin()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
