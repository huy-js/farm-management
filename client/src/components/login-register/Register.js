import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./login-register.css";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLogin: false,
    };
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-2"></div>
          <div className="col-lg-6 col-md-8 login-box">
            <div className="col-lg-12 login-key">
              {/* <i className="fa fa-key" aria-hidden="true"></i> */}
              <i className="fa fa-address-card" aria-hidden="true"></i>
            </div>
            <div className="col-lg-12 login-title">REGISTER</div>

            <div className="col-lg-12 login-form">
              <div className="col-lg-12 login-form">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label className="form-control-label">EMAIL</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control "
                      // aria-describedby="emailHelp"
                      //value={this.state.email}
                      // onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-control-label">USERNAME</label>
                    <input
                      name="username"
                      type="text"
                      className="form-control"
                      // aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-control-label">PASSWORD</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control "
                      // value={this.state.password}
                      //onChange={this.handleChange}
                    />
                  </div>

                  <div className="col-lg-12 loginbttm">
                    <div className="col-lg-6 login-btm login-text">
                      Bạn đã có tài khoản rồi? {""}
                      <Link to="/login">Sign in</Link>
                    </div>
                    <div className="col-lg-6 login-btm login-button">
                      <button type="submit" className="btn btn-outline-primary">
                        REGISTER
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-3 col-md-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
