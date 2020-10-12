const jwtHelper = require("../helpers/jwt.helper");
const userModel = require("../models/userModel");
const cooperaModel = require("../models/cooperationModel");
require("dotenv").config();

let tokenList = {};

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

let login = async (req, res) => {
  try {
    let user = await userModel.findByEmail(req.body.email);
    console.log(user);
    if(!user ){
        return res
        .status(500)
        .json({ message: "thông tin đăng nhập không chính xác" });
    }
    if( !await user.comparePassword(req.body.password)){
      return res
        .status(500)
        .json({ message: "thông tin đăng nhập không chính xác" });
    }

    const accessToken = await jwtHelper.generateToken(
      user,
      accessTokenSecret,
      accessTokenLife
    );
    tokenList[refreshToken] = { accessToken };
 
    return res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(500).json(error);
  }
};

let refreshToken = async (req, res) => {
  // User gửi mã refresh token kèm theo trong body
  const refreshTokenFromClient = req.body.refreshToken;
  // debug("tokenList: ", tokenList);

  // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
  if (refreshTokenFromClient && tokenList[refreshTokenFromClient]) {
    try {
      // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded
      const decoded = await jwtHelper.verifyToken(
        refreshTokenFromClient,
        refreshTokenSecret
      );

      // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
      // có thể mở comment dòng debug bên dưới để xem là rõ nhé.
      // debug("decoded: ", decoded);
      const userFakeData = decoded.data;

      //debug(`Thực hiện tạo mã Token trong bước gọi refresh Token, [thời gian sống vẫn là 1 giờ.]`);
      const accessToken = await jwtHelper.generateToken(
        userFakeData,
        accessTokenSecret,
        accessTokenLife
      );

      // gửi token mới về cho người dùng
      return res.status(200).json({ accessToken });
    } catch (error) {
      // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
      //debug(error);

      res.status(403).json({
        message: "Invalid refresh token.",
      });
    }
  } else {
    // Không tìm thấy token trong request
    return res.status(403).send({
      message: "No token provided.",
    });
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

module.exports = {
  login: login,
  refreshToken: refreshToken,
  register: register,
};
