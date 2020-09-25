import React, { Component } from "react";
import "./manager-farmer.css";
class ManagerFarmer extends Component {
  render() {
    return (
      <div className="main">
        <form class="form">
          <h2>CREATE INFOR FARMER</h2>
          <p>
            <label className="form-control-label">EMAIL</label>
            <input placeholder="Write your name here.."></input>
          </p>
          <p>
            <label className="form-control-label">PASSWORD</label>
            <input placeholder="Let us know how to contact you back.."></input>
          </p>
          <p>
            <label className="form-control-label">PASSWORD</label>
            <input placeholder="What would you like to tell us.."></input>
          </p>
          <button>Send Message</button>
        </form>
      </div>
    );
  }
}

export default ManagerFarmer;
