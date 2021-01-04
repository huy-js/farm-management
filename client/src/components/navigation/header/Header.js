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
import styles from "./Header.css";
import * as actions from "../../../trainRedux/action/authentication/actionAuth";

export class Header extends Component {
  render() {
    let isLogin = this.props.isLogin;
    let role = this.props.role;
    let logButton;
    let showManage;
    switch (role) {
      case "admin":
        showManage = (
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item" role="presentation">
              <NavLink
                to={"/list-user"}
                className="nav-link"
                activeStyle={{ color: "#fff" }}
              >
                Danh sách người dùng
              </NavLink>
            </li>
            <li className="nav-item" role="presentation">
              <NavLink
                to={"/manager-order"}
                className="nav-link"
                activeStyle={{ color: "#fff" }}
              >
                Quản lý đơn hàng
              </NavLink>
            </li>
            <li className="nav-item" role="presentation">
              <NavLink
                to={"/manager-cooperative"}
                className="nav-link"
                activeStyle={{ color: "#fff" }}
              >
                Quản lý Hợp tác xã
              </NavLink>
            </li>
          </ul>
        );
        break;
      case "customer":
        showManage = (
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item" role="presentation">
              <NavLink
                to={"/manager-farmer"}
                className="nav-link"
                activeStyle={{ color: "#fff" }}
              >
                Quản lý nông hộ
              </NavLink>
            </li>
            <li className="nav-item" role="presentation">
              <NavLink
                to={"/diary-manager"}
                className="nav-link"
                activeStyle={{ color: "#fff" }}
              >
                Quản lý nhật ký nông hộ
              </NavLink>
            </li>
            <li className="nav-item" role="presentation">
              <NavLink
                to={"/order-customer"}
                className="nav-link"
                activeStyle={{ color: "#fff" }}
              >
                Đặt QR
              </NavLink>
            </li>
            <li className="nav-item" role="presentation">
              <NavLink
                to={"/business-cooperation"}
                className="nav-link"
                activeStyle={{ color: "#fff" }}
              >
                Quản lý phân phối
              </NavLink>
            </li>
          </ul>
        );
        break;
      default:
        showManage = "";
    }
    if (isLogin) {
      logButton = (
        <li className="nav-item" role="presentation">
          <Link
            to="/logout"
            className="nav-link"
            activeStyle={{ color: "#fff" }}
          >
            Đăng Xuất
          </Link>
        </li>
      );
    } else {
      logButton = (
        <li className="nav-item" role="presentation">
          <NavLink
            to={"/login"}
            className="nav-link"
            activeStyle={{ color: "#fff" }}
          >
            Đăng Nhập
          </NavLink>
        </li>
      );
    }
    return (
      <nav
        className="navbar navbar-light navbar-expand-lg fixed-top clean-navbar"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="container" style={{ minWidth: "100%" }}>
          <span className="navbar-brand logo">
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item" role="presentation">
                <NavLink
                  to={"/profile"}
                  className="nav-link"
                  activeStyle={{ color: "#fff" }}
                >
                  {this.props.currentUser.username}
                  {role === "admin"
                    ? " (Admin)"
                    : role === "customer"
                    ? " (Customer)"
                    : null}
                </NavLink>
              </li>
            </ul>
          </span>
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
                <NavLink
                  to={"/"}
                  className="nav-link"
                  activeStyle={{ color: "#fff" }}
                  exact
                >
                  Trang chủ
                </NavLink>
              </li>
              <div style={{ display: this.props.display }}>{showManage}</div>
              {logButton}
              <li
                className="nav-item"
                role="presentation"
                style={{ display: this.props.displayRegister }}
              >
                <NavLink
                  to={"/register"}
                  className="nav-link"
                  activeStyle={{ color: "#fff" }}
                >
                  Đăng ký
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
