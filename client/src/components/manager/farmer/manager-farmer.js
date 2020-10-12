import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { connect } from "react-redux";
import { showFarmerFetch,userCreateFarmerFetch } from "../../../trainRedux/action/user/actionManagement";

class ManagerFarmer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resArray: [],
      farmOwner: " ", // chủ nông trại
      address: " ",
      landArea: 0, // diện tích
      typeOfTree: " ", // giống cây
      totalTrees: 0, // tổng cấy
    };
  }
  componentDidMount = async () => {
    //console.log(this.props.infor.currentUser._id)
    let result = await this.props.showFarmerFetch(this.props.infor.currentUser._id);
   console.log(result);
    result.forEach((e) => {
      this.setState({
        resArray: [...this.state.resArray, e],
      });
    });
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  createFarmer = async (event) => {
    event.preventDefault();
    console.log(this.state);
    let data = {
      farmOwner:this.state.farmOwner,
      address: this.state.address,
      landArea: this.state.landArea,
      typeOfTree:this.state.typeOfTree,
      totalTrees:this.state.totalTrees,
      idUser:this.props.infor.currentUser._id // id user login
    }
   await this.props.userCreateFarmerFetch(data);
    
   
   
  };
  showTotalTrees = (event)=>{
    event.preventDefault();
    console.log("alo")

    let total = 0;
    this.state.landArea === 0 ? total = 0 : total = this.state.landArea/24 + 1;
    this.setState({
      totalTrees: parseInt(total)
    });
  }
  render() {
    //let idUser = this.props.infor.currentUser._id
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
        text: "TÊN NÔNG HỘ",
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
        dataField: "totalTrees",
        text: "TỔNG CÂY",
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
        // soilType: element.soilType,
        // waterSource: element.waterSource,
        totalTrees:element.totalTrees,
        typeOfTree: element.typeOfTree,
      };
      return products.push(arr);
    });

    return (
      <div>
         <main className="page contact-us-page" style={{ height: "90vh" }}>
        
          <section
            className="clean-block clean-form dark"
            style={{ height: "100%" }}
          >
            
            <div className="container">
              <div className="block-heading " style={{ marginTop: "50px" }}>
                <h2 className="text-info">Danh sách nông hộ </h2>
              </div>
              <div className="container-body">
                <BootstrapTable
                  keyField="stt"
                  data={products}
                  columns={columns}
                  // loading={this.state.loading}
                  striped
                  hover
                  condensed
                />
              <div className="d-flex justify-content-center" style={{paddingTop:"20px"}}> 
               <i className="fa fa-plus-circle" style={{fontSize:"40px"}} data-toggle="modal"
            data-target="#showModalCreate" ></i>
               </div>
              </div>
            </div>
          </section>
        </main>
        <div
          className="modal fade"
          //id="exampleModalCenter"
          id="showModalCreate"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header" >
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Tạo nông hộ
                </h5>
              </div>
              <div className="modal-body">
              <form
              onSubmit={this.handleSubmit}
              style={{ paddingBottom: "60px" }}
            >
              <div className="form-group">
                <label>Chủ Nông</label>
                <input
                  className="form-control"
                  type="text"
                  name="farmOwner"
                  value={this.state.farmOwner}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  className="form-control "
                  value={this.state.address}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Giống cây</label>
                <input
                  type="text"
                  name="typeOfTree"
                  className="form-control "
                  value={this.state.typeOfTree}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Diện tích đất</label>
                <input
                  type="number"
                  min="0"
                  name="landArea"
                  className="form-control "
                  value={this.state.landArea}
                  onChange={this.handleChange}
                  onMouseOut={this.showTotalTrees}
                />
              </div>
              <div className="form-group">
                <label>tổng cây dự định : </label>
                <span>{ " " + this.state.totalTrees} cây</span>
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block" type="button" data-dismiss="modal" onMouseOver={this.showTotalTrees}  onClick={this.createFarmer} >
                  Tạo
                </button>
              </div>
            </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  đóng
                </button>
              </div>
            </div>
          </div>
        </div>
     
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    infor: state.login,
  };
};
const mapDispatchToProps = (dispatch, props) => ({
  showFarmerFetch: (dataCreate) => dispatch(showFarmerFetch(dataCreate)),
  userCreateFarmerFetch: (dataCreate) => dispatch(userCreateFarmerFetch(dataCreate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerFarmer);