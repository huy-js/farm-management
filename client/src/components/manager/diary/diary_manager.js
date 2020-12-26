import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import { connect } from "react-redux";
import DiaryDetail from "./diary_detail";
import * as actions from "../../../trainRedux/action/diary/actionDiaryMap";
import * as actionss from "../../../trainRedux/action/diary/actionDiaryMap";

class DiaryManager extends Component {
  state = {
    countView: 5,
    display: "none",
    name: "",
    id: "",
  };
  componentDidMount = () => {
    this.props.showListFarmerMapsFetch(this.props.currentUser._id, 5);
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
  ShowDetailMaps = (name, id, event) => {
    event.preventDefault();
    console.log(id + " + " + name);
    this.props.changeScreenMap(true);
    this.setState({
      display: "block",
      name: name,
      id: id,
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
        className="page landing-page"
        style={{ height: "100%", width: "100%" }}
      >
        <section
          className="clean-block  dark "
          style={{ minHeight: "100vh", paddingTop: "50px" }}
        >
          {this.props.resArray.length === 0 ? (
            <div className="text-center">
              Chưa có thông tin nông dân mời bạn thêm thông tin ở phần quản lý nông hộ
            </div>
          ) : (
            <div className="container" style={{ maxWidth: "90%" }}>
              <div className="row">
                <div className="col-sm-3">
                  <div className="card shadow">
                    <div className="card-header ">
                      <p className="text-primary m-0 font-weight-bold">
                        Danh sách thành viên HTX
                      </p>
                    </div>
                    <div
                      className="card-body clean-pricing-item overflow-auto "
                      style={{ paddingTop: "0px" }}
                    >
                      <div className="features" >
                        {this.props.resArray.map((e, index) => {
                          return (
                            <h4
                              key={index}
                              style={{ cursor: "pointer" }}
                              onClick={(event) =>
                                this.ShowDetailMaps(e.farmOwner, e._id, event)
                              }
                            >
                              <span className="feature" style={{borderTopWidth: 1}}>
                                {/* <NavLink
                                to={
                                  "/diary-manager/diary-detail/" +
                                  e._id +
                                  "/" +
                                  e.farmOwner
                                }
                                // isActive={(match, location) => {
                                //   return match ? true : false;
                                // }}
                              >
                                {e.farmOwner}
                              </NavLink> */}
                                {e.farmOwner}
                              </span>
                              <hr />
                            </h4>
                          );
                        })}
                        <div
                          className="text-center"
                          style={{ cursor: "pointer" }}
                          onClick={this.viewMore}
                        >
                          { this.props.resArray.length >= 5 ?  <i
                            className="fa fa-caret-down"
                            aria-hidden="true"
                          ></i> : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-sm-9">
                <div className="card shadow">
                  <div
                    className="card-header"
                    style={{ borderBottom: " 2px solid #5ea4f3" }}
                  >
                    <p className="text-primary m-0 font-weight-bold">
                      Thông tin chi tiết
                    </p>
                  </div>
                  <div className="card-body "></div>
                </div>
              </div> */}
                {/* <Route
                exact
                path="/diary-manager/diary-detail/:id/:name"
                component={DiaryDetail}
              /> */}
                <div className="col-sm-9">
                  <DiaryDetail
                    name={this.state.name === "" ? name : this.state.name}
                    id={this.state.id === "" ? idfarmer : this.state.id}
                    //  changeFarmer={true}
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
  showMoreListFarmerFetch: (idUser, limit) =>
    dispatch(actions.showMoreListFarmerFetch(idUser, limit)),
  showListBatch: (idUser) => dispatch(actionss.showListBatch(idUser)),
  changeScreenMap: (bl) => dispatch(actionss.changeScreenMap(bl)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DiaryManager);
