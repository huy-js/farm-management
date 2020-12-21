import React, { Component } from "react";

import { connect } from "react-redux";

import * as actions from "../../trainRedux/action/authentication/actionAuth";
class Search extends Component {
  state = {
    cooperaowner: "",
    farmerowner: "",
  };
  componentDidMount = () => {
    let { match } = this.props;
    console.log(match);
    //  console.log(match.params.idcoopare);
    this.props.searchGuestFetch(match.params.dataQR);
  };
  render() {
    // let { match } = this.props;
    // console.log(match);
    // console.log(match.params.idcoopare);
    let datacoo = {};
    let datafar = {};
    this.props.resData.map(async (element, index) => {
      if (index === 0) {
        datacoo = element;
      }
      if (index === 1) {
        datafar = element;
      }
    });
    console.log(datafar);
    let showData = (text, value) => {
      return (
        <div className="row">
          <div className="col-xs-2 col-sm-2"></div>
          <div className="col-xs-5 col-sm-5">
            <strong>{text}</strong>
          </div>
          <div className="col-xs-5 col-sm-5">
            <span>{value}</span>
          </div>
        </div>
      );
    };
    return (
      <main className="page contact-us-page" style={{ paddingTop: "60px" }}>
        <section className="dark" style={{ minHeight: "120vh" }}>
          <div className="container">
            <div className="block-heading" style={{ paddingTop: "30px" }}>
              <div>
                <div className="card shadow">
                  <div
                    className="card-header"
                    style={{ borderBottom: " 2px solid #5ea4f3" }}
                  >
                    <p className="text-primary font-weight-bold">
                      Kết quả tìm kiếm
                    </p>
                  </div>
                  <div className="card-body ">
                    <div className="row">
                      <div className="col-sm-9">
                        <label>
                          {" "}
                          <strong>Thông tin hợp tác xã :</strong>
                        </label>
                        {showData("tên hợp tác xã", datacoo.nameOfCooperative)}
                        {showData("mã thuế", datacoo.taxCode)}
                        {showData("diện tích đất", datacoo.landArea)}
                        {showData("địa chỉ", datacoo.address)}
                        {showData("tổng nông hộ", datacoo.memberfarmer)}
                        {showData("tổng số cây trồng", datacoo.totalTrees)}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-9">
                        <label>
                          {" "}
                          <strong>Thông tin nơi trồng trái cây :</strong>
                        </label>
                        {showData("tên nông hộ", datafar.farmOwner)}

                        {showData("diện tích đất", datafar.landArea)}
                        {showData("địa chỉ", datafar.address)}

                        {showData("tổng số cây trồng", datafar.totalTrees)}
                      </div>
                    </div>
                  </div>
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
  return {
    resData: state.authReducer.search_guest,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  searchGuestFetch: (idcoopare, idfarmer) =>
    dispatch(actions.searchGuestFetch(idcoopare, idfarmer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
