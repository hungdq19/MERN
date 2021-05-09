import React from "react";
import PropTypes from "prop-types";
import Login from "../auth/Login";
import Register from "../auth/Register";

Auth.propTypes = {};

function Auth(props) {
  const { authRoute } = props;
  const contentForm = (
    <div>
      {authRoute === "login" && <Login />}
      {authRoute === "register" && <Register />}
    </div>
  );
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>HỌC LẬP TRÌNH </h1>
          <h4>Đỗ Quốc Hưng and Nguyễn Thị An</h4>
          {contentForm}
        </div>
      </div>
    </div>
  );
}

export default Auth;
