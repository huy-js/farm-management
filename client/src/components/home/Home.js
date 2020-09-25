import React, { Component } from "react";
import { connect } from "react-redux";
//import { getProfileFetch } from "../trainRedux/action";
import "./home.css";
class Home extends Component {
  // componentDidMount = () => {
  //   this.props.getProfileFetch();
  // };
  render() {
    return (
      <div>
        {/* <h2>Home {this.props.infor.currentUser.email}</h2> */}
        <main>
          <div className="card-container">
            <div className="card">
              <div className="card-top">
                <img
                  src="https://images.unsplash.com/photo-1595147389795-37094173bfd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1949&q=80"
                  alt="Unsplash "
                />
              </div>
              <div className="card-content">
                <h6 className="tag tag-travel">PUBLIC</h6>
                <h3 className="title">Under Blue sky</h3>
              </div>
            </div>
            <div className="card">
              <div className="card-top">
                <img
                  src="https://images.unsplash.com/photo-1593198095345-311f4d23d511?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80"
                  alt="Unsplash "
                />
              </div>
              <div className="card-content">
                <h6 className="tag tag-nature">VIET-GAP</h6>

                <h3 className="title">Tower In Forest</h3>
              </div>
            </div>
            <div className="card">
              <div className="card-top">
                <img
                  src="https://images.unsplash.com/photo-1594468075989-748bf89136c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80"
                  alt="Unsplash "
                />
              </div>
              <div className="card-content">
                <h6 className="tag tag-architecture">MANAGER</h6>

                <h3 className="title">Building PUBLIC</h3>
              </div>
            </div>
            {/* <div className="card">
              <div className="card-top">
                <img
                  src="https://images.unsplash.com/photo-1594468075989-748bf89136c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80"
                  alt="Unsplash "
                />
              </div>
              <div className="card-content">
                <h6 className="tag tag-architecture">MANAGER</h6>

                <h3 className="title">Building PUBLIC</h3>
              </div>
            </div> */}
          </div>
        </main>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    infor: state.login,
  };
};
// const mapDispatchToProps = (dispatch) => ({
//   getProfileFetch: () => dispatch(getProfileFetch()),
// });

export default connect(mapStateToProps, null)(Home);

//export default Home;
