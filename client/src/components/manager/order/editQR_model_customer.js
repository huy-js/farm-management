import React, { Component } from "react";

class EditQRModelCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberQR: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  setEditnumberQR = (event) => {
    event.preventDefault();
    this.props.onReceivernumberQR(this.state.numberQR);
  };
  render() {
    return (
      <div
        className="modal fade"
        id="showModelnumberQR"
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
                    type="number"
                    min="0"
                    placeholder="nhap thong tin moi"
                    name="numberQR"
                    defaultValue={this.props.numberQR}
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
                onClick={this.setEditnumberQR}
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

export default EditQRModelCustomer;
