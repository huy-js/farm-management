import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class BusinessCooperation extends Component {
  render() {
    const stripe_publickey = "pk_test_EyJcf5TSESBQZ30D0DK9flId008rgcNspJ";
    const onToken = (token) => {
      const product = {
        name: "React from FB",
        price: 10,
        productBy: "facebook",
      };

      const body = {
        token,
        product,
      };

      const headers = {
        "Content-Type": "application/json",
      };

      return fetch(`http://localhost:3456/checkout`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      })
        .then((response) => {
          console.log("RESPONSE", response);
          const { status } = response;
          console.log("STATUS", status);
          toast("Success! Check emails for details", { type: "success" });
        })
        .catch((error) => console.log(error));
    };

    // const [product, setProduct] = useState({
    //   name : "React from FB",
    //   price : 10,
    //   productBy: "facebook"
    // });

    return (
      <main className="page contact-us-page" style={{ height: "100%" }}>
        <section className="clean-block dark" style={{ height: "100vh" }}>
          <div className="container">
            <div className="block-heading">
              <h2 className="text-info">Thông tin thêm</h2>
            </div>
            <div className="row  ">nhập thong tin doanh nghiep thâu sp</div>
          </div>
          <StripeCheckout
            name="MoviesStore@appbase.io"
            description="React from FB"
            token={onToken}
            amount={10 * 100}
            stripeKey={stripe_publickey}
            shippingAddress
            billingAddress
          ></StripeCheckout>
        </section>
      </main>
    );
  }
}

export default BusinessCooperation;
