import CircularProgress from "@material-ui/core/CircularProgress";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContex";
import { useContext } from "react";
ProtectRoute.propTypes = {};

// Bao ve route About, nếu người dùng xác thực rồi thì cho truy cập route /About
// Còn nếu không truy cập thì đẩy người dùng về trang login
function ProtectRoute({ component: Component, ...rest }) {
  const {
    authState: { isLoading, isAuthenticated },
  } = useContext(AuthContext);
  if (isLoading)
    return (
      <div className="spinner-container">
        <CircularProgress color="primary" />
      </div>
    );

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default ProtectRoute;
