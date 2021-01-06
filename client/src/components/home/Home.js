import React, { Component } from "react";
import { connect } from "react-redux";
import CarouselComponent from "../carousel/CarouselComponent";
import QrReader from "react-qr-reader";
class Home extends Component {
  state = {
    result: "No result",
  };

  handleScan = (data) => {
    if (data) {
      this.setState({
        result: data,
      });
    }
  };
  handleError = (err) => {
    console.error(err);
  };

  render() {
    return (
      <div>
        <CarouselComponent />
        {/* <div style={{ height: "100vh" }}>
          <div style={{ padding: "50px", margin: "0px auto" }}>
            Search Qr code
            <div className="col-12">
              <QrReader
                delay={300}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: "30%", height: "30%" }}
              />
              <p>{this.state.result}</p>
            </div>
          </div>
        </div> */}
        <div
          className="modal fade"
          id="exampleModalCenter"
          // tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">...</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
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
    infor: state.login,
  };
};

export default connect(mapStateToProps, null)(Home);
