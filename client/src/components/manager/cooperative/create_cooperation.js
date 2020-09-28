import React, { Component } from "react";
import { connect } from "react-redux";

import { userCreateCooperationFetch } from "../../../trainRedux/action/actionManagement";

class CreateCooperation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Owner: "", // chủ nông trại
      // technicalStaff: { type: String, default: null }, // cán bộ kỹ thuật
      address: "",
      landArea: "", // diện tích
      soilType: "", // loại đất
      waterSource: "", // nguồn nước
      memberfarmer: "", // sô lượng nông hộ
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(this.state);
    await this.props.userCreateCooperationFetch(this.state);
    // window.location.reload();
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>NHẬP THÔNG TIN </h2>
          <p>
            <label className="form-control-label">TÊN CHỦ SỞ HỮU</label>
            <input
              placeholder="nhập tên địa diện htx"
              name="Owner"
              value={this.state.Owner}
              onChange={this.handleChange}
            ></input>
          </p>
          <p>
            <label className="form-control-label">ĐỊA CHỈ</label>
            <input
              placeholder="nhập địa chỉ"
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
            ></input>
          </p>
          <p>
            <label className="form-control-label">DIỆN TÍCH ĐẤT CANH TÁC</label>
            <input
              placeholder="diện tích đất canh tác"
              name="landArea"
              value={this.state.landArea}
              onChange={this.handleChange}
            ></input>
          </p>
          <p>
            <label className="form-control-label">LOẠI ĐẤT TRỒNG</label>
            <input
              placeholder="loại đât"
              name="soilType"
              value={this.state.soilType}
              onChange={this.handleChange}
            ></input>
          </p>
          <p>
            <label className="form-control-label">NGUỒN NƯỚC</label>
            <input
              placeholder="nước tưới cây"
              name="waterSource"
              value={this.state.waterSource}
              onChange={this.handleChange}
            ></input>
          </p>
          <p>
            <label className="form-control-label">số lượng nông hộ</label>
            <input
              placeholder="nhập số nông hộ"
              name="memberfarmer"
              value={this.state.memberfarmer}
              onChange={this.handleChange}
            ></input>
          </p>
          <button>TẠO</button>
        </form>
      </div>
    );
  }
}

//export default CreateCooperation;
const mapDispatchToProps = (dispatch, props) => ({
  userCreateCooperationFetch: (dataCreate) =>
    dispatch(userCreateCooperationFetch(dataCreate)),
});

export default connect(null, mapDispatchToProps)(CreateCooperation);
