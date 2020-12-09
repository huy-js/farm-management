import React, { Component } from "react";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return (
      <div>
        <main className="page landing-page" style={{ height: "100%" }}>
          <section
            className="clean-block clean-hero"
            style={{
              backgroundImage: `url("assets/img/tech/image4.jpg")`,
              color: `rgba(9, 162, 255, 0.85)`,
              minHeight: "100hv",
            }}
          >
            <div className="text">
              {/* <h2>Tìm thông tin sẳn phầm bằng qr ?</h2>

              <i className="fa fa-qrcode" style={{ fontSize: "50px" }}></i> */}

              {/* <button
                className="btn btn-outline-light btn-lg"
                type="button"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                Learn More
              </button> */}
            </div>
          </section>
        </main>
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
// const mapDispatchToProps = (dispatch) => ({
//   getProfileFetch: () => dispatch(getProfileFetch()),
// });

export default connect(mapStateToProps, null)(Home);

//export default Home;
