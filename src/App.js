import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import { ThemeProvider } from "./ThemeContext";
import NotFound from "./404";
function App() {
  return (
    <ThemeProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>

          <Route path="*" component={NotFound}></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
