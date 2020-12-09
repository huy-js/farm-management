import React, { Component } from "react";
// import CreateFarmer from "./create-farmer";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux";
import BusinessCooperation from "../cooperative/business_cooperation";
import * as actions from "../../../trainRedux/action/admin/actionManagement";
import { showFarmerFetch } from "../../../trainRedux/action/user/actionManagement";
import {
  showListBatch,
  getDataDiaryFetch,
} from "../../../trainRedux/action/diary/actionDiaryMap";
import Select from "react-select";

import ReactApexChart from "react-apexcharts";

function callFunctionSeries(totaltree, row, col) {
  let array = [];
  let dataArray = [];
  let lastTotalTrees = parseInt(totaltree / row);
  // console.log("check " + lastTotalTrees);
  let colLastTrees = totaltree - lastTotalTrees * row;
  // console.log(colLastTrees);
  for (let i = 1; i <= row; i++) {
    for (let j = 1; j <= col; j++) {
      if (j === lastTotalTrees + 1 && i > colLastTrees) {
        dataArray.push({ x: `s${j}`, y: 0 });
        continue;
      }
      if (j > lastTotalTrees + 1) {
        dataArray.push({ x: `s${j}`, y: 0 });
        continue;
      }
      dataArray.push({ x: `s${j}`, y: j });
    }
    let ele = {
      name: i,
      data: dataArray,
    };
    array.push(ele);
    dataArray = [];
  }
  return array;
}
class ManagerCooperative extends Component {
  state = {
    dataFarmer: "",
    display: "none",
    dataCooperative: "",
    displayShowMap: "none",
    selectIdFarmer: "",
  };

  componentDidMount() {
    this.props.showCooperativeFetch(this.props.currentUser._id);
  }

  handleChange = (selectedOption) => {
    this.props.showListBatch(selectedOption.value);
    this.setState({
      selectIdFarmer: selectedOption.value,
      //idFarmer: selectedOption.id,
      displayShowMap: "block",
    });
    console.log(`Option selected:`, selectedOption);
  };
  getdataDiary = async (data) => {
    //console.log(data);
    await this.props.getDataDiaryFetch(data);
    this.buttonElements.click();
  };
  render() {
    //console.log(this.props.currentUser);
    function bufferToBase64(buffer) {
      return btoa(
        new Uint8Array(buffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
    }
    const dates = (string) => {
      var options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(string).toLocaleDateString([], options);
    };

    const ShowDiarys = this.props.dataDiary.map((e, index) => {
      let readFile =
        e.files.length !== 0
          ? e.files.map((eles, indx) => {
              return (
                <div className="col-sm-4" style={{ padding: "20px" }}>
                  <img
                    src={`data:${eles.contentType};base64,${bufferToBase64(
                      eles.data.data
                    )}`}
                    style={{ width: "250px", height: "250px" }}
                    key={index}
                  />
                  <p>
                    {indx === 0 ? "Benh" : indx === 1 ? " tri benh" : "..."}
                  </p>
                </div>
              );
            })
          : null;
      let dataThuoc =
        e.preparation.length !== 0
          ? e.preparation.map((ele, inx) => {
              return (
                <div key={inx}>
                  <p>
                    ten thuoc: {ele.thuoc}, loai: {ele.loai}, dung tich:{" "}
                    {ele.dungtich}lit, so luong: {ele.soluong}, luong nuoc dung
                    de pha: {ele.luongnuoc} m
                  </p>
                </div>
              );
            })
          : null;

      return (
        <li key={index + 1} style={{ width: "100%", float: "left" }}>
          <span>
            {dates(new Date(e.createAt).getTime())} -- {e.work}{" "}
          </span>
          <button
            className="btn dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            //aria-haspopup="true"
            //aria-expanded="false"
          ></button>
          <div
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton"
            style={{ border: "none" }}
          >
            <h6
              style={{
                fontWeight: "bold",
                display: e.preparation.length === 0 ? "none" : "block",
              }}
            >
              Pha thuoc
            </h6>
            {dataThuoc}
            <h6
              style={{
                fontWeight: "bold",
                display: e.files.length === 0 ? "none" : "block",
              }}
            >
              hinh anh
            </h6>
            <div className="row" style={{ width: "900px" }}>
              {readFile}
            </div>
          </div>
        </li>
      );
    });

    // table
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
        dataField: "nameOfCooperative",
        text: "TÊN HỢP TÁC XÃ",
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
        dataField: "id",
        text: "",
        headerStyle: { display: "none" },
        style: { display: "none" },
      },
      {
        dataField: "iduser",
        text: "",
        headerStyle: { display: "none" },
        style: { display: "none" },
      },
    ];
    const products = [];

    this.props.dataCoopera.map(async (element, index) => {
      let dates = (string) => {
        var options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(string).toLocaleDateString([], options);
      };

      let arr = {
        stt: index + 1,
        createAt: dates(element.createAt),
        nameOfCooperative: element.nameOfCooperative,
        address: element.address,
        landArea: element.landArea,
        totalTrees: element.totalTrees,
        totalNumberQR: element.totalNumberQR,
        id: element._id,
        iduser: element.technicalStaff,
      };
      return products.push(arr);
    });

    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        // console.log(e);
        // console.log(row);
        // console.log(rowIndex);
        this.props.showFarmerFetch(row.iduser);
        this.props.dataCoopera.map((ele) => {
          if (ele._id === row.id) {
            this.setState({
              dataCooperative: ele,
              display: "block",
            });
          }
        });
      },
    };
    console.log(this.state.dataCooperative);

    const options = [];
    this.props.resArray.map((e) => {
      let option = {
        value: e._id,
        label: e.farmOwner,
        // id: e._id,
      };
      options.push(option);
    });
    // console.log(options);

    const HandleShowDiary = (isStump, Row, Col, isBatch) => {
      console.log("get data send server");
      let Stump = isStump.split(" ");
      //console.log(typeof Stump[1]);
      //console.log(Stump[1] + " + " + Row + " + " + Col);
      //console.log(isBatch);
      let data = {
        isBatch: isBatch,
        isStump: Stump[1],
        Row: Row,
        Col: Col,
      };
      return this.getdataDiary(data);
    };
    // show map
    let optionss = (data, idBatch) => {
      return {
        chart: {
          // height: 300,
          // width: 200,
          type: "heatmap",
          toolbar: {
            show: false,
          },
          events: {
            click: function (event, chartContext, config) {
              console.log("click");
              // console.log(event);
              // console.log(chartContext);
              //console.log(config);
              // console.log(
              //   "row " + config.seriesIndex + "/ col " + config.dataPointIndex
              // );
              // console.log("so thua :" + config.config.title.text);
              let checkIsTree = true;
              config.config.series.forEach((element, index) => {
                if (index === config.seriesIndex) {
                  element.data.forEach((e, inx) => {
                    if (inx === config.dataPointIndex) {
                      if (e.y === 0) {
                        checkIsTree = false;
                      }
                    }
                  });
                }
              });
              if (!checkIsTree) return;
              HandleShowDiary(
                config.config.title.text,
                config.seriesIndex + 1,
                config.dataPointIndex + 1,
                idBatch
              );
            },
          },
        },
        plotOptions: {
          heatmap: {
            enableShades: false,

            colorScale: {
              ranges: [
                {
                  from: 1,
                  to: 10,
                  color: "#5ce058",
                },
              ],
            },
          },
        },
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        //  colors: ["#5ce058"],
        colors: ["#a84e32"],
        title: {
          text: "Thửa " + data,
        },
      };
    };
    let showDiary = () => {
      let data = this.state.dataCooperative;
      //console.log(data.business);
      if (data === "") return null;
      let business =
        data.business.length !== 0
          ? data.business.map((e, i) => {
              return (
                <div key={i} className="row">
                  <div className="col-sm">
                    tên công ty
                    <p>{e.nameCompany}</p>
                  </div>
                  <div className="col-sm">
                    địa chỉ
                    <p>{e.address}</p>
                  </div>
                  <div className="col-sm">
                    loại trái tiêu thụ
                    <p>{e.typeOfTree}</p>
                  </div>
                </div>
              );
            })
          : null;
      let dataTechnicalStaff = (
        <div className="row">
          <div className="col-sm">
            tên cá bộ
            <p>{data.dataTechnical.username}</p>
          </div>
          <div className="col-sm">
            địa chỉ email
            <p>{data.dataTechnical.email}</p>
          </div>
          <div className="col-sm">
            số điện thoại
            <p>{data.dataTechnical.phonenumber}</p>
          </div>
        </div>
      );

      return (
        <div>
          <div className="viewdropdown">
            <span style={{ fontWeight: "bold" }}>mã số thuế : </span>
            {data.taxCode}
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>người đại diện </span>
            <button
              className="btn  dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
            ></button>
            <div
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton"
              style={{ float: "none", border: "none" }}
            >
              {" "}
              {dataTechnicalStaff}
            </div>
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>nơi báng</span>{" "}
            <button
              className="btn  dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
            ></button>
            <div
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton"
              style={{ float: "none", border: "none" }}
            >
              {" "}
              {business}
            </div>
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>Số nông hộ : </span>
            {data.memberfarmer}
            <Select options={options} onChange={this.handleChange} />
            <div style={{ display: this.state.displayShowMap }}>
              <h1
                className="text-info text-center"
                style={{ padding: "20px", margin: "0 auto" }}
              >
                {" "}
                thông tin nhật ký và đất trồng
              </h1>
              {this.props.resBatchArray.map((e, i) => {
                let result = e.stumps.map((ele, index) => {
                  return (
                    <div
                      key={index + 1}
                      className="col-sm-2"
                      style={{ margin: "10px" }}
                    >
                      <div>
                        <ReactApexChart
                          options={optionss(ele.numberStumps, e._id)}
                          series={callFunctionSeries(
                            ele.totalTree,
                            ele.row,
                            ele.col
                          )}
                          type="heatmap"
                          height={250}
                          width={200}
                        />
                      </div>
                    </div>
                  );
                });
                return (
                  <div key={i + 1} className="row">
                    <div className="row col-sm-12">
                      <h1>
                        Lô {i + 1} - số cây {e.totalTree}
                      </h1>
                    </div>
                    {result}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    };
    return (
      <div>
        <main className="page contact-us-page" style={{ minHeight: "150vh" }}>
          <section
            className="clean-block clean-form "
            //style={{ minheight: "240vh" }}
          >
            <div className="container">
              <div
                className="block-heading "
                style={{ marginTop: "50px", marginRight: "0px" }}
              >
                <h2 className="text-info">Danh sách hợp tác xã </h2>
              </div>
              <div className="container-body">
                {this.props.dataCoopera.length === 0 ? (
                  <div className="text-center">
                    {" "}
                    hien tai chua co thong tin moi
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
              <div style={{ display: this.state.display }}>
                <div className="dropdown">{showDiary()}</div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModalCenter"
              ref={(button) => (this.buttonElements = button)}
              style={{ display: "none" }}
            ></button>
            <div
              className="modal fade"
              id="exampleModalCenter"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                className="diary modal-dialog modal-dialog-centered"
                role="document"
                // style={{ maxWidth: `1000px !important` }}
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">
                      Nhật ký sản xuất
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="dropdown row">
                      <ul>{ShowDiarys}</ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        {/* <CreateFarmer /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.authReducer.currentUser,
    resArray: state.fmManagerReducer.resArray,
    dataCoopera: state.fmManagerReducer.dataCoopera,
    resBatchArray: state.diaryReducer.resBatchArray,
    dataDiary: state.diaryReducer.dataDiary,
  };
};
const mapDispatchToProps = (dispatch, props) => ({
  showCooperativeFetch: (iduser) =>
    dispatch(actions.showCooperativeFetch(iduser)),
  showFarmerFetch: (dataCreate) => dispatch(showFarmerFetch(dataCreate)),
  showListBatch: (idFarmer) => dispatch(showListBatch(idFarmer)),
  getDataDiaryFetch: (data) => dispatch(getDataDiaryFetch(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerCooperative);
