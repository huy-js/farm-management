import React, { Component } from "react";
import "./manager-farmer.css";
import { Tabs, Tab } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import CreateFarmer from "./create_farmer";
import ShowListfarmer from "./show_farmer";
class ManagerFarmer extends Component {
  render() {
    return (
      <div className="main_create_farmer">
        <Tabs defaultActiveKey="showlist" className="container_farmer">
          <Tab eventKey="showlist" title="Danh sách Nông Hộ">
            <ShowListfarmer />
          </Tab>
          <Tab eventKey="create" title="Tạo nông Hộ">
            <CreateFarmer />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default ManagerFarmer;
