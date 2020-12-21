const jwt = require("jsonwebtoken");

let generateToken = (user, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    // Định nghĩa những thông tin của user mà bạn muốn lưu vào token ở đây
    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      isActive: user.isActive,
      profile: user.profile,
    };
    // Thực hiện ký và tạo token
    jwt.sign(
      { data: userData },
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
      }
    );
  });
};

let verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
};
let generateTokenQR = (data, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    // Định nghĩa những thông tin của user mà bạn muốn lưu vào token ở đây
    // console.log("toekn qr " + data);
    //console.log(tokenLife);
    // const tokenQR = {
    //   dataQR: data.dataQR,
    //   code: data.code,
    // };
    const tokenQR = {
      idCoopare: data.idCoopare,
      idFarmer: data.idFarmer,
      code: data.code,
      passTable: data.passTable,
    };

    // Thực hiện ký và tạo token
    jwt.sign(
      { data: tokenQR },
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        console.log("token say" + token);
        resolve(token);
      }
    );
  });
};

module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken,
  generateTokenQR: generateTokenQR,
};
