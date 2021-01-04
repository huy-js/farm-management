import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../../../trainRedux/action/user/actionManagement";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Company from "./create-Company";
import moment from "moment";
// update

import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import { checkValidity } from "../../helpers/validation/checkValidation";
import styles from "./manager-coopera.module.css";
import "../../helpers/table2.css";
// osp map
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

class BusinessCooperation extends Component {
  state = {
    display: "none",
    position: [10.04904, 105.785103],
    dataPolysons: null,
    arraydataPolyson: [], //data moi
    dataAtPolysona: null, // lay data tu db show ra
    dataPolygonDelete: [], // sau khi soa 1 poly tu database
    DeleteDone: false,
    markerArrayAll: [],
    // cap nhat thong tin
    controls: {
      nameCompany: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Nhập tên nhà phân phối",
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
          isCharacter: true,
        },
        valid: false,
        touched: false,
      },
    },
    dataFarmerUpdate: "",
    deleteFarmer: null,
  };
  componentDidMount = async () => {
    await this.props.showBusiness(this.props.currentUser._id);
    let markerArrayAll = [];
    this.props.dataCompany.forEach((e) => {
      e.marker.map((ele) => {
        markerArrayAll.push(ele);
      });
      // console.log(e);
      // if (e.marker !== undefined) {
      //   markerArrayAll.push(e.marker);
      // }
    });
    console.log(markerArrayAll);
    this.setState({
      markerArrayAll: markerArrayAll,
    });
  };

  deleteBusiness = async (iduser, dataBusi, event) => {
    event.preventDefault();
    // console.log(id);
    let data = {
      iduser: iduser,
      id: dataBusi._id,
      exchange: dataBusi.exchange,
    };
    if (window.confirm("Xác nhận đổi thông tin")) {
      await this.props.deleteBusinessUserFetch(data);
    }
  };
  getIdupdateMarker = (event, data) => {
    event.preventDefault();
    console.log(data);
    let dataAtPolysona = "";
    this.props.dataCompany.map((e) => {
      if (data._id === e._id) {
        dataAtPolysona = e.marker;
      }
    });
    //console.log(dataAtPolysona);
    let getdata = {
      id: data._id,
      company: data.nameCompany,
      address: data.address,
    };
    this.setState({
      dataPolysons: getdata,
      dataAtPolysona: dataAtPolysona,
      position:
        dataAtPolysona.length !== 0
          ? [dataAtPolysona[0].lat, dataAtPolysona[0].lng]
          : [10.04904, 105.785103],
    });
  };
  // up date marker
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
      this.props.dataCompany.forEach((e) => {
        if (this.state.dataPolysons.id === e._id) {
          dataPolygonDb = e.marker;
        }
      });
    } else {
      dataPolygonDb = this.state.dataPolygonDelete;
    }
    // let dataPolygonDb = this.state.dataAtPolysona;
    return this.props.updateMarkerFetch(
      this.state.arraydataPolyson,
      this.state.dataPolysons.id,
      this.props.currentUser._id,
      dataPolygonDb
    );
  };
  DeletePolygon = (e, id) => {
    console.log(id);
    let dataPolygonDb = null;
    this.props.dataCompany.forEach((e) => {
      if (this.state.dataPolysons.id === e._id) {
        dataPolygonDb = e.marker;
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
  // cap nhat thong tin
  getDataTableupdate = (event, idTable) => {
    event.preventDefault();
    // onClick: (e, row, rowIndex) => {
    // console.log(e);
    console.log("table update");
    console.log(idTable);
    let array = this.props.dataCompany.filter((ele) => {
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
        nameCompany: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Nhập tên nhà phân phối",
          },
          value: data.nameCompany,
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
            isCharacter: true,
          },
          valid: true,
          touched: false,
        },
      },
    });
    // },
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
      nameCompany: this.state.controls.nameCompany.value,
      address: this.state.controls.address.value,
      //landArea: parseInt(this.state.controls.landArea.value),
      typeOfTree: this.state.controls.typeOfTree.value,
      idUser: this.props.currentUser._id,
      idBusiness: this.state.dataFarmerUpdate,
    };
    console.log(dataFamer);
    let checkVali = [
      this.state.controls.nameCompany.valid,
      this.state.controls.address.valid,
      // this.state.controls.landArea.valid,
      this.state.controls.typeOfTree.valid,
      // this.state.controls.totalTrees.valid,
    ];
    console.log(checkVali);
    let result = this.props.userUpdateDataBusiness(dataFamer, checkVali);

    this.setState({
      result: result,
    });
    if (result) {
      this.buttonElement.click();
    }
  };
  // blockFarmer = (event) => {
  //   //event.preventDefault();
  //   //console.log("block");
  //   //console.log(this.state.dataFarmerUpdate);
  //   let data = {
  //     idUser: this.props.currentUser._id,
  //     idFarmer: this.state.dataFarmerUpdate,
  //   };
  //   this.buttonElement.click();
  //   if (window.confirm("Xác nhận thay đổi ?")) {
  //     this.props.deleteFarmerFetch(data);
  //   }
  // };
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
      //width: "200px",
    };
    const columns = [
      {
        dataField: "stt",
        text: "Stt",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "createAt",
        text: "Ngày tạo",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "nameCompany",
        text: "Tên Công ty",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "typeOfTree",
        text: "Giống Cây Phân Phối",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "address",
        text: "Địa chỉ",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "marker",
        text: "Địa điểm kinh doanh",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "updateData",
        text: "Cập nhật thông tin",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "updateDele",
        text: "Trạng thái giao dịch",
        headerStyle: styleHeader,
        style: styleRow,
      },
    ];
    const products = [];

    this.props.dataCompany.map(async (element, index) => {
      // let dates = (string) => {
      //   var options = { year: "numeric", month: "long", day: "numeric" };
      //   return new Date(string).toLocaleDateString([], options);
      // };

      let arr = {
        stt: index + 1,
        //createAt: dates(element.createAt),
        createAt: moment(element.updateAt).format("DD/MM/YYYY"),
        nameCompany: element.nameCompany,
        typeOfTree: element.typeOfTree,
        address: element.address,
        marker: (
          <i
            className="fa fa-map-marker"
            style={{ color: "#009879" }}
            onClick={(event) => this.getIdupdateMarker(event, element)}
          ></i>
        ),
        updateData: (
          <i
            style={{ color: "#009879" }}
            data-toggle="modal"
            data-target="#showModalUpdate"
            className="fa fa-wrench suaNongdan"
            onClick={(event) => this.getDataTableupdate(event, element._id)}
          ></i>
        ),
        updateDele: element.exchange ? (
          <i
            className="fa fa-link btn-outline-success"
            style={{ borderRadius: "100%" }}
            onClick={(e) =>
              this.deleteBusiness(this.props.currentUser._id, element, e)
            }
          ></i>
        ) : (
          <i
            // key={element.id}
            className="fa fa-ban  btn-outline-danger"
            style={{ borderRadius: "100%" }}
            onClick={(e) =>
              this.deleteBusiness(this.props.currentUser._id, element, e)
            }
          ></i>
        ),
      };
      return products.push(arr);
    });

    // let dataBusiness = this.props.dataCompany.map((element, index) => (
    //   <tr key={index + 1}>
    //     <td>{index + 1}</td>
    //     <td>{moment(element.updateAt).format("DD/MM/YYYY")}</td>
    //     <td>{element.nameCompany}</td>
    //     <td>{element.typeOfTree}</td>
    //     <td>{element.address}</td>
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
    //     <td
    //       onClick={(e) =>
    //         this.deleteBusiness(this.props.currentUser._id, element, e)
    //       }
    //     >
    //       {element.exchange ? (
    //         <i
    //           class="fa fa-link btn-outline-success"
    //           style={{ borderRadius: "100%" }}
    //         ></i>
    //       ) : (
    //         <i
    //           // key={element.id}
    //           className="fa fa-ban  btn-outline-danger"
    //           style={{ borderRadius: "100%" }}
    //         ></i>
    //       )}
    //     </td>
    //   </tr>
    // ));
    // setting osp
    const createPosition = (e) => {
      console.log(e.layer._latlng);
      let dataPolyson = {
        LatLng: e.layer._latlng,
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
      <main
        className="page contact-us-page"
        style={{ minHeight: "100vh", paddingTop: "0px" }}
      >
        <section className="clean-block ">
          <div className="container" style={{ minWidth: "80%" }}>
            <div className="block-heading">
              <i
                className="fa fa-plus-circle btn-outline-secondary btn-sm"
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
              <h2 className={styles.tieuDe}>Thông tin nhà phân phối</h2>
            </div>
            <div className="container-body">
              {this.props.dataCompany.length === 0 ? (
                <div className="text-center">
                  {" "}
                  hien tai chua co thong tin moi ban them thong tin
                </div>
              ) : (
                <div className="tableis" style={{ minWidth: "100%" }}>
                  <BootstrapTable
                    keyField="stt"
                    data={products}
                    columns={columns}
                    // loading={this.state.loading}
                    pagination={paginationFactory({
                      sizePerPage: 5,
                      hideSizePerPage: true,
                      // hidePageListOnlyOnePage: true
                    })}
                    striped
                    hover
                    condensed
                    shadow
                  />
                </div>
                // <table
                //   className={styles.content_table}
                //   style={{ textAlign: "center" }}
                // >
                //   <thead>
                //     <tr style={{ textAlign: "center" }}>
                //       <th>STT</th>
                //       <th>Ngày tạo</th>
                //       <th>Tên Công ty</th>
                //       <th>Giống cây</th>
                //       <th>Địa chỉ</th>
                //       <th>Địa điểm kinh doanh</th>
                //       <th>Cập nhật thông tin</th>
                //       <th>Trạng thái giao dịch</th>
                //     </tr>
                //   </thead>
                //   <tbody>{dataBusiness}</tbody>
                // </table>
              )}
              <div
                className="col-6 row"
                style={{
                  height: "50px",
                  paddingBottom: "5px",
                  marginTop: "-50px",
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
                        {"Doanh nghiệp " +
                          this.state.dataPolysons.company +
                          ", "}
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
                    position="topleft"
                    inputPlaceholder="Custom placeholder"
                    // search={this.state.search}
                    showMarker={false}
                    zoom={17}
                    closeResultsOnClick={true}
                    openSearchOnLoad={false}
                  ></Search>

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
                          // marker: false,
                          polygon: false,
                          rectangle: false,
                        }}
                      />
                    </FeatureGroup>
                  ) : null}
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {this.state.dataPolysons === null
                    ? this.state.markerArrayAll.map((e, index) => {
                        return (
                          <Marker position={[e.lat, e.lng]} key={index}>
                            {/* <Popup>Popup for Marker</Popup> */}
                            {/* <Tooltip>{e.nameCompany}</Tooltip> */}
                          </Marker>
                        );
                      })
                    : this.state.dataAtPolysona.map((e, index) => {
                        return (
                          <Marker
                            position={[e.lat, e.lng]}
                            key={index}
                            onClick={(event) => {
                              this.setState({ DeleteDone: false });
                            }}
                          >
                            {this.state.DeleteDone ? null : (
                              <Popup>
                                <div>
                                  <button
                                    onClick={(event) =>
                                      this.DeletePolygon(event, e.idpoly)
                                    }
                                  >
                                    Xóa
                                  </button>
                                </div>
                              </Popup>
                            )}
                            {/* <Tooltip>{e.nameCompany}</Tooltip> */}
                          </Marker>
                        );
                      })}
                </Map>
              </div>
            </div>
          </div>
          <Company />
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
                  {/* <button
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
                  </button> */}
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
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state.diaryReducer.resBatchArray);
  return {
    currentUser: state.authReducer.currentUser,
    dataCompany: state.fmManagerReducer.dataCompany,
  };
};
const mapDispatchToProps = (dispatch, props) => ({
  showBusiness: (iduser) => dispatch(actions.showBusiness(iduser)),
  deleteBusinessUserFetch: (data) =>
    dispatch(actions.deleteBusinessUserFetch(data)),
  updateMarkerFetch: (dataUpdate, idfarmer, iduser, PolyArray) =>
    dispatch(
      actions.updateMarkerFetch(dataUpdate, idfarmer, iduser, PolyArray)
    ),
  userUpdateDataBusiness: (data, checkvail) =>
    dispatch(actions.userUpdateDataBusiness(data, checkvail)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessCooperation);
