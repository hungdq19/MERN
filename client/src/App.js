import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Component/layout/Home";
import About from "./Component/views/About";
import Auth from "./Component/views/Auth";
import Test from "./Component/views/Test";
import { AuthContextProvider } from "./Context/AuthContex";
import ProtectRoute from "./route/ProtectRoute";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/login"
              render={(props) => <Auth {...props} authRoute="login" />}
            />
            <Route
              path="/register"
              render={(props) => <Auth {...props} authRoute="register" />}
            />
            <ProtectRoute exact path="/About" component={About} />
            <Route exact path="/test" component={Test} />
          </Switch>
        </Router>
      </AuthContextProvider>
    </>
  );
}

export default App;
