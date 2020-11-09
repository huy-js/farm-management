import React, { Component } from "react";
import { connect } from "react-redux";
import EditmailModelCustomer from "./editmail_model_customer";
import EditQRModelCustomer from "./editQR_model_customer";
import StripeCheckout from "react-stripe-checkout";
import * as actions from "../../../trainRedux/action/order/actionOrder";

class OrderCustomer extends Component {
  state = {
    // resultData: this.props.resArray[1],
    numberQR: 0,
    totalTrees: 0,
    email: "",
    // totalpay: 0,;
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

  completeTheTransaction = (event) => {
    event.preventDefault();
    console.log(this.state);
    let dataOrder = {
      idcustomer: this.props.currentUser._id,
      numberQR:
        this.state.totalTrees === 0
          ? this.props.dataCooper.totalTrees
          : this.state.totalTrees,
      memberfarmer: this.props.dataCooper.memberfarmer,
      totalTrees: this.props.dataCooper.totalTrees, // tông cay trong htx
      landArea: this.props.dataCooper.landArea, // diện tích
      email:
        this.state.email === ""
          ? this.props.currentUser.email
          : this.state.email,
      totalpay:
        this.state.totalTrees === 0
          ? this.props.dataCooper.totalTrees * 1000
          : this.state.totalTrees * 1000,
      payments: "",
    };
    this.props.saveDataOrderFetch(dataOrder);
  };

  componentDidMount() {
    this.props.showCoopareFetch(this.props.currentUser._id);
  }

  render() {
    const stripe_publickey = "pk_test_EyJcf5TSESBQZ30D0DK9flId008rgcNspJ";
    const onToken = (token) => {
      const product = this.props.dataCooper;
      // console.log(product, token);
      // const body = {
      //   token,
      //   product,
      // };
      // const headers = {
      //   "Content-Type": "application/json",
      // };

      // return fetch(`http://localhost:3456/checkout`, {
      //   method: "POST",
      //   headers,
      //   body: JSON.stringify(body),
      // })
      //   .then((response) => {
      //     console.log("RESPONSE", response);
      //     const { status } = response;
      //     console.log("STATUS", status);
      //     toast("Success! Check emails for details", { type: "success" });
      //   })
      //   .catch((error) => console.log(error));
      this.props.submitPurchase(token, product);
    };
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
                      hợp tác xã {this.props.dataCooper.nameOfCooperative},
                      {this.props.dataCooper.address}
                    </p>
                    <div className="features">
                      <h4>
                        <span className="feature">Diện tích:&nbsp;</span>
                        <span>{this.props.dataCooper.landArea} M</span>
                      </h4>
                      <h4>
                        <span className="feature">Số nông hộ:&nbsp;</span>
                        <span>{this.props.dataCooper.memberfarmer} HỘ</span>
                      </h4>
                      <h4>
                        <span className="feature">Tổng số cây:&nbsp;</span>
                        <span>{this.props.dataCooper.totalTrees} CÂY</span>
                      </h4>
                      <h4>
                        <span className="feature">Số QR dự kiến:&nbsp;</span>
                        <span>{this.props.dataCooper.numberQR} QR</span>
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
                            ? this.props.currentUser.email
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
                                ? this.props.dataCooper.numberQR
                                : this.state.numberQR}
                            </p> */}
                            <p>
                              {this.state.totalTrees === 0
                                ? this.props.dataCooper.totalTrees
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
                                ? this.props.dataCooper.totalTrees * 1000
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
                    <StripeCheckout
                          name={this.props.dataCooper.nameOfCooperative}
                          description="Purchase for QR code"
                          token={onToken}
                          amount={this.props.dataCooper.totalTrees * 1000}
                          currency="VND"
                          stripeKey={stripe_publickey}
                          shippingAddress
                          billingAddress
                        ></StripeCheckout>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <EditmailModelCustomer
          email={
            this.state.email === ""
              ? this.props.currentUser.email
              : this.state.email
          }
          onReceiverEmail={this.setNewEmail}
        />
        <EditQRModelCustomer
          // numberQR={
          //   this.state.numberQR === 0
          //     ? this.props.dataCooper.numberQR
          //     : this.state.numberQR
          // }
          totalTrees={
            this.state.totalTrees === 0
              ? this.props.dataCooper.totalTrees
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
    currentUser: state.authReducer.currentUser,
    dataCooper: state.orderReducer.dataCooper,
    purchased: state.orderReducer.purchase !== null,
    loading: state.orderReducer.loading,
  };
};
const mapDispatchToProps = (dispatch, props) => ({
  showCoopareFetch: (idUser) => dispatch(actions.showCoopareFetch(idUser)),
  saveDataOrderFetch: (dataOrder) =>
    dispatch(actions.saveDataOrderFetch(dataOrder)),
    submitPurchase: (token, product) => dispatch(actions.submitPurchase(token, product))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderCustomer);
