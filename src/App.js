import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import { ThemeProvider } from "./ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Route component={Home}></Route>
      </Router>
    </ThemeProvider>
  );
}

export default App;
