import React, { Component } from "react";
import CreateFarmer from "./create-farmer";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux";
import BusinessCooperation from "../cooperative/business_cooperation";
import * as actions from "../../../trainRedux/action/user/actionManagement";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
// update
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import { checkValidity } from "../../helpers/validation/checkValidation";
class ManagerFarmer extends Component {
  state = {
    controls: {
      farmOwner: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Tên nông hộ",
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
      typeOfTree: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Nhập giống cây",
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
        },
        valid: false,
        touched: false,
      },
      landArea: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Diện tích",
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
        },
        valid: false,
        touched: false,
      },
      totalNumberQR: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Số QR",
        },
        value: "",
        validation: {
          required: true,
          minLength: 2,
        },
        valid: false,
        touched: false,
      },
    },
    error: "thong tin khong hop le",
    result: true,
    dataFarmer: "",
    display: "none",
    dataUpdate: "",
  };

  componentDidMount() {
    this.props.showFarmerFetch(this.props.currentUser._id);
  }

  ViewDiary = (id, event) => {
    event.preventDefault();
    // this.props.ShowImageDiary(id);
    this.setState({
      dataFarmer: id,
      display: "block",
    });
  };

  hideComment = (event) => {
    event.preventDefault();
    this.setState({
      display: "none",
    });
  };
  //update dât farmer

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
      // totalTrees: parseInt(this.state.controls.totalTrees.value),
      totalNumberQR: parseInt(this.state.controls.totalNumberQR.value),
      idUser: this.props.currentUser._id,
    };
    let checkVali = [
      this.state.controls.farmOwner.valid,
      this.state.controls.address.valid,
      this.state.controls.landArea.valid,
      this.state.controls.typeOfTree.valid,
      // this.state.controls.totalTrees.valid,
    ];

    // let result = this.props.userCreateFarmerFetch(dataFamer, checkVali);

    // this.setState({
    //   result: result,
    // });
    // if (result) {
    //   this.buttonElement.click();
    // }
    //return history.goBack();
  };

  render() {
    //console.log(this.props.currentUser);
    const styleHeader = {
      fontSize: "18px",
      height: "50px",
      padding: "11px",
      backgroundColor: "#343a40",
      color: "white",
      textAlign: "center",
    };
    const styleRow = {
      fontSize: "15px",
      color: "#78788c",
      textAlign: "center",
      borderBottom: "2px solid #78788c",
      cursor: "pointer",
    };
    const columns = [
      {
        dataField: "stt",
        text: "STT",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "createAt",
        text: "NGÀY TẠO",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "farmOwner",
        text: "TÊN NÔNG HỘ",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "typeOfTree",
        text: "GIỐNG CÂY",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "address",
        text: "ĐỊA CHỈ",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "landArea",
        text: "DIỆN TÍCH",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "totalTrees",
        text: "TỔNG CÂY",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "totalNumberQR",
        text: "SỐ QR ",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "edit",
        text: "SỬA ĐỔI",
        headerStyle: styleHeader,
        style: styleRow,
      },
    ];
    const products = [];

    this.props.resArray.map(async (element, index) => {
      let dates = (string) => {
        var options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(string).toLocaleDateString([], options);
      };

      let arr = {
        stt: index + 1,
        createAt: dates(element.createAt),
        farmOwner: element.farmOwner,
        typeOfTree: element.typeOfTree,
        address: element.address,
        landArea: element.landArea,
        totalTrees: element.totalTrees,
        totalNumberQR: element.totalNumberQR,
        edit: (
          <i
            key={element._id}
            data-toggle="modal"
            data-target="#showModalUpdate"
          >
            EDIT
          </i>
        ),
      };
      return products.push(arr);
    });
    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        // console.log(e);
        console.log(row.edit.key);

        let array = this.props.resArray.filter((ele) => {
          if (ele._id === row.edit.key) {
            return ele;
          }
        });
        let data = array[0];
        //let key = Object.keys(data);
        //console.log(key);
        console.log(data);
        let keyArray = [
          "farmOwner",
          "address",
          "typeOfTree",
          "landArea",
          "totalNumberQR",
        ];
        keyArray.forEach((ele) => {
          const updatedControls = {
            ...this.state.controls,
            [ele]: {
              ...this.state.controls[ele],
              value: data.ele,
            },
          };
          this.setState({ controls: updatedControls });
        });
      },
    };
    // export file
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const exportToCSV = (csvData, fileName) => {
      const ws = XLSX.utils.json_to_sheet(csvData);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    };

    // update
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

    if (!this.state.result) {
      errorMessage = <p className={classes.error}>{this.state.error}</p>;
    }
    return (
      <div>
        <main className="page contact-us-page" style={{ minHeight: "100vh" }}>
          <section
            className="clean-block clean-form "
            //style={{ minheight: "240vh" }}
          >
            <div className="container">
              <div
                className="block-heading "
                style={{ marginTop: "50px", marginRight: "0px" }}
              >
                <button
                  className="btn btn-outline-primary  btn-sm"
                  type="button"
                  style={{
                    float: "left",
                    fontSize: "11px",
                    marginTop: "5px",
                  }}
                  onClick={(e) => {
                    const data = new Date().getTime();
                    exportToCSV(this.props.dataPWFarmer, `Password-${data}`);
                  }}
                >
                  EXPORT-PASSWORD-FARMER
                </button>
                <i
                  className="fa fa-plus-circle  btn-outline-primary  btn-sm"
                  style={{
                    fontSize: "25px",
                    float: "right",
                    padding: "10px",
                    borderRadius: "50px",
                    cursor: "pointer",
                  }}
                  data-toggle="modal"
                  data-target="#showModalCreate"
                ></i>
                <h2 className="text-info" style={{ paddingRight: "150px" }}>
                  Danh sách nông hộ{" "}
                </h2>
              </div>
              <div className="container-body">
                {this.props.resArray.length === 0 ? (
                  <div className="text-center">
                    {" "}
                    hien tai chua co thong tin moi ban them thong tin
                  </div>
                ) : (
                  <BootstrapTable
                    keyField="stt"
                    data={products}
                    columns={columns}
                    rowEvents={rowEvents}
                    pagination={paginationFactory({
                      sizePerPage: 5,
                      hideSizePerPage: true,
                      // hidePageListOnlyOnePage: true
                    })}
                    hover
                  />
                )}
              </div>
            </div>
            {/* <div className="container" style={{ display: this.state.display }}>
              day la noi hien thi nhat ky : {this.state.dataFarmer} <br />
            
            </div> */}
          </section>
        </main>
        <CreateFarmer />
        {/* modal show update */}
        <div
          className="modal fade"
          //id="exampleModalCenter"
          id="showModalUpdate"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  cập nhật nông hộ
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
              <div className="modal-body" onMouseOver={this.showTotalTrees}>
                {/* {authRedirect} */}
                {errorMessage}
                <form
                  onSubmit={this.handleSubmit}
                  style={{ paddingBottom: "60px" }}
                >
                  {form}

                  <Button btnType="Success">Tạo</Button>
                </form>
              </div>
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
    resArray: state.fmManagerReducer.resArray,
    // imageDiary: state.diaryReducer.dataImage,
    dataPWFarmer: state.fmManagerReducer.dataPWFarmer,
  };
};
const mapDispatchToProps = (dispatch, props) => ({
  showFarmerFetch: (dataCreate) =>
    dispatch(actions.showFarmerFetch(dataCreate)),
  // ShowImageDiary: (idFarmer) => dispatch(actions.ShowImageDiary(idFarmer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerFarmer);
