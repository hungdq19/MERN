import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Component/layout/Home";
import Login from "./Component/auth/Login";
import Auth from "./Component/views/Auth";

function App() {
  return (
    <>
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
        </Switch>
      </Router>
    </>
  );
}

export default App;
