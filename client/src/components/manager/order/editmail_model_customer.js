import React, { Component } from "react";

class EditmailModelCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  setEditEmail = (event) => {
    event.preventDefault();
    this.props.onReceiverEmail(this.state.email);
  };
  render() {
    return (
      <div
        className="modal fade"
        //id="exampleModalCenter"
        id="showModelAtOrder"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Đổi thông tin giao dịch
              </h5>
            </div>
            <div className="modal-body ">
              <form>
                <div className="form-group ">
                  <label>
                    <strong>nhập thông tin mới</strong>{" "}
                  </label>

                  <input
                    className="form-control"
                    type="email"
                    placeholder="nhap thong tin moi"
                    name="email"
                    defaultValue={this.props.email}
                    onChange={this.handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline-primary  btn-sm"
                type="button"
                data-dismiss="modal"
                onClick={this.setEditEmail}
              >
                HOÀN TẤT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditmailModelCustomer;
