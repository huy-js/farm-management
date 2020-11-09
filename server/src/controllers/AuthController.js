const jwtHelper = require("../helpers/jwt.helper");
const userModel = require("../models/userModel");
const cooperaModel = require("../models/cooperationModel");
require("dotenv").config();
const stripe = require("stripe")("sk_test_UHDqVJRH0tFNXbt8RzLwxhb500TmVo3G13");
const { v4: uuidv4 } = require('uuid');

let tokenList = {};

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

let login = async (req, res) => {
  try {
    //console.log(req.body);
    let user = await userModel.findByEmail(req.body.email);
    //console.log(user);
    if (!user) {
      return res
        .status(500)
        .json({ message: "thông tin đăng nhập không chính xác" });
    }
    if (!(await user.comparePassword(req.body.password))) {
      return res
        .status(500)
        .json({ message: "thông tin đăng nhập không chính xác" });
    }

    const accessToken = await jwtHelper.generateToken(
      user,
      accessTokenSecret,
      accessTokenLife
    );
    //tokenList[refreshToken] = { accessToken };

    return res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(500).json(error);
  }
};

let register = async (req, res) => {
  try {
    // console.log(req.body);
    if ((await cooperaModel.findCooperative(req.body.data.taxCode)) !== null) {
      return res.status(500).json({ message: "htx da ton tai" });
    }

    let user = {
      username: req.body.data.username,
      email: req.body.data.email,
      phonenumber: req.body.data.phonenumber,
    };
    //console.log(user);
    let userData = await userModel.createNew(user);
    let coopera = {
      Owner: req.body.data.Owner,
      phoneOwner: req.body.data.phoneOwner,
      nameOfCooperative: req.body.data.nameOfCooperative,
      technicalStaff: userData._id,
      address: req.body.data.address,
      numberQR: req.body.data.numberQR,
      taxCode: req.body.data.taxCode,
    };
    await cooperaModel.createNew(coopera);

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

let checkout = async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { token, product } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuidv4();
    const charge = await stripe.charges.create(
      {
        amount: product.totalTrees * 100,
        currency: "vnd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.nameOfCooperative}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
};

module.exports = {
  login: login,
  checkout: checkout,
  register: register,
};
