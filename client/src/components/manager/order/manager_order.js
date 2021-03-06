import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux";
import { showListOrderFetch } from "../../../trainRedux/action/order/actionOrder";
import { createListQrFetch } from "../../../trainRedux/action/admin/actionManagement";
import moment from "moment";
import "../../helpers/table2.css";
import styles from "../../helpers/desgin-table.module.css";
class ManagerOrder extends Component {
  state = {
    // resArray: [],
    idModal: "",
    dataQR: "",
  };

  componentDidMount() {
    this.props.showListOrderFetch();
  }
  setIdOrder = (event, idOrder) => {
    this.setState({
      dataQR: idOrder,
    });
  };
  createListQR = async (event) => {
    event.preventDefault();
    console.log(this.state.dataQR);

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
        dataField: "createAt",
        text: "Ngày tạo",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "nameCooperaTion",
        text: "Hợp tác xã",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "numberQR",
        text: "Số lượng Qr yêu cầu",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "memberfarmer",
        text: "Số nông hộ tương ứng",
        headerStyle: styleHeader,
        style: styleRow,
      },
      // {
      //   dataField: "totalTrees",
      //   text: "TỔNG CÂY",
      //   headerStyle: styleHeader,
      //   style: styleRow,
      // },
      // {
      //   dataField: "landArea",
      //   text: "DIỆN TÍCH",
      //   headerStyle: styleHeader,
      //   style: styleRow,
      // },
      // {
      //   dataField: "totalpay",
      //   text: "TỔNG TIỀN",
      //   headerStyle: styleHeader,
      //   style: styleRow,
      // },
      {
        dataField: "createQR",
        text: "Trạng thái tạo mã Qr",
        headerStyle: styleHeader,
        style: styleRow,
      },
      // {
      //   dataField: "idcur",
      //   //text: "TẠO QRCODE",
      //   headerStyle: { display: "none" },
      //   style: { display: "none" },
      // },
    ];
    const products = [];

    this.props.resArrayOrder.map(async (element, index) => {
      // let dates = (string) => {
      //   var options = { year: "numeric", month: "long", day: "numeric" };
      //   return new Date(string).toLocaleDateString([], options);
      // };

      let arr = {
        stt: index + 1,
        // createAt: dates(element.createAt),
        createAt: moment(element.createAt).format("DD/MM/YYYY"),
        nameCooperaTion: element.nameCooperaTion,
        numberQR: element.numberQR,
        memberfarmer: element.memberfarmer,
        // totalTrees: element.totalTrees, // tông cay trong htx
        // landArea: element.landArea, // diện tích
        // email: element.email,
        // totalpay: element.totalpay,
        // payments: element.payments,
        createQR: element.createQR ? (
          <i className="fa fa-check" style={{ color: "red " }}></i>
        ) : (
          <i
            data-toggle="modal"
            data-target="#showModalCreate"
            key={element._id}
            className="fa fa-plus"
            onClick={(event) => this.setIdOrder(event, element._id)}
          >
            {/* create */}
          </i>
        ),
        //  idcur: element.idcustomer,
      };
      return products.push(arr);
    });

    // let dataListOrder = this.props.resArrayOrder.map((element, index) => (
    //   <tr key={index + 1}>
    //     <td>{index + 1}</td>
    //     <td>{moment(element.updateAt).format("DD/MM/YYYY")}</td>
    //     <td>{element.nameCooperaTion}</td>
    //     <td>{element.numberQR}</td>
    //     <td>{element.memberfarmer}</td>
    //     <td>
    //       {element.createQR ? (
    //         <i className="fa fa-check" style={{ color: "red " }}></i>
    //       ) : (
    //         <i
    //           data-toggle="modal"
    //           data-target="#showModalCreate"
    //           key={element._id}
    //           className="fa fa-plus"
    //           onClick={(event) => this.setIdOrder(event, element._id)}
    //         >
    //           {/* create */}
    //         </i>
    //       )}
    //     </td>
    //   </tr>
    // ));
    // const rowEvents = {
    //   onClick: (e, row, rowIndex) => {
    //     console.log(row);
    //     console.log(row.createQR.key);
    //     this.setState({
    //       dataQR: {
    //         //idcustomer: row.idcustomer,
    //         idcustomer: row.idcur,
    //         landArea: row.landArea,
    //         memberfarmer: row.memberfarmer,
    //         numberQR: row.numberQR,
    //         totalTrees: row.totalTrees,
    //         idOrder: row.createQR.key,
    //       },
    //     });
    //   },
    // };
    return (
      <div>
        <main className="page contact-us-page" style={{ height: "90vh" }}>
          <section
            className="clean-block clean-form "
            style={{ height: "100%" }}
          >
            <div className="container">
              <div className="block-heading" style={{ marginTop: "50px" }}>
                <h2 className="text-info" className={styles.tieuDe}>
                  Danh Sách Đặt Qr
                </h2>
              </div>
              <div className="container-body text-center">
                {this.props.resArrayOrder.length === 0 ? (
                  <div className="text-center"> hiện tại chưa có đơn hàng</div>
                ) : (
                  <div className="tableis">
                    <BootstrapTable
                      keyField="stt"
                      data={products}
                      columns={columns}
                      // rowEvents={rowEvents}
                      pagination={paginationFactory({
                        sizePerPage: 5,
                        hideSizePerPage: true,
                      })}
                      hover
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
                  //       <th>Tên Hợp tác xã</th>
                  //       <th>Số Qr yêu cầu</th>
                  //       <th>Số nông hộ tương ứng</th>
                  //       <th>Kích hoạt</th>
                  //     </tr>
                  //   </thead>
                  //   <tbody>{dataListOrder}</tbody>
                  // </table>
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
          <div className="modal-dialog" role="document">
            <div className="modal-content" style={{ borderRadius: "30px" }}>
              <div
                className="modal-header"
                style={{
                  backgroundColor: "#009879",
                  borderRadius: "30px 30px 0px 0px",
                  borderBottom: "none",
                }}
              >
                <h5
                  className="modal-title"
                  id="exampleModalLongTitle"
                  style={{ color: "#fff" }}
                >
                  Bắt đầu tạo mã
                </h5>
              </div>
              <div
                className="modal-body text-center"
                //style={{ height: "150px" }}
              >
                <button
                  type="button"
                  className="btn btn-outline-success "
                  data-dismiss="modal"
                  onClick={this.createListQR}
                >
                  tạo mã và gửi khách hàng
                </button>
              </div>
              {/* <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div> */}
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
    resArrayOrder: state.orderReducer.resArrayOrder,
  };
};
// export default ManagerOrder;
const mapDispatchToProps = (dispatch, props) => ({
  showListOrderFetch: () => dispatch(showListOrderFetch()),
  createListQrFetch: (dataQR, iduser) =>
    dispatch(createListQrFetch(dataQR, iduser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerOrder);
