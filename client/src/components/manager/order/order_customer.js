import React, { Component } from 'react';

class OrderCustomer extends Component {
    render() {
        return (
            <section className="clean-block "  style={{ height:"100vh" }}>
            <div className="container">
                <div className="block-heading">
                    <h2 className="text-info">Chót đơn</h2>
                </div>
                <div className="row  ">
                    <div className="col-md-3 feature-box"><i className="icon-star icon"></i>
                        <h4>Thông tin thu thập </h4>
                        <p>30 nông hộ, 5000 cây</p>
                    </div>
                    <div className="col-md-3 feature-box"><i className="icon-pencil icon"></i>
                        <h4>QR bạn yêu cầu</h4>
                        <p>4000QR = 4000 cây</p>
                    </div>
                    <div className="col-md-3 feature-box">
                        <i className="icon-refresh icon"></i>
                        <h4>đổi số lượng</h4>
                    </div>
                    <div className="col-md-3 feature-box"><i className="icon-screen-smartphone icon"></i>
                        <h4>xác nhận mua QR</h4>
                        <p> 5000 QR</p>
                    </div>
                    
                </div>
                <div className="row">
                    <div className="col-md-10 box">
                        <h4>Thông tin  </h4>
                        <p>value</p>
                    </div>
                    
                </div>
            </div>
        </section>
       
        );
    }
}

export default OrderCustomer;