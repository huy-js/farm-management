import React, { Component } from "react";
import { connect } from "react-redux";
import EditmailModelCustomer from "./editmail_model_customer";
import EditQRModelCustomer from "./editQR_model_customer";
import StripeCheckout from "react-stripe-checkout";
import styles from "./order-customer.module.css";
import * as actions from "../../../trainRedux/action/order/actionOrder";
import { showFarmerFetch } from "../../../trainRedux/action/user/actionManagement";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import Button from "../../../components/UI/Button/Button";

class OrderCustomer extends Component {
  state = {
    isMail: "",
    tongNongdan: 0,
    tongQR: 0,
    dataQROrder: [],
    displayInputTT: "block",
    displaySendserver: "none",
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
      numberQR: this.props.dataCooper.totalNumberQR,
      // this.state.totalTrees === 0
      //   ? this.props.dataCooper.totalNumberQR
      //   : this.state.totalTrees,
      memberfarmer: this.props.dataCooper.memberfarmer,
      totalTrees: this.props.dataCooper.totalTrees, // tông cay trong htx
      landArea: this.props.dataCooper.landArea, // diện tích
      email:
        this.state.email === ""
          ? this.props.currentUser.email
          : this.state.email,
      totalpay: this.props.dataCooper.totalNumberQR * 1000,
      payments: "",
    };
    this.props.saveDataOrderFetch(dataOrder);
  };

  componentDidMount = async () => {
    //  this.props.showCoopareFetch(this.props.currentUser._id);
    await this.props.showFarmerFetch(this.props.currentUser._id);

    let array = this.props.resArray.map((e) => {
      return {
        idFarmer: e._id,
        farmOwner: e.farmOwner,
        numberQR: 0,
      };
    });

    this.setState({
      dataQROrder: array,
      isMail: this.props.currentUser.email,
    });
  };
  ChangeMail = (event) => {
    this.setState({
      isMail: event.target.value,
    });
  };
  changeQR = (event, id) => {
    event.preventDefault();
    console.log(id);
    console.log(event.target.value);

    let newdataQROrder = this.state.dataQROrder.map((item) =>
      item.idFarmer === id
        ? { ...item, ...{ numberQR: event.target.value } }
        : item
    );

    this.setState({
      dataQROrder: newdataQROrder,
      displayInputTT: "block",
      displaySendserver: "none",
    });
  };

  submitInputOrder = (event) => {
    event.preventDefault();
    let t = 0;
    let TongQr = 0;
    this.state.dataQROrder.forEach((e) => {
      if (e.numberQR != "0") {
        t++;
        TongQr = TongQr + +e.numberQR;
      }
    });
    if (t === 0) {
      return alert("Bạn cần nhập số QR cho nông hộ");
    }
    this.setState({
      tongNongdan: t,
      tongQR: TongQr,
      displayInputTT: "none",
      displaySendserver: "block",
    });
  };

  submitSendserver = (e) => {
    e.preventDefault();
    let t = 0;
    let TongQr = 0;
    this.state.dataQROrder.forEach((e) => {
      if (e.numberQR != "0") {
        t++;
        TongQr = TongQr + +e.numberQR;
      }
    });
    if (t === 0) {
      return alert("Bạn cần nhập số QR cho nông hộ");
    }
    this.setState({
      tongNongdan: t,
      tongQR: TongQr,
    });
    if (this.state.isMail === "") {
      return alert("Bạn chưa nhập địa chỉ mail nhận QR");
    }
    let dataOrder = this.state.dataQROrder.filter((e) => {
      return e.numberQR != 0;
    });
    let dataCreate = {
      idcustomer: this.props.currentUser._id,
      email: this.state.isMail,
      tongNongdan: this.state.tongNongdan,
      tongQR: this.state.tongQR,
    };
    this.props.saveDataOrderFetch(dataOrder, dataCreate);

    let array = this.props.resArray.map((e) => {
      return {
        idFarmer: e._id,
        farmOwner: e.farmOwner,
        numberQR: 0,
      };
    });

    this.setState({
      dataQROrder: array,
      isMail: this.props.currentUser.email,
      displayInputTT: "block",
      displaySendserver: "none",
    });
    return alert("đăng ký mua thành công, đợi nhận mail sớm nhất trong ngày");
  };

  filterByPrice = (filterVal, data) => {
    if (filterVal) {
      return data.filter((product) => product.farmOwner == filterVal);
    }
    return data;
  };
  render() {
    console.log("alo");
    console.log(this.state.dataQROrder);
    let t = 0;
    let tongQR = 0;
    const styleHeader = {
      padding: "0px",
      paddingTop: "5px",
      marginRight: "10px",
    };
    const columns = [
      {
        dataField: "stt",
        text: "STT",
        // headerStyle: styleHeader,
        // style: styleRow,
      },
      {
        dataField: "farmOwner",
        text: "TÊN NÔNG HỘ",
        // headerStyle: styleHeader,
        filter: textFilter(),
      },
      {
        dataField: "qrForFarmer",
        text: "NHẬP SỐ LƯỢNG QR CHO NÔNG DÂN",
        // headerStyle: styleHeader,
        // style: styleRow,
      },
    ];
    const products = [];

    this.state.dataQROrder.map(async (element, index) => {
      let arr = {
        stt: index + 1,
        farmOwner: element.farmOwner,
        qrForFarmer: (
          <input
            type="number"
            min="0"
            value={element.numberQR}
            // id={element.idFarmer}
            placeholder="0"
            style={{
              outline: "none",
              textAlign: "center",
              width: "80px",
              borderRadius: "15px",
              border: "1px solid #dcdfe3",
            }}
            onChange={(event) => this.changeQR(event, element.idFarmer)}
          ></input>
        ),
      };
      return products.push(arr);
    });
    let listPurchase = products.map((element, index) => (
      <tr key={index + 1}>
        <td>{index + 1}</td>
        <td>{element.farmOwner}</td>
        <td>{element.qrForFarmer}</td>
      </tr>
    ));
    return (
      <main className="page landing-page" style={{ height: "100%" }}>
        <section className="clean-block" style={{ minHeight: "90vh" }}>
          <div className="container">
            <div
              className="block-heading text-center"
              style={{ marginRight: "0px", paddingTop: "50px" }}
            >
              <h2 className={styles.tieuDe}>Giao dịch QR Code</h2>
            </div>
            {/* <div>
              <div className="card shadow">
                <div
                  className="card-body clean-pricing-item overflow-auto"
                  style={{ paddingTop: "0px" }}
                >
                  <div
                    className="block-heading d-flex justify-content-center"
                    style={{ marginRight: "0px", paddingTop: "20px" }}
                  >
                    <h4 className="text-info">Danh sách QR cho nông hộ</h4>
                  </div>
                  <div
                    className="features text-center "
                    // style={{ height: "360px" }}
                  >
                    <BootstrapTable
                      
                      keyField="stt"
                      data={products}
                      columns={columns}
                      hover
                      filter={filterFactory()}
                      // rowEvents={rowEvents}
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-outline-primary  btn-sm "
                      type="button"
                      onClick={this.submitInputOrder}
                      style={{ display: this.state.displayInputTT }}
                    >
                      HOÀN TẤT THANH TOÁN
                    </button>
                    <div
                      style={{
                        display: this.state.displaySendserver,
                        width: "100%",
                      }}
                      className="row"
                    >
                      <h4 style={{ color: "#3483eb" }}>Thông tin thanh toán</h4>
                      <div className="row">
                        <div className="col-sm-3">
                          <b>Tổng nông hộ mua QR : </b>
                          {this.state.dataQROrder.forEach((e) => {
                            if (e.numberQR != "0") {
                              t++;
                              tongQR = tongQR + +e.numberQR;
                            }
                          })}
                          {t}
                        </div>
                        <div className="col-sm-2">
                          <b>Tổng số QR : </b>
                          {tongQR}
                        </div>
                        <div className="col-sm-5">
                          <b>Nhập mail nhận QR :</b>{" "}
                          <input
                            type="text"
                            // className="btn-outline-primary"
                            value={this.state.isMail}
                            name="isMail"
                            onChange={this.ChangeMail}
                            style={{
                              textAlign: "center",
                              border: "none",
                              borderBottom: "1px solid #dcdfe3",
                              outline: "none",
                            }}
                          />
                        </div>
                        <div
                          className="col-sm-2"
                          style={{ paddingTop: "-5px" }}
                        >
                          <button
                            className="btn btn-outline-primary  btn-sm"
                            type="button"
                            onClick={this.submitSendserver}
                            // style={{ display: this.state.displayInputTT }}
                          >
                            HOÀN TẤT
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>
                <table
                  className={styles.content_table}
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên nông hộ</th>
                      <th>Số QR</th>
                    </tr>
                  </thead>
                  <tbody>{listPurchase}</tbody>
                  {/* <tr>
                    <td colSpan="3"> */}
                      {/* <button
                        className="btn btn-outline-primary btn-sm"
                        type="button"
                        onClick={this.submitInputOrder}
                        style={{
                          display: this.state.displayInputTT,
                          alignItems: "center",
                        }}
                      >
                        HOÀN TẤT THANH TOÁN
                      </button> */}
                      {/* <div style={{ textAlign: "center" }}>
                        <Button
                          btnType="Success"
                          clicked={this.submitInputOrder}
                        >
                          Hoàn tất thanh toán
                        </Button>
                      </div> */}
                    {/* </td>
                  </tr> */}
                </table>
              </div>

              <table className={styles.content_table} style={{ width: "55%" }}>
                <thead>
                  <tr>
                    <th>Thông tin thanh toán</th>
                  </tr>
                </thead>
                <tbody>
                  {/* <div
                      style={{
                        display: this.state.displaySendserver,
                        width: "100%",
                      }}
                    > */}
                  <tr>
                    <td>
                      <b>Tổng nông hộ mua QR : </b>
                      {this.state.dataQROrder.forEach((e) => {
                        if (e.numberQR != "0") {
                          t++;
                          tongQR = tongQR + +e.numberQR;
                        }
                      })}
                      {t}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Tổng số QR : </b>
                      {tongQR}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Nhập mail nhận QR :</b>
                      <input
                        type="text"
                        // className="btn-outline-primary"
                        value={this.state.isMail}
                        name="isMail"
                        onChange={this.ChangeMail}
                        style={{
                          textAlign: "center",
                          border: "none",
                          borderBottom: "1px solid #dcdfe3",
                          outline: "none",
                        }}
                      />
                    </td>
                  </tr>
                  
                </tbody>
                <tr>
                    <td>
                      <div style={{ textAlign: "center" }}>
                        <Button
                          btnType="Success"
                          clicked={this.submitSendserver}
                        >
                          Hoàn tất
                        </Button>
                      </div>
                    </td>
                  </tr>
              </table>
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
      </main>
    );
  }
}

// export default OrderCustomer;
const mapStateToProps = (state) => {
  return {
    currentUser: state.authReducer.currentUser,
    resArray: state.fmManagerReducer.resArray,
    dataCooper: state.fmManagerReducer.dataCooper,
    dataListOrderUser: state.fmManagerReducer.dataListOrderUser,
    //dataCooper: state.orderReducer.dataCooper,
    purchased: state.orderReducer.purchase !== null,
    loading: state.orderReducer.loading,
  };
};
const mapDispatchToProps = (dispatch, props) => ({
  showCoopareFetch: (idUser) => dispatch(actions.showCoopareFetch(idUser)),
  saveDataOrderFetch: (dataOrder, dataCreate) =>
    dispatch(actions.saveDataOrderFetch(dataOrder, dataCreate)),
  submitPurchase: (token, product) =>
    dispatch(actions.submitPurchase(token, product)),
  showFarmerFetch: (dataCreate) => dispatch(showFarmerFetch(dataCreate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderCustomer);
