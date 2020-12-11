import React, { Component } from "react";
//import ReactApexChart from "apexcharts";
import ReactApexChart from "react-apexcharts";

import { connect } from "react-redux";
import * as actions from "../../../trainRedux/action/diary/actionDiaryMap";
import Select from "react-select";
//import { assign } from "nodemailer/lib/shared";
import "./diary.css";
// function generateData(count, yrange) {
//   var i = 0;
//   var series = [];
//   while (i < count) {
//     var x = "w" + (i + 1).toString();
//     var y =
//       Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

//     series.push({
//       x: x,
//       y: y,
//     });
//     i++;
//   }
//   return series;
// }
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

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
class DiaryDetail extends Component {
  state = {
    selectedOption: 0,
    selectedStumps: 0,
    displayCount: "none",
    display: "none",
    displayCountBatch: "none",
    idFarmer: "",
    // totalTrees: null,
    stumpTotalTree: null,
    row: null,
    col: null,
    BatchClickis: "",
    dateSelectedDMY: new Date(),
    dateSelectedMY: new Date(),
    changeDate: "MY",
  };
  HanddleDateSelected = (date, value) => {
    console.log(value);
    if (value === "DMY") {
      this.setState({
        dateSelectedDMY: date,
        changeDate: "DMY",
      });
    }
    if (value === "MY") {
      this.setState({
        dateSelectedMY: date,
        changeDate: "MY",
      });
    }
  };

  handleChange = (selectedOption) => {
    this.setState({
      selectedOption: selectedOption.value,
      idFarmer: selectedOption.id,
      displayCount: "block",
    });
    console.log(`Option selected:`, selectedOption);
  };
  handleChangeStump = (selectedStumps) => {
    this.setState({
      selectedStumps: selectedStumps.value,
      display: "block",
      displayCountBatch: "none",
    });
    // console.log(`Option selectedstump:`, selectedStumps);
  };

  // gom data gui ve server
  handleChangeMap = (event) => {
    console.log(event.target.name);
    let name = event.target.name;
    this.setState({ [name]: event.target.value });
    // console.log(`Option selected:`, selectedOption);
  };
  handleSubmit = (event) => {
    event.preventDefault();
    //console.log(this.state);
    if (
      this.state.stumpTotalTree !== null ||
      this.state.row !== null ||
      this.state.col !== null
    ) {
      let data = {
        iduser: this.props.currentUser._id,
        idFarmer: this.state.idFarmer,
        selectedOption: this.state.selectedOption,
        selectedStumps: this.state.selectedStumps,
        stumpTotalTree: this.state.stumpTotalTree,
        row: this.state.row,
        col: this.state.col,
      };
      this.props.updateMapBatch(data);
    }
    this.buttonElement.click();
  };
  resetValue = (event) => {
    event.preventDefault();
    this.setState({
      selectedOption: 0,
      selectedStumps: 0,
      displayCount: "none",
      display: "none",
      displayCountBatch: "none",
      idFarmer: "",
      stumpTotalTree: null,
      row: null,
      col: null,
    });
  };
  handleSubmitCountStump = (event) => {
    event.preventDefault();
    //console.log(this.state);
    if (this.state.stumpTotalTree !== null) {
      let data = {
        iduser: this.props.currentUser._id,
        idFarmer: this.state.idFarmer,
        selectedOption: this.state.selectedOption,
        // selectedStumps: this.state.selectedStumps,
        stumpTotalTree: this.state.stumpTotalTree,
        row: this.state.row !== null ? this.state.row : 10,
        col: this.state.col !== null ? this.state.col : 5,
      };
      this.props.updateBatchCountStump(data);
    }
    this.buttonElement.click();
  };

  CountBatch = (event) => {
    event.preventDefault();
    this.setState({
      displayCountBatch: "block",
      display: "none",
    });
  };
  deleteStumps = (event, totalTree) => {
    event.preventDefault();
    let data = {
      iduser: this.props.currentUser._id,
      idFarmer: this.state.idFarmer,
      selectedOption: this.state.selectedOption,
      selectedStumps: this.state.selectedStumps,
      totalTree: totalTree,
    };
    this.props.deleteStumpFetch(data);
    this.buttonElement.click();
  };
  //xac nhan map
  ConfrommMap = (event) => {
    event.preventDefault();
    let data = {
      iduser: this.props.currentUser._id,
      idFarmer: this.props.id,
    };
    this.props.conFromMapFetch(data);
    // this.setState({

    // })
  };
  getdataDiary = async (data) => {
    //console.log(data);
    await this.props.getDataDiaryFetch(data);
    this.buttonElements.click();
  };
  render() {
    console.log(this.props.dataDiary);
    // let { match } = this.props;
    //console.log("check map " + this.props.isCheckMap);
    // this.props.showListBatch(this.props.match.params.id);
    // console.log("alo " + this.props.resBatchArray);
    //read diary
    // let add = this.props.dataDiary.map((e, index) => {
    //   e.preparation.map((ele) => {
    //     console.log(ele);
    //   });
    // });
    // console.log(add);
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
    const dateMY = (string) => {
      var options = { year: "numeric", month: "long" };
      return new Date(string).toLocaleDateString([], options);
    };

    let dataNow = dates(this.state.dateSelectedDMY.getTime());
    let dateMYY = dateMY(this.state.dateSelectedMY.getTime());
    console.log(dataNow);
    console.log(dateMYY);
    const ShowDiaryDMY = this.props.dataDiary.map((e, index) => {
      // console.log(dates(new Date(e.createAt)));
      let dateServer = new Date(e.createAt).getTime();
      if (dataNow == dates(dateServer)) {
        //   console.log("dasdas");
        let readFile =
          e.files.length !== 0
            ? e.files.map((eles, indx) => {
                return (
                  <div
                    key={indx}
                    className="col-sm-4"
                    style={{ padding: "20px" }}
                  >
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
                      {ele.dungtich}lit, so luong: {ele.soluong}, luong nuoc
                      dung de pha: {ele.luongnuoc} m
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
      }
    });
    const ShowDiaryMY = this.props.dataDiary.map((e, index) => {
      // console.log(dates(new Date(e.createAt)));
      let dateServer = new Date(e.createAt).getTime();
      if (dateMYY == dateMY(dateServer)) {
        //   console.log("dasdas");
        let readFile =
          e.files.length !== 0
            ? e.files.map((eles, indx) => {
                return (
                  <div
                    key={indx}
                    className="col-sm-4"
                    style={{ padding: "20px" }}
                  >
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
                      {ele.dungtich}lit, so luong: {ele.soluong}, luong nuoc
                      dung de pha: {ele.luongnuoc} m
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
      }
    });

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
    const options = [];
    this.props.resBatchArray.map((e) => {
      let option = {
        value: e.numberbatch,
        label: "Lô " + e.numberbatch,
        id: e.idFarmOwner,
      };
      options.push(option);
    });

    const optionstump = [];
    this.props.resBatchArray.map((e) => {
      if (e.numberbatch === this.state.selectedOption) {
        e.stumps.map((ele) => {
          let option = {
            value: ele.numberStumps,
            label: "Thửa " + ele.numberStumps,
          };
          optionstump.push(option);
        });
      }
    });

    let showdetail = this.props.resBatchArray.map((e, i) => {
      if (e.numberbatch === this.state.selectedOption) {
        let lengthstump = e.stumps.length;
        let data = e.stumps.map((ele, index) => {
          if (ele.numberStumps === this.state.selectedStumps) {
            return (
              <div key={index + 1}>
                <div
                  style={{
                    float: "right",
                    color: "red",
                    cursor: "pointer",
                    display:
                      ele.numberStumps === lengthstump ? "block" : "none",
                  }}
                  onClick={(event) => this.deleteStumps(event, ele.totalTree)}
                >
                  xóa thửa {ele.numberStumps}
                </div>
                <div style={{ margin: "10 auto", padding: "30px 10px" }}>
                  <form onSubmit={this.handleSubmit}>
                    <label style={{ margin: "5px" }}>
                      <p>tổng cây trong lô này</p>
                      <input
                        type="Number"
                        defaultValue={e.totalTree}
                        //min="0"
                        // name="totalTrees"
                        readOnly
                      />
                    </label>
                    <label>
                      <p>tổng cây trong thửa này</p>
                      <input
                        type="Number"
                        defaultValue={ele.totalTree}
                        min="0"
                        max="50"
                        name="stumpTotalTree"
                        onChange={this.handleChangeMap}
                      />
                    </label>
                    <label style={{ margin: "5px" }}>
                      <p>số hàng</p>
                      <input
                        type="Number"
                        defaultValue={ele.row}
                        min="0"
                        max="50"
                        name="row"
                        onChange={this.handleChangeMap}
                      />
                      <p>số cột</p>
                      <input
                        type="Number"
                        defaultValue={ele.col}
                        min="0"
                        max="50"
                        name="col"
                        onChange={this.handleChangeMap}
                      />
                    </label>
                    <button
                      style={{
                        fontSize: "10px",
                        float: "right",
                        marginTop: "120px",
                      }}
                      className="btn btn-outline-primary  btn-sm"
                      type="submit"
                    >
                      EDIT
                    </button>
                  </form>
                </div>
              </div>
            );
          }
        });
        return data;
      }
    });

    let showCountStump = this.props.resBatchArray.map((e, index) => {
      if (e.numberbatch === this.state.selectedOption) {
        let lenghtstump = e.stumps.length;
        return (
          <div key={index + 1} style={{ margin: "0 auto", padding: "10px" }}>
            <form onSubmit={this.handleSubmitCountStump}>
              <label style={{ margin: "5px" }}>
                <p>Lô {e.numberbatch} thửa thứ </p>
                <input
                  type="Number"
                  defaultValue={lenghtstump + 1}
                  //min="0"
                  // name="totalTrees"
                  readOnly
                />
              </label>
              <label>
                <p>tổng cây trong thửa này</p>
                <input
                  type="Number"
                  //defaultValue={ele.totalTree}
                  min="0"
                  max="50"
                  name="stumpTotalTree"
                  onChange={this.handleChangeMap}
                />
              </label>
              <label style={{ margin: "5px" }}>
                <p>số hàng</p>
                <input
                  type="Number"
                  defaultValue={10}
                  min="0"
                  name="row"
                  onChange={this.handleChangeMap}
                />
                <p>số cột</p>
                <input
                  type="Number"
                  defaultValue={5}
                  min="0"
                  name="col"
                  onChange={this.handleChangeMap}
                />
              </label>
              <button
                style={{
                  fontSize: "10px",
                  float: "right",
                  marginTop: "120px",
                }}
                className="btn btn-outline-primary  btn-sm"
                type="submit"
              >
                EDIT
              </button>
            </form>
          </div>
        );
      }
    });

    return (
      <div>
        <div className="card shadow">
          <div
            className="card-header"
            style={{ borderBottom: " 2px solid #5ea4f3" }}
          >
            <p className="text-primary m-0 font-weight-bold">
              Thông tin chi tiết nong dan {this.props.name}
              <button
                style={{
                  float: "right",
                  fontSize: "10px",
                  display: this.props.isCheckMap ? "none" : "block",
                }}
                className="btn btn-outline-primary  btn-sm"
                type="button"
                // onClick={this.completeTheTransaction}
                data-toggle="modal"
                data-target="#callModal"
                onClick={this.resetValue}
              >
                EDIT
              </button>
            </p>
          </div>
          <div className="card-body " style={{ minHeight: "450px" }}>
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
            <div style={{ display: this.props.isCheckMap ? "none" : "block" }}>
              <button
                style={{ float: "right", fontSize: "10px" }}
                className="btn btn-outline-primary  btn-sm"
                type="button"
                onClick={this.ConfrommMap}
              >
                XÁC NHẬN MAPs
              </button>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="callModal"
          // tabindex="-1"
          // role="dialog"
          // aria-labelledby="exampleModalLabel"
          // aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Thai đổi thông tin
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
                <label>Chọn lô</label>
                <Select
                  options={options}
                  // value={this.state.selectedOption}
                  onChange={this.handleChange}
                />
                <label style={{ paddingRight: "100px" }}>
                  Chọn thửa{" "}
                  <i
                    className="fa fa-plus-square"
                    style={{
                      display: this.state.displayCount,
                      float: "right",
                      padding: "4px",
                    }}
                    onClick={this.CountBatch}
                  ></i>
                </label>
                <Select
                  options={optionstump}
                  onChange={this.handleChangeStump}
                />
                <div style={{ display: this.state.display }}>{showdetail}</div>
                <div style={{ display: this.state.displayCountBatch }}>
                  {showCountStump}
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
        {/* phan hien thi nhat ky */}
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
            className="diary modal-dialog"
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
                  <div className="col-12 row showDiarydate">
                    <div className="col-sm">
                      chọn ngày chi tiết:
                      <DatePicker
                        selected={this.state.dateSelectedDMY}
                        onChange={(date) =>
                          this.HanddleDateSelected(date, "DMY")
                        }
                      />
                    </div>
                    <div className="col-sm">
                      chọn theo tháng
                      <DatePicker
                        selected={this.state.dateSelectedMY}
                        onChange={(date) =>
                          this.HanddleDateSelected(date, "MY")
                        }
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        showFullMonthYearPicker
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    {" "}
                    <ul>
                      {this.state.changeDate === "DMY"
                        ? ShowDiaryDMY
                        : ShowDiaryMY}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state.diaryReducer.resBatchArray);
  return {
    currentUser: state.authReducer.currentUser,
    resBatchArray: state.diaryReducer.resBatchArray,
    isCheckMap: state.diaryReducer.isCheckMap,
    dataDiary: state.diaryReducer.dataDiary,
  };
};
const mapDispatchToProps = (dispatch, props) => ({
  updateMapBatch: (data) => dispatch(actions.updateMapBatch(data)),
  updateBatchCountStump: (data) =>
    dispatch(actions.updateBatchCountStump(data)),
  deleteStumpFetch: (data) => dispatch(actions.deleteStumpFetch(data)),
  conFromMapFetch: (data) => dispatch(actions.conFromMapFetch(data)),
  checkConfromMap: (data) => dispatch(actions.checkConfromMap(data)),
  getDataDiaryFetch: (data) => dispatch(actions.getDataDiaryFetch(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiaryDetail);
