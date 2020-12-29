import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import { connect } from "react-redux";
import DiaryDetail from "./diary_detail";
import styles from "../farmer/manager-farmer.module.css";
import * as actions from "../../../trainRedux/action/diary/actionDiaryMap";
import * as actionss from "../../../trainRedux/action/diary/actionDiaryMap";

//import * as actions from "../../../trainRedux/action/user/actionManagement";
class DiaryManager extends Component {
  state = {
    countView: 5,
    display: "none",
    name: "",
    id: "",
    dataFarmerss: "",
  };
  componentDidMount = async () => {
    await this.props.showListFarmerMapsFetch(this.props.currentUser._id);
    this.setState({
      id: this.props.resArray[0]._id,
      dataFarmerss: this.props.resArray[0],
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
    this.props.changeScreenMap(true);
    this.setState({
      display: "block",
      name: name,
      id: id,
      dataFarmerss: data,
    });
    this.props.showListBatch(id);
  };
  render() {
    console.log(this.props.resArray);
    let name = "";
    let idfarmer = "";
    this.props.resArray.map((e, index) => {
      if (index === 0) {
        name = e.farmOwner;
        idfarmer = e._id;
      }
      return;
    });
    //console.log(idfarmer);
    return (
      <main
        className="page landing-page "
        style={{ height: "100%", width: "100%" }}
      >
        <div
          className="block-heading text-center"
          style={{ marginTop: "50px", marginRight: "0px" }}
        >
          <h2 className={styles.tieuDe}>Nhật ký sản xuất</h2>
        </div>

        <section
          className="clean-block"
          style={{ minHeight: "100vh", paddingTop: "30px" }}
        >
          {this.props.resArray.length === 0 ? (
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
                        Danh sách nông hộ
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
                        {this.props.resArray.map((e, index) => {
                          return (
                            <div
                              key={index}
                              style={{
                                cursor: "pointer",
                                color: this.state.id === e._id ? "#009879" : "",
                              }}
                              onClick={(event) =>
                                this.ShowDetailMaps(
                                  e.farmOwner,
                                  e._id,
                                  e,
                                  event
                                )
                              }
                            >
                              <span className="">
                                {index + 1 + ".   " + e.farmOwner}
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
                          {this.props.resArray.length >= 5 ? (
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
                  <DiaryDetail
                    name={this.state.name === "" ? name : this.state.name}
                    id={this.state.id === "" ? idfarmer : this.state.id}
                    dataFarmerss={this.state.dataFarmerss}
                  />
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    );
  }
}

// export default OrderCustomer;
const mapStateToProps = (state) => {
  return {
    currentUser: state.authReducer.currentUser,
    dataCooper: state.fmManagerReducer.dataCooper,
    loading: state.orderReducer.loading,
    resArray: state.fmManagerReducer.resArray,
  };
};
const mapDispatchToProps = (dispatch, props) => ({
  showListFarmerMapsFetch: (idUser, limit) =>
    dispatch(actions.showListFarmerMapsFetch(idUser, limit)),
  // showMoreListFarmerFetch: (idUser, limit) =>
  //   dispatch(actions.showMoreListFarmerFetch(idUser, limit)),
  showListBatch: (idUser) => dispatch(actionss.showListBatch(idUser)),
  changeScreenMap: (bl) => dispatch(actionss.changeScreenMap(bl)),
  // showFarmerFetch: (dataCreate) =>
  //   dispatch(actions.showFarmerFetch(dataCreate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiaryManager);
