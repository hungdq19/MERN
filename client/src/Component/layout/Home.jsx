import React from "react";
import { Redirect } from "react-router-dom";
Home.propTypes = {};

function Home(props) {
  return (
    <div>
      <Redirect to="login" />
    </div>
  );
}

export default Home;
