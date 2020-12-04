import React, { Component } from "react";
import CreateFarmer from "./create-farmer";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux";
import BusinessCooperation from "../cooperative/business_cooperation";
import * as actions from "../../../trainRedux/action/user/actionManagement";

class ManagerFarmer extends Component {
  state = {
    dataFarmer: "",
    display: "none",
  };

  componentDidMount() {
    this.props.showFarmerFetch(this.props.currentUser._id);
  }

  ViewDiary = (id, event) => {
    event.preventDefault();
    this.props.ShowImageDiary(id);
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
        dataField: "ViewDiary",
        text: "XEM NHẬT KÝ",
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
        ViewDiary: <i onClick={(e) => this.ViewDiary(element._id, e)}>VIEW</i>,
      };
      return products.push(arr);
    });

    // demo show image diary
    function bufferToBase64(buffer) {
      return btoa(
        new Uint8Array(buffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
    }
    //console.log(this.props.imageDiary.file);
    //console.log(this.props.imageDiary.contentType);
    //console.log(this.props.imageDiary.data);
    // const Image = () => {
    //   // console.log(this.props.imageDiary.file);
    //   console.log("alalalaa");
    //   return (
    //     <img
    //       src={`data:${
    //         this.props.imageDiary.contentType
    //       };base64,${bufferToBase64(this.props.imageDiary.data)}`}
    //       style={{ width: "250px", height: "250px" }}
    //     />
    //   );
    // };
    const Image = this.props.imageDiary.map((ele, index) => {
      return (
        <img
          src={`data:${ele.contentType};base64,${bufferToBase64(
            ele.data.data
          )}`}
          style={{ width: "250px", height: "250px" }}
          key={index}
        />
      );
    });

    return (
      <div>
        <main className="page contact-us-page" style={{ height: "100%" }}>
          <section
            className="clean-block clean-form "
            // style={{ height: "100vh" }}
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
            <div className="container" style={{ display: this.state.display }}>
              day la noi hien thi nhat ky : {this.state.dataFarmer} <br />
              {/* <Image /> */}
              {Image}
            </div>
          </section>
        </main>
        <CreateFarmer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.authReducer.currentUser,
    resArray: state.fmManagerReducer.resArray,
    imageDiary: state.diaryReducer.dataImage,
  };
};
const mapDispatchToProps = (dispatch, props) => ({
  showFarmerFetch: (dataCreate) =>
    dispatch(actions.showFarmerFetch(dataCreate)),
  ShowImageDiary: (idFarmer) => dispatch(actions.ShowImageDiary(idFarmer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerFarmer);
