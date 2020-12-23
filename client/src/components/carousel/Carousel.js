import React from "react";
import classes from "./Carousel.module.css";

function Carousel() {
  return (
    <div >
      {/*Carousel Wrapper*/}
      <div
      
        id="carousel-example-1z"
        className="carousel slide carousel-fade"
        data-ride="carousel"
        style={{height: "60vh"}}
      >
        {/*Indicators*/}
        <ol className="carousel-indicators">
          <li
            data-target="#carousel-example-1z"
            data-slide-to={0}
            className="active"
          />
          <li data-target="#carousel-example-1z" data-slide-to={1} />
          <li data-target="#carousel-example-1z" data-slide-to={2} />
        </ol>
        {/*/.Indicators*/}
        {/*Slides*/}
        <div className="carousel-inner" role="listbox">
          {/*First slide*/}
          <div className="carousel-item active">
            <div
              className="view"
              style={{
                backgroundImage:
                `url("assets/img/image0.jpg")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              {/* Mask & flexbox options*/}
              <div className="mask rgba-black-light d-flex justify-content-center align-items-center">
                {/* Content */}
                <div className="text-center white-text mx-5 wow fadeIn">
                  <h1 className="mb-4">
                    <strong>Learn Bootstrap 4 with MDB</strong>
                  </h1>
                  <p>
                    <strong>
                      Best &amp; free guide of responsive web design
                    </strong>
                  </p>
                  <p className="mb-4 d-none d-md-block">
                    <strong>
                      The most comprehensive tutorial for the Bootstrap 4. Loved
                      by over 500 000 users. Video and written versions
                      available. Create your own, stunning website.
                    </strong>
                  </p>
                  <a
                    target="_blank"
                    href="https://mdbootstrap.com/bootstrap-tutorial/"
                    className="btn btn-outline-white btn-lg"
                  >
                    Start free tutorial
                    <i className="fas fa-graduation-cap ml-2" />
                  </a>
                </div>
                {/* Content */}
              </div>
              {/* Mask & flexbox options*/}
            </div>
          </div>
          {/*/First slide*/}
          {/*Second slide*/}
          <div className="carousel-item">
            <div
              className="view"
              style={{
                backgroundImage:
                `url("assets/img/image1.jpg")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              {/* Mask & flexbox options*/}
              <div className="mask rgba-black-light d-flex justify-content-center align-items-center">
                {/* Content */}
                <div className="text-center white-text mx-5 wow fadeIn">
                  <h1 className="mb-4">
                    <strong>Learn Bootstrap 4 with MDB</strong>
                  </h1>
                  <p>
                    <strong>
                      Best &amp; free guide of responsive web design
                    </strong>
                  </p>
                  <p className="mb-4 d-none d-md-block">
                    <strong>
                      The most comprehensive tutorial for the Bootstrap 4. Loved
                      by over 500 000 users. Video and written versions
                      available. Create your own, stunning website.
                    </strong>
                  </p>
                  <a
                    target="_blank"
                    href="https://mdbootstrap.com/bootstrap-tutorial/"
                    className="btn btn-outline-white btn-lg"
                  >
                    Start free tutorial
                    <i className="fas fa-graduation-cap ml-2" />
                  </a>
                </div>
                {/* Content */}
              </div>
              {/* Mask & flexbox options*/}
            </div>
          </div>
          {/*/Second slide*/}
          {/*Third slide*/}
          <div className="carousel-item">
            <div
              className="view"
              style={{
                backgroundImage:
                `url("assets/img/image2.png")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              {/* Mask & flexbox options*/}
              <div className="mask rgba-black-light d-flex justify-content-center align-items-center">
                {/* Content */}
                <div className="text-center white-text mx-5 wow fadeIn">
                  <h1 className="mb-4">
                    <strong>Learn Bootstrap 4 with MDB</strong>
                  </h1>
                  <p>
                    <strong>
                      Best &amp; free guide of responsive web design
                    </strong>
                  </p>
                  <p className="mb-4 d-none d-md-block">
                    <strong>
                      The most comprehensive tutorial for the Bootstrap 4. Loved
                      by over 500 000 users. Video and written versions
                      available. Create your own, stunning website.
                    </strong>
                  </p>
                  <a
                    target="_blank"
                    href="https://mdbootstrap.com/bootstrap-tutorial/"
                    className="btn btn-outline-white btn-lg"
                  >
                    Start free tutorial
                    <i className="fas fa-graduation-cap ml-2" />
                  </a>
                </div>
                {/* Content */}
              </div>
              {/* Mask & flexbox options*/}
            </div>
          </div>
          {/*/Third slide*/}
        </div>
        {/*/.Slides*/}
        {/*Controls*/}
        <a
          className="carousel-control-prev"
          href="#carousel-example-1z"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carousel-example-1z"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
        {/*/.Controls*/}
      </div>
      {/*/.Carousel Wrapper*/}
    </div>
  );
}

export default Carousel;
