import React from "react";
import { Route } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuth } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component {...props} />;
        } else {
          return <LoginForm></LoginForm>;
        }
      }}
    />
  );
};

export default ProtectedRoute;
