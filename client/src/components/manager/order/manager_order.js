import React, { Component } from 'react';

class ManagerOrder extends Component {
    render() {
        return (
            <main className="page contact-us-page">
            {/* <section className="clean-block clean-form dark">
              <div className="container">
                <div className="block-heading" style={{ paddingTop: "30px" }}>
                  <h2 className="text-info">Danh sách đơn hàng</h2>
                </div>
                </div>
            </section> */}
            <section className="clean-block ">
            <div className="container">
                <div className="block-heading">
                    <h2 className="text-info">Danh sách đơn hàng</h2>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-5 feature-box"><i className="icon-star icon"></i>
                        <h4>Bootstrap 4</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor in, mattis vitae leo.</p>
                    </div>
                    <div className="col-md-5 feature-box"><i className="icon-pencil icon"></i>
                        <h4>Customizable</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor in, mattis vitae leo.</p>
                    </div>
                    <div className="col-md-5 feature-box"><i className="icon-screen-smartphone icon"></i>
                        <h4>Responsive</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor in, mattis vitae leo.</p>
                    </div>
                    <div className="col-md-5 feature-box"><i className="icon-refresh icon"></i>
                        <h4>All Browser Compatibility</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor in, mattis vitae leo.</p>
                    </div>
                </div>
            </div>
        </section>
          </main>
        );
    }
}

export default ManagerOrder;