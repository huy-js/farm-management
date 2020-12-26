import React from "react";
import classes from "./Carousel.module.css";
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

function CarouselComponent() {
  return (
    <div>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="assets/img/image0.jpg"
            alt="First slide"
            style={{ minHeight: "700px" }}
          />
          <Carousel.Caption
            style={{
              paddingBottom: "200px",
              fontSize: "200%",
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            <h3>Truy xuất nguồn gốc</h3>
            <p>Tăng giá trị cho nông sản Việt Nam.</p>
            <Link to="/login">
              <button
                type="button"
                className="btn btn-success"
                style={{ backgroundColor: "#28963C" }}
              >
                Tìm hiểu thêm <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src="assets/img/image1.jpg"
            alt="Third slide"
            style={{ height: "760px" }}
          />
          <Carousel.Caption
            style={{
              paddingBottom: "200px",
              fontSize: "200%",
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            <h3>Quản lý nhật ký sản xuất</h3>
            <p>Đơn giản, hiệu quả, tiết kiệm.</p>
            <Link to="/login">
              <button
                type="button"
                className="btn btn-success"
                style={{ backgroundColor: "#28963C" }}
              >
                Tìm hiểu thêm <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="assets/img/image3.jpg"
            alt="Third slide"
            style={{ height: "760px" }}
          />
          <Carousel.Caption
            style={{
              paddingBottom: "200px",
              fontSize: "200%",
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            {/* <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselComponent;
