import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "../helpers/Auth.module.css";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { checkValidity } from "../helpers/validation/checkValidation";
import { updataPassWordFetch } from "../../trainRedux/action/authentication/actionAuth";
import "./profile.css";
import { showCoopareFetch } from "../../trainRedux/action/order/actionOrder";
class Profile extends Component {
  state = {
    controls: {
      repassword: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "nhập Password cũ",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
      newpassword: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "nhập Password mới",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
      confirmpassword: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "nhập lại Password mới",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
    },
    error: "",
    result: false,
  };
  componentDidMount = () => {
    this.props.showCoopareFetch(this.props.currentUser._id);
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(this.state);
    if (
      this.state.controls.newpassword.value !==
      this.state.controls.confirmpassword.value
    )
      return this.setState({ error: "mat khau moi khong trung nhau" });
    let dataupdate = {
      repassword: this.state.controls.repassword.value,
      newpassword: this.state.controls.newpassword.value,
      confirmpassword: this.state.controls.confirmpassword.value,
      email: this.props.currentUser.email,
    };
    // console.log(this.props.currentUser.email);
    let checkVali = [
      this.state.controls.repassword.valid,
      this.state.controls.newpassword.valid,
      this.state.controls.confirmpassword.valid,
    ];
    let result = await this.props.updataPassWord(dataupdate, checkVali);
    console.log(result);

    if (result) {
      this.buttonElement.click();
    } else {
      this.setState({
        error: "thong tin khong hop le",
      });
    }
  };
  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  render() {
    console.log(this.props.dataCooper);
    let dataProfilecurren = this.props.currentUser;
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));
    let errorMessage = null;

    if (this.state.error !== "") {
      errorMessage = <p className={classes.error}>{this.state.error}</p>;
    }
    // if (this.props.error) {
    //   errorMessage += <p className={classes.error}>{this.props.error}</p>;
    // }

    return (
      <div>
        <main className="page landing-page">
          <section
            className="clean-hero"
            style={{
              backgroundImage: `url("assets/img/image0.jpg")`,
              minHeight: "100vh",
              //color: `rgba(225, 247, 223, 0.85)`,
            }}
          >
            {/* <div className="text">

              <button
                className="btn btn-outline-light btn-lg"
                type="button"
                data-toggle="modal"
                data-target="#modelEditPass"
              >
                Đổi mật khẩu
              </button>
            </div> */}

            <div
              className="container row col-12"
              style={{ paddingTop: "100px" }}
            >
              {/* <div className="row" style={{ textAlign: "center" }}> */}
              <div className="col-4"></div>
              <div className=" col-sm-4 ">
                <div className=" card">
                  <img
                    className="card-img-top"
                    // src="assets/img/imageway.jpg"
                    src="assets/img/image0.jpg"
                    alt="Bologna"
                  />
                  <div className="card-body ">
                    <div>
                      <h3>Thông tin tài khoản</h3>
                    </div>
                    <div className="row col-12" style={{ padding: "0px" }}>
                      <div className="col-5" style={{ float: "left" }}>
                        {" "}
                        <b>Tên người dùng :</b>
                      </div>
                      <div className="col-7">{dataProfilecurren.username}</div>
                    </div>
                    <div className="row col-12" style={{ padding: "0px" }}>
                      <div className="col-5" style={{ float: "left" }}>
                        {" "}
                        <b>Địa chỉ mail:</b>
                      </div>
                      <div className="col-7">{dataProfilecurren.email}</div>
                    </div>
                    <div className="row col-12" style={{ padding: "0px" }}>
                      <div className="col-5" style={{ float: "left" }}>
                        {" "}
                        <b>Số điện thoại :</b>
                      </div>
                      <div className="col-7">
                        {dataProfilecurren.phonenumber}
                      </div>
                    </div>
                    {this.props.dataCooper !== null ? (
                      <div>
                        <div className="row col-12" style={{ padding: "0px" }}>
                          <div className="col-5" style={{ float: "left" }}>
                            {" "}
                            <b>Đại diện hợp tác xã:</b>
                          </div>
                          <div className="col-7">
                            {this.props.dataCooper.nameOfCooperative}
                          </div>{" "}
                        </div>
                        <div className="row col-12" style={{ padding: "0px" }}>
                          <div className="col-5" style={{ float: "left" }}>
                            {" "}
                            <b>Địa chỉ hợp tác xã:</b>
                          </div>
                          <div className="col-7">
                            {this.props.dataCooper.address}
                          </div>{" "}
                        </div>
                      </div>
                    ) : null}

                    <div style={{ padding: "10px" }}>
                      <button
                        className="btn btn-outline-success"
                        type="button"
                        data-toggle="modal"
                        data-target="#modelEditPass"
                      >
                        Đổi mật khẩu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4"></div>
              {/* </div> */}
            </div>
          </section>
        </main>
        <div
          className="modal fade"
          id="modelEditPass"
          // tabindex="-1"
          // role="dialog"
          // aria-labelledby="exampleModalCenterTitle"
          // aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content" style={{ borderRadius: "30px" }}>
              <div
                className="modal-header"
                style={{
                  backgroundColor: "#009879",
                  borderRadius: "30px 30px 0px 0px",
                }}
              >
                <h5
                  className="modal-title"
                  id="exampleModalLongTitle"
                  style={{ color: "#fff" }}
                >
                  đổi mật khẩu
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  ref={(button) => (this.buttonElement = button)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div>
                  {/* {authRedirect} */}
                  {errorMessage}
                  <form
                    onSubmit={this.handleSubmit}
                    style={{ paddingBottom: "60px" }}
                  >
                    {form}
                    <div style={{ textAlign: "center" }}>
                      <Button btnType="Success">confirm</Button>
                    </div>
                  </form>
                </div>
              </div>
              {/* <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.authReducer.currentUser,
    dataCooper: state.orderReducer.dataCooper,
  };
};
const mapDispatchToProps = (dispatch) => ({
  updataPassWord: (data, checkVali) =>
    dispatch(updataPassWordFetch(data, checkVali)),
  showCoopareFetch: (id) => dispatch(showCoopareFetch(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
