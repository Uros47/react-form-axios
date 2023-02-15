import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Companions from "./components/companions/Companions";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import NotFound from "./components/NotFound";
import AuthContextProvider from "./context/AuthContext";
import PhotosPage from "./PhotosPage/PhotosPage";

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <Switch>
          <Route exact path="/">
            <LoginForm></LoginForm>
          </Route>
          <Route exact path="/photos">
            <PhotosPage></PhotosPage>
          </Route>
          <ProtectedRoute exact path="/companions" component={Companions} />
          <Route path="*" component={NotFound} />
        </Switch>
      </AuthContextProvider>
    </Router>

  );
};

export default App;
