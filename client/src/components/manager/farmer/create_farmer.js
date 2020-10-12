import React, { Component } from "react";
import { connect } from "react-redux";

import { userCreateFarmerFetch } from "../../../trainRedux/action/admin/actionManagement";

class Createfarmer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      farmOwner: " ", // chủ nông trại
      address: " ",
      landArea: " ", // diện tích
      typeOfTree: " ", // giống cây
      soilType: " ", // loại đất
      waterSource: " ", // nguồn nước
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
    await this.props.userCreateFarmerFetch(this.state);
    window.location.reload();
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>NHẬP THÔNG TIN </h2>
          <p>
            <label className="form-control-label">TÊN CHỦ SỞ HỮU</label>
            <input
              placeholder="nhập tên chủ nông hộ"
              name="farmOwner"
              value={this.state.farmOwner}
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
            <label className="form-control-label">GIỐNG CÂY TRỒNG</label>
            <input
              placeholder="giống cây trồng"
              name="typeOfTree"
              value={this.state.typeOfTree}
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
          <button>TẠO</button>
        </form>
      </div>
    );
  }
}

//export default Createfarmer;
const mapDispatchToProps = (dispatch, props) => ({
  userCreateFarmerFetch: (dataCreate) =>
    dispatch(userCreateFarmerFetch(dataCreate)),
});

export default connect(null, mapDispatchToProps)(Createfarmer);
