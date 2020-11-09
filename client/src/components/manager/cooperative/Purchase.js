import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';

const stripe_publickey = "pk_test_EyJcf5TSESBQZ30D0DK9flId008rgcNspJ";

const onToken = (token) => {
  // console.log('Stripe Token', token);
  const body = {
    token,
    product
  }
};

const [product, setProduct] = useState({
  name : "React from FB",
  price : 10,
  productBy: "facebook"
});

const Purchase = (
  { price, title, children, ...props }
  ) => (
  <StripeCheckout
    name="MoviesStore@appbase.io"
    description="React from FB"
    token={onToken}
    amount={10 * 100}
    stripeKey={stripe_publickey}
  >
    {children || <span {...props}>PURCHASE</span>}
  </StripeCheckout>
);
Purchase.propTypes = {
  price: PropTypes.number,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Purchase;