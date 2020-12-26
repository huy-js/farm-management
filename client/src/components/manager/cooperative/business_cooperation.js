import React, { Component } from "react";
// import StripeCheckout from "react-stripe-checkout";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// toast.configure();
import { connect } from "react-redux";
import * as actions from "../../../trainRedux/action/user/actionManagement";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Company from "./create-Company";
import moment from "moment";
class BusinessCooperation extends Component {
  state = {
    display: "none",
  };
  componentDidMount() {
    this.props.showBusiness(this.props.currentUser._id);
  }

  deleteBusiness = async (iduser, id, event) => {
    event.preventDefault();
    // console.log(id);
    let data = {
      iduser: iduser,
      id: id,
    };
    if (window.confirm("Xác nhận xóa thông tin")) {
      await this.props.deleteBusinessUserFetch(data);
    }
  };
  render() {
    const styleHeader = {
      fontSize: "15px",
      height: "50px",
      padding: "11px",
      borderBottom: "2px solid #f78788c",
      color: "black",
      textAlign: "center",
    };
    const styleRow = {
      fontSize: "15px",
      color: "#000",
      textAlign: "center",
      borderBottom: "2px solid #f78788c",
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
        dataField: "createdAt",
        text: "NGÀY TẠO",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "nameCompany",
        text: "TÊN CÔNG TY",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "address",
        text: "ĐỊA CHỈ",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "edit",
        text: "XÓA",
        headerStyle: styleHeader,
        style: styleRow,
      },
    ];
    const products = [];

    this.props.dataCompany.map(async (element, index) => {
      let dates = (string) => {
        var options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(string).toLocaleDateString([], options);
      };

      let arr = {
        stt: index + 1,
        // createdAt: dates(element.createdAT),
        createdAt: moment(element.updateAt).format("DD/MM/YYYY"),
        nameCompany: element.nameCompany,
        address: element.address,
        edit: (
          <i
            key={element._id}
            onClick={(e) =>
              this.deleteBusiness(this.props.currentUser._id, element._id, e)
            }
            className="fa fa-ban  btn-outline-danger"
            style={{ borderRadius: "100%" }}
          ></i>
        ),
      };
      return products.push(arr);
    });
    return (
      <main className="page contact-us-page" style={{ height: "100%" }}>
        <section className="clean-block " style={{ height: "100vh" }}>
          <div className="container">
            <div className="block-heading">
              <i
                className="fa fa-plus-circle  btn-outline-primary  btn-sm"
                style={{
                  fontSize: "25px",
                  float: "right",
                  padding: "10px",
                  borderRadius: "50px",
                  cursor: "pointer",
                }}
                data-toggle="modal"
                data-target="#showModalCreate"
              ></i>
              <h2 className="text-info">Thông tin nhà phân phối</h2>
            </div>
            <div className="container-body">
              {this.props.dataCompany.length === 0 ? (
                <div className="text-center">
                  {" "}
                  hien tai chua co thong tin moi ban them thong tin
                </div>
              ) : (
                <BootstrapTable
                  keyField="stt"
                  data={products}
                  columns={columns}
                  //rowEvents={rowEvents}
                  pagination={paginationFactory({
                    sizePerPage: 5,
                    hideSizePerPage: true,
                    // hidePageListOnlyOnePage: true
                  })}
                  hover
                />
              )}
            </div>
          </div>
          <Company />
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state.diaryReducer.resBatchArray);
  return {
    currentUser: state.authReducer.currentUser,
    dataCompany: state.fmManagerReducer.dataCompany,
  };
};
const mapDispatchToProps = (dispatch, props) => ({
  showBusiness: (iduser) => dispatch(actions.showBusiness(iduser)),
  deleteBusinessUserFetch: (data) =>
    dispatch(actions.deleteBusinessUserFetch(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessCooperation);
