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
    this.setState({
      display: "block",
      name: name,
      id: id,
    });
    this.props.showListBatch(id);
  };
  render() {
    console.log(this.props.resArray);

    let name = this.props.resArray.map((e, index) => {
      if (index === 0) {
        return e.farmOwner;
      }
    });
    return (
      <main
        className="page landing-page"
        style={{ height: "100%", width: "100%" }}
      >
        <section
          className="clean-block  dark "
          style={{ height: "100%", paddingTop: "50px" }}
        >
          <div className="container" style={{ maxWidth: "90%" }}>
            <div className="row">
              <div className="col-sm-3">
                <div className="card shadow">
                  <div className="card-header ">
                    <p className="text-primary m-0 font-weight-bold">
                      Danh sách thành viên Htx
                    </p>
                  </div>
                  <div
                    className="card-body clean-pricing-item overflow-auto"
                    style={{ paddingTop: "0px" }}
                  >
                    <p>thành viên hợp tác xã</p>
                    <div className="features " style={{ height: "360px" }}>
                      {this.props.resArray.map((e, index) => {
                        return (
                          <h4
                            key={index}
                            style={{ cursor: "pointer" }}
                            onClick={(event) =>
                              this.ShowDetailMaps(e.farmOwner, e._id, event)
                            }
                          >
                            <span className="feature">
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
                        <i className="fa fa-caret-down" aria-hidden="true"></i>
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
                  id={this.state.id}
                />
              </div>
            </div>
          </div>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(DiaryManager);
