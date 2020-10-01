import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./login-register.css";
import { connect } from "react-redux";
//import { userLoginFetch } from "../trainRedux/textAction";
import { userLoginFetch } from "../../trainRedux/action/actionAuth";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLogin: false,
    };
  }
  // state = {
  //   email: "",
  //   password: "",
  // };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state);
    let result = await this.props.userLoginFetchs(this.state);
    console.log(result);
    if (!result) {
      alert("sai thông tin đăng nhập rồi");
    }
    return window.location.reload();
  };

  render() {
    //console.log("cai gi day " + this.props.infor.currentUser.email);
    // console.log(this.state);
    // if (this.state.isLogin) {
    //   return <Redirect to="/" />;
    // }
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-2"></div>
          <div className="col-lg-6 col-md-8 login-box">
            <div className="col-lg-12 login-key">
              <i className="fa fa-key" aria-hidden="true"></i>
            </div>
            <div className="col-lg-12 login-title">LOGIN</div>

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
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-control-label">PASSWORD</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control "
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="col-lg-12 loginbttm">
                    <div className="col-lg-6 login-btm login-text">
                      Bạn chưa có tài khoản ?{" "}
                      <Link to="/register">Register</Link>
                    </div>
                    <div className="col-lg-6 login-btm login-button">
                      <button type="submit" className="btn btn-outline-primary">
                        LOGIN
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
const mapStateToProps = (state) => {
  return {
    infor: state.login,
  };
};
// export default connect(mapStateToProps, null)(Login);

const mapDispatchToProps = (dispatch, props) => ({
  userLoginFetchs: (userInfo) => dispatch(userLoginFetch(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
