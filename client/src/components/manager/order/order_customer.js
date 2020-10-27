import React, { Component } from "react";
import { connect } from "react-redux";
import EditmailModelCustomer from "./editmail_model_customer";
import EditQRModelCustomer from "./editQR_model_customer";
import {
  showCoopareFetch,
  saveDataOrderFetch,
} from "../../../trainRedux/action/order/actionOrder";
class OrderCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultData: "",
      //numberQR: 0,
      totalTrees: 0,
      email: "",
      // totalpay: 0,
    };
  }
  componentDidMount = async () => {
    //console.log(this.props.infor.currentUser._id)
    let result = await this.props.showCoopareFetch(
      this.props.infor.currentUser._id
    );
    this.setState({
      resultData: result,
    });
  };
  // luu mail moi tui componet child
  setNewEmail = (newEmail) => {
    this.setState({
      email: newEmail,
    });
  };
  setNewnumberQR = (newnumberQR) => {
    this.setState({
      // numberQR: newnumberQR,
      totalTrees: newnumberQR,
    });
  };

  completeTheTransaction = async (event) => {
    event.preventDefault();
    console.log(this.state);
    let dataOrder = {
      idcustomer: this.props.infor.currentUser._id,
      numberQR:
        this.state.totalTrees === 0
          ? this.state.resultData.totalTrees
          : this.state.totalTrees,
      memberfarmer: this.state.resultData.memberfarmer,
      totalTrees: this.state.resultData.totalTrees, // tông cay trong htx
      landArea: this.state.resultData.landArea, // diện tích
      email:
        this.state.email === ""
          ? this.props.infor.currentUser.email
          : this.state.email,
      totalpay:
        this.state.totalTrees === 0
          ? this.state.resultData.totalTrees * 1000
          : this.state.totalTrees * 1000,
      payments: "",
    };
    await this.props.saveDataOrderFetch(dataOrder);
  };
  render() {
    return (
      <main className="page landing-page" style={{ height: "100%" }}>
        <section
          className="clean-block  dark "
          style={{ height: "100vh", paddingTop: "50px" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                <div className="card shadow">
                  <div className="card-header ">
                    <p className="text-primary m-0 font-weight-bold">
                      Thông tin Hợp tác xã
                    </p>
                  </div>
                  <div
                    className="card-body clean-pricing-item"
                    style={{ height: "289px", paddingTop: "0px" }}
                  >
                    <p>
                      hợp tác xã {this.state.resultData.nameOfCooperative},
                      {this.state.resultData.address}
                    </p>
                    <div className="features">
                      <h4>
                        <span className="feature">Diện tích:&nbsp;</span>
                        <span>{this.state.resultData.landArea} M</span>
                      </h4>
                      <h4>
                        <span className="feature">Số nông hộ:&nbsp;</span>
                        <span>{this.state.resultData.memberfarmer} HỘ</span>
                      </h4>
                      <h4>
                        <span className="feature">Tổng số cây:&nbsp;</span>
                        <span>{this.state.resultData.totalTrees} CÂY</span>
                      </h4>
                      <h4>
                        <span className="feature">Số QR dự kiến:&nbsp;</span>
                        <span>{this.state.resultData.numberQR} QR</span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-8">
                <div className="card shadow">
                  <div
                    className="card-header"
                    style={{ borderBottom: " 2px solid #5ea4f3" }}
                  >
                    <p className="text-primary m-0 font-weight-bold">Mua QR</p>
                  </div>
                  <div className="card-body ">
                    <form>
                      <div className="form-group ">
                        <label>
                          <strong>Xác nhận mail nhận file QR</strong>{" "}
                          <button
                            className="btn btn-outline-primary  btn-sm"
                            type="button"
                            data-toggle="modal"
                            data-target="#showModelAtOrder"
                          >
                            EDIT
                          </button>
                        </label>

                        <p>
                          {this.state.email === ""
                            ? this.props.infor.currentUser.email
                            : this.state.email}
                        </p>
                      </div>
                      <div className="form-row">
                        <div className="col-6">
                          <div className="form-group">
                            <label>
                              <strong>Xác nhận số lượng</strong>{" "}
                              <button
                                className="btn btn-outline-primary  btn-sm"
                                type="button"
                                data-toggle="modal"
                                data-target="#showModelnumberQR"
                              >
                                EDIT
                              </button>
                            </label>

                            {/* <p>
                              {this.state.numberQR === 0
                                ? this.state.resultData.numberQR
                                : this.state.numberQR}
                            </p> */}
                            <p>
                              {this.state.totalTrees === 0
                                ? this.state.resultData.totalTrees
                                : this.state.totalTrees}
                            </p>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="form-group">
                            <label>
                              <strong>Giá</strong>
                            </label>
                            {/* <input className="form-control" type="number" placeholder="USA" name="cost"/> */}
                            <p>1000 </p>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className="form-group">
                            <label>
                              <strong>Thành tiền</strong>
                            </label>
                            {/* <input className="form-control" type="number" placeholder="USA" name="cost"/> */}
                            <p>
                              {this.state.totalTrees === 0
                                ? this.state.resultData.totalTrees * 1000
                                : this.state.totalTrees * 1000}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col">
                          <label>
                            <strong>Hình thức thanh toán</strong>
                          </label>
                        </div>
                        <div className="col">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radiopay"
                            id="paydirectly"
                          />
                          <label className="form-check-label">TRỰC TIẾP</label>
                        </div>

                        <div className="col">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="radiopay"
                            id="paypal"
                          />
                          <label className="form-check-label">PAY-PAL</label>
                        </div>
                      </div>
                      <div className="form-group">
                        {/* <button className="btn btn-primary btn-sm" type="submit">Save&nbsp;Settings</button> */}
                        <button
                          className="btn btn-outline-primary  btn-sm"
                          type="button"
                          onClick={this.completeTheTransaction}
                        >
                          HOÀN TẤT GIAO DỊCH
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <EditmailModelCustomer
          email={
            this.state.email === ""
              ? this.props.infor.currentUser.email
              : this.state.email
          }
          onReceiverEmail={this.setNewEmail}
        />
        <EditQRModelCustomer
          // numberQR={
          //   this.state.numberQR === 0
          //     ? this.state.resultData.numberQR
          //     : this.state.numberQR
          // }
          totalTrees={
            this.state.totalTrees === 0
              ? this.state.resultData.totalTrees
              : this.state.totalTrees
          }
          onReceivernumberQR={this.setNewnumberQR}
        />
      </main>
    );
  }
}

// export default OrderCustomer;
const mapStateToProps = (state) => {
  return {
    infor: state.login,
  };
};
const mapDispatchToProps = (dispatch, props) => ({
  showCoopareFetch: (idUser) => dispatch(showCoopareFetch(idUser)),
  saveDataOrderFetch: (dataOrder) => dispatch(saveDataOrderFetch(dataOrder)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderCustomer);
