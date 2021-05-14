import React from "react";
import PropTypes from "prop-types";
import Notify from "../layout/Notify";

About.propTypes = {};

function About(props) {
  const alert = { type: "success", message: " Dang NThanh cong :D" };
  return (
    <div>
      <Notify info={alert} />

      <h1>TRANG CHU</h1>
    </div>
  );
}

export default About;
