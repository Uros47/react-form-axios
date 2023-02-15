import React from "react";
import { createContext } from "react";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router";
import { useEffect } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const history = useHistory();

  useEffect(() => {
    checkTokenValidity();
  }, []);

  const checkTokenValidity = () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      const timeNow = new Date().getTime() / 1000;
      if (decodedToken.exp > timeNow) {
        setIsAuth(true);
      } else setIsAuth(false);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <AuthContext.Provider value={{ isAuth, checkTokenValidity, logOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
