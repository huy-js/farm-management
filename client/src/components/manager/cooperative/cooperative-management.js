import React, { Component } from "react";
import "./manager-farmer.css";
import { Tabs, Tab } from "react-bootstrap";
import CreateCooperation from "./create_cooperation";
import ShowListCooperation from "./show_cooperation";
class CooperativeManagement extends Component {
  render() {
    return (
      <div className="main_create_farmer">
        <Tabs defaultActiveKey="showlist" className="container_farmer">
          <Tab eventKey="showlist" title="Danh sách Hợp tác xã">
            <ShowListCooperation />
          </Tab>
          <Tab eventKey="create" title="Tạo thông tin HTX">
            <CreateCooperation />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default CooperativeManagement;
