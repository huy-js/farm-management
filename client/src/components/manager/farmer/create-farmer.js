import React, { Component } from "react";
import { connect } from "react-redux";
//import { Redirect } from "react-router-dom";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import * as actions from "../../../trainRedux/action/user/actionManagement";
import { checkValidity } from "../../helpers/validation/checkValidation";

class CreateFarmer extends Component {
  state = {
    controls: {
      farmOwner: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Nhập tên nông hộ",
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
      landArea: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Diện tích đất m²",
          min: 0,
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
        },
        valid: false,
        touched: false,
      },
      typeOfTree: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Giống cây trồng",
        },
        value: "",
        validation: {
          required: false,
          minLength: 3,
        },
        valid: false,
        touched: false,
      },
      totalTrees: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Tổng cây có được",
          min: 0,
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
        touched: false,
      },
      // totalNumberQR: {
      //   elementType: "input",
      //   elementConfig: {
      //     type: "number",
      //     placeholder: "Tổng QR cho nông hộ",
      //     min: 0,
      //   },
      //   value: "",
      //   validation: {
      //     required: true,
      //     // minLength: 3,
      //   },
      //   valid: false,
      //   touched: false,
      // },
    },
    // isSignup: true,
    display: "block",
    error: "thong tin khong dung",
    result: true,
    treedemo: 0,
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
    // if (this.state.controls.landArea.valid) {
    //   this.setState({
    //     controls: {
    //       totalTrees: {
    //         value: parseInt(this.state.controls.landArea.value / 24 + 1),
    //       },
    //     },
    //   });
    // }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let dataFamer = {
      farmOwner: this.state.controls.farmOwner.value,
      address: this.state.controls.address.value,
      landArea: parseInt(this.state.controls.landArea.value),
      typeOfTree: this.state.controls.typeOfTree.value,
      totalTrees: parseInt(this.state.controls.totalTrees.value),
      // totalNumberQR: parseInt(this.state.controls.totalNumberQR.value),
      idUser: this.props.currentUser._id,
    };
    let checkVali = [
      this.state.controls.farmOwner.valid,
      this.state.controls.address.valid,
      this.state.controls.landArea.valid,
      this.state.controls.typeOfTree.valid,
      this.state.controls.totalTrees.valid,
    ];

    let result = this.props.userCreateFarmerFetch(dataFamer, checkVali);

    this.setState({
      result: result,
    });
    if (result) {
      this.buttonElement.click();
    }
    //return history.goBack();
  };

  showTotalTrees = (event) => {
    event.preventDefault();

    //console.log(newobject);
    let total = 0;
    this.state.controls.landArea.value === ""
      ? (total = 0)
      : (total = parseInt(this.state.controls.landArea.value) / 24 + 1);

    // let newobject = {
    //   ...this.state.controls,
    //   totalTrees: {
    //     elementType: "input",
    //     elementConfig: {
    //       type: "number",
    //       placeholder: "Tổng cây có được",
    //       min: 0,
    //     },
    //     value: parseInt(total),
    //     validation: {
    //       required: true,
    //       minLength: 3,
    //     },
    //     valid: false,
    //     touched: false,
    //   },
    // };
    this.setState({
      treedemo: parseInt(total),
    });
  };

  hideComment = (event) => {
    event.preventDefault();
    this.setState({
      display: "none",
    });
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

    // if (this.props.loading) {
    //   form = <Spinner />;
    // }

    let errorMessage = null;
    // let authRedirect = null;
    if (!this.state.result) {
      errorMessage = <p className={classes.error}>{this.state.error}</p>;
      //alert(this.props.error);
    }

    return (
      <div
        className="modal fade"
        //id="exampleModalCenter"
        id="showModalCreate"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" style={{ borderRadius: "30px" }}>
            <div
              className="modal-header"
              style={{
                backgroundColor: "#009879",
                borderRadius: "30px 30px 0px 0px",
                borderBottom: "none",
              }}
            >
              <h5
                className="modal-title"
                id="exampleModalLongTitle"
                style={{ color: "#fff" }}
              >
                Tạo nông hộ
              </h5>
            </div>
            <div className="modal-body" onMouseOver={this.showTotalTrees}>
              {/* {authRedirect} */}
              {errorMessage}
              <form onSubmit={this.handleSubmit}>
                {form}
                <p style={{ display: this.state.display }}>
                  số cây đề suất {" " + this.state.treedemo} cây
                </p>
                <div style={{ textAlign: "center" }}>
                  <Button btnType="Success">Tạo</Button>
                </div>
              </form>
            </div>
            <div className="">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                style={{ display: "none" }}
                ref={(button) => (this.buttonElement = button)}
              >
                Đóng
              </button>
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
    // loading: state.authReducer.loading,
    //error: state.authReducer.error,
    //isLogin: state.authReducer.isLogin !== false,
  };
};
const mapDispatchToProps = (dispatch, props) => ({
  userCreateFarmerFetch: (dataFamer, checkVali) =>
    dispatch(actions.userCreateFarmerFetch(dataFamer, checkVali)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateFarmer);
