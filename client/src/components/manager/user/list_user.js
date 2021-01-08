import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux";
import * as actions from "../../../trainRedux/action/admin/actionManagement";
import styles from "../../helpers/desgin-table.module.css";
import "../../helpers/table2.css";
import moment from "moment";
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
    if (window.confirm("Xác nhận cập nhật Active")) {
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
        dataField: "username",
        text: "Tên người đại diện",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "email",
        text: "Địa chỉ mail",
        headerStyle: styleHeader,
        style: styleRow,
      },
      // {
      //   dataField: "phonenumber",
      //   text: "số điện thoại",
      //   headerStyle: styleHeader,
      //   style: styleRow,
      // },
      {
        dataField: "password",
        text: "Xác nhận tài khoản",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "isActive",
        text: "Trạng thái tài khoản",
        headerStyle: styleHeader,
        style: styleRow,
      },
    ];
    const products = [];

    this.props.resArrayListUser.map(async (element, index) => {
      // let dates = (string) => {
      //   var options = { year: "numeric", month: "long", day: "numeric" };
      //   return new Date(string).toLocaleDateString([], options);
      // };

      let arr = {
        stt: index + 1,
        //createAt: dates(element.createAt),
        createAt: moment(element.createAt).format("DD/MM/YYYY"),
        username: element.username,
        email: element.email,
        // phonenumber: element.phonenumber,
        password:
          element.verifyToken === null ? (
            <i
              data-toggle="modal"
              data-target="#showModalCreate"
              className="fa fa-check"
              style={{ color: "#009879" }}
              // onClick={(e) => this.createPwUser(element._id, e)}
            ></i>
          ) : (
            <i
              class="fa fa-envelope"
              data-toggle="modal"
              data-target="#showModalCreate"
              style={{ color: "#009879" }}
              onClick={(e) => this.createPwUser(element._id, e)}
            ></i>
          ),
        isActive: element.isActive ? (
          <i
            className="fa fa-check"
            style={{ color: "blue" }}
            onClick={(e) =>
              this.upDateActive(this.props.currentUser._id, element._id, e)
            }
          ></i>
        ) : (
          <i
            className="fa fa-times"
            style={{ color: "red" }}
            onClick={(e) =>
              this.upDateActive(this.props.currentUser._id, element._id, e)
            }
          ></i>
        ),
      };
      return products.push(arr);
    });

    // let dataUseList = this.props.resArrayListUser.map((element, index) => (
    //   <tr key={index + 1}>
    //     <td>{index + 1}</td>
    //     <td>{moment(element.updateAt).format("DD/MM/YYYY")}</td>
    //     <td>{element.username}</td>
    //     <td>{element.email}</td>
    //     <td>{element.phonenumber}</td>
    //     <td>
    //       {element.password ? (
    //         <i>********</i>
    //       ) : (
    //         <i
    //           className="fa fa-plus-circle"
    //           data-toggle="modal"
    //           data-target="#showModalCreate"
    //           style={{ color: "red" }}
    //           onClick={(e) => this.createPwUser(element._id, e)}
    //         ></i>
    //       )}
    //     </td>
    //     <td>
    //       {element.isActive ? (
    //         <i
    //           className="fa fa-check"
    //           style={{ color: "blue" }}
    //           onClick={(e) =>
    //             this.upDateActive(this.props.currentUser._id, element._id, e)
    //           }
    //         ></i>
    //       ) : (
    //         <i
    //           className="fa fa-times"
    //           style={{ color: "red" }}
    //           onClick={(e) =>
    //             this.upDateActive(this.props.currentUser._id, element._id, e)
    //           }
    //         ></i>
    //       )}
    //     </td>
    //   </tr>
    // ));

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
                  Danh Sách Người Dùng Đại Diện Hợp Tác Xã
                </h2>
              </div>
              <div className="container-body">
                {this.props.resArrayListUser.length === 0 ? (
                  <div className="text-center">
                    {" "}
                    hiện tại chưa có người đăng ký tài khoản
                  </div>
                ) : (
                  <div className="tableis">
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
                      striped
                      hover
                      condensed
                      shadow
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
                  //       <th>Tên thành viên</th>
                  //       <th>Địa chỉ mail</th>
                  //       <th>Số điện thoại</th>
                  //       <th>Mật khẩu</th>
                  //       <th>Kích hoạt</th>
                  //     </tr>
                  //   </thead>
                  //   <tbody>{dataUseList}</tbody>
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
                  Bắc đầu tạo mã
                </h5>
              </div>
              <div className="modal-body text-center">
                <button
                  type="button"
                  className="btn btn-outline-success "
                  data-dismiss="modal"
                  onClick={this.createPwAndSendMail}
                >
                  Tạo mã và gửi cho khách hàng
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

// export default ListUser;
const mapStateToProps = (state) => {
  return {
    currentUser: state.authReducer.currentUser,
    resArrayListUser: state.userReducer.resArrayListUser,
  };
};
const mapDispatchToProps = (dispatch, props) => ({
  showListUserFetch: (iduser) => dispatch(actions.showListUserFetch(iduser)),
  updateActiveUserFetch: (data) =>
    dispatch(actions.updateActiveUserFetch(data)),
  createPwAndSendFetch: (id) => dispatch(actions.createPwAndSendFetch(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListUser);
