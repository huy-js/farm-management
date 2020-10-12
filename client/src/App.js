import React, { Component } from "react";
//import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
// import {history} from "./components/helpers/history"
import Home from "./components/home/Home";
import Register from "./components/login-register/Register";
import Login from "./components/login-register/Login";
import ManagerFarmer from "./components/manager/farmer/manager-farmer";
// import CooperativeManagement from "./components/manager/cooperative/cooperative-management";
// import CreateFarmer from "./components/manager/farmer/create_farmer";
import ListUser from "./components/manager/user/list_user";
import { connect } from "react-redux";

import { checkUserLogin } from "./trainRedux/action/actionAuth"; // kiem tra dau vao ra result
import { checkLogin } from "./components/helpers/checkLogin"; // lay data checkUserLogin thuc thi chuyen nhanh'

// đăng xuất
let Logout = () => {
  localStorage.removeItem("userToken");
  return window.location.reload();
};
// show display navbar
let Show = ({ resultLogin }) => {
  //console.log(resultLogin.isLogin);
  return resultLogin.isLogin ? (
    <li className="nav-item" role="presentation">
      <Link to={"/"} className="nav-link" onClick={Logout}>
        Logout
      </Link>
    </li>
  ) : (
    <li className="nav-item" role="presentation">
      <Link to={"/login"} className="nav-link">
        Login
      </Link>
    </li>
  );
};
let ShowManage = ({ role }) => {
  // console.log(role);
   return role ==="admin" ? (
     <li className="nav-item" role="presentation">
       <Link to={"/list-user"} className="nav-link">
         LIST-USER
       </Link>
     </li>
   ) : (
     <li className="nav-item" role="presentation">
       <Link to={"/manager-farmer"} className="nav-link">
         MANAGER-FARMER
       </Link>
     </li>
   );
 };
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      display: "none",
      displayRegister: "block",
    };
  }

  componentDidMount = async () => {
    // let result = false;
    //console.log("reload");
    let result = await this.props.checkUserLogin();
    //console.log(result);
    if (result) {
      this.setState({
        isLogin: true,
        display: "block",
        displayRegister: "none",
      });
    } else {
      this.setState({
        isLogin: false,
        display: "none",
        displayRegister: "block",
      });
    }
  };

  render() {
    let isLogin = this.state;
    //console.log(this.props.infor.currentUser)
    return (
      <Router >
        <div>
          <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
            <div className="container">
              <span className="navbar-brand logo">Brand</span>
              <button
                data-toggle="collapse"
                className="navbar-toggler"
                data-target="#navcol-1"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navcol-1">
                <ul className="nav navbar-nav ml-auto">
                  <li className="nav-item" role="presentation">
                    <Link to={"/"} className="nav-link">
                      Home
                    </Link>
                  </li>
                  <p style={{ display: this.state.display }}>
                    <ShowManage  role={this.props.infor.currentUser.role}/>
                  </p>
                  <Show
                    resultLogin={isLogin}
                    //name={this.props.infor.currentUser.email}
                  />
                  <li
                    className="nav-item"
                    role="presentation"
                    style={{ display: this.state.displayRegister }}
                  >
                    <Link to={"/register"} className="nav-link">
                      Register
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <Switch>
            <Route exact path="/" component={() => <Home />} />
            <Route
              path="/login"
              component={() =>
                checkLogin() ? <Redirect to="/" /> : <Login />
              }
            />
            <Route
              path="/register"
              component={() =>
                checkLogin() ? <Redirect to="/" /> : <Register />
              }
            />
            <Route
              path="/manager-farmer"
              component={() =>
                checkLogin() ?   <ManagerFarmer /> :<Redirect to="/"/>
              }
            />
            <Route
              path="/list-user"
              component={() =>
                checkLogin() ? <ListUser /> : <Redirect to="/" />
              }
            />
            {/* <Route
                path="/manager-farmer/create-farmer"
                component={() =>
                  checkLogin(isLogin) ? <CreateFarmer /> : <Redirect to="/" />
                }
              /> */}
            {/* <Route
              path="/cooperative-management"
              component={({ match }) =>
                checkLogin(isLogin) ? (
                  <CooperativeManagement match={match} />
                ) : (
                  <Redirect to="/" />
                )
              }
            /> */}
          </Switch>
          <footer className="page-footer  dark">
            <div className="footer-copyright">
              <p>© 2020 Copyright here</p>
            </div>
          </footer>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    infor: state.login,
  };
};
const mapDispatchToProps = (dispatch) => ({
  checkUserLogin: () => dispatch(checkUserLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
