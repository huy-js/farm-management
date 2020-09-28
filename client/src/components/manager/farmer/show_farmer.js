import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { connect } from "react-redux";
import { showFarmerFetch } from "../../../trainRedux/action/actionManagement";
class ShowListfarmer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resArray: [],
    };
  }
  componentDidMount = async () => {
    let result = await this.props.showFarmerFetch();
    //console.log(result);
    result.forEach((e) => {
      this.setState({
        resArray: [...this.state.resArray, e],
      });
    });
  };

  render() {
    console.log(this.state.resArray);
    const styleHeader = {
      fontSize: "18px",
      height: "50px",
      padding: "11px",
      backgroundColor: "#343a40",
      color: "white",
      textAlign: "center",
    };
    const styleRow = {
      fontSize: "15px",
      color: "#78788c",
      textAlign: "center",
      borderBottom: "2px solid #78788c",
      cursor: "pointer",
    };
    const columns = [
      {
        dataField: "stt",
        text: "STT",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "createAt",
        text: "NGÀY TẠO",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "farmOwner",
        text: "TÊN",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "address",
        text: "ĐỊA CHỈ",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "landArea",
        text: "DIỆN TÍCH",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "soilType",
        text: "LOẠI ĐẤT",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "waterSource",
        text: "NGUỒN NƯỚC",
        headerStyle: styleHeader,
        style: styleRow,
      },
      {
        dataField: "typeOfTree",
        text: "GIỐNG CÂY",
        headerStyle: styleHeader,
        style: styleRow,
      },
    ];
    const products = [];

    this.state.resArray.map(async (element, index) => {
      let dates = (string) => {
        var options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(string).toLocaleDateString([], options);
      };

      let arr = {
        stt: index + 1,
        createAt: dates(element.createAt),
        farmOwner: element.farmOwner,
        address: element.address,
        landArea: element.landArea,
        soilType: element.soilType,
        waterSource: element.waterSource,
        typeOfTree: element.typeOfTree,
      };
      return products.push(arr);
    });
    return (
      <div>
        <h2>DANH SÁCH NÔNG HỘ</h2>
        {/* <BootstrapTable keyField="id" data={products} columns={columns} /> */}
        <BootstrapTable
          keyField="stt"
          data={products}
          columns={columns}
          striped
          hover
          condensed
        />
      </div>
    );
  }
}

//export default ShowListfarmer;
const mapDispatchToProps = (dispatch, props) => ({
  showFarmerFetch: (dataCreate) => dispatch(showFarmerFetch(dataCreate)),
});

export default connect(null, mapDispatchToProps)(ShowListfarmer);
