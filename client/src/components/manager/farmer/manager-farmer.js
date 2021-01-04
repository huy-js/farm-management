import React, { Component } from "react";
import CreateFarmer from "./create-farmer";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux";
//import BusinessCooperation from "../cooperative/business_cooperation";
import * as actions from "../../../trainRedux/action/user/actionManagement";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
// update
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import styles from "./manager-farmer.module.css";
import { checkValidity } from "../../helpers/validation/checkValidation";
import "../../helpers/table2.css";
import moment from "moment";

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

// // initialize map
// var map = L.map("map").setView([10.04904, 105.785103], 12);
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
          required: true,
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
          // minLength: 4,
          isNumeric: true,
        },
        valid: false,
        touched: false,
      },
      // totalNumberQR: {
      //   elementType: "input",
      //   elementConfig: {
      //     type: "text",
      //     placeholder: "Số QR",
      //   },
      //   value: "",
      //   validation: {
      //     required: true,
      //     //minLength: 2,
      //   },
      //   valid: false,
      //   touched: false,
      // },
    },
    error: "thong tin khong hop le",
    result: true,
    dataFarmer: "",
    display: "none",
    dataFarmerUpdate: "",
    deleteFarmer: null,
    position: [10.04904, 105.785103],
    dataPolysons: null,
    arraydataPolyson: [], //data moi
    dataAtPolysona: null, // lay data tu db show ra
    dataPolygonDelete: [], // sau khi soa 1 poly tu database
    DeleteDone: false,
  };
  // customPopup() {
  //   return (
  //     <Popup>
  //       <div>
  //         <p>I am a custom popUp</p>
  //         <p>
  //           latitude and longitude from search component:{" "}
  //           {SearchInfo.latLng.toString().replace(",", " , ")}
  //         </p>
  //         <p>Info from search component: {SearchInfo.info}</p>
  //         <p>
  //           {SearchInfo.raw &&
  //             SearchInfo.raw.place_id &&
  //             JSON.stringify(SearchInfo.raw.place_id)}
  //         </p>
  //       </div>
  //     </Popup>
  //   );
  // }

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
      // totalNumberQR: parseInt(this.state.controls.totalNumberQR.value),
      idUser: this.props.currentUser._id,
      idFarmer: this.state.dataFarmerUpdate,
    };
    console.log(dataFamer);
    let checkVali = [
      this.state.controls.farmOwner.valid,
      this.state.controls.address.valid,
      this.state.controls.landArea.valid,
      this.state.controls.typeOfTree.valid,
      // this.state.controls.totalTrees.valid,
    ];
    console.log(checkVali);
    let result = this.props.userUpdateDataFarmer(dataFamer, checkVali);

    this.setState({
      result: result,
    });
    if (result) {
      this.buttonElement.click();
    }
  };
  blockFarmer = (event) => {
    //event.preventDefault();
    //console.log("block");
    //console.log(this.state.dataFarmerUpdate);
    let data = {
      idUser: this.props.currentUser._id,
      idFarmer: this.state.dataFarmerUpdate,
    };
    this.buttonElement.click();
    if (window.confirm("Xác nhận thay đổi ?")) {
      this.props.deleteFarmerFetch(data);
    }
  };

  getDataTableupdate = (event, idTable) => {
    event.preventDefault();
    // onClick: (e, row, rowIndex) => {
    // console.log(e);
    console.log("table update");
    console.log(idTable);
    let array = this.props.resArray.filter((ele) => {
      if (ele._id === idTable) {
        return ele;
      }
    });
    let data = array[0];
    console.log(data);
    this.setState({
      deleteFarmer: data.deletedAt,
      dataFarmerUpdate: idTable,
      controls: {
        farmOwner: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Tên nông hộ",
          },
          value: data.farmOwner,
          validation: {
            required: true,
            isCharacter: true,
          },
          valid: true,
          touched: false,
        },
        address: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Nhập địa chỉ",
          },
          value: data.address,
          validation: {
            required: true,
            isCharacter: true,
          },
          valid: true,
          touched: false,
        },
        typeOfTree: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Nhập giống cây",
          },
          value: data.typeOfTree,
          validation: {
            required: true,
            minLength: 4,
          },
          valid: true,
          touched: false,
        },
        landArea: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Diện tích",
          },
          value: data.landArea,
          validation: {
            required: true,
            minLength: 4,
            isNumeric: true,
          },
          valid: true,
          touched: false,
        },
      },
    });
    // },
  };
  ShowPositionMap = (event) => {
    event.preventDefault();
    this.setState({
      position: [10.04904, 105.785103],
    });
  };
  getIdupdateMarker = (event, data) => {
    event.preventDefault();
    console.log(data._id);
    let dataAtPolysona = "";
    this.props.resArray.map((e) => {
      if (data._id === e._id) {
        let dataPoly = e.dataPolyson.map((ele) => {
          let LatLng = ele.LatLng.map((es) => {
            return [es.lat, es.lng];
          });
          // return [LatLng];
          return {
            idpoly: ele.idpoly,
            LatLng: [LatLng],
          };
        });
        dataAtPolysona = dataPoly;
      }
    });
    // console.log(dataAtPolysona);
    let getdata = {
      id: data._id,
      username: data.farmOwner,
      address: data.address,
    };
    this.setState({
      dataPolysons: getdata,
      dataAtPolysona: dataAtPolysona,
    });
  };
  // up date polyson
  updatePolyson = (data) => {
    //console.log(data);
    this.setState((prevState) => ({
      arraydataPolyson: [...prevState.arraydataPolyson, data],
    }));
  };
  deletePolyson = (data) => {
    console.log(data);
    let newArray = this.state.arraydataPolyson.filter((e) => {
      if (e.idpoly !== data.idpoly) {
        return e;
      }
    });
    this.setState({
      arraydataPolyson: newArray,
    });
  };
  sendDataPolyson = (event) => {
    event.preventDefault();
    console.log(this.state.arraydataPolyson);
    let dataPolygonDb = null;
    if (this.state.arraydataPolyson.length === 0 && !this.state.DeleteDone) {
      return alert("bạn chưa có thao tác mới");
    }
    if (!this.state.DeleteDone) {
      this.props.resArray.forEach((e) => {
        if (this.state.dataPolysons.id === e._id) {
          dataPolygonDb = e.dataPolyson;
        }
      });
    } else {
      dataPolygonDb = this.state.dataPolygonDelete;
    }
    return this.props.updatePolysonFetch(
      this.state.arraydataPolyson,
      this.state.dataPolysons.id,
      this.props.currentUser._id,
      dataPolygonDb
    );
  };
  // catchPolygon = (e, id) => {
  //   console.log(id);
  //   // let marker = e.target;
  //   // console.log(marker.options.data); // logs position.
  // };
  DeletePolygon = (e, id) => {
    console.log(id);
    let dataPolygonDb = null;
    this.props.resArray.forEach((e) => {
      if (this.state.dataPolysons.id === e._id) {
        dataPolygonDb = e.dataPolyson;
      }
    });
    let dataDone = dataPolygonDb.filter((ele) => {
      if (ele.idpoly !== id) {
        return ele;
      }
    });
    console.log(dataDone);
    this.setState({
      dataPolygonDelete: dataDone,
      DeleteDone: true,
    });
  };
  render() {
    const styleHeader = {
      backgroundColor: "#009879",
      color: "#fff",
      textAlign: "center",
      border: "none",
    };
    const styleRow = {
      textAlign: "center",
      border: "none",
    };

    const columns = [
      {
        dataField: "stt",
        text: "Stt",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "updateAt",
        text: "Ngày tạo",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "farmOwner",
        text: "Tên nông hộ",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "typeOfTree",
        text: "Loại Xoài",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "address",
        text: "Địa chỉ cư phú",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "landArea",
        text: "Diện tích đất trồng",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "totalTrees",
        text: "Tổng cây trồng",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "polygonScreen",
        text: "Vẽ ô đất",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "updateFarmer",
        text: "Cập nhật thông tin",
        headerStyle: styleHeader,
        style: styleRow,
      },
    ];
    const products = [];

    this.props.resArray.map(async (element, index) => {
      // let dates = (string) => {
      //   var options = { year: "numeric", month: "long", day: "numeric" };
      //   return new Date(string).toLocaleDateString([], options);
      // };

      let arr = {
        stt: index + 1,
        updateAt: moment(element.updateAt).format("DD/MM/YYYY"),
        farmOwner: element.farmOwner,
        typeOfTree: element.typeOfTree,
        address: element.address,
        landArea: element.landArea,
        totalTrees: element.totalTrees,
        polygonScreen: (
          <i
            className="fa fa-map-marker"
            style={{ color: "#009879" }}
            onClick={(event) => this.getIdupdateMarker(event, element)}
          ></i>
        ),
        updateFarmer: (
          <i
            style={{ color: "#009879" }}
            data-toggle="modal"
            data-target="#showModalUpdate"
            className="fa fa-wrench suaNongdan"
            onClick={(event) => this.getDataTableupdate(event, element._id)}
          ></i>
        ),
      };
      return products.push(arr);
    });

    // let listFarmer = this.props.resArray.map((element, index) => (
    //   <tr
    //     key={index + 1}
    //     onClick={this.ShowPositionMap}
    //     className="text-center"
    //   >
    //     <td>{index + 1}</td>
    //     <td>{moment(element.updateAt).format("DD/MM/YYYY")}</td>
    //     <td>{element.farmOwner}</td>
    //     <td>{element.typeOfTree}</td>
    //     <td>{element.address}</td>
    //     <td>{element.landArea}</td>
    //     <td>{element.totalTrees}</td>
    //     <td onClick={(event) => this.getIdupdateMarker(event, element)}>
    //       <i
    //         className="fa fa-map-marker"
    //         style={{ color: "#009879" }}
    //         // data-toggle="modal"
    //         // data-target="#updatePolysonModel"
    //       ></i>
    //     </td>
    //     <td onClick={(event) => this.getDataTableupdate(event, element._id)}>
    //       <i
    //         style={{ color: "#009879" }}
    //         data-toggle="modal"
    //         data-target="#showModalUpdate"
    //         className="fa fa-wrench suaNongdan"
    //       ></i>
    //     </td>
    //   </tr>
    // ));
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
    // const position = [51.505, -0.09];
    const createPosition = (e) => {
      console.log(e);
      let dataPolyson = {
        LatLng: e.layer._latlngs,
        idpoly: e.layer._leaflet_id,
      };
      return this.updatePolyson(dataPolyson);
    };
    const deletePosition = (e) => {
      console.log(e);
      let number = Object.keys(e.layers._layers);
      // console.log(Object.keys(e.layers._layers));
      let delePolyson = {
        idpoly: parseInt(number[0]),
      };
      return this.deletePolyson(delePolyson);
    };
    return (
      <div>
        <main
          className="page contact-us-page"
          style={{
            minHeight: "100vh",
            paddingTop: "0px",
            //backgroundImage: `url("assets/img/image0.jpg")`,
            // opacity: 0.6,
            zIndex: -1,
          }}
        >
          <section
            className="clean-block clean-form "
            style={{ paddingTop: "0px" }}
          >
            <div className="container" style={{ minWidth: "90%" }}>
              <div
                className="block-heading text-center col-12 row"
                style={{
                  marginBottom: "-15px",
                  // marginRight: "0px",
                  // paddingTop: "10px",
                  width: "100%",
                  //  paddingBottom: "-35px",
                }}
              >
                <div className="col-sm-4">
                  <button
                    className="btn btn-outline-success  btn-sm"
                    type="button"
                    style={{
                      float: "left",
                      fontSize: "13px",
                      marginTop: "5px",
                      display:
                        this.props.resArray.length === 0 ? "none" : "block",
                    }}
                    onClick={(e) => {
                      const data = new Date().getTime();
                      exportToCSV(this.props.dataPWFarmer, `Password-${data}`);
                    }}
                  >
                    Xuất file danh sách mật khẩu nông hộ
                  </button>
                </div>
                <div className="col-sm-4">
                  <h2
                    className={styles.tieuDe}
                    style={{ float: "none", textAlign: "center" }}
                  >
                    Danh sách nông hộ{" "}
                  </h2>
                </div>
                <div className="col-sm-4">
                  <i
                    className="fa fa-plus-circle btn-outline-secondary btn-sm"
                    style={{
                      fontSize: "25px",
                      float: "right",
                      //padding: "10px",
                      borderRadius: "50px",
                      cursor: "pointer",
                    }}
                    data-toggle="modal"
                    data-target="#showModalCreate"
                  ></i>
                </div>
              </div>
              <div className="container-body ">
                {this.props.resArray.length === 0 ? (
                  <div className="text-center">
                    Hiện tại chưa có thông tin mời bạn nhập thêm thông tin
                  </div>
                ) : (
                  <div className="tableis" style={{ padding: "15px" }}>
                    <BootstrapTable
                      keyField="stt"
                      data={products}
                      columns={columns}
                      // loading={this.state.loading}
                      pagination={paginationFactory({
                        sizePerPage: 2,
                        hideSizePerPage: true,
                        hidePageListOnlyOnePage: true,
                      })}
                      striped
                      hover
                      condensed
                      //  /   shadow
                    />
                    {/* <table className={styles.content_table}>
                      <thead>
                        <tr className="text-center">
                          <th>STT</th>
                          <th>Ngày tạo</th>
                          <th>Tên nông hộ</th>
                          <th>Giống cây</th>
                          <th>Địa chỉ</th>
                          <th>Diện tích(m²)</th>
                          <th>Số cây</th>
                          <th>Vẽ vườn</th>
                          <th>Sửa đổi</th>
                        </tr>
                      </thead>
                      <tbody>{listFarmer}</tbody>
                    </table> */}
                  </div>
                )}
              </div>
              <div
                className="col-6 row"
                style={{
                  height: "50px",
                  paddingBottom: "5px",
                  marginTop: "-70px",
                }}
              >
                <div
                  className="col-12"
                  style={{
                    display:
                      this.state.dataPolysons !== null ? "block" : "none",
                    // paddingBottom: "20px",
                  }}
                >
                  {this.state.dataPolysons !== null ? (
                    <div className="col-12 row">
                      <div className="btn btn-outline-success  btn-sm ">
                        <i
                          className="fa fa-times"
                          style={{ padding: "5px", margin: "0px auto" }}
                          onClick={() => {
                            this.setState({
                              dataPolysons: null,
                              arraydataPolyson: [],
                            });
                          }}
                        ></i>
                      </div>
                      <div className=" txt-outline-success  btn-sm ">
                        {"Nông hộ " + this.state.dataPolysons.username + ", "}
                        {this.state.dataPolysons.address}
                      </div>
                      <div
                        className="btn btn-outline-success  btn-sm "
                        onClick={this.sendDataPolyson}
                        style={{ float: "right" }}
                      >
                        hoàn tắc vẽ
                      </div>
                    </div>
                  ) : null}
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

                  {this.state.dataPolysons !== null ? (
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
                  ) : null}
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {this.state.dataPolysons === null
                    ? this.props.resArray.map((e, index) => {
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
                      })
                    : this.state.dataAtPolysona.map((e, index) => {
                        return (
                          <Polygon
                            pathOptions={{ color: "purple" }}
                            positions={e.LatLng}
                            key={index}
                            // data={e.dataPolyson}
                            //  key={e._id}
                            onClick={(event) => {
                              this.setState({ DeleteDone: false });
                            }}
                          >
                            {/* <Tooltip sticky>aaaaa</Tooltip> */}
                            {this.state.DeleteDone ? null : (
                              <Popup>
                                <div>
                                  <button
                                    // onClick={(e) => this.DeletePolygon(e)}
                                    onClick={(event) =>
                                      this.DeletePolygon(event, e.idpoly)
                                    }
                                  >
                                    Xóa
                                  </button>
                                </div>
                              </Popup>
                            )}
                          </Polygon>
                        );
                        // }
                      })}
                </Map>
              </div>
            </div>
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
            <div className="modal-content" style={{ borderRadius: "30px" }}>
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
                  Cập nhật nông hộ
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  ref={(button) => (this.buttonElement = button)}
                  style={{ display: "none" }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <button
                  className="btn"
                  type="button"
                  style={{
                    float: "left",
                    fontSize: "11px",
                    marginTop: "5px",
                  }}
                  onClick={(e) => {
                    this.blockFarmer(e);
                  }}
                >
                  {this.state.deleteFarmer ? " Mở khóa" : "Khóa lại"}
                </button>
              </div>
              <div className="modal-body" onMouseOver={this.showTotalTrees}>
                {/* {authRedirect} */}
                {errorMessage}
                <form onSubmit={this.handleSubmit}>
                  {form}
                  <div style={{ textAlign: "center" }}>
                    <Button btnType="Success">Cập nhật</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* update polyson */}
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
  userUpdateDataFarmer: (data, checkvail) =>
    dispatch(actions.userUpdateDataFarmer(data, checkvail)),
  deleteFarmerFetch: (data) => dispatch(actions.deleteFarmerFetch(data)),
  updatePolysonFetch: (dataUpdate, idfarmer, iduser, PolyArray) =>
    dispatch(
      actions.updatePolysonFetch(dataUpdate, idfarmer, iduser, PolyArray)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerFarmer);
