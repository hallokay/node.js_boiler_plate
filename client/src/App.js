import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandinPage from "./components/views/LandingPage/LandinPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import ResisterPage from "./components/views/ResisterPage/ResisterPage";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandinPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/resister" component={ResisterPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
