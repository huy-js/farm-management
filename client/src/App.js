import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Home from "./components/home/Home";
import Register from "./components/login-register/Register";
import Login from "./components/login-register/Login";
import ManagerFarmer from "./components/manager/farmer/manager-farmer";
import CooperativeManagement from "./components/manager/cooperative/cooperative-management";
//import CreateFarmer from "./components/manager/farmer/create_farmer";
import { connect } from "react-redux";

import { checkUserLogin } from "./trainRedux/action/actionAuth"; // kiem tra dau vao ra result
import { checkLogin } from "./components/helpers/checkLogin"; // lay data checkUserLogin thuc thi chuyen nhanh'
// import Spinner from './components/UI/Spinner/Spinner';
// import Input from './components/UI/Input/Input';

// đăng xuất
let Logout = () => {
  localStorage.removeItem("userToken");
  return window.location.reload();
};
// show display navbar
let Show = ({ resultLogin, name }) => {
  //console.log(resultLogin.isLogin);
  return resultLogin.isLogin ? (
    <ul className="navbar-nav  navbar-right">
      <li>
        <Link to="" className="nav-link">
          {name}
        </Link>
      </li>
      <li>
        <Link to={"/"} className="nav-link" onClick={Logout}>
          Logout
        </Link>
      </li>
    </ul>
  ) : (
    <ul className="navbar-nav  navbar-right">
      <li>
        <Link to={"/login"} className="nav-link">
          Login
        </Link>
      </li>
    </ul>
  );
};
let ShowManage = ({ valueHere }) => {
  //console.log(valueHere);
  return valueHere === "abc" ? (
    <Link to={"/cooperative-management"} className="nav-link">
      CooperativeManagement
    </Link>
  ) : (
    <Link to={"/manager-farmer"} className="nav-link">
      ManagerFarmer
    </Link>
  );
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      display: "none",
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
      });
    } else {
      this.setState({
        isLogin: false,
        display: "none",
      });
    }
  };

  render() {
    let isLogin = this.state;

    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <ul className="navbar-nav mr-auto">
              <li>
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>
              <li style={{ display: this.state.display }}>
                {/* <Link to={"/manager-farmer"} className="nav-link">
                  ManagerFarmer
                </Link> */}
                <ShowManage valueHere={this.props.infor.currentUser.name} />
              </li>
            </ul>
            <Show
              resultLogin={isLogin}
              name={this.props.infor.currentUser.email}
            />
          </nav>
          <header className="App-header">
            <Switch>
              <Route
                exact
                path="/"
                // component={() =>
                //   checkLogin(isLogin) ? <Home /> : <Redirect to="/login" />
                // }
                component={() => <Home />}
              />
              <Route
                path="/login"
                component={() =>
                  checkLogin(isLogin) ? <Redirect to="/" /> : <Login />
                }
              />
              <Route
                path="/register"
                component={() =>
                  checkLogin(isLogin) ? <Redirect to="/" /> : <Register />
                }
              />
              <Route
                path="/manager-farmer"
                component={() =>
                  checkLogin(isLogin) ? <ManagerFarmer /> : <Redirect to="/" />
                }
              />
              {/* <Route
                path="/manager-farmer/create-farmer"
                component={() =>
                  checkLogin(isLogin) ? <CreateFarmer /> : <Redirect to="/" />
                }
              /> */}
              <Route
                path="/cooperative-management"
                component={({ match }) =>
                  checkLogin(isLogin) ? (
                    <CooperativeManagement match={match} />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
            </Switch>
          </header>
        </div>
        {/* <div>
          <Spinner/>
          <form>
            <Input elementType="input" type="text" name="name" placeholder="Input Name"/>
          </form>
        </div> */}
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
