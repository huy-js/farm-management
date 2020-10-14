import React, { Component } from "react";
// import { createHashHistory } from "history";
import {history} from "../helpers/history"
import { connect } from "react-redux";
import { userRegisterFetch } from "../../trainRedux/action/actionAuth";
//import "./login-register.css";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameOfCooperative: "", // ten htx
      address: "",
      taxCode: "", // ma thue
      // Owner: "", // nguoi dai dien
      // phoneOwner: "", //sdt nguoi dai dien
      numberQR: 0, // so QR du kien mua
      username: "", // ten can bo dang ky qr
      email: "", // mail can bo dk qr
      phonenumber: "", // sdt can bo dk qr
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    //const history = createHashHistory();
    console.log(this.state);
    await this.props.userRegisterFetch(this.state);
    return history.goBack();
  };
  render() {
    return (
      <main className="page contact-us-page">
        <section className="clean-block clean-form dark">
          <div className="container">
            <div className="block-heading" style={{ paddingTop: "30px" }}>
              <h2 className="text-info">Đăng ký QR</h2>
            </div>
            <form
              style={{ paddingBottom: "50px" }}
              onSubmit={this.handleSubmit}
            >
              <div className="form-group">
                <label>Tên HTX</label>
                <input
                  onChange={this.handleChange}
                  className="form-control"
                  type="text"
                  name="nameOfCooperative"
                  value={this.state.nameOfCooperative}
                />
              </div>
              <div className="form-group">
                <label>Địa chỉ HTX</label>
                <input
                  onChange={this.handleChange}
                  className="form-control"
                  type="text"
                  name="address"
                  value={this.state.address}
                />
              </div>
              <div className="form-group">
                <label>Mã số HTX(mã thuế)</label>
                <input
                  onChange={this.handleChange}
                  className="form-control"
                  type="text"
                  name="taxCode"
                  value={this.state.taxCode}
                  required
                />
              </div>
              {/* <div className="form-group">
                <label>Tên người đại diện</label>
                <input
                  onChange={this.handleChange}
                  className="form-control"
                  type="text"
                  name="Owner"
                  value={this.state.Owner}
                />
              </div>
              <div className="form-group">
                <label>Điện thoại liên lạc</label>
                <input
                  onChange={this.handleChange}
                  className="form-control"
                  type="text"
                  name="phoneOwner"
                  value={this.state.phoneOwner}
                />
              </div> */}
              <div className="form-group">
                <label>sô QR dụ kiến(tính theo cây)</label>
                <input
                  onChange={this.handleChange}
                  className="form-control"
                  type="number"
                  min="0"
                  name="numberQR"
                  value={this.state.numberQR}
                />
              </div>
              <div className="form-group">
                <label>Tên cán bộ đăng ký</label>
                <input
                  onChange={this.handleChange}
                  className="form-control"
                  type="text"
                  name="username"
                  value={this.state.username}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email liên hệ</label>
                <input
                  onChange={this.handleChange}
                  className="form-control"
                  type="email"
                  name="email"
                  value={this.state.email}
                  required
                />
              </div>
              <div className="form-group">
                <label>Điện thoại cần liên hệ</label>
                <input
                  onChange={this.handleChange}
                  className="form-control"
                  type="text"
                  name="phonenumber"
                  value={this.state.phonenumber}
                  required
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block" type="submit">
                  Gửi
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    );
  }
}

// export default Register;

const mapDispatchToProps = (dispatch, props) => ({
  userRegisterFetch: (datacreate) => dispatch(userRegisterFetch(datacreate)),
});

export default connect(null, mapDispatchToProps)(Register);
