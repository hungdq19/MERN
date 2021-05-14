import React from "react";

import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Notify({ info }) {
  return info === null ? null : (
    <Alert severity={info.type}>{info.message}</Alert>
  );
}
