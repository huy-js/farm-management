import React, { Component } from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";
import Button from "../../UI/Button/Button";
import axios from 'axios';

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { element } from "prop-types";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if(!error){
        const {id} = paymentMethod;
        try{
            const {data} = await axios.post('/api/charge',{id, amount: 1000});
            console.log(data);
        }catch(error){
            console.log(error);
        }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0px auto" }}>
      <CardElement />
      <Button btnType="Success">Pay</Button>
    </form>
  );
};

class Stripe extends Component {
  render() {
    const stripePromise = loadStripe(
      "pk_test_EyJcf5TSESBQZ30D0DK9flId008rgcNspJ"
    );
    console.log(stripePromise);
    return (
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    );
  }
}

export default Stripe;
