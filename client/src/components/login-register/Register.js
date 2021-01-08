import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import styles from "../manager/farmer/manager-farmer.module.css";
import * as actions from "../../trainRedux/action/authentication/actionAuth";
import { checkValidity } from "../helpers/validation/checkValidation";
class Register extends Component {
  state = {
    controls: {
      nameOfCooperative: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Nhập tên HTX",
        },
        value: "",
        validation: {
          required: true,
          isCharacter: true,
        },
        valid: false,
        touched: false,
      },
      address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Nhập địa chỉ",
        },
        value: "",
        validation: {
          required: false,
          isCharacter: true,
        },
        valid: false,
        touched: false,
      },
      taxCode: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Mã số thuế",
          min: "0",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
      username: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Tên người đăng ký",
        },
        value: "",
        validation: {
          required: true,
          isCharacter: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Nhập mail người đăng ký",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Nhập mật khẩu",
          // min: "0",
        },
        value: "",
        validation: {
          required: false,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
      repassword: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Nhập lại mật khẩu",
          // min: "0",
        },
        value: "",
        validation: {
          required: false,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
    },
    // isSignup: true,
    alertPw: "",
  };
  // componentDidMount() {
  //   this.props.error = ''
  // }

  handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      nameOfCooperative: this.state.controls.nameOfCooperative.value,
      address: this.state.controls.address.value,
      taxCode: this.state.controls.taxCode.value,
      // numberQR: this.state.controls.numberQR.value,
      username: this.state.controls.username.value,
      email: this.state.controls.email.value,
      password: this.state.controls.password.value,
    };
    let checkVali = [
      this.state.controls.nameOfCooperative.valid,
      this.state.controls.address.valid,
      this.state.controls.taxCode.valid,
      // this.state.controls.numberQR.valid,
      this.state.controls.username.valid,
      this.state.controls.email.valid,
      this.state.controls.password.valid,
    ];
    if (
      this.state.controls.password.value !==
      this.state.controls.repassword.value
    )
      return this.setState({ alertPw: "Mật khẩu không khớp" });
    this.props.userRegisterFetch(data, checkVali);
    //return history.goBack();
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
    this.setState({ controls: updatedControls, alertPw: "" });
  };

  render() {
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

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p className={classes.error}>{this.props.error}</p>;
    }
    if (this.state.alertPw !== "") {
      errorMessage = <p className={classes.error}>{this.state.alertPw}</p>;
    }
    let authRedirect = null;
    if (this.props.error === "ok") {
      alert("Thông tin đăng ký đã được gửi đi hãy đợi nhận mail từ chúng tối");
      authRedirect = <Redirect to="/" />;
    }

    return (
      <main className="page contact-us-page" style={{ paddingTop: "60px" }}>
        <section
          className="clean-block clean-form"
          style={{ minHeight: "120vh" }}
        >
          <div className="container">
            <div className="block-heading" style={{ paddingTop: "20px" }}>
              <h2 className={styles.tieuDe}>Đăng ký tài khoản giao dịch</h2>
            </div>
            <div>
              {authRedirect}
              {errorMessage}
              <form
                onSubmit={this.handleSubmit}
                style={{
                  paddingBottom: "30px",
                  borderTopColor: "#00483E",
                  borderRadius: "30px",
                }}
              >
                {form}
                <div style={{ textAlign: "center" }}>
                  <Button btnType="Success">Đăng ký</Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    //  authRedirectPath: state.authReducer.authRedirectPath,
    //isLogin: state.authReducer.isLogin !== false,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  userRegisterFetch: (data, checkVali) =>
    dispatch(actions.userRegisterFetch(data, checkVali)),
  // onResetError: () => dispatch(actions.onResetError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
