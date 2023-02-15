import jwt_decode from "jwt-decode";
// NOT USED IN APP
const authorizedToken = () => {
  try {
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    const timeNow = new Date().getTime() / 1000;
    if (decodedToken.exp > timeNow) {
      return true;
    } else return false;
  } catch (error) {
    console.log(error);
  }
};

export default authorizedToken;
