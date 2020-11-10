import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "../helpers/Auth.module.css";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { checkValidity } from "../helpers/validation/checkValidation";
import { updataPassWordFetch } from "../../trainRedux/action/actionAuth";
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
            className="clean-block clean-hero"
            style={{
              backgroundImage: `url("assets/img/tech/3160620.jpg")`,
              color: `rgba(9, 162, 255, 0.85)`,
            }}
          >
            <div className="text">
              {/* <h2>{this.props.infor.currentUser.username}</h2>
              <p>
              {this.props.infor.currentUser.email}
              </p>
              <p>
              {this.props.infor.currentUser.phonenumber}
              </p>
             */}

              <button
                className="btn btn-outline-light btn-lg"
                type="button"
                data-toggle="modal"
                data-target="#modelEditPass"
              >
                đổi mật khẩu
              </button>
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
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
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
                    <Button btnType="Success">confirm</Button>
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
  };
};
const mapDispatchToProps = (dispatch) => ({
  updataPassWord: (data, checkVali) =>
    dispatch(updataPassWordFetch(data, checkVali)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
