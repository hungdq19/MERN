import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContex";
import Login from "../auth/Login";
import Register from "../auth/Register";

Auth.propTypes = {};

function Auth(props) {
  const { authRoute } = props;
  const {
    authState: { isLoading, isAuthenticated },
  } = useContext(AuthContext);

  let contentForm;
  if (isLoading)
    contentForm = (
      <div className="d-flex justify-content mt-2">
        <CircularProgress color="primary" />
      </div>
    );
  else if (isAuthenticated) return <Redirect to="/About" />;
  else
    contentForm = (
      <>
        {authRoute === "login" && <Login />}
        {authRoute === "register" && <Register />}
      </>
    );

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>HỌC LẬP TRÌNH </h1>
          <h4>TEST AUTHENTICATION HANDLE LOGIN/ LOGOUT</h4>
          {contentForm}
        </div>
      </div>
    </div>
  );
}

export default Auth;
