import React, { Component } from "react";
//import { Link } from "react-router-dom";
//import "./login-register.css";
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
    //console.log(this.state);
    let result = await this.props.userLoginFetch(this.state);
    //console.log(result);
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
      <main className="page contact-us-page">
        <section className="clean-block clean-form dark">
          <div className="container">
            <div className="block-heading" style={{ paddingTop: "30px" }}>
              <h2 className="text-info">Đăng nhập</h2>
            </div>
            <form
              onSubmit={this.handleSubmit}
              style={{ paddingBottom: "60px" }}
            >
              <div className="form-group">
                <label>Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Passwork</label>
                <input
                  type="password"
                  name="password"
                  className="form-control "
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block" type="submit">
                  Send
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    );
  }
}
// const mapStateToProps = (state) => {
//   return {
//     infor: state.login,
//   };
// };
// export default connect(mapStateToProps, null)(Login);

const mapDispatchToProps = (dispatch, props) => ({
  userLoginFetch: (userInfo) => dispatch(userLoginFetch(userInfo)),
});

export default connect(null, mapDispatchToProps)(Login);
