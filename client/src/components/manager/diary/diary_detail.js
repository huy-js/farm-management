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
//import { array } from "prop-types";
import moment from "moment";
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

function callFunctionSeriesMDCay(
  totaltree,
  row,
  col,
  arrayDiary,
  arrayDiaryIdBatch,
  arrayDiaryIdStump
) {
  let CountMD = 0;
  let CountDefault = 0;
  arrayDiaryIdBatch.forEach((e) => {
    arrayDiary.forEach((ele, index) => {
      if (ele._id === e.idDiary) {
        CountMD = index + 1;
      }
    });
  });
  let arrayStumpNode = [];
  arrayDiaryIdStump.forEach((e) => {
    arrayDiary.forEach((ele) => {
      if (ele._id === e.idDiary) {
        if (ele.node.length === 0) {
          CountMD = CountMD + 1;
        } else {
          arrayStumpNode.push(ele.node);
        }
      }
    });
  });
  // console.log(CountMD);

  CountDefault = CountMD;

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
      let countInstump = 0;
      if (arrayStumpNode.length !== 0) {
        //let countInstump = 0;
        arrayStumpNode.forEach((es) => {
          //console.log(es);
          es.forEach((eles) => {
            // console.log(eles);
            if (eles.row == i && eles.col == j) {
              // console.log("row col");
              countInstump = countInstump + 1;
            }
          });
        });
        CountMD = CountMD + countInstump;
      }
      //  console.log(CountMD);
      dataArray.push({ x: `s${j}`, y: CountMD });
      CountMD = CountDefault;
      // if (CountMD !== 0) {
      //   dataArray.push({ x: `s${j}`, y: CountMD });
      //   continue;
      // }
      //dataArray.push({ x: `s${j}`, y: j });
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
    XemMatdo: null,
    //changeSreen: this.props.changeFarmer,
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

  //componentDidMount = () => {
  //   this.setState({
  //     changeSreen: this.props.changeFarmer,
  //   });
  // };
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
  // xem mat do
  handleChangeMatDo = (selectedOption) => {
    this.setState({
      XemMatdo: selectedOption.value,
      //changeSreen: false,
    });
    this.props.changeScreenMap(false);
  };
  // screenMap = () => {
  //   this.setState({
  //     changeSreen: this.props.changeFarmer,
  //   });
  // };
  render() {
    console.log(this.props.dataDiaryOfBatch);
    // {
    //   this.props.changeFarmer ? this.screenMap() : null;
    // }
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
    //console.log(dataNow);
    //console.log(dateMYY);

    let SelectBonphanBaoTrai = (data) => {
      return (
        <div
          className="dropdown-menu"
          aria-labelledby="dropdownMenuButton"
          style={{ border: "none" }}
        >
          <h6
            style={{
              fontWeight: "bold",
              display: data.work === "Baotrai" ? "none" : "block",
            }}
          >
            Tên phân Bón : {" " + data.ferTiLizer}
          </h6>
          <h6
            style={{
              fontWeight: "bold",
              // display: e.files.length === 0 ? "none" : "block",
            }}
          >
            {data.work === "Baotrai" ? `Hình ảnh Bao trái` : `Hình sản phẩm`}
          </h6>
          <div className="row" style={{ width: "900px" }}>
            <div className="col-sm-12" style={{ padding: "20px" }}>
              <img
                src={`data:${data.files[0].contentType};base64,${bufferToBase64(
                  data.files[0].data.data
                )}`}
                style={{ width: "250px", height: "250px" }}
                // key={index}
              />
            </div>
          </div>
        </div>
      );
    };
    let SelectPhunthuoc = (data) => {
      let dataThuoc = data.preparation.map((ele, inx) => {
        return (
          <div key={inx}>
            <p>
              Ten thuoc: {" " + ele.thuoc}, Loai: {" " + ele.loai}, Dung tich:
              {" " + ele.dungtich} lit, So luong: {" " + ele.soluong}, Luong
              nuoc dung de pha: {" " + ele.luongnuoc} ml
            </p>
            <h6
              style={{
                fontWeight: "bold",
              }}
            >
              Hình sản phẩm
            </h6>
            <div className="row" style={{ width: "900px" }}>
              <div className="col-sm-12" style={{ padding: "20px" }}>
                <img
                  src={`data:${
                    data.files[inx].contentType
                  };base64,${bufferToBase64(data.files[inx].data.data)}`}
                  style={{ width: "250px", height: "250px" }}
                />
              </div>
            </div>
          </div>
        );
      });

      return (
        <div
          className="dropdown-menu"
          aria-labelledby="dropdownMenuButton"
          style={{ border: "none" }}
        >
          <h6
            style={{
              fontWeight: "bold",
              display: data.work === "Baotrai" ? "none" : "block",
            }}
          >
            Thông tin pha chế và hình ảnh
          </h6>
          {dataThuoc}
        </div>
      );
    };
    let SelectSauHai = (data) => {
      let readFile = data.files.map((eles, indx) => {
        if (indx !== 0) {
          return (
            <div key={indx} className="col-sm-4" style={{ padding: "20px" }}>
              <img
                src={`data:${eles.contentType};base64,${bufferToBase64(
                  eles.data.data
                )}`}
                style={{ width: "250px", height: "250px" }}
              />
            </div>
          );
        }
      });

      let dataThuoc = data.preparation.map((ele, inx) => {
        return (
          <div key={inx}>
            <p>
              Ten thuoc: {" " + ele.thuoc}, Loai: {" " + ele.loai}, Dung tich:
              {" " + ele.dungtich} lit, So luong: {" " + ele.soluong}, Luong
              nuoc dung de pha: {" " + ele.luongnuoc} ml
            </p>
          </div>
        );
      });

      return (
        <div
          className="dropdown-menu"
          aria-labelledby="dropdownMenuButton"
          style={{ border: "none" }}
        >
          <h6
            style={{
              fontWeight: "bold",
            }}
          >
            Thông tin bệnh {" " + data.worm.type}
          </h6>
          <h6
            style={{
              fontWeight: "bold",
            }}
          >
            Hình ảnh bệnh
          </h6>
          <div className="col-sm-12" style={{ padding: "20px" }}>
            <img
              src={`data:${data.files[0].contentType};base64,${bufferToBase64(
                data.files[0].data.data
              )}`}
              style={{ width: "250px", height: "250px" }}
            />
          </div>
          <h6
            style={{
              fontWeight: "bold",
            }}
          >
            Cách trị : {data.worm.theCure}
          </h6>
          {readFile}
          <h6
            style={{
              fontWeight: "bold",
            }}
          >
            Thông tin thuốc điều trị
          </h6>
          {dataThuoc}
        </div>
      );
    };

    const ShowDiaryDMY = this.props.dataDiary.map((e, index) => {
      // console.log(dates(new Date(e.createAt)));
      let dateServer = new Date(e.createAt).getTime();
      if (dataNow == dates(dateServer)) {
        let viewSelect = "";
        let doWork = "Tưới nước";
        if (e.work === "bonphan") {
          doWork = "Bón phân ";
          viewSelect = SelectBonphanBaoTrai(e);
        }
        if (e.work === "Baotrai") {
          doWork = "Bao trái";
          viewSelect = SelectBonphanBaoTrai(e);
        }
        if (e.work === "phunthuoc") {
          doWork = "Phun thuốc";
          viewSelect = SelectPhunthuoc(e);
        }
        if (e.work === "sauhai") {
          doWork = "Sâu hại";
          viewSelect = SelectSauHai(e);
        }
        return (
          <li key={index + 1} style={{ width: "100%", float: "left" }}>
            <span>
              {/* {dates(new Date(e.createAt).getTime())} -- {e.work}{" "} */}
              {moment(e.createAt).format("DD/MM/YYYY")} công việc {doWork}
            </span>
            <button
              className="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
            ></button>
            <div className="col-12"> {viewSelect}</div>
          </li>
        );
      }
    });

    const ShowDiaryMY = this.props.dataDiary.map((e, index) => {
      let dateServer = new Date(e.createAt).getTime();
      if (dateMYY == dateMY(dateServer)) {
        let viewSelect = "";
        let doWork = "Tưới nước";
        if (e.work === "bonphan") {
          doWork = "Bón phân ";
          viewSelect = SelectBonphanBaoTrai(e);
        }
        if (e.work === "Baotrai") {
          doWork = "Bao trái";
          viewSelect = SelectBonphanBaoTrai(e);
        }
        if (e.work === "phunthuoc") {
          doWork = "Phun thuốc";
          viewSelect = SelectPhunthuoc(e);
        }
        if (e.work === "sauhai") {
          doWork = "Sâu hại";
          viewSelect = SelectSauHai(e);
        }
        return (
          <li key={index + 1} style={{ width: "100%", float: "left" }}>
            <span>
              {/* {dates(new Date(e.createAt).getTime())} -- {e.work}{" "} */}
              {moment(e.createAt).format("DD/MM/YYYY")} công việc {doWork}
            </span>
            <button
              className="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
            ></button>
            <div className="col-12"> {viewSelect}</div>
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
    let optionss = (data, idBatch, row) => {
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
                  to: row,
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
    let optionMDCay = (data, Matdo, row) => {
      return {
        chart: {
          type: "heatmap",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          heatmap: {
            enableShades: true,
            // distributed: false,
            // shadeIntensity: 0,
            colorScale: {
              ranges: [
                {
                  from: 1,
                  to: row,
                  color: Matdo === `tuoinuoc` ? "#093c8f" : "#e01919",
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
        //colors: ["#e01919"],
        //colors: ["#ffffff"],
        // colors: [
        //   function () {
        //     if (idBatch == "MDCay") {
        //       return "#e01919";
        //     }
        //   },
        // ],
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
              <div key={index + 1} style={{ minHeight: "300px" }}>
                {/* <div
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
                </div> */}
                <div
                  className="row"
                  style={{ margin: "10 auto", padding: "30px 10px" }}
                >
                  <h2 className="text-center">Cập nhật thửa</h2>
                  <form onSubmit={this.handleSubmit} style={{ width: "100%" }}>
                    <div style={{ margin: "5px" }}>
                      <p>tổng cây trong lô này: {e.totalTree} Cây</p>
                      {/* <input
                        type="Number"
                        defaultValue={e.totalTree}
                        //min="0"
                        // name="totalTrees"
                        readOnly
                      /> */}
                    </div>
                    <div className="row" style={{ margin: "5px" }}>
                      <div className="col-sm">
                        <p>tổng cây trong thửa {ele.numberStumps}:</p>
                      </div>
                      <div className="col-sm">
                        <input
                          type="Number"
                          defaultValue={ele.totalTree}
                          min="0"
                          max="50"
                          name="stumpTotalTree"
                          onChange={this.handleChangeMap}
                          style={{ float: "right" }}
                        />
                      </div>
                    </div>
                    <div className="row" style={{ margin: "5px" }}>
                      <div className="col-sm">
                        <p>số hàng:</p>
                      </div>
                      <div className="col-sm">
                        <input
                          type="Number"
                          defaultValue={ele.row}
                          min="0"
                          max="50"
                          name="row"
                          onChange={this.handleChangeMap}
                          style={{ float: "right" }}
                        />
                      </div>
                    </div>
                    <div className="row" style={{ margin: "5px" }}>
                      <div className="col-sm">
                        <p>số cột:</p>
                      </div>
                      <div className="col-sm">
                        <input
                          type="Number"
                          defaultValue={ele.col}
                          min="0"
                          max="50"
                          name="col"
                          onChange={this.handleChangeMap}
                          style={{ float: "right" }}
                        />
                      </div>
                    </div>
                    <div className="row" style={{ width: "100%" }}>
                      <div className="col-sm">
                        <button
                          style={{
                            fontSize: "15px",
                            margin: "10px",
                            textAlign: "center",
                            marginTop: "20px",
                          }}
                          className="btn btn-outline-primary  btn-sm"
                          type="submit"
                        >
                          Cập nhật
                        </button>
                      </div>
                      <div
                        className="col-sm"
                        style={{
                          float: "right",
                          color: "red",
                          cursor: "pointer",
                          display:
                            ele.numberStumps === lengthstump ? "block" : "none",
                        }}
                        onClick={(event) =>
                          this.deleteStumps(event, ele.totalTree)
                        }
                      >
                        {/* xóa thửa {ele.numberStumps} */}
                        <div
                          style={{
                            fontSize: "15px",
                            width: "100px",
                            textAlign: "center",
                            marginTop: "20px",
                            float: "right",
                            marginRight: "-8px",
                          }}
                          className="btn  btn-outline-danger  btn-sm"
                          // type="button"
                        >
                          Xóa thửa {ele.numberStumps}
                        </div>
                      </div>
                    </div>
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
          <div
            className="row"
            key={index + 1}
            style={{ margin: "0 auto", padding: "10px", minHeight: "300px" }}
            //  style={{ minHeight: "300px" }}
          >
            <h2 className="text-center">Thêm thửa</h2>
            <form
              onSubmit={this.handleSubmitCountStump}
              style={{ width: "100%" }}
            >
              <div className="row">
                <div className="col-sm">
                  <p>
                    Lô {e.numberbatch} thửa thứ : {lenghtstump + 1}{" "}
                  </p>
                </div>
                {/* <div className="col-sm">
                  <input
                    type="Number"
                    defaultValue={lenghtstump + 1}
                    style={{ float: "right" }}
                    readOnly
                  />
                </div> */}
              </div>
              <div className="row">
                <div className="col-sm">
                  <p>tổng cây trong thửa này</p>
                </div>
                <div className="col-sm">
                  <input
                    type="Number"
                    //defaultValue={ele.totalTree}
                    min="0"
                    max="50"
                    name="stumpTotalTree"
                    style={{ float: "right" }}
                    onChange={this.handleChangeMap}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <p>số hàng</p>
                </div>
                <div className="col-sm">
                  <input
                    type="Number"
                    defaultValue={10}
                    min="0"
                    name="row"
                    style={{ float: "right" }}
                    onChange={this.handleChangeMap}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm">
                  <p>số cột</p>
                </div>
                <div className="col-sm">
                  <input
                    type="Number"
                    defaultValue={5}
                    min="0"
                    name="col"
                    style={{ float: "right" }}
                    onChange={this.handleChangeMap}
                  />
                </div>
              </div>
              <div className="row">
                <button
                  style={{
                    fontSize: "15px",
                    margin: "10px",
                    textAlign: "center",
                    marginTop: "20px",
                  }}
                  className="btn btn-outline-primary  btn-sm"
                  type="submit"
                >
                  Thêm thửa
                </button>
              </div>
            </form>
          </div>
        );
      }
    });

    // xu ly mat do
    const optionMatDo = [];
    const arrayMatDo = [
      "Quan sát mật độ cây",
      "Sâu Hại",
      "Bón Phân",
      "Phun Thuốc",
      "Tưới nước",
      "Bao Trái",
    ];
    arrayMatDo.map((e, index) => {
      let option = {};

      if (e === "Quan sát mật độ cây") {
        option = {
          value: "quansat",
          label: "Quan sát mật độ cây",
        };
      }
      if (e === "Sâu Hại") {
        option = {
          value: "sauhai",
          label: "Sâu Hại",
        };
      }
      if (e === "Bón Phân") {
        option = {
          value: "bonphan",
          label: "Bón Phân",
        };
      }
      if (e === "Phun Thuốc") {
        option = {
          value: "phunthuoc",
          label: "Phun Thuốc",
        };
      }
      if (e === "Tưới nước") {
        option = {
          value: "tuoinuoc",
          label: "Tưới nước",
        };
      }
      if (e === "Bao Trái") {
        option = {
          value: "Baotrai",
          label: "Bao Trái",
        };
      }
      optionMatDo.push(option);
    });

    // checkDiaryMax
    // function checkDiaryMAx(arrayDiary, arrayDiaryForAll, arrayDiarys) {
    //   let countMax = 0;
    //   arrayDiaryForAll.forEach((ele) => {
    //     arrayDiary.forEach((e) => {
    //       if (e._id === ele.idDiary) {
    //         countMax++;
    //       }
    //     });
    //   });
    //   arrayDiarys.forEach((ele) => {
    //     arrayDiary.forEach((e) => {
    //       if (e._id === ele.idDiary) {
    //         countMax++;
    //       }
    //     });
    //   });
    //   // console.log("alal " + countMax);
    //   return countMax;
    // }
    function checkMaxColor(arrayStumpsOfBatch, arrayDiarys, arrayDiaryForAll) {
      let countMax = 0;
      arrayDiaryForAll.forEach((ele) => {
        arrayDiarys.forEach((e) => {
          if (e._id === ele.idDiary) {
            countMax++;
          }
        });
      });
      let count = 0;
      arrayStumpsOfBatch.forEach((ele) => {
        let countAtStump = 0;
        ele.arrayDiary.forEach((e) => {
          arrayDiarys.forEach((es) => {
            if (es._id === e.idDiary) {
              countAtStump++;
            }
          });
          if (count <= countAtStump) {
            count = countAtStump;
          }
        });
      });
      console.log(countMax + count);
      return countMax + count;
    }
    return (
      <div>
        <div className="card shadow">
          <div
            className="card-header"
            style={{ fontWeight: "15px", borderBottom: "2px solid #fff" }}
          >
            <span className="m-0 font-weight-bold">
              Thông tin chi tiết nông dân {this.props.name}
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
              <i
                style={{
                  float: "right",
                  marginTop: "-5px",
                  width: "300px",
                  height: "30px",
                  display: this.props.isCheckMap ? "block" : "none",
                }}
                // className="btn btn-outline-primary  btn-sm"
              ></i>
              <Select
                options={optionMatDo}
                placeholder="Quan sát mật độ cây"
                height="30px"
                onChange={this.handleChangeMatDo}
              />
            </span>
          </div>
          <div className="card-body " style={{ minHeight: "450px" }}>
            {/* changeFarmer gui tu diary manager */}
            {this.props.changeFarmerMap
              ? this.props.resBatchArray.map((e, i) => {
                  let result = e.stumps.map((ele, index) => {
                    return (
                      <div
                        key={index + 1}
                        className="col-sm-2 justify-content-center"
                      >
                        <div>
                          <ReactApexChart
                            options={optionss(ele.numberStumps, e._id, ele.row)}
                            series={callFunctionSeries(
                              ele.totalTree,
                              ele.row,
                              ele.col
                            )}
                            type="heatmap"
                            height={250}
                            width={150}
                          />
                        </div>
                      </div>
                    );
                  });
                  return (
                    <div key={i + 1} className="row">
                      <div className="row col-sm-12">
                        <h2 style={{ marginLeft: "15px" }}>
                          Lô {i + 1} - Số cây {e.totalTree}
                        </h2>
                      </div>
                      {result}
                    </div>
                  );
                })
              : this.props.resBatchArray.map((e, i) => {
                  console.log(this.state.XemMatdo);
                  let arrayDiary = this.props.dataDiaryOfBatch.filter(
                    (element, index) => {
                      if (this.state.XemMatdo === element.work) {
                        // console.log("alo");
                        return element;
                      }
                    }
                  );
                  // console.log(arrayDiary);
                  let MaxColor = checkMaxColor(
                    e.stumps,
                    arrayDiary,
                    e.arrayDiaryForAll
                  );
                  let result = e.stumps.map((ele, index) => {
                    return (
                      <div
                        key={index + 1}
                        className="col-sm-2"
                        style={{ margin: "10px" }}
                      >
                        <div>
                          <ReactApexChart
                            options={optionMDCay(
                              ele.numberStumps,
                              this.state.XemMatdo,
                              MaxColor
                            )}
                            series={callFunctionSeriesMDCay(
                              ele.totalTree,
                              ele.row,
                              ele.col,
                              arrayDiary,
                              e.arrayDiaryForAll,
                              ele.arrayDiary
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
                  Thay đổi thông tin
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
                <h5
                  className="modal-title"
                  id="exampleModalLongTitle"
                  style={{ color: "#3483eb" }}
                >
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
              {/* <div className="col-12" style={{ marginTop: "10px" }}>
                <h2
                  className="text-info text-center"
                  style={{ textAlign: "center" }}
                >
                  Thông tin chi tiết
                </h2>
                <ul>
                  {this.state.changeDate === "DMY" ? ShowDiaryDMY : ShowDiaryMY}
                </ul>
              </div> */}
              <div className="modal-body">
                <div className="dropdown row">
                  <h2
                    className=" col-12 text-info text-center"
                    // style={{ textAlign: "center" }}
                  >
                    Thông tin chi tiết
                  </h2>
                  <div className="col-12 row showDiarydate">
                    <div className="col-sm-6 d-flex justify-content-center">
                      <p style={{ paddingTop: "5px" }}>
                        {" "}
                        Chọn ngày chi tiết:&nbsp;
                      </p>
                      <DatePicker
                        selected={this.state.dateSelectedDMY}
                        onChange={(date) =>
                          this.HanddleDateSelected(date, "DMY")
                        }
                      />
                    </div>
                    <div className="col-sm-6 d-flex justify-content-center">
                      <p style={{ paddingTop: "5px" }}>
                        {" "}
                        Chọn theo tháng:&nbsp;{" "}
                      </p>
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

                  <div className="col-12 " style={{ marginTop: "10px" }}>
                    {/* <h2
                      className="text-info text-center"
                      style={{ textAlign: "center" }}
                    >
                      Thông tin chi tiết
                    </h2> */}
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
    changeFarmerMap: state.diaryReducer.changeFarmerMap,
    dataDiaryOfBatch: state.diaryReducer.dataDiaryOfBatch,
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
  changeScreenMap: (bl) => dispatch(actions.changeScreenMap(bl)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiaryDetail);
