import jwt_decode from "jwt-decode";
export const checkLogin = (result) => {
  const token = localStorage.getItem("userToken");
  // console.log(token);
  console.log(result.isLogin);
  if (token !== null && result.isLogin) {
    const accessToken = JSON.parse(token).accessToken;
    // console.log(accessToken);
    const decodedToken = jwt_decode(accessToken);
    // kiem tra het token
    console.log(decodedToken);
    console.log(new Date(decodedToken.exp) * 1000);
    if (Date.now() > new Date(decodedToken.exp) * 1000) {
      localStorage.clear();
      return false;
    }
    return true;
  } else {
    return false;
  }
};
