import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux";
import {
  showListUserFetch,
  updateActiveUserFetch,
  createPwAndSendFetch,
} from "../../../trainRedux/action/admin/actionManagement";
class ListUser extends Component {
  state = {
    // resArray: [],
    idModal: "",
  };

  componentDidMount() {
    this.props.showListUserFetch(this.props.currentUser._id);
  }

  upDateActive = async (iduser, id, event) => {
    event.preventDefault();
    // console.log(id);
    let data = {
      iduser: iduser,
      id: id,
    };
    if (window.confirm("xác nhận cập nhật Active")) {
      await this.props.updateActiveUserFetch(data);
    }
  };
  // tao pass word
  createPwUser = async (id, event) => {
    event.preventDefault();
    // console.log(id);
    this.setState({
      idModal: id,
    });
  };

  createPwAndSendMail = async (event) => {
    event.preventDefault();
    console.log(this.state.idModal);
    let data = {
      iduser: this.props.currentUser._id,
      id: this.state.idModal,
    };
    await this.props.createPwAndSendFetch(data);
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
        dataField: "username",
        text: "TÊN",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "email",
        text: "EMAIL",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "phonenumber",
        text: "SỐ ĐIỆN THOẠI",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "password",
        text: "PASSWORD",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "isActive",
        text: "ACTIVE",
        headerStyle: styleHeader,
        style: styleRow,
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
        username: element.username,
        email: element.email,
        phonenumber: element.phonenumber,
        password: element.password ? (
          <i>********</i>
        ) : (
          <i
            className="fa fa-plus-circle"
            data-toggle="modal"
            data-target="#showModalCreate"
            onClick={(e) => this.createPwUser(element._id, e)}
          ></i>
        ),
        isActive: element.isActive ? (
          <i
            className="fa fa-check"
            // name={element._id}
            onClick={(e) =>
              this.upDateActive(this.props.currentUser._id, element._id, e)
            }
          ></i>
        ) : (
          <i
            className="fa fa-times"
            onClick={(e) =>
              this.upDateActive(this.props.currentUser._id, element._id, e)
            }
          ></i>
        ),
      };
      return products.push(arr);
    });

    return (
      <div>
        <main className="page contact-us-page" style={{ height: "90vh" }}>
          <section
            className="clean-block clean-form dark"
            style={{ height: "100%" }}
          >
            <div className="container">
              <div className="block-heading" style={{ marginTop: "50px" }}>
                <h2 className="text-info">Danh sach user </h2>
              </div>
              <div className="container-body">
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
                  // striped
                  hover
                  // condensed
                />
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
                  Bắc đầu tạo mã
                </h5>
              </div>
              <div className="modal-body">
                <button
                  type="button"
                  className="btn btn-primary "
                  data-dismiss="modal"
                  onClick={this.createPwAndSendMail}
                >
                  Tạo mã và gửi cho khách hàng
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

// export default ListUser;
const mapStateToProps = (state) => {
  return {
    currentUser: state.authReducer.currentUser,
    resArray: state.fmManagerReducer.resArray,
  };
};
const mapDispatchToProps = (dispatch, props) => ({
  showListUserFetch: (iduser) => dispatch(showListUserFetch(iduser)),
  updateActiveUserFetch: (data) => dispatch(updateActiveUserFetch(data)),
  createPwAndSendFetch: (id) => dispatch(createPwAndSendFetch(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListUser);
