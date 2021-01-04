import React, { Component } from "react";
// import CreateFarmer from "./create-farmer";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux";
import BusinessCooperation from "../cooperative/business_cooperation";
import * as actions from "../../../trainRedux/action/admin/actionManagement";
import { showFarmerFetch } from "../../../trainRedux/action/user/actionManagement";

import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  showListBatch,
  getDataDiaryFetch,
} from "../../../trainRedux/action/diary/actionDiaryMap";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faTree,
  faSolarPanel,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../helpers/desgin-table.module.css";
import ReactApexChart from "react-apexcharts";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

//map osp start
import Search from "react-leaflet-search";
import L from "leaflet";
import {
  // MapContainer,
  Map,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
  Polygon,
  Tooltip,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "./leaflet.css";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});
//map osp end
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
class ManagerCooperative extends Component {
  state = {
    countView: 5,
    display: "none",
    name: "",
    id: "",
    dataFarmerss: "",
    position: [10.04904, 105.785103],
    dataAtPolysona: null,
    selectIdFarmer: "Xem biểu đồ",
    //idFarmer: selectedOption.id,
    displayShowMap: "none",
    XemMatdo: null,
    changeFarmerMap: true, //show bieu do
    DefaultBieudo: {
      value: "",
      label: "xem biểu đồ",
    },
    dataTechnical: "",
    databusiness: [],
    dateSelectedMY: new Date(),
    /// moi them
    selectedOption: 0,
    selectedStumps: 0,
    //  XemMatdo: null,
    //changeSreen: this.props.changeFarmer,
    displayCount: "none",
    // display: "none",
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
    dataDetaiView: "",
    WorkDo: "",
    colorDateDiary: "",
    ShowDateDiaryMode: false,
  };
  componentDidMount = async () => {
    await this.props.showCooperativeFetch(this.props.currentUser._id);
    //console.log(this.props.dataCoopera[0].technicalStaff);
    await this.props.showFarmerFetch(this.props.dataCoopera[0].technicalStaff);
    this.setState({
      id: this.props.dataCoopera[0]._id,
      dataFarmerss: this.props.dataCoopera[0],
      dataTechnical: this.props.dataCoopera[0].dataTechnical,
      databusiness: this.props.dataCoopera[0].business,
    });
  };
  viewMore = (event) => {
    event.preventDefault();
    console.log(this.state.countView);
    this.props.showMoreListFarmerFetch(
      this.props.currentUser._id,
      this.state.countView
    );
    this.setState({
      countView: this.state.countView + 5,
    });
  };
  ShowDetailMaps = (name, id, data, event) => {
    event.preventDefault();
    console.log(id + " + " + name);
    this.setState({
      display: "block",
      name: name,
      id: id,
      dataFarmerss: data,
      dataTechnical: data.dataTechnical,
      databusiness: data.business,
      displayShowMap: "none",
      changeFarmerMap: true,
      selectIdFarmer: "",
      DefaultBieudo: {
        label: "xem biểu đồ",
        value: "",
      },
    });
    this.props.showFarmerFetch(data.technicalStaff);
  };
  handleChange = (selectedOption) => {
    this.props.showListBatch(selectedOption.value);
    this.setState({
      selectIdFarmer: selectedOption.value,
      //idFarmer: selectedOption.id,
      displayShowMap: "block",
    });
    console.log(`Option selected:`, selectedOption);
  };
  // xem mat do
  handleChangeMatDo = (selectedOption) => {
    if (selectedOption.value === "quansat") {
      return this.setState({
        changeFarmerMap: true,
      });
    }
    this.setState({
      XemMatdo: selectedOption.value,
      //changeSreen: false,
      // dataDetaiView: "",
      changeFarmerMap: false,
    });
    // this.props.changeScreenMap(false);
  };
  // show nhat ky
  getdataDiary = async (data) => {
    //console.log(data);
    await this.props.getDataDiaryFetch(data);
    this.setState({
      dataDetaiView: "",
    });
    this.buttonElements.click();
  };
  ShowDetail = (event, data) => {
    event.preventDefault();
    console.log(data);
    this.setState({
      dataDetaiView: data,
      //  displayDetaildiary: "block",
    });
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
  ShowDateDiary = (event, type, colorCard) => {
    event.preventDefault();
    this.setState({
      WorkDo: type,
      ShowDateDiaryMode: true,
      colorDateDiary: colorCard,
      dataDetaiView: "",
    });
  };
  render() {
    console.log(this.state.dataFarmerss);
    let name = "";
    let idfarmer = "";
    this.props.dataCoopera.map((e, index) => {
      if (index === 0) {
        name = e.farmOwner;
        idfarmer = e._id;
      }
      return;
    });
    //console.log(idfarmer);
    // show bieu do
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

    // setting bieu do normol
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
    // setting bieu do mat do
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
    // edit color
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
    function bufferToBase64(buffer) {
      return btoa(
        new Uint8Array(buffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
    }
    // const dates = (string) => {
    //   var options = { year: "numeric", month: "long", day: "numeric" };
    //   return new Date(string).toLocaleDateString([], options);
    // };
    const dateMY = (string) => {
      var options = { year: "numeric", month: "long" };
      return new Date(string).toLocaleDateString([], options);
    };

    // let dataNow = dates(this.state.dateSelectedDMY.getTime());
    let dateMYY = dateMY(this.state.dateSelectedMY.getTime());
    //console.log(dataNow);
    //console.log(dateMYY);

    let SelectBonphanBaoTrai = (data) => {
      return (
        <div className="col-12 col-md-4 mt-4">
          <div className="card profile-card-5">
            <div className="card-img-block" style={{ paddingLeft: "0px" }}>
              <img
                className="card-img-top"
                src={`data:${data.files[0].contentType};base64,${bufferToBase64(
                  data.files[0].data.data
                )}`}
                alt="Card image cap"
                style={{ width: "230px", height: "230px" }}
              />
            </div>
            <div className="card-body pt-0">
              <h5 className="card-title">
                {" "}
                {data.work === "Baotrai"
                  ? `Hình ảnh Bao trái`
                  : `Hình bón phân`}
              </h5>
              <p className="card-text">
                {data.work === "Baotrai" ? "" : "bón phân " + data.ferTiLizer}
              </p>
            </div>
          </div>
          {/* <p className="mt-3 w-100 float-left text-center">
            <strong>Card with Floting Picture</strong>
          </p> */}
        </div>
      );
    };
    let SelectPhunthuoc = (data) => {
      let dataThuoc = data.preparation.map((ele, inx) => {
        return (
          <div key={inx} className="row">
            <div className="col-12 col-md-4 mt-4">
              <div className="card profile-card-5">
                <div className="card-img-block">
                  <img
                    className="card-img-top"
                    src={`data:${
                      data.files[0].contentType
                    };base64,${bufferToBase64(data.files[0].data.data)}`}
                    alt="Card image cap"
                    style={{ width: "230px", height: "230px" }}
                  />
                </div>
                <div className="card-body pt-0">
                  <h5 className="card-title">
                    {" " + ele.thuoc + "(" + ele.loai + ")"}
                  </h5>
                  <p>
                    Dung tích:
                    {" " + ele.dungtich} ml, Số lượng: {" " + ele.soluong},
                    Lượng nước pha chế: {" " + ele.luongnuoc} lit
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      });

      return (
        <div
          // className="dropdown-menu"
          // aria-labelledby="dropdownMenuButton"
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
        return (
          <div key={indx} className="col-12 col-md-4 mt-4">
            <div className="card profile-card-5">
              <div className="card-img-block">
                <img
                  className="card-img-top"
                  src={`data:${eles.contentType};base64,${bufferToBase64(
                    eles.data.data
                  )}`}
                  alt="Card image cap"
                  style={{ width: "230px", height: "230px" }}
                />
              </div>
              <div className="card-body pt-0">
                <h5 className="card-title">
                  {indx === 0 ? "Ảnh sâu hại" : indx === 1 ? "cách trị" : ""}
                </h5>
                <p>{indx === 0 ? data.worm.type : data.worm.theCure}</p>
              </div>
            </div>
          </div>
        );
      });

      let dataThuoc = data.preparation.map((ele, inx) => {
        return (
          <div
            className="col-12 col-sm-6 col-lg-4"
            //  style={{ marginBottom: "20px" }}
            key={inx}
          >
            <div
              className="card"
              style={{
                border: " 1px solid #009879",
              }}
            >
              <div
                className="card-body"
                style={{
                  padding: "5px",
                  color: "black",
                }}
              >
                <h6 className="card-title">
                  {"tên thuốc " + ele.thuoc + " dạng " + ele.loai}
                </h6>
                <p>
                  Dung tích:
                  {" " + ele.dungtich} ml, Số lượng: {" " + ele.soluong}, Lượng
                  nước pha chế: {" " + ele.luongnuoc} lit
                </p>
              </div>
            </div>
          </div>
        );
      });

      return (
        <div>
          <div className="row">{readFile}</div>
          <div className="row" style={{ paddingTop: "20px" }}>
            <div className="col-12" style={{ paddingBottom: "10px" }}>
              <h4>các loại thuốc đã dùng</h4>
            </div>
            {dataThuoc}
          </div>
        </div>
      );
    };
    let array = ["Bón Phân", "Phun Thuốc", "Tưới Nước", "Bao Trái", "Sâu Hại"];
    let arrayvalue = ["bonphan", "phunthuoc", "tuoinuoc", "Baotrai", "sauhai"];
    let colorCard = [
      "bg-light",
      "bg-secondary",
      "bg-primary",
      "bg-success",
      "bg-danger",
    ];
    const MenuDiary = array.map((element, index) => {
      return (
        <div
          className="col-12 col-sm-6 col-lg-2"
          style={{ marginBottom: "5px", textAlign: "center" }}
          //  key={index + 1}
        >
          <div
            className={"card " + colorCard[index]}
            style={{
              border: " none",
              cursor: "pointer",
            }}
            onClick={(event) =>
              this.ShowDateDiary(event, arrayvalue[index], colorCard[index])
            }
          >
            <div
              className="card-body"
              style={{
                padding: "5px",
                color: element === "Bón Phân" ? "black" : "#fff",
              }}
            >
              {element}
            </div>
          </div>
        </div>
      );
    });

    const ShowDiaryMY = this.props.dataDiary.map((e, index) => {
      let dateServer = new Date(e.createAt).getTime();

      if (dateMYY == dateMY(dateServer) && this.state.WorkDo === e.work) {
        let viewSelect = "";
        let doWork = "Tưới nước";

        if (e.work === "bonphan") {
          doWork = "Bón phân ";
          //   viewSelect = SelectBonphanBaoTrai(e);
        }

        if (e.work === "Baotrai") {
          doWork = "Bao trái";
          //   viewSelect = SelectBonphanBaoTrai(e);
        }

        if (e.work === "phunthuoc") {
          doWork = "Phun thuốc";
          //  viewSelect = SelectPhunthuoc(e);
        }

        if (e.work === "sauhai") {
          doWork = "Trị sâu hại";
          //  viewSelect = SelectSauHai(e);
        }

        return (
          <div
            className="col-12 col-sm-6 col-lg-3"
            style={{ marginBottom: "5px", textAlign: "center" }}
            key={index + 1}
          >
            <div
              className={"card " + this.state.colorDateDiary}
              style={{
                border: "none",
                cursor: "pointer",
              }}
              onClick={(event) => this.ShowDetail(event, e)}
            >
              <div
                className="card-body"
                style={{
                  padding: "5px",
                  color: e.work === "bonphan" ? "black" : "#fff",
                }}
              >
                {/* <h6 className="card-title">
                  {moment(e.createAt).format("DD/MM/YYYY,h:mm a")}
                </h6>
                <b>{doWork}</b> */}

                {moment(e.createAt).format("DD/MM/YYYY,h:mm a")}

                {/* {doWork} */}
              </div>
            </div>
          </div>
        );
      }
    });
    const DetailDiary = () => {
      if (this.state.dataDetaiView === "") return <div></div>;
      let viewSelect = "";
      let doWork = "Tưới nước";
      if (this.state.dataDetaiView.work === "bonphan") {
        doWork = "Bón phân ";
        viewSelect = SelectBonphanBaoTrai(this.state.dataDetaiView);
      }
      if (this.state.dataDetaiView.work === "Baotrai") {
        doWork = "Bao trái";
        viewSelect = SelectBonphanBaoTrai(this.state.dataDetaiView);
      }
      if (this.state.dataDetaiView.work === "phunthuoc") {
        doWork = "Phun thuốc";
        viewSelect = SelectPhunthuoc(this.state.dataDetaiView);
      }
      if (this.state.dataDetaiView.work === "sauhai") {
        doWork = "Sâu hại";
        viewSelect = SelectSauHai(this.state.dataDetaiView);
      }
      return (
        <div
          className="col-12 "
          style={{
            marginBottom: "20px",
            color: "black",
          }}
          //  key={index + 1}
        >
          <div style={{ paddingBottom: "10px" }}>
            <b>{doWork}</b>--{" "}
            {moment(this.state.dataDetaiView.createAt).format(
              "DD/MM/YYYY,h:mm a"
            )}
          </div>
          <div
            className="card"
            style={{
              border: "none",
            }}
          >
            <div
              className="card-body"
              style={
                {
                  // padding: "5px",
                  //color: "#009879",
                }
              }
            >
              <h6 className="card-title">{viewSelect}</h6>
            </div>
          </div>
        </div>
      );
    };

    const Calander = () => {
      const ExampleCustomInput = ({ onClick }) => (
        <i
          className="fa fa-calendar"
          style={{ fontSize: "18px", color: "#009879" }}
          onClick={onClick}
        ></i>
      );
      return (
        <DatePicker
          selected={this.state.dateSelectedMY}
          onChange={(date) => this.HanddleDateSelected(date, "MY")}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          showFullMonthYearPicker
          customInput={<ExampleCustomInput />}
        />
      );
    };
    // thong tin htx
    const popover = (data) => (
      <Popover>
        <Popover.Title as="h3">Thông tin hợp tác xa</Popover.Title>
        <Popover.Content>
          <div className="row">
            <div className="col-12">
              <div className="card-body" style={{ padding: "5px" }}>
                <span style={{ fontSize: "12px", paddingBottom: "5px" }}>
                  Ngày tạo : {" " + moment(data.createAt).format("DD/MM/YYYY")}
                </span>
              </div>
            </div>
            <div className="col-12">
              <div className="card-body" style={{ padding: "5px" }}>
                <span style={{ fontSize: "12px", paddingBottom: "5px" }}>
                  Diện tích :{" " + data.landArea}m²
                </span>
              </div>
            </div>
            <div className="col-12">
              <div className="card-body" style={{ padding: "5px" }}>
                <span style={{ fontSize: "12px", paddingBottom: "5px" }}>
                  Tổng số cây:{" " + data.totalTrees}cây
                </span>
              </div>
            </div>
            <div className="col-12">
              <div className="card-body" style={{ padding: "5px" }}>
                <span style={{ fontSize: "12px", paddingBottom: "5px" }}>
                  Địa chỉ:{" " + data.address}
                </span>
              </div>
            </div>
            <div className="col-12">
              <div className="card-body" style={{ padding: "5px" }}>
                <span style={{ fontSize: "12px", paddingBottom: "5px" }}>
                  Số nông hộ:{" " + data.memberfarmer} nông hộ
                </span>
              </div>
            </div>
          </div>
        </Popover.Content>
      </Popover>
    );
    const dataTechnical = (data) => {
      //console.log();
      console.log(data.email);
      console.log(typeof data);
      return (
        <Popover>
          <Popover.Title as="h3">Thông tin Người đại diện htx</Popover.Title>
          <Popover.Content>
            <div className="row">
              <div className="col-12">
                <div className="card-body" style={{ padding: "5px" }}>
                  <span style={{ fontSize: "12px", paddingBottom: "5px" }}>
                    Ngày tạo :{" "}
                    {" " + moment(data.createAt).format("DD/MM/YYYY")}
                  </span>
                </div>
              </div>
              <div className="col-12">
                <div className="card-body" style={{ padding: "5px" }}>
                  <span style={{ fontSize: "12px", paddingBottom: "5px" }}>
                    Tên :{" " + data.username}
                  </span>
                </div>
              </div>
              <div className="col-12">
                <div className="card-body" style={{ padding: "5px" }}>
                  <span style={{ fontSize: "12px", paddingBottom: "5px" }}>
                    Địa chỉ mail:{" " + data.email}
                  </span>
                </div>
              </div>
              <div className="col-12">
                <div className="card-body" style={{ padding: "5px" }}>
                  <span style={{ fontSize: "12px", paddingBottom: "5px" }}>
                    Số điện thoại:{" " + data.phonenumber}
                  </span>
                </div>
              </div>
            </div>
          </Popover.Content>
        </Popover>
      );
    };
    const databusiness = (data) => (
      <Popover>
        <Popover.Title as="h3">Thoong tin nhà phân phối</Popover.Title>
        <Popover.Content>
          <div className="row">
            {data.map((e) => {
              return (
                <div className="col-12 row">
                  <div
                    className="col-sm-3 card-body"
                    style={{ padding: "5px" }}
                  >
                    <span style={{ fontSize: "12px", paddingBottom: "5px" }}>
                      Tên công ty : {" " + e.nameCompany}
                    </span>
                  </div>
                  <div
                    className="col-sm-3 card-body"
                    style={{ padding: "5px" }}
                  >
                    <span style={{ fontSize: "12px", paddingBottom: "5px" }}>
                      Địa chỉ :{" " + e.address}
                    </span>
                  </div>
                  <div
                    className="col-sm-3 card-body"
                    style={{ padding: "5px" }}
                  >
                    <span style={{ fontSize: "12px", paddingBottom: "5px" }}>
                      Loại xoài:{" " + e.typeOfTree}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Popover.Content>
      </Popover>
    );
    return (
      <main
        className="page landing-page "
        style={{ height: "100%", width: "100%" }}
      >
        <div
          className="block-heading text-center"
          style={{ marginTop: "20px", marginRight: "0px" }}
        >
          <h2 className={styles.tieuDe}>Quản lý hợp tác xã</h2>
        </div>

        <section
          className="clean-block"
          style={{ minHeight: "150vh", paddingTop: "10px" }}
        >
          {this.props.dataCoopera.length === 0 ? (
            <div className="text-center">
              Chưa có thông tin nông dân mời bạn thêm thông tin ở phần quản lý
              nông hộ
            </div>
          ) : (
            <div className="container" style={{ maxWidth: "90%" }}>
              <div className="row">
                <div className="col-sm-3">
                  <div>
                    <div className="container-header">
                      <p
                        className="font-weight-bold"
                        style={{
                          fontSize: "20px",
                          color: "#009879",
                          textAlign: "center",
                        }}
                      >
                        Danh sách Htx
                      </p>
                    </div>
                    <div
                      className="container-body card shadow"
                      style={{
                        borderTop: "2px solid #009879",
                        fontSize: "17px",
                        padding: "30px",
                      }}
                    >
                      <div className="card-text">
                        {this.props.dataCoopera.map((e, index) => {
                          return (
                            <div
                              key={index}
                              style={{
                                cursor: "pointer",
                                color: this.state.id === e._id ? "#009879" : "",
                              }}
                              onClick={(event) =>
                                this.ShowDetailMaps(
                                  e.nameOfCooperative,
                                  e._id,
                                  e,
                                  event
                                )
                              }
                            >
                              <span className="">
                                {index + 1 + ".   " + e.nameOfCooperative}
                              </span>
                              <hr
                                style={{
                                  borderColor:
                                    this.state.id === e._id ? "#009879" : "",
                                }}
                              />
                            </div>
                          );
                        })}
                        {/* <div
                          className="text-left"
                          style={{ cursor: "pointer" }}
                          onClick={this.viewMore}
                        >
                          {this.props.dataCoopera.length >= 5 ? (
                            <i
                              className="fa fa-caret-down"
                              aria-hidden="true"
                            ></i>
                          ) : null}
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-9">
                  <div className="container ">
                    <div
                      className="container-header"
                      style={{
                        fontSize: "20px",
                        borderBottom: "2px solid #009879",
                        paddingBottom: "16px",
                      }}
                    >
                      <span className="m-0 ">
                        <b style={{ color: "#009879" }}>
                          {" "}
                          Mã số thuế {this.state.dataFarmerss.taxCode}
                        </b>
                      </span>
                    </div>
                    <div
                      className="container-body"
                      style={{ minHeight: "450px", paddingTop: "25px" }}
                    >
                      <div>
                        <div className="row" style={{ paddingBottom: "17px" }}>
                          <div className="col-12 col-sm-2 ">
                            <OverlayTrigger
                              trigger="hover"
                              placement="top"
                              overlay={popover(this.state.dataFarmerss)}
                            >
                              <i
                                className="fas fa-calendar-week bg-success"
                                style={{
                                  padding: "10px",
                                  borderRadius: "50%",
                                  marginLeft: "5px",
                                  color: "#fff",
                                  cursor: "pointer",
                                }}
                              ></i>
                            </OverlayTrigger>
                          </div>

                          <div className="col-12 col-sm-2 ">
                            <OverlayTrigger
                              trigger="hover"
                              placement="top"
                              overlay={dataTechnical(this.state.dataTechnical)}
                            >
                              <i
                                className="fas fa-address-card bg-danger"
                                style={{
                                  padding: "10px",
                                  borderRadius: "50%",
                                  marginLeft: "5px",
                                  color: "#fff",
                                  cursor: "pointer",
                                }}
                              ></i>
                            </OverlayTrigger>
                          </div>

                          <div className="col-12 col-sm-2 ">
                            <div
                              // trigger="hover"
                              // placement="top"
                              data-toggle="modal"
                              data-target="#callModalBusiness"
                            >
                              <i
                                className="fa fa-building bg-warning"
                                style={{
                                  padding: "10px",
                                  borderRadius: "50%",
                                  marginLeft: "5px",
                                  color: "#fff",
                                  cursor: "pointer",
                                }}
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="col-12 shadow"
                        id="map"
                        style={{ padding: "5px" }}
                      >
                        <Map
                          center={this.state.position}
                          zoom={15}
                          scrollWheelZoom={true}
                        >
                          <Search
                            // customProvider={this.provider}
                            //   onChange={(info) => {
                            //     console.log("FROM onChange: ", info);
                            //   }}
                            position="topleft"
                            inputPlaceholder="Custom placeholder"
                            // search={this.state.search}
                            showMarker={false}
                            zoom={15}
                            closeResultsOnClick={true}
                            openSearchOnLoad={false}
                            // these searchbounds would limit results to only Turkey.
                            // providerOptions={{
                            //   searchBounds: [
                            //     new LatLng(33.100745405144245, 46.48315429687501),
                            //     new LatLng(44.55916341529184, 24.510498046875)
                            //   ],
                            //   region: "tr"
                            // }}

                            // default provider OpenStreetMap
                            // provider="BingMap"
                            // providerKey="AhkdlcKxeOnNCJ1wRIPmrOXLxtEHDvuWUZhiT4GYfWgfxLthOYXs5lUMqWjQmc27"
                          >
                            {/* {(info) => (
            <Marker position={info?.latLng}>{this.customPopup(info)}</Marker>
          )} */}
                          </Search>

                          {/* {this.state.dataPolysons !== null ? (
                            <FeatureGroup>
                              <EditControl
                                position="topright"
                                onCreated={createPosition}
                                onDeleted={deletePosition}
                                draw={{
                                  polyline: false,
                                  circle: false,
                                  circlemarker: false,
                                  marker: false,
                                  //polygon: false,
                                  rectangle: false,
                                  // edit: {
                                  //   //featureGroup: new L.FeatureGroup(), //REQUIRED!!
                                  //   remove: true,
                                  // },
                                }}
                              />
                            </FeatureGroup>
                          ) : null} */}
                          <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          {this.props.resArray.length === 0
                            ? null
                            : this.props.resArray.map((e, index) => {
                                let dataPoly = e.dataPolyson.map((ele) => {
                                  let LatLng = ele.LatLng.map((es) => {
                                    return [es.lat, es.lng];
                                  });
                                  return [LatLng];
                                  // console.log(LatLng);
                                });
                                // L.addLayer(dataPoly);
                                return (
                                  <Polygon
                                    pathOptions={{ color: "purple" }}
                                    positions={dataPoly}
                                    key={index}
                                  >
                                    <Tooltip sticky>{e.farmOwner}</Tooltip>
                                  </Polygon>
                                );
                              })}
                        </Map>
                      </div>

                      {/* setting show bieu do */}
                      <div
                        className="col-12 "
                        style={{
                          width: "100%",
                          padding: "0px",
                          paddingTop: "10px",
                        }}
                      >
                        <div
                          className="container-header"
                          style={{
                            fontSize: "20px",
                            borderBottom: "2px solid #009879",
                            paddingBottom: "16px",
                            width: "100%",
                          }}
                        >
                          <div className="row">
                            <div
                              className="col-4"
                              //  style={{ fontSize: "18px", padding: "5px" }}
                            >
                              {" "}
                              <Select
                                placeholder="xem biểu đồ"
                                options={options}
                                onChange={this.handleChange}
                                //selectedValue={{ label: "", value: "" }}
                                defaultValue={this.state.DefaultBieudo}
                              />
                            </div>
                            <div
                              className="col-8"
                              style={{
                                display: this.state.displayShowMap,
                              }}
                            >
                              {/* <button
                          style={{
                            float: "right",
                            fontSize: "10px",
                            display: this.props.isCheckMap ? "none" : "block",
                          }}
                          className="btn btn-outline-success  btn-sm"
                          type="button"
                          // onClick={this.completeTheTransaction}
                          data-toggle="modal"
                          data-target="#callModal"
                        //  onClick={this.resetValue}
                        >
                          Thai đổi thông tin
                        </button> */}
                              <div
                                style={{
                                  float: "right",
                                  // marginTop: "-5px",
                                  width: "260px",
                                  height: "30px",
                                  // display: this.props.isCheckMap
                                  //   ? "block"
                                  //   : "none",
                                }}
                                // className="btn btn-outline-primary  btn-sm"
                              >
                                <Select
                                  options={optionMatDo}
                                  placeholder="Quan sát mật độ cây"
                                  height="30px"
                                  onChange={this.handleChangeMatDo}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="container-body"
                          style={{
                            display: this.state.displayShowMap,
                            paddingTop: "20px",
                          }}
                        >
                          {this.props.resArray.map((e) => {
                            if (this.state.selectIdFarmer === e._id) {
                              return (
                                <div>
                                  <div
                                    className="row"
                                    style={{ paddingBottom: "17px" }}
                                  >
                                    <div className="col-12 col-sm-6 col-lg-4">
                                      <div className="card bg-light shadow bg-white rounded">
                                        <div className="card-body">
                                          <h4
                                            className="card-title"
                                            style={{ display: "inline-block" }}
                                          >
                                            Ngày tạo
                                          </h4>
                                          <FontAwesomeIcon
                                            className="fa-2x"
                                            icon={faTable}
                                            style={{
                                              display: "inline-block",
                                              float: "right",
                                            }}
                                          />
                                          <h6>
                                            {moment(e.createAt).format(
                                              "DD/MM/YYYY"
                                            )}
                                          </h6>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-12 col-sm-6 col-lg-4">
                                      <div className="card bg-primary text-white shadow rounded">
                                        <div className="card-body">
                                          <h4
                                            className="card-title"
                                            style={{ display: "inline-block" }}
                                          >
                                            Diện tích đất
                                          </h4>
                                          <FontAwesomeIcon
                                            className="fa-2x"
                                            icon={faSolarPanel}
                                            style={{
                                              display: "inline-block",
                                              float: "right",
                                            }}
                                          />
                                          <h6>{e.landArea}m²</h6>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-12 col-sm-6 col-lg-4">
                                      <div className="card bg-success shadow rounded">
                                        <div className="card-body">
                                          <h4
                                            className="card-title"
                                            style={{ display: "inline-block" }}
                                          >
                                            Tổng số cây
                                          </h4>
                                          <FontAwesomeIcon
                                            className="fa-2x"
                                            icon={faTree}
                                            style={{
                                              display: "inline-block",
                                              float: "right",
                                            }}
                                          />
                                          <h6>{e.totalTrees} cây</h6>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          })}

                          {this.state.changeFarmerMap
                            ? this.props.resBatchArray.map((e, i) => {
                                let result = e.stumps.map((ele, index) => {
                                  return (
                                    <div
                                      key={index + 1}
                                      className="col-sm-2 justify-content-center"
                                    >
                                      <div>
                                        <ReactApexChart
                                          options={optionss(
                                            ele.numberStumps,
                                            e._id,
                                            ele.row
                                          )}
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
                                        Lô {e.numberbatch} - Số cây{" "}
                                        {e.totalTree}
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
                                          // height={250}
                                          // width={200}
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
                                        Lô {e.numberbatch} - số cây{" "}
                                        {e.totalTree}
                                      </h2>
                                    </div>
                                    {result}
                                  </div>
                                );
                              })}

                          {/* <div style={{ display: this.props.isCheckMap ? "none" : "block" }}>
              <button
                style={{ float: "right", fontSize: "10px" }}
                className="btn btn-outline-success  btn-sm"
                type="button"
                onClick={this.ConfrommMap}
              >
                Xác nhận thông tin
              </button>
            </div> */}
                        </div>
                      </div>
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
                    // aria-labelledby="exampleModalCenterTitle"
                    //  aria-hidden="true"
                  >
                    <div
                      className="diary modal-dialog"
                      role="document"
                      // style={{ maxWidth: `1000px !important` }}
                    >
                      <div
                        className="modal-content"
                        style={{ borderRadius: "30px" }}
                      >
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
                        <div
                          className="modal-body"
                          style={{ paddingLeft: "50px" }}
                        >
                          <div className="dropdown row">
                            <div className="col-12 row showDiarydate">
                              <div className="col-sm-4">
                                <Calander />{" "}
                              </div>
                              <div className="col-sm-8">
                                <div className="col">
                                  <h1>Thông tin chi tiết</h1>
                                </div>
                              </div>
                            </div>

                            <div className="col-12 text-center">
                              <b>
                                {" "}
                                {moment(this.state.dateSelectedMY).format(
                                  "MM/YYYY"
                                )}
                              </b>
                            </div>
                            <div
                              className=" col-12 row"
                              style={{ paddingBottom: "17px" }}
                            >
                              {MenuDiary}
                              <div className="col-12 ">
                                <hr style={{ border: "1px solid #009879" }} />
                              </div>
                              {this.state.ShowDateDiaryMode
                                ? ShowDiaryMY
                                : null}
                            </div>
                            <div
                              className=" col-12 row"
                              style={{
                                paddingBottom: "17px",
                              }}
                            >
                              <DetailDiary />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* show business */}
                  <div
                    className="modal fade"
                    id="callModalBusiness"
                    // tabindex="-1"
                    // role="dialog"
                    // aria-labelledby="exampleModalLabel"
                    // aria-hidden="true"
                  >
                    <div className="modal-dialog modal-lg" role="document">
                      <div
                        className="modal-content"
                        style={{ borderRadius: "30px" }}
                      >
                        <div
                          className="modal-header"
                          style={{
                            backgroundColor: "#009879",
                            borderRadius: "30px 30px 0px 0px",
                          }}
                        >
                          <h5
                            className="modal-title"
                            id="exampleModalLabel"
                            style={{ color: "#fff" }}
                          >
                            Thông tin nhà phân phối
                          </h5>
                          {/* <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  ref={(button) => (this.buttonElement = button)}
                >
                  <span aria-hidden="true">&times;</span>
                </button> */}
                        </div>
                        <div className="modal-body row">
                          {this.state.databusiness.map((e, index) => {
                            return (
                              <div
                                className="col-12 col-sm-6 col-lg-4"
                                key={index}
                              >
                                <div className="card bg-light shadow bg-white rounded">
                                  <div className="col-12">
                                    <div
                                      className="card-body"
                                      style={{ padding: "5px" }}
                                    >
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          paddingBottom: "5px",
                                        }}
                                      >
                                        Tên công ty: {" " + e.nameCompany}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-12">
                                    <div
                                      className="card-body"
                                      style={{ padding: "5px" }}
                                    >
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          paddingBottom: "5px",
                                        }}
                                      >
                                        Địa chỉ: {" " + e.address}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-12">
                                    <div
                                      className="card-body"
                                      style={{ padding: "5px" }}
                                    >
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          paddingBottom: "5px",
                                        }}
                                      >
                                        Loại xoài tiêu thụ: {" " + e.typeOfTree}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
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
    dataDiaryOfBatch: state.diaryReducer.dataDiaryOfBatch,
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
