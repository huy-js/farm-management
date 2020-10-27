import React, { Component } from "react";
import CreateFarmer from "./create-farmer";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux";
import BusinessCooperation from "../cooperative/business_cooperation";
import * as actions from "../../../trainRedux/action/user/actionManagement";

class ManagerFarmer extends Component {

  componentDidMount () {
    this.props.showFarmerFetch(this.props.currentUser._id);
  };

  hideComment = (event) => {
    event.preventDefault();
    this.setState({
      display: "none",
    });
  };
  render() {
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
        dataField: "typeOfTree",
        text: "GIỐNG CÂY",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "passwordFarmer",
        text: "PASSWORD",
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
        address: element.address,
        landArea: element.landArea,
        // soilType: element.soilType,
        // waterSource: element.waterSource,
        totalTrees: element.totalTrees,
        typeOfTree: element.typeOfTree,
        passwordFarmer: <i>********</i>,
      };
      return products.push(arr);
    });

    return (
      <div>
        <main className="page contact-us-page" style={{ height: "100%" }}>
          <section
            className="clean-block clean-form "
            style={{ height: "100vh" }}
          >
            <div className="container">
              <div className="block-heading " style={{ marginTop: "50px" }}>
                <i
                  className="fa fa-plus-circle"
                  style={{
                    fontSize: "25px",
                    float: "right",
                    paddingTop: "10px",
                  }}
                  data-toggle="modal"
                  data-target="#showModalCreate"
                ></i>
                <h2 className="text-info">Danh sách nông hộ </h2>
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
                    //loading={this.props.loading}
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
          </section>
          <BusinessCooperation />
        </main>
        <CreateFarmer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.authReducer.currentUser,
    resArray: state.fmManagerReducer.resArray
  };
};
const mapDispatchToProps = (dispatch, props) => ({
  showFarmerFetch: (dataCreate) =>
    dispatch(actions.showFarmerFetch(dataCreate)),
  // userCreateFarmerFetch: (dataCreate) =>
  //   dispatch(userCreateFarmerFetch(dataCreate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerFarmer);