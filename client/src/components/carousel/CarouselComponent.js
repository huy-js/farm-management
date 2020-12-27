import React, { Component } from "react";
import classes from "./Carousel.module.css";
import { connect } from "react-redux";
import {
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
  withRouter,
} from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

class CarouselComponent extends Component {
  render() {
    return (
      <div>
        <Carousel>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100 .img-fluid. max-height: 300px;"
              src="assets/img/image0.jpg"
              alt="First slide"
              style={{ minheight: "370px" }}
            />
            <Carousel.Caption
              style={{
                paddingBottom: "250px",
                fontSize: "200%",
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              <h3>Truy xuất nguồn gốc</h3>
              <p>Tăng giá trị cho nông sản Việt Nam.</p>
              {this.props.isLogin ? null : (
                <Link to="/login">
                  <button
                    type="button"
                    className="btn btn-success"
                    style={{ backgroundColor: "#28963C" }}
                  >
                    Tìm hiểu thêm <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </Link>
              )}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="d-block w-100 .img-fluid. max-height: 300px;"
              src="assets/img/image1.jpg"
              alt="Third slide"
              style={{ height: "370px" }}
            />
            <Carousel.Caption
              style={{
                paddingBottom: "250px",
                fontSize: "200%",
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              <h3>Quản lý nhật ký sản xuất</h3>
              <p>Đơn giản, hiệu quả, tiết kiệm.</p>
              {this.props.isLogin ? null : (
                <Link to="/login">
                  <button
                    type="button"
                    className="btn btn-success"
                    style={{ backgroundColor: "#28963C" }}
                  >
                    Tìm hiểu thêm <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </Link>
              )}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 max-height: 300px;"
              src="assets/img/image3.jpg"
              alt="Third slide"
              style={{ height: "370px" }}
            />
            <Carousel.Caption
              style={{
                paddingBottom: "250px",
                fontSize: "200%",
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.authReducer.isLogin,
  };
};

export default connect(mapStateToProps, null)(CarouselComponent);