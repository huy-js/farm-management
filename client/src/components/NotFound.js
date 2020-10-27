import React, { Component } from "react";

class NotFound extends Component {
  render() {
    return (
      <main className="page contact-us-page" style={{ paddingTop: "60px" }}>
        <section
          className="clean-block clean-form dark"
          style={{ height: "80vh" }}
        >
          <div className="container">
            <div className="block-heading" style={{ paddingTop: "30px" }}>
              <h1>404 - Không tìm thấy trang</h1>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default NotFound;
