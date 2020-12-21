import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux";
import { showListOrderFetch } from "../../../trainRedux/action/order/actionOrder";
import { createListQrFetch } from "../../../trainRedux/action/admin/actionManagement";

class ManagerOrder extends Component {
  state = {
    // resArray: [],
    idModal: "",
    dataQR: "",
  };

  componentDidMount() {
    this.props.showListOrderFetch();
  }

  createListQR = async (event) => {
    event.preventDefault();
    // console.log(this.state.dataQR);

    await this.props.createListQrFetch(
      this.state.dataQR,
      this.props.currentUser._id
    );
    //console.log(resule);

    // this.props.createListQrFetch(this.state.dataQR);
    this.props.showListOrderFetch();
  };

  render() {
    const styleHeader = {
      fontSize: "18px",
      height: "50px",
      padding: "11px",
      backgroundColor: "#343a40",
      color: "white",
      textAlign: "center",
    };
    const styleRow = {
      fontSize: "15px",
      color: "#78788c",
      textAlign: "center",
      borderBottom: "2px solid #78788c",
      cursor: "pointer",
    };
    const columns = [
      {
        dataField: "stt",
        text: "STT",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "createAt",
        text: "NGÀY TẠO",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "nameCooperaTion",
        text: "HTX",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "numberQR",
        text: "NUMBERQR",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "memberfarmer",
        text: "SỐ NÔNG HỘ",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "totalTrees",
        text: "TỔNG CÂY",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "landArea",
        text: "DIỆN TÍCH",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "totalpay",
        text: "TỔNG TIỀN",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "createQR",
        text: "TẠO QRCODE",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "idcur",
        //text: "TẠO QRCODE",
        headerStyle: { display: "none" },
        style: { display: "none" },
      },
    ];
    const products = [];

    this.props.resArray.map(async (element, index) => {
      let dates = (string) => {
        var options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(string).toLocaleDateString([], options);
      };

      let arr = {
        stt: index + 1,
        createAt: dates(element.createAt),
        nameCooperaTion: element.nameCooperaTion,
        numberQR: element.numberQR,
        memberfarmer: element.memberfarmer,
        totalTrees: element.totalTrees, // tông cay trong htx
        landArea: element.landArea, // diện tích
        // email: element.email,
        totalpay: element.totalpay,
        // payments: element.payments,
        createQR: element.createQR ? (
          <i className="fa fa-check" style={{ color: "red " }}></i>
        ) : (
          <i
            data-toggle="modal"
            data-target="#showModalCreate"
            key={element._id}
            className="fa fa-plus"
          >
            {/* create */}
          </i>
        ),
        idcur: element.idcustomer,
      };
      return products.push(arr);
    });

    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        console.log(row);
        console.log(row.createQR.key);
        this.setState({
          dataQR: {
            //idcustomer: row.idcustomer,
            idcustomer: row.idcur,
            landArea: row.landArea,
            memberfarmer: row.memberfarmer,
            numberQR: row.numberQR,
            totalTrees: row.totalTrees,
            idOrder: row.createQR.key,
          },
        });
      },
    };
    return (
      <div>
        <main className="page contact-us-page" style={{ height: "90vh" }}>
          <section
            className="clean-block clean-form "
            style={{ height: "100%" }}
          >
            <div className="container">
              <div className="block-heading" style={{ marginTop: "50px" }}>
                <h2 className="text-info">Danh sách người dùng mua hàng </h2>
              </div>
              <div className="container-body">
                {this.props.resArray.length === 0 ? (
                  <div className="text-center">
                    {" "}
                    hien tai chua co thong tin moi
                  </div>
                ) : (
                  <BootstrapTable
                    keyField="stt"
                    data={products}
                    columns={columns}
                    rowEvents={rowEvents}
                    pagination={paginationFactory({
                      sizePerPage: 5,
                      hideSizePerPage: true,
                    })}
                    hover
                  />
                )}
              </div>
            </div>
          </section>
        </main>
        <div
          className="modal fade"
          //id="exampleModalCenter"
          id="showModalCreate"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Bắt đầu tạo mã
                </h5>
              </div>
              <div className="modal-body text-center">
                <button
                  type="button"
                  className="btn btn-primary "
                  data-dismiss="modal"
                  onClick={this.createListQR}
                >
                  Tạo mã và lưu file gửi khách hàng
                </button>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.authReducer.currentUser,
    resArray: state.orderReducer.resArray,
  };
};
// export default ManagerOrder;
const mapDispatchToProps = (dispatch, props) => ({
  showListOrderFetch: () => dispatch(showListOrderFetch()),
  createListQrFetch: (dataQR, iduser) =>
    dispatch(createListQrFetch(dataQR, iduser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerOrder);
