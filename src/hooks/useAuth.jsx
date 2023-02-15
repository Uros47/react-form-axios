import { useEffect } from "react";
import { useState } from "react";
import jwt_decode from "jwt-decode";

const useAuth = () => {
  const [userAuth, setUserAuth] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      const timeNow = new Date().getTime() / 1000;
      if (decodedToken.exp > timeNow) {
        setUserAuth(true);
      } else setUserAuth(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return userAuth;
};

export default useAuth;
