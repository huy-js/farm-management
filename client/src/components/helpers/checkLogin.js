import jwt_decode from "jwt-decode";

export const token = localStorage.userToken; 

export const checkLogin = () => {
  const token = localStorage.getItem("userToken");
  // console.log(token);
 
  if (token !== null) {
    const accessToken = JSON.parse(token).accessToken;
    // console.log(accessToken);
    const decodedToken = jwt_decode(accessToken);
    // kiem tra het token
    //console.log(decodedToken);
    console.log(new Date(decodedToken.exp) * 1000);
    if (Date.now() > new Date(decodedToken.exp) * 1000 || !decodedToken.data.isActive) {
      alert("da coi loi xac thuc")
      localStorage.clear();
      return false;
    }
    return true;
  } else {
    return false;
  }
};
