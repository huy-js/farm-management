import Stripe from "stripe";
const stripe = new Stripe("sk_test_UHDqVJRH0tFNXbt8RzLwxhb500TmVo3G13");

export default async (req, res) => {
  const { id, amount } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "VND",
      description: "Good",
      payment_method: id,
      confirm: true,
    });
    console.log(payment);

    return res.status(200).json({
        confirm: "abc123"
    })
  }catch(error){

  }
};
